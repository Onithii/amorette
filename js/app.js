/**
 * Amorette - Application Controller & Ceremonial Interactions
 * Orchestrates all screen transitions, 3D envelope folds, stamp placement,
 * writing desk ritual, wax sealing ceremony, recipient opening sequence, and Supabase sync.
 */

class AmoretteApp {
  constructor() {
    this.currentScreen = 'screenDesk';
    this.letterState = {
      recipientName: 'Sofia',
      recipientAddress: 'Somewhere lovely under the stars',
      senderName: 'Yours truly',
      envelopeStyle: 'hero_burgundy',
      stampId: 'apple_blossom_24',
      paperStyle: 'lined_parchment',
      fontFamily: 'Caveat',
      fontSize: '21px',
      lineHeight: '32px',
      inkColor: '#3A2722',
      dateText: 'November 23, 2026',
      greetingText: 'Dearest Sofia,',
      bodyText: `I wanted to send you something you could hold in your hands. Even through a glowing screen, I hope you feel the quiet warmth and affection folded into every line here.

The days have been full, but whenever I pause, my thoughts wander back to our laughter and how effortless it is being near you. Thank you for bringing so much light into ordinary hours.`,
      signoffText: 'With all my love,',
      senderSignText: 'Yours always',
      psText: 'P.S. Keep this letter safe. It traveled across the miles just for you.',
      waxColor: 'burgundy',
      waxEmblem: 'lavender',
      waxInitials: 'S',
      waxShape: 'oval',
      decorations: [],
      polaroids: [],
      passcode: '',
      openWhenLabel: '',
      token: null
    };

    this.activeToken = null;
    this.isSealingInProgress = false;
  }

  init() {
    this.bindEvents();
    this.renderStampsCatalog();
    this.renderPapersCatalog();
    this.renderStickersTray();
    this.renderInspirationCards();
    this.renderWaxColorSwatches();
    this.updateEnvelopePreview();
    this.updateSealPreview();
    this.updateDraftsList();
    this.updateSentList();

    // Check URL route for direct letter links (#letter/<token>)
    this.handleRoute();
    window.addEventListener('hashchange', () => this.handleRoute());

    // Auto-load draft if exists
    const savedDraft = window.amoretteBackend.loadDraft();
    if (savedDraft && !window.location.hash.includes('letter')) {
      this.populateDraft(savedDraft);
    }
  }

  // =========================================================================
  // ROUTING & SCREEN NAVIGATION
  // =========================================================================
  async handleRoute() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#letter/')) {
      const token = hash.replace('#letter/', '').trim();
      if (token) {
        await this.loadRecipientLetter(token);
        return;
      }
    }
    this.showScreen('screenDesk');
  }

  showScreen(screenId) {
    document.querySelectorAll('.amorette-screen').forEach(el => el.classList.remove('active'));
    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add('active');
      this.currentScreen = screenId;
    }

    const header = document.getElementById('headerWrapper');
    if (!header) return;

    header.classList.remove('compact', 'quiet');

    if (screenId === 'screenDesk') {
      // Full size header
    } else if (['screenEnvelope', 'screenStamp', 'screenPaper', 'screenEditor', 'screenPreview'].includes(screenId)) {
      // Slim compact header during writing steps
      header.classList.add('compact');
    } else if (screenId === 'screenRecipient') {
      // Quiet minimal header so the letter remains the star
      header.classList.add('quiet');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // =========================================================================
  // DOM EVENT BINDINGS
  // =========================================================================
  bindEvents() {
    // Header definition card -> return to desk
    const headerCard = document.getElementById('brandHeaderCard');
    if (headerCard) {
      headerCard.addEventListener('click', () => {
        if (this.currentScreen !== 'screenDesk') {
          this.showScreen('screenDesk');
          this.updateDraftsList();
        }
      });
    }

    // Audio Mute Toggle
    const audioBtn = document.getElementById('audioToggleBtn');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        const isMuted = window.amoretteAudio.toggleMute();
        this.updateAudioIcons(isMuted);
      });
      this.updateAudioIcons(window.amoretteAudio.isMuted());
    }

    // Supabase Settings Modal
    const dbBtn = document.getElementById('dbSettingsBtn');
    const dbModal = document.getElementById('supabaseConfigModal');
    const closeDbModal = document.getElementById('closeDbModalBtn');
    const saveDbConfigBtn = document.getElementById('saveDbConfigBtn');
    const clearDbConfigBtn = document.getElementById('clearDbConfigBtn');

    if (dbBtn && dbModal) {
      dbBtn.addEventListener('click', () => {
        document.getElementById('supabaseUrlInput').value = window.amoretteBackend.supabaseUrl;
        document.getElementById('supabaseKeyInput').value = window.amoretteBackend.supabaseKey;
        dbModal.style.display = 'flex';
      });
      closeDbModal.addEventListener('click', () => dbModal.style.display = 'none');
      saveDbConfigBtn.addEventListener('click', () => {
        const url = document.getElementById('supabaseUrlInput').value;
        const key = document.getElementById('supabaseKeyInput').value;
        window.amoretteBackend.setConfig(url, key);
        dbModal.style.display = 'none';
        alert('Supabase settings saved!');
      });
      clearDbConfigBtn.addEventListener('click', () => {
        window.amoretteBackend.clearConfig();
        document.getElementById('supabaseUrlInput').value = '';
        document.getElementById('supabaseKeyInput').value = '';
        dbModal.style.display = 'none';
      });
    }

    // Desk Action Buttons
    document.getElementById('startLetterBtn')?.addEventListener('click', () => {
      window.amoretteAudio.playPaperRustle();
      this.showScreen('screenEnvelope');
    });

    document.getElementById('startPostcardBtn')?.addEventListener('click', () => {
      window.amoretteAudio.playPaperRustle();
      this.selectPaper('postcard_cardstock');
      this.showScreen('screenEditor');
    });

    // Desk Interactive Objects
    document.getElementById('deskEnvelopeStack')?.addEventListener('click', () => {
      window.amoretteAudio.playPaperRustle();
      this.showScreen('screenEnvelope');
    });
    document.getElementById('deskStampObject')?.addEventListener('click', () => {
      window.amoretteAudio.playStampThud();
      this.showScreen('screenStamp');
    });
    document.getElementById('deskPenObject')?.addEventListener('click', () => {
      window.amoretteAudio.playPenScratch();
      this.showScreen('screenEditor');
    });

    // Envelope Screen Inputs
    document.querySelectorAll('[data-env-style]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('[data-env-style]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.letterState.envelopeStyle = btn.getAttribute('data-env-style');
        this.updateEnvelopePreview();
        window.amoretteAudio.playPaperRustle(0.6);
      });
    });

    const recipNameInput = document.getElementById('inputRecipientName');
    recipNameInput?.addEventListener('input', (e) => {
      this.letterState.recipientName = e.target.value || 'Sofia';
      document.getElementById('envRecipientNamePreview').textContent = `Dear ${this.letterState.recipientName},`;
      document.getElementById('letterGreetingField').textContent = `Dearest ${this.letterState.recipientName},`;
      this.autosaveDraft();
    });

    const recipAddrInput = document.getElementById('inputRecipientAddress');
    recipAddrInput?.addEventListener('input', (e) => {
      this.letterState.recipientAddress = e.target.value;
      document.getElementById('envRecipientAddressPreview').textContent = e.target.value;
      this.autosaveDraft();
    });

    const senderNameInput = document.getElementById('inputSenderName');
    senderNameInput?.addEventListener('input', (e) => {
      this.letterState.senderName = e.target.value;
      document.getElementById('envSenderReturn').textContent = `From: ${e.target.value}`;
      this.autosaveDraft();
    });

    document.getElementById('envStampSlot')?.addEventListener('click', () => {
      this.showScreen('screenStamp');
    });

    document.getElementById('envBackBtn')?.addEventListener('click', () => this.showScreen('screenDesk'));
    document.getElementById('envNextBtn')?.addEventListener('click', () => this.showScreen('screenStamp'));

    // Stamp Screen
    document.getElementById('stampBackBtn')?.addEventListener('click', () => this.showScreen('screenEnvelope'));
    document.getElementById('stampNextBtn')?.addEventListener('click', () => this.showScreen('screenPaper'));

    // Paper Screen
    document.getElementById('paperBackBtn')?.addEventListener('click', () => this.showScreen('screenStamp'));
    document.getElementById('paperNextBtn')?.addEventListener('click', () => this.showScreen('screenEditor'));

    // Editor Toolbar Controls
    document.getElementById('fontSelect')?.addEventListener('change', (e) => {
      this.letterState.fontFamily = e.target.value;
      document.getElementById('letterBodyField').style.fontFamily = e.target.value;
      this.autosaveDraft();
    });

    document.getElementById('inkColorSelect')?.addEventListener('change', (e) => {
      this.letterState.inkColor = e.target.value;
      document.getElementById('letterPaperSheet').style.color = e.target.value;
      this.autosaveDraft();
    });

    document.getElementById('fontSizeSelect')?.addEventListener('change', (e) => {
      this.letterState.fontSize = e.target.value;
      document.getElementById('letterBodyField').style.fontSize = e.target.value;
    });

    document.getElementById('lineHeightSelect')?.addEventListener('change', (e) => {
      this.letterState.lineHeight = e.target.value;
      document.getElementById('letterBodyField').style.lineHeight = e.target.value;
    });

    // Inspiration Drawer Toggle
    const inspBtn = document.getElementById('inspirationPromptBtn');
    const inspDrawer = document.getElementById('inspirationDrawer');
    inspBtn?.addEventListener('click', () => {
      inspDrawer.style.display = inspDrawer.style.display === 'none' ? 'block' : 'none';
    });
    document.getElementById('closeInspirationBtn')?.addEventListener('click', () => {
      inspDrawer.style.display = 'none';
    });

    // Add Polaroid Button
    document.getElementById('addPolaroidBtn')?.addEventListener('click', () => {
      this.addPolaroidPhoto();
    });

    // Editable fields listener for autosave & sound
    const editableFields = ['letterDateField', 'letterGreetingField', 'letterBodyField', 'letterSignoffField', 'letterSenderField', 'letterPsField'];
    editableFields.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => {
          if (Math.random() > 0.8) window.amoretteAudio.playPenScratch();
          this.autosaveDraft();
        });
      }
    });

    document.getElementById('editorBackBtn')?.addEventListener('click', () => this.showScreen('screenPaper'));
    document.getElementById('editorNextBtn')?.addEventListener('click', () => {
      this.updateSealPreview();
      this.showScreen('screenPreview');
    });

    // Preview / Seal Screen
    document.querySelectorAll('#waxEmblemPicker button').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#waxEmblemPicker button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.letterState.waxEmblem = btn.getAttribute('data-emblem');
        const initialsGroup = document.getElementById('initialsInputGroup');
        if (initialsGroup) {
          initialsGroup.style.display = this.letterState.waxEmblem === 'initials' ? 'block' : 'none';
        }
        this.updateSealPreview();
      });
    });

    document.getElementById('inputSealInitials')?.addEventListener('input', (e) => {
      this.letterState.waxInitials = e.target.value.toUpperCase() || 'A';
      this.updateSealPreview();
    });

    document.getElementById('sealShapeOvalBtn')?.addEventListener('click', () => {
      this.letterState.waxShape = 'oval';
      document.getElementById('sealShapeOvalBtn').classList.add('active');
      document.getElementById('sealShapeRoundBtn').classList.remove('active');
      this.updateSealPreview();
    });

    document.getElementById('sealShapeRoundBtn')?.addEventListener('click', () => {
      this.letterState.waxShape = 'round';
      document.getElementById('sealShapeRoundBtn').classList.add('active');
      document.getElementById('sealShapeOvalBtn').classList.remove('active');
      this.updateSealPreview();
    });

    document.getElementById('previewBackBtn')?.addEventListener('click', () => this.showScreen('screenEditor'));
    document.getElementById('previewSealBtn')?.addEventListener('click', () => this.startSealingCeremony());

    // Sealing Screen: Pour & Seal Button
    document.getElementById('pourWaxBtn')?.addEventListener('click', () => this.executeWaxPourAndStamp());

    document.getElementById('proceedToSendBtn')?.addEventListener('click', () => this.finishSealingAndGoToSend());

    // Send Screen Buttons
    document.getElementById('copyShareLinkBtn')?.addEventListener('click', () => {
      const input = document.getElementById('shareLinkInput');
      input.select();
      navigator.clipboard.writeText(input.value);
      const btn = document.getElementById('copyShareLinkBtn');
      btn.textContent = 'copied! ✓';
      setTimeout(() => btn.textContent = 'copy link', 2200);
    });

    document.getElementById('shareWhatsAppBtn')?.addEventListener('click', () => {
      const link = document.getElementById('shareLinkInput').value;
      const text = encodeURIComponent(`I wrote a letter for you on Amorette:\n${link}`);
      window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    });

    document.getElementById('shareTelegramBtn')?.addEventListener('click', () => {
      const link = document.getElementById('shareLinkInput').value;
      const text = encodeURIComponent(`A letter for you on Amorette:`);
      window.open(`https://t.me/share/url?url=${encodeURIComponent(link)}&text=${text}`, '_blank');
    });

    document.getElementById('shareMessengerBtn')?.addEventListener('click', () => {
      const link = document.getElementById('shareLinkInput').value;
      window.open(`fb-messenger://share/?link=${encodeURIComponent(link)}`, '_blank');
    });

    document.getElementById('shareEmailBtn')?.addEventListener('click', () => {
      const link = document.getElementById('shareLinkInput').value;
      const subject = encodeURIComponent(`A letter for you: ${this.letterState.recipientName}`);
      const body = encodeURIComponent(`Dearest ${this.letterState.recipientName},\n\nI have folded and sealed a digital letter for you.\nOpen your letter here: ${link}\n\nWith affection,\n${this.letterState.senderName}`);
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    });

    document.getElementById('viewAsRecipientBtn')?.addEventListener('click', () => {
      if (this.activeToken) {
        window.location.hash = `#letter/${this.activeToken}`;
      }
    });

    document.getElementById('returnDeskBtn')?.addEventListener('click', () => {
      this.showScreen('screenDesk');
      this.updateSentList();
    });

    // Recipient Screen: Claim Mail Button
    document.getElementById('claimMailBtn')?.addEventListener('click', () => {
      this.playRecipientOpeningSequence();
    });

    // Recipient Screen Reactions
    document.querySelectorAll('.reaction-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const emoji = btn.getAttribute('data-emoji');
        this.triggerReaction(emoji, e.clientX, e.clientY);
      });
    });

    // Recipient Action Buttons
    document.getElementById('recipReplyBtn')?.addEventListener('click', () => {
      // Swap sender & recipient and start writing reply
      const prevRecipient = this.letterState.recipientName;
      this.letterState.recipientName = this.letterState.senderName;
      this.letterState.senderName = prevRecipient;
      document.getElementById('inputRecipientName').value = this.letterState.recipientName;
      document.getElementById('inputSenderName').value = this.letterState.senderName;
      document.getElementById('letterGreetingField').textContent = `Dearest ${this.letterState.recipientName},`;
      document.getElementById('letterBodyField').textContent = `In response to your lovely words...\n\n`;
      this.showScreen('screenEditor');
    });

    document.getElementById('recipReplayBtn')?.addEventListener('click', () => {
      this.resetRecipientAnimation();
    });

    document.getElementById('recipPrintBtn')?.addEventListener('click', () => {
      window.print();
    });
  }

  updateAudioIcons(isMuted) {
    const onIcon = document.getElementById('soundOnIcon');
    const offIcon = document.getElementById('soundOffIcon');
    if (onIcon && offIcon) {
      onIcon.style.display = isMuted ? 'none' : 'block';
      offIcon.style.display = isMuted ? 'block' : 'none';
    }
  }

  // =========================================================================
  // CATALOG RENDERING
  // =========================================================================
  renderStampsCatalog() {
    const grid = document.getElementById('stampsGridContainer');
    if (!grid || !window.STAMPS_CATALOG) return;

    grid.innerHTML = window.STAMPS_CATALOG.map(stamp => `
      <div class="stamp-album-card ${stamp.id === this.letterState.stampId ? 'selected' : ''}" data-stamp-card="${stamp.id}">
        <div style="transform: scale(0.85); transform-origin: top center; height: 130px;">
          ${window.renderCompleteStamp(stamp.id, true)}
        </div>
        <div class="stamp-album-name">${stamp.name}</div>
        <div class="stamp-album-origin">${stamp.denomination}</div>
      </div>
    `).join('');

    grid.querySelectorAll('[data-stamp-card]').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-stamp-card');
        this.selectStamp(id);
      });
    });
  }

  selectStamp(stampId) {
    this.letterState.stampId = stampId;
    window.amoretteAudio.playStampThud();
    document.querySelectorAll('[data-stamp-card]').forEach(c => {
      c.classList.toggle('selected', c.getAttribute('data-stamp-card') === stampId);
    });
    this.updateEnvelopePreview();
    this.autosaveDraft();
  }

  renderPapersCatalog() {
    const grid = document.getElementById('papersGridContainer');
    if (!grid || !window.PAPER_STYLES) return;

    grid.innerHTML = window.PAPER_STYLES.map(paper => `
      <div class="stamp-album-card ${paper.id === this.letterState.paperStyle ? 'selected' : ''}" data-paper-card="${paper.id}">
        <div style="width: 100%; height: 90px; background: ${paper.bgColor}; border-radius: 4px; border: 1px solid rgba(0,0,0,0.1); margin-bottom: 8px; display: flex; align-items: center; justify-content: center; box-shadow: inset 0 0 10px rgba(0,0,0,0.05);">
          <span style="font-family: var(--font-handwriting); font-size: 15px; color: ${paper.textColor};">Amorette Letter</span>
        </div>
        <div class="stamp-album-name">${paper.name}</div>
      </div>
    `).join('');

    grid.querySelectorAll('[data-paper-card]').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-paper-card');
        this.selectPaper(id);
      });
    });
  }

  selectPaper(paperId) {
    this.letterState.paperStyle = paperId;
    window.amoretteAudio.playPaperRustle(0.7);
    document.querySelectorAll('[data-paper-card]').forEach(c => {
      c.classList.toggle('selected', c.getAttribute('data-paper-card') === paperId);
    });

    const paperDef = window.PAPER_STYLES.find(p => p.id === paperId);
    const paperSheet = document.getElementById('letterPaperSheet');
    if (paperSheet && paperDef) {
      paperSheet.className = `letter-paper-sheet ${paperDef.styleClass}`;
      paperSheet.style.backgroundColor = paperDef.bgColor;
      if (paperDef.fontDefault) {
        this.letterState.fontFamily = paperDef.fontDefault;
        document.getElementById('fontSelect').value = paperDef.fontDefault;
        document.getElementById('letterBodyField').style.fontFamily = paperDef.fontDefault;
      }
    }
    this.autosaveDraft();
  }

  renderStickersTray() {
    const shelf = document.getElementById('stickersTrayContainer');
    if (!shelf || !window.STICKERS_COLLECTION) return;

    shelf.innerHTML = window.STICKERS_COLLECTION.map(sticker => `
      <button class="sticker-item-btn" data-sticker-id="${sticker.id}" title="${sticker.name}">
        ${sticker.svg}
      </button>
    `).join('') + `
      <!-- Washi tape quick additions -->
      <button class="btn-secondary" id="addWashiBtn" style="padding: 4px 10px; font-size: 11px; margin-left: 10px;">+ washi tape</button>
    `;

    shelf.querySelectorAll('[data-sticker-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-sticker-id');
        this.addStickerToPaper(id);
      });
    });

    document.getElementById('addWashiBtn')?.addEventListener('click', () => {
      this.addWashiTapeToPaper();
    });
  }

  renderInspirationCards() {
    const list = document.getElementById('inspirationCardsList');
    if (!list || !window.INSPIRATION_PROMPTS) return;

    list.innerHTML = window.INSPIRATION_PROMPTS.map(item => `
      <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 10px; cursor: pointer; transition: background 0.2s;" data-insp-prompt="${encodeURIComponent(item.prompt)}">
        <div style="font-size: 11px; color: var(--antique-gold); font-weight: 600;">${item.theme} • ${item.title}</div>
        <div style="font-size: 12px; color: var(--warm-ivory); margin-top: 4px; font-style: italic;">"${item.prompt}"</div>
      </div>
    `).join('');

    list.querySelectorAll('[data-insp-prompt]').forEach(item => {
      item.addEventListener('click', () => {
        const prompt = decodeURIComponent(item.getAttribute('data-insp-prompt'));
        const body = document.getElementById('letterBodyField');
        if (body) {
          body.textContent = (body.textContent ? body.textContent + '\n\n' : '') + prompt;
          this.autosaveDraft();
          window.amoretteAudio.playPenScratch();
        }
        document.getElementById('inspirationDrawer').style.display = 'none';
      });
    });
  }

  renderWaxColorSwatches() {
    const picker = document.getElementById('waxColorPicker');
    if (!picker || !window.WAX_COLORS) return;

    picker.innerHTML = Object.values(window.WAX_COLORS).map(wc => `
      <button class="color-swatch-btn ${wc.id === this.letterState.waxColor ? 'active' : ''}" 
        data-wax-color="${wc.id}" 
        style="background: ${wc.base};" 
        title="${wc.name}">
      </button>
    `).join('');

    picker.querySelectorAll('[data-wax-color]').forEach(btn => {
      btn.addEventListener('click', () => {
        picker.querySelectorAll('.color-swatch-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.letterState.waxColor = btn.getAttribute('data-wax-color');
        this.updateSealPreview();
      });
    });
  }

  // =========================================================================
  // DECORATIONS: STICKERS, WASHI TAPE & POLAROIDS
  // =========================================================================
  addStickerToPaper(stickerId) {
    const stickerDef = window.STICKERS_COLLECTION.find(s => s.id === stickerId);
    if (!stickerDef) return;

    const layer = document.getElementById('paperDecorationsLayer');
    const el = document.createElement('div');
    el.className = 'dropped-sticker';
    
    // Position randomly on lower/side margins of paper
    const left = Math.floor(20 + Math.random() * 460);
    const top = Math.floor(400 + Math.random() * 240);
    const rot = Math.floor(Math.random() * 24 - 12);

    el.style.left = `${left}px`;
    el.style.top = `${top}px`;
    el.style.transform = `rotate(${rot}deg)`;
    el.innerHTML = stickerDef.svg;

    // Click to remove or drag
    el.title = 'Double click to remove';
    el.addEventListener('dblclick', () => el.remove());
    this.makeDraggable(el);

    layer.appendChild(el);
    window.amoretteAudio.playPaperRustle(0.4);
    this.autosaveDraft();
  }

  addWashiTapeToPaper() {
    const layer = document.getElementById('paperDecorationsLayer');
    const el = document.createElement('div');
    el.className = 'washi-tape-strip';

    const tapes = window.WASHI_TAPES;
    const tape = tapes[Math.floor(Math.random() * tapes.length)];

    const left = Math.floor(40 + Math.random() * 420);
    const top = Math.floor(50 + Math.random() * 500);
    const rot = Math.floor(Math.random() * 16 - 8);

    el.style.left = `${left}px`;
    el.style.top = `${top}px`;
    el.style.transform = `rotate(${rot}deg)`;
    el.style.background = tape.background;

    el.title = 'Double click to remove';
    el.addEventListener('dblclick', () => el.remove());
    this.makeDraggable(el);

    layer.appendChild(el);
    window.amoretteAudio.playPaperRustle(0.3);
    this.autosaveDraft();
  }

  addPolaroidPhoto() {
    const layer = document.getElementById('paperDecorationsLayer');
    const left = Math.floor(30 + Math.random() * 160);
    const top = Math.floor(420 + Math.random() * 180);
    const rot = Math.floor(Math.random() * 10 - 5);

    const polaroid = window.createPolaroidElement({
      rotation: rot,
      left: left,
      top: top,
      caption: 'a moment I hold dear'
    });

    this.makeDraggable(polaroid);
    layer.appendChild(polaroid);
    window.amoretteAudio.playPaperRustle(0.5);
    this.autosaveDraft();
  }

  makeDraggable(element) {
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    const onMouseDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.isContentEditable) return;
      isDragging = true;
      startX = e.clientX || e.touches?.[0].clientX;
      startY = e.clientY || e.touches?.[0].clientY;
      initialLeft = parseFloat(element.style.left) || 0;
      initialTop = parseFloat(element.style.top) || 0;
      element.style.zIndex = '50';

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('touchmove', onMouseMove);
      document.addEventListener('touchend', onMouseUp);
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const clientX = e.clientX || e.touches?.[0].clientX;
      const clientY = e.clientY || e.touches?.[0].clientY;
      const dx = clientX - startX;
      const dy = clientY - startY;
      element.style.left = `${initialLeft + dx}px`;
      element.style.top = `${initialTop + dy}px`;
    };

    const onMouseUp = () => {
      isDragging = false;
      element.style.zIndex = '20';
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchmove', onMouseMove);
      document.removeEventListener('touchend', onMouseUp);
      this.autosaveDraft();
    };

    element.addEventListener('mousedown', onMouseDown);
    element.addEventListener('touchstart', onMouseDown, { passive: true });
  }

  // =========================================================================
  // PREVIEWS & RENDERING
  // =========================================================================
  updateEnvelopePreview() {
    const box = document.getElementById('previewEnvelopeBox');
    const stampSlot = document.getElementById('envStampSlot');
    if (!box) return;

    const envStyle = window.ENVELOPE_STYLES.find(e => e.id === this.letterState.envelopeStyle) || window.ENVELOPE_STYLES[0];

    // Reset styles
    box.className = 'envelope-3d-box';
    box.style.border = envStyle.border || 'none';
    box.style.backgroundColor = envStyle.color;

    if (envStyle.id === 'airmail_vintage') {
      box.classList.add('airmail-style');
    }

    const frontFace = document.getElementById('envelopeFrontFace');
    if (frontFace) {
      frontFace.style.color = envStyle.textColor;
      document.getElementById('envRecipientNamePreview').style.color = envStyle.textColor === '#FAF3E8' ? '#DFC27D' : '#8E1B2E';
    }

    // Affix stamp
    if (stampSlot && this.letterState.stampId) {
      stampSlot.innerHTML = window.renderCompleteStamp(this.letterState.stampId, true);
    }
  }

  updateSealPreview() {
    const container = document.getElementById('sealInteractivePreview');
    if (!container) return;

    container.innerHTML = window.renderWaxSealSVG({
      color: this.letterState.waxColor,
      emblem: this.letterState.waxEmblem,
      initials: this.letterState.waxInitials,
      shape: this.letterState.waxShape,
      size: 130
    });
  }

  // =========================================================================
  // CEREMONIES: SEALING & OPENING
  // =========================================================================
  startSealingCeremony() {
    this.showScreen('screenSealing');
    this.isSealingInProgress = true;

    const letterModel = document.getElementById('sealingLetterModel');
    const envModel = document.getElementById('sealingEnvelopeModel');
    const flap = document.getElementById('sealingFlap');
    const puddle = document.getElementById('sealingPuddle');
    const finalSeal = document.getElementById('sealingFinalWaxSeal');
    const actionArea = document.getElementById('waxActionArea');
    const completeArea = document.getElementById('sealingCompleteArea');

    // Reset elements
    puddle.classList.remove('poured');
    finalSeal.style.opacity = '0';
    finalSeal.style.transform = 'scale(1.6)';
    actionArea.style.display = 'none';
    completeArea.style.display = 'none';
    flap.classList.add('open');

    // Step 1: Letter folding in thirds
    document.getElementById('sealingStepTitle').textContent = 'Folding your letter...';
    document.getElementById('sealingStepSubtitle').textContent = 'The parchment folds into thirds with care.';
    window.amoretteAudio.playPaperRustle(0.9);

    letterModel.style.transform = 'rotateX(50deg) scale(0.85)';

    setTimeout(() => {
      // Step 2: Letter slides into envelope
      document.getElementById('sealingStepTitle').textContent = 'Sliding into envelope...';
      envModel.style.opacity = '1';
      envModel.style.backgroundColor = window.ENVELOPE_STYLES.find(e => e.id === this.letterState.envelopeStyle)?.color || '#4A0E1E';
      envModel.style.transform = 'translateY(0) scale(1)';

      setTimeout(() => {
        letterModel.style.transform = 'translateY(30px) scale(0.65)';
        letterModel.style.opacity = '0';
        window.amoretteAudio.playPaperRustle(0.6);

        // Step 3: Flap closes with 3D flip
        setTimeout(() => {
          document.getElementById('sealingStepTitle').textContent = 'Closing envelope flap...';
          flap.classList.remove('open');
          window.amoretteAudio.playPaperRustle(0.7);

          // Step 4: Show Wax Spoon & Pour Button
          setTimeout(() => {
            document.getElementById('sealingStepTitle').textContent = 'Affix your wax seal';
            document.getElementById('sealingStepSubtitle').textContent = 'Press to pour warm wax and stamp your emblem.';
            actionArea.style.display = 'block';
          }, 800);
        }, 800);
      }, 700);
    }, 1100);
  }

  executeWaxPourAndStamp() {
    const puddle = document.getElementById('sealingPuddle');
    const finalSeal = document.getElementById('sealingFinalWaxSeal');
    const actionArea = document.getElementById('waxActionArea');
    const completeArea = document.getElementById('sealingCompleteArea');

    actionArea.style.display = 'none';

    // Molten wax pours
    window.amoretteAudio.playWaxPour();
    puddle.classList.add('poured');
    puddle.style.background = window.WAX_COLORS[this.letterState.waxColor]?.base || '#8E1B2E';

    // Brass seal stamps down with squish & settle
    setTimeout(() => {
      window.amoretteAudio.playSealPress();
      finalSeal.innerHTML = window.renderWaxSealSVG({
        color: this.letterState.waxColor,
        emblem: this.letterState.waxEmblem,
        initials: this.letterState.waxInitials,
        shape: this.letterState.waxShape,
        size: 110
      });
      finalSeal.style.opacity = '1';
      finalSeal.style.transform = 'scale(1)';

      setTimeout(() => {
        window.amoretteAudio.playChime();
        document.getElementById('sealingStepTitle').textContent = 'Sealed with devotion.';
        document.getElementById('sealingStepSubtitle').textContent = 'Your wax seal is pressed firmly into the velvet fold.';
        completeArea.style.display = 'block';
      }, 600);
    }, 650);
  }

  async finishSealingAndGoToSend() {
    // Gather all letter fields
    this.extractEditorContent();

    // Save to backend (Supabase + Local fallback)
    const result = await window.amoretteBackend.saveLetter(this.letterState);
    if (result && result.success) {
      this.activeToken = result.token;
      this.letterState.token = result.token;

      // Construct shareable link
      const link = `${window.location.origin}${window.location.pathname}#letter/${this.activeToken}`;
      document.getElementById('shareLinkInput').value = link;

      // Clear draft since letter is sent
      window.amoretteBackend.clearDraft();
      this.updateDraftsList();
      this.updateSentList();

      this.showScreen('screenSend');
    }
  }

  extractEditorContent() {
    this.letterState.dateText = document.getElementById('letterDateField')?.textContent || '';
    this.letterState.greetingText = document.getElementById('letterGreetingField')?.textContent || '';
    this.letterState.bodyText = document.getElementById('letterBodyField')?.textContent || '';
    this.letterState.signoffText = document.getElementById('letterSignoffField')?.textContent || '';
    this.letterState.senderSignText = document.getElementById('letterSenderField')?.textContent || '';
    this.letterState.psText = document.getElementById('letterPsField')?.textContent || '';
    this.letterState.passcode = document.getElementById('inputPasscode')?.value || '';
    this.letterState.openWhenLabel = document.getElementById('openWhenSelect')?.value || '';

    // Capture user decorations (stickers, washi, polaroids)
    const decLayer = document.getElementById('paperDecorationsLayer');
    if (decLayer) {
      this.letterState.decorationsHtml = decLayer.innerHTML;
    }
  }

  // =========================================================================
  // RECIPIENT "YOU GOT A MAIL!" CEREMONY (Video Match)
  // =========================================================================
  async loadRecipientLetter(token) {
    const letter = await window.amoretteBackend.getLetter(token);
    if (!letter) {
      alert('Letter not found or expired.');
      this.showScreen('screenDesk');
      return;
    }

    this.activeRecipientLetter = letter;
    this.showScreen('screenRecipient');

    // Setup Envelope Details
    const envStyle = window.ENVELOPE_STYLES.find(e => e.id === letter.envelope_config?.id) || window.ENVELOPE_STYLES[0];
    const env3D = document.getElementById('recipientEnvelope3D');
    env3D.style.backgroundColor = envStyle.color;
    env3D.className = 'envelope-3d-box' + (envStyle.id === 'airmail_vintage' ? ' airmail-style' : '');

    document.getElementById('recipSenderReturn').textContent = `From: ${letter.sender_name || 'Mon Cher'}`;
    document.getElementById('recipRecipientName').textContent = `Dear ${letter.recipient_name || 'You'},`;
    document.getElementById('recipRecipientAddress').textContent = letter.open_when_label || 'A sealed token for you';
    document.getElementById('recipStampSlot').innerHTML = window.renderCompleteStamp(letter.stamp_id, true);

    // Setup Wax Seal on Back Face
    const sealHolder = document.getElementById('recipientWaxSealHolder');
    sealHolder.innerHTML = window.renderWaxSealSVG({
      color: letter.seal_config?.color || 'burgundy',
      emblem: letter.seal_config?.emblem || 'lavender',
      initials: letter.seal_config?.initials || 'A',
      shape: letter.seal_config?.shape || 'oval',
      size: 90
    });

    // Populate the Paper content inside the pinned board scene
    document.getElementById('recipDateField').textContent = letter.content?.dateText || 'November 23, 2026';
    document.getElementById('recipGreetingField').textContent = letter.content?.greetingText || `Dearest ${letter.recipient_name},`;
    document.getElementById('recipBodyField').textContent = letter.content?.bodyText || '';
    document.getElementById('recipSignoffField').textContent = letter.content?.signoffText || 'With love,';
    document.getElementById('recipSenderField').textContent = letter.content?.senderSignText || letter.sender_name;
    document.getElementById('recipPsField').textContent = letter.content?.psText || '';

    // Apply paper style
    const paperDef = window.PAPER_STYLES.find(p => p.id === letter.paper_config?.id);
    const recipSheet = document.getElementById('recipientPaperSheet');
    if (recipSheet && paperDef) {
      recipSheet.className = `letter-paper-sheet ${paperDef.styleClass}`;
      recipSheet.style.backgroundColor = paperDef.bgColor;
    }

    // Play initial slide down sound
    window.amoretteAudio.playPaperRustle(0.7);
  }

  playRecipientOpeningSequence() {
    // If passcode protected, verify first
    if (this.activeRecipientLetter?.passcode_hash) {
      const modal = document.getElementById('passcodePromptModal');
      modal.style.display = 'block';
      document.getElementById('submitPasscodeBtn').onclick = async () => {
        const entered = document.getElementById('recipientPasscodeInput').value;
        const hash = await window.amoretteBackend.hashPasscode(entered);
        if (hash === this.activeRecipientLetter.passcode_hash) {
          modal.style.display = 'none';
          this.executeOpeningCeremony();
        } else {
          alert('Incorrect passcode word.');
        }
      };
      return;
    }

    this.executeOpeningCeremony();
  }

  executeOpeningCeremony() {
    const claimBtn = document.getElementById('claimMailBtn');
    claimBtn.style.display = 'none';

    // Step 1: Envelope drops to center
    const envWrapper = document.getElementById('recipientEnvelopeWrapper');
    envWrapper.style.animation = 'none';
    envWrapper.style.transform = 'translateY(60px) scale(1.05)';
    window.amoretteAudio.playPaperRustle(0.5);

    // Step 2: Show back of envelope & crack seal
    setTimeout(() => {
      document.getElementById('recipientEnvelopeFront').style.display = 'none';
      document.getElementById('recipientEnvelopeBack').style.display = 'block';
      envWrapper.style.transform = 'translateY(60px) rotateY(180deg) scale(1.05)';

      setTimeout(() => {
        // Crack seal
        window.amoretteAudio.playSealCrack();
        const sealHolder = document.getElementById('recipientWaxSealHolder');
        sealHolder.style.transition = 'all 0.5s ease';
        sealHolder.style.transform = 'translateX(-50%) scale(1.15) rotate(5deg)';
        sealHolder.style.opacity = '0.3';

        // Step 3: Flap opens in 3D
        setTimeout(() => {
          document.getElementById('recipientEnvelopeFlap').classList.add('open');
          window.amoretteAudio.playPaperRustle(0.8);

          // Step 4: Reveal Pinned Board Scene
          setTimeout(() => {
            window.amoretteAudio.playChime();
            envWrapper.style.display = 'none';
            document.getElementById('pinnedBoardScene').classList.add('active');

            // Spawn cute scattered polaroids & confetti around letter on the board
            this.populateRecipientPinnedDecorations();
          }, 900);
        }, 600);
      }, 700);
    }, 600);
  }

  populateRecipientPinnedDecorations() {
    const layer = document.getElementById('recipDecorationsLayer');
    if (!layer) return;
    layer.innerHTML = '';

    if (this.activeRecipientLetter?.decorationsHtml) {
      layer.innerHTML = this.activeRecipientLetter.decorationsHtml;
      // Strip editing controls on recipient view
      layer.querySelectorAll('.polaroid-delete-btn, .polaroid-change-label').forEach(el => el.remove());
      layer.querySelectorAll('[contenteditable]').forEach(el => el.removeAttribute('contenteditable'));
    } else {
      // Add a couple of romantic sample tilted polaroids if none attached
      const polaroid1 = window.createPolaroidElement({
        rotation: -6,
        left: 10,
        top: 120,
        caption: 'our unforgettable day',
        imageUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=350&q=80'
      });
      polaroid1.querySelector('.polaroid-delete-btn')?.remove();
      polaroid1.querySelector('.polaroid-change-label')?.remove();

      const polaroid2 = window.createPolaroidElement({
        rotation: 8,
        left: 390,
        top: 240,
        caption: 'little moments of joy',
        imageUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=350&q=80'
      });
      polaroid2.querySelector('.polaroid-delete-btn')?.remove();
      polaroid2.querySelector('.polaroid-change-label')?.remove();

      layer.appendChild(polaroid1);
      layer.appendChild(polaroid2);
    }
  }

  resetRecipientAnimation() {
    document.getElementById('pinnedBoardScene').classList.remove('active');
    document.getElementById('recipientEnvelopeWrapper').style.display = 'block';
    document.getElementById('claimMailBtn').style.display = 'inline-block';
    document.getElementById('recipientEnvelopeFront').style.display = 'flex';
    document.getElementById('recipientEnvelopeBack').style.display = 'none';
    document.getElementById('recipientEnvelopeFlap').classList.remove('open');
    document.getElementById('recipientWaxSealHolder').style.opacity = '1';
    document.getElementById('recipientWaxSealHolder').style.transform = 'translateX(-50%)';
    const envWrapper = document.getElementById('recipientEnvelopeWrapper');
    envWrapper.style.animation = 'mailSlotEmerge 1.4s cubic-bezier(0.25, 1, 0.5, 1) forwards, pendulumSwing 3.5s ease-in-out infinite 1.4s';
  }

  triggerReaction(emoji, x = window.innerWidth / 2, y = window.innerHeight / 2) {
    window.amoretteAudio.playChime();

    // Floating emoji burst particles
    for (let i = 0; i < 7; i++) {
      const p = document.createElement('div');
      p.className = 'floating-reaction-particle';
      p.textContent = emoji;
      p.style.left = `${x + (Math.random() * 60 - 30)}px`;
      p.style.top = `${y + (Math.random() * 40 - 20)}px`;
      p.style.setProperty('--tx', `${Math.random() * 80 - 40}px`);
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 1800);
    }

    if (this.activeRecipientLetter?.token) {
      window.amoretteBackend.addReaction(this.activeRecipientLetter.token, emoji);
    }
  }

  // =========================================================================
  // DRAFTS & LOCAL STORAGE SYNC
  // =========================================================================
  autosaveDraft() {
    this.extractEditorContent();
    window.amoretteBackend.saveDraft(this.letterState);

    const pill = document.getElementById('draftPill');
    if (pill) {
      pill.classList.add('active');
      setTimeout(() => pill.classList.remove('active'), 1800);
    }
  }

  populateDraft(draft) {
    if (!draft) return;
    this.letterState = { ...this.letterState, ...draft };

    if (document.getElementById('inputRecipientName')) document.getElementById('inputRecipientName').value = this.letterState.recipientName;
    if (document.getElementById('inputRecipientAddress')) document.getElementById('inputRecipientAddress').value = this.letterState.recipientAddress;
    if (document.getElementById('inputSenderName')) document.getElementById('inputSenderName').value = this.letterState.senderName;
    if (document.getElementById('letterDateField')) document.getElementById('letterDateField').textContent = this.letterState.dateText;
    if (document.getElementById('letterGreetingField')) document.getElementById('letterGreetingField').textContent = this.letterState.greetingText;
    if (document.getElementById('letterBodyField')) document.getElementById('letterBodyField').textContent = this.letterState.bodyText;
    if (document.getElementById('letterSignoffField')) document.getElementById('letterSignoffField').textContent = this.letterState.signoffText;
    if (document.getElementById('letterSenderField')) document.getElementById('letterSenderField').textContent = this.letterState.senderSignText;
    if (document.getElementById('letterPsField')) document.getElementById('letterPsField').textContent = this.letterState.psText;

    this.updateEnvelopePreview();
    this.updateSealPreview();
  }

  updateDraftsList() {
    const container = document.getElementById('draftsListContainer');
    const countLabel = document.getElementById('draftsCountLabel');
    if (!container) return;

    const draft = window.amoretteBackend.loadDraft();
    if (draft && draft.recipientName) {
      countLabel.textContent = '1 draft';
      container.innerHTML = `
        <div class="draft-item" id="resumeDraftItem">
          <div>
            <strong>To: ${draft.recipientName}</strong>
            <div style="font-size: 10px; color: var(--rose-soft);">${draft.updated_at ? new Date(draft.updated_at).toLocaleTimeString() : 'recently'}</div>
          </div>
          <span style="color: var(--antique-gold);">resume →</span>
        </div>
      `;
      document.getElementById('resumeDraftItem')?.addEventListener('click', () => {
        this.populateDraft(draft);
        this.showScreen('screenEditor');
      });
    } else {
      countLabel.textContent = '0 drafts';
      container.innerHTML = `<p class="shelf-empty-state">No drafts yet. Every stroke you write is autosaved.</p>`;
    }
  }

  updateSentList() {
    const container = document.getElementById('sentLettersListContainer');
    const countLabel = document.getElementById('sentCountLabel');
    if (!container) return;

    const list = window.amoretteBackend.listSentLetters();
    countLabel.textContent = `${list.length} sent`;

    if (list.length === 0) {
      container.innerHTML = `<p class="shelf-empty-state">Your sent letters and delivery tokens will rest here.</p>`;
      return;
    }

    container.innerHTML = list.slice(0, 5).map(item => `
      <div class="draft-item" data-sent-token="${item.token}">
        <div>
          <strong>To: ${item.recipient_name}</strong>
          <div style="font-size: 10px; opacity: 0.7;">${new Date(item.created_at).toLocaleDateString()}</div>
        </div>
        <span style="color: var(--antique-gold);">view ✉</span>
      </div>
    `).join('');

    container.querySelectorAll('[data-sent-token]').forEach(el => {
      el.addEventListener('click', () => {
        const token = el.getAttribute('data-sent-token');
        window.location.hash = `#letter/${token}`;
      });
    });
  }
}

// Bootstrap Application
document.addEventListener('DOMContentLoaded', () => {
  window.amoretteApp = new AmoretteApp();
  window.amoretteApp.init();
});
