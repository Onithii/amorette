/**
 * Amorette - Supabase Backend Client & Local Fallback
 * Provides seamless cloud persistence with Supabase, with automatic
 * local storage fallback so the entire app works reliably offline or before cloud setup.
 */

class AmoretteBackend {
  constructor() {
    this.supabaseUrl = localStorage.getItem('amorette_supabase_url') || '';
    this.supabaseKey = localStorage.getItem('amorette_supabase_key') || '';
    this.localPrefix = 'amorette_local_letter_';
  }

  isConfigured() {
    return !!(this.supabaseUrl && this.supabaseKey);
  }

  setConfig(url, key) {
    this.supabaseUrl = (url || '').trim();
    this.supabaseKey = (key || '').trim();
    localStorage.setItem('amorette_supabase_url', this.supabaseUrl);
    localStorage.setItem('amorette_supabase_key', this.supabaseKey);
  }

  clearConfig() {
    this.supabaseUrl = '';
    this.supabaseKey = '';
    localStorage.removeItem('amorette_supabase_url');
    localStorage.removeItem('amorette_supabase_key');
  }

  /**
   * Generates a 128-bit unguessable random cryptographic token
   */
  generateToken() {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  /**
   * SHA-256 hash helper for secret passcodes
   */
  async hashPasscode(passcode) {
    if (!passcode) return null;
    const msgBuffer = new TextEncoder().encode(passcode);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Saves a newly sealed letter
   */
  async saveLetter(letterData) {
    const token = this.generateToken();
    let passcodeHash = null;
    if (letterData.passcode) {
      passcodeHash = await this.hashPasscode(letterData.passcode);
    }

    const payload = {
      id: 'letter-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6),
      token: token,
      sender_name: letterData.senderName || letterData.sender_name || 'Anonymous',
      recipient_name: letterData.recipientName || letterData.recipient_name || 'My Dear',
      envelope_config: letterData.envelope_config || { id: letterData.envelopeStyle || 'hero_burgundy' },
      stamp_id: letterData.stampId || letterData.stamp_id || 'apple_blossom_24',
      seal_config: letterData.seal_config || {
        color: letterData.waxColor || 'burgundy',
        emblem: letterData.waxEmblem || 'lavender',
        initials: letterData.waxInitials || 'A',
        shape: letterData.waxShape || 'oval'
      },
      paper_config: letterData.paper_config || { id: letterData.paperStyle || 'lined_parchment' },
      content: letterData.content || {
        dateText: letterData.dateText || '',
        greetingText: letterData.greetingText || '',
        bodyText: letterData.bodyText || '',
        signoffText: letterData.signoffText || '',
        senderSignText: letterData.senderSignText || '',
        psText: letterData.psText || ''
      },
      decorations: letterData.decorations || [],
      decorationsHtml: letterData.decorationsHtml || '',
      polaroids: letterData.polaroids || [],
      open_when_label: letterData.openWhenLabel || letterData.open_when_label || '',
      passcode_hash: passcodeHash,
      open_at: letterData.open_at || null,
      expires_at: letterData.expires_at || null,
      revoked: false,
      created_at: new Date().toISOString()
    };

    // Save to local storage cache first
    localStorage.setItem(this.localPrefix + token, JSON.stringify(payload));
    this.recordSentLetter(payload);

    // If Supabase is configured, also push via REST API
    if (this.isConfigured()) {
      try {
        const response = await fetch(`${this.supabaseUrl}/rest/v1/letters`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': this.supabaseKey,
            'Authorization': `Bearer ${this.supabaseKey}`,
            'Prefer': 'return=representation'
          },
          body: JSON.stringify(payload)
        });
        if (!response.ok) {
          console.warn('Supabase save error, persisted locally:', await response.text());
        }
      } catch (err) {
        console.warn('Network error pushing to Supabase, persisted locally:', err);
      }
    }

    return { success: true, token, payload };
  }

  /**
   * Fetches a letter by token
   */
  async getLetter(token) {
    if (!token) return null;

    // Check local storage first for instant retrieval
    const local = localStorage.getItem(this.localPrefix + token);
    if (local) {
      try {
        return JSON.parse(local);
      } catch (e) {}
    }

    // If Supabase configured, query Supabase
    if (this.isConfigured()) {
      try {
        const response = await fetch(`${this.supabaseUrl}/rest/v1/letters?token=eq.${encodeURIComponent(token)}&select=*`, {
          method: 'GET',
          headers: {
            'apikey': this.supabaseKey,
            'Authorization': `Bearer ${this.supabaseKey}`
          }
        });
        if (response.ok) {
          const list = await response.json();
          if (list && list.length > 0) {
            const letter = list[0];
            // Cache locally
            localStorage.setItem(this.localPrefix + token, JSON.stringify(letter));
            return letter;
          }
        }
      } catch (e) {
        console.warn('Error querying Supabase:', e);
      }
    }

    return null;
  }

  /**
   * Adds an emoji reaction from the recipient
   */
  async addReaction(token, emoji) {
    const letter = await this.getLetter(token);
    if (!letter) return;

    if (!letter.reactions) letter.reactions = [];
    letter.reactions.push({ emoji, timestamp: new Date().toISOString() });
    localStorage.setItem(this.localPrefix + token, JSON.stringify(letter));

    if (this.isConfigured()) {
      try {
        await fetch(`${this.supabaseUrl}/rest/v1/reactions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': this.supabaseKey,
            'Authorization': `Bearer ${this.supabaseKey}`
          },
          body: JSON.stringify({ letter_token: token, emoji, created_at: new Date().toISOString() })
        });
      } catch (e) {}
    }
  }

  /**
   * Sent letters archive tracking in local storage
   */
  recordSentLetter(letter) {
    const sentList = this.listSentLetters();
    sentList.unshift({
      token: letter.token,
      recipient_name: letter.recipient_name,
      created_at: letter.created_at,
      stamp_id: letter.stamp_id
    });
    localStorage.setItem('amorette_sent_letters', JSON.stringify(sentList.slice(0, 30)));
  }

  listSentLetters() {
    try {
      return JSON.parse(localStorage.getItem('amorette_sent_letters') || '[]');
    } catch (e) {
      return [];
    }
  }

  /**
   * Autosaved drafts management
   */
  saveDraft(draftData) {
    localStorage.setItem('amorette_active_draft', JSON.stringify({
      ...draftData,
      updated_at: new Date().toISOString()
    }));
  }

  loadDraft() {
    try {
      const data = localStorage.getItem('amorette_active_draft');
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  clearDraft() {
    localStorage.removeItem('amorette_active_draft');
  }
}

window.amoretteBackend = new AmoretteBackend();
