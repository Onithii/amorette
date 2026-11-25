/**
 * Amorette - Stationery, Envelopes, Papers, Stickers & Prompts Suite
 * Recreates Reference Image 4 (Embossed scalloped cream envelope)
 * and Reference Image 5 (Airmail red & blue striped vintage envelope),
 * along with paper styles, washi tapes, polaroids, and inspiration prompts.
 */

const ENVELOPE_STYLES = [
  {
    id: 'hero_burgundy',
    name: 'Royal Burgundy (Hero)',
    color: '#4A0E1E',
    flapType: 'pointed',
    textColor: '#F6EBDD',
    border: '1px solid rgba(201, 162, 75, 0.4)',
    lining: 'gold_stars',
    description: 'Deep wine velvet paper with gilded foil accents.'
  },
  {
    id: 'embossed_cream',
    name: 'Embossed Scalloped (Ref Image 4)',
    color: '#F9F5EC',
    flapType: 'scalloped_embossed',
    textColor: '#4A2C2A',
    border: '1px solid #E6DEC8',
    lining: 'vintage_floral',
    description: 'Off-white textured paper with ornate scalloped flap and embossed filigree.'
  },
  {
    id: 'airmail_vintage',
    name: 'Airmail Par Avion (Ref Image 5)',
    color: '#FAF3E7',
    flapType: 'airmail',
    textColor: '#1A2938',
    border: 'none',
    lining: 'airmail_pattern',
    description: 'Vintage cream envelope with classic red and blue diagonal striped borders.'
  },
  {
    id: 'blush_rose',
    name: 'Dusty Blush',
    color: '#F4D6DC',
    flapType: 'pointed',
    textColor: '#5A1B28',
    border: '1px solid #E8B6C1',
    lining: 'floral_rose',
    description: 'Romantic powdered rose with soft deckle edges.'
  },
  {
    id: 'butter_cream',
    name: 'Butter Yellow',
    color: '#F7EBC4',
    flapType: 'pointed',
    textColor: '#4E3A1A',
    border: '1px solid #E4D29C',
    lining: 'polka_dot',
    description: 'Warm honey cream paper with nostalgic warmth.'
  },
  {
    id: 'sage_garden',
    name: 'Sage Meadow',
    color: '#C7D6BB',
    flapType: 'pointed',
    textColor: '#273822',
    border: '1px solid #B0C4A1',
    lining: 'botanical_fern',
    description: 'Calm herbal sage with natural botanical flecks.'
  },
  {
    id: 'powder_blue',
    name: 'Powder Blue',
    color: '#C8DBED',
    flapType: 'square',
    textColor: '#1B3148',
    border: '1px solid #AFC8E0',
    lining: 'marbled_swirl',
    description: 'French pastel blue with clean square flap.'
  },
  {
    id: 'lavender_thistle',
    name: 'Lavender Thistle',
    color: '#DAD0EC',
    flapType: 'pointed',
    textColor: '#3A2758',
    border: '1px solid #C4B5E0',
    lining: 'floral_lavender',
    description: 'Ethereal purple thistle tone with soft linen finish.'
  },
  {
    id: 'vintage_kraft',
    name: 'Antique Kraft',
    color: '#CBB093',
    flapType: 'square',
    textColor: '#3A2818',
    border: '1px solid #B89977',
    lining: 'vintage_script',
    description: 'Aged parcel parchment with fibrous paper grain.'
  }
];

const PAPER_STYLES = [
  {
    id: 'lined_parchment',
    name: 'French Ruled Linen',
    bgColor: '#FAF4EB',
    lineColor: 'rgba(180, 150, 120, 0.35)',
    textColor: '#3A2722',
    fontDefault: 'Caveat',
    styleClass: 'paper-lined'
  },
  {
    id: 'antique_parchment',
    name: 'Aged Deckle Parchment',
    bgColor: '#F4E9D8',
    lineColor: 'transparent',
    textColor: '#2E1E1B',
    fontDefault: 'Homemade Apple',
    styleClass: 'paper-parchment'
  },
  {
    id: 'botanical_border',
    name: 'Romantic Floral Border',
    bgColor: '#FCF7F3',
    lineColor: 'rgba(210, 180, 180, 0.25)',
    textColor: '#401A24',
    fontDefault: 'Dancing Script',
    styleClass: 'paper-floral'
  },
  {
    id: 'minimal_ivory',
    name: 'Pure Minimal Ivory',
    bgColor: '#FFFDF9',
    lineColor: 'transparent',
    textColor: '#2B2523',
    fontDefault: 'Cormorant Garamond',
    styleClass: 'paper-minimal'
  },
  {
    id: 'blush_petal',
    name: 'Dusty Rose Petal',
    bgColor: '#FAF0F2',
    lineColor: 'rgba(215, 140, 160, 0.3)',
    textColor: '#5E1829',
    fontDefault: 'Pinyon Script',
    styleClass: 'paper-blush'
  },
  {
    id: 'filigree_corners',
    name: 'Neoclassical Filigree',
    bgColor: '#FAF5ED',
    lineColor: 'transparent',
    textColor: '#32231A',
    fontDefault: 'Playfair Display',
    styleClass: 'paper-filigree'
  },
  {
    id: 'dear_diary',
    name: 'Dear Diary Vintage',
    bgColor: '#F6EFE3',
    lineColor: 'rgba(160, 140, 120, 0.35)',
    textColor: '#2B231D',
    fontDefault: 'Reenie Beanie',
    styleClass: 'paper-diary'
  },
  {
    id: 'postcard_cardstock',
    name: 'Vintage Postcard',
    bgColor: '#F5ECE0',
    lineColor: 'transparent',
    textColor: '#2E221B',
    fontDefault: 'Nothing You Could Do',
    styleClass: 'paper-postcard'
  }
];

const STICKERS_COLLECTION = [
  {
    id: 'sticker_heart_gold',
    name: 'Gold Foil Heart',
    type: 'svg',
    svg: `<svg viewBox="0 0 40 40" width="40" height="40"><path d="M 20 34 C 8 24 4 14 12 8 C 18 3 20 10 20 10 C 20 10 22 3 28 8 C 36 14 32 24 20 34 Z" fill="#DFC27D" stroke="#A68334" stroke-width="1.5"/><circle cx="15" cy="11" r="1.5" fill="#FFF8E0"/></svg>`
  },
  {
    id: 'sticker_crimson_heart',
    name: 'Crimson Heart',
    type: 'svg',
    svg: `<svg viewBox="0 0 40 40" width="40" height="40"><path d="M 20 34 C 8 24 4 14 12 8 C 18 3 20 10 20 10 C 20 10 22 3 28 8 C 36 14 32 24 20 34 Z" fill="#8E1B2E" stroke="#5E0D1B" stroke-width="1.2"/><circle cx="15" cy="11" r="1.5" fill="#FFAEC0" opacity="0.6"/></svg>`
  },
  {
    id: 'sticker_velvet_bow',
    name: 'Rose Velvet Bow',
    type: 'svg',
    svg: `<svg viewBox="0 0 44 40" width="44" height="40"><path d="M 12 14 C 4 6 2 24 16 20 Z" fill="#C95B72"/><path d="M 32 14 C 40 6 42 24 28 20 Z" fill="#C95B72"/><circle cx="22" cy="17" r="4" fill="#8E1B2E"/><path d="M 20 20 Q 14 32 8 36 M 24 20 Q 30 32 36 36" stroke="#8E1B2E" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`
  },
  {
    id: 'sticker_cherries',
    name: 'Sweet Cherries',
    type: 'svg',
    svg: `<svg viewBox="0 0 40 40" width="40" height="40"><path d="M 20 6 Q 24 16 14 26 M 20 6 Q 28 16 28 26" stroke="#48682F" stroke-width="2" fill="none"/><circle cx="14" cy="27" r="7.5" fill="#991526"/><circle cx="28" cy="28" r="7.5" fill="#800F1F"/><circle cx="12" cy="24" r="2" fill="#FFAEC0" opacity="0.7"/></svg>`
  },
  {
    id: 'sticker_pressed_daisy',
    name: 'Pressed Daisy',
    type: 'svg',
    svg: `<svg viewBox="0 0 40 40" width="40" height="40"><g transform="translate(20,20)"><circle cx="0" cy="0" r="4.5" fill="#E8B832"/>${[0, 45, 90, 135, 180, 225, 270, 315].map(deg => `<ellipse cx="0" cy="-11" rx="2.8" ry="6.5" fill="#FAF6ED" stroke="#E0D2C0" stroke-width="0.6" transform="rotate(${deg})"/>`).join('')}</g></svg>`
  },
  {
    id: 'sticker_cute_cat',
    name: 'Sleeping Kitty',
    type: 'svg',
    svg: `<svg viewBox="0 0 44 40" width="44" height="40"><g transform="translate(22,22)"><ellipse cx="0" cy="2" rx="15" ry="11" fill="#E89B58"/><circle cx="-8" cy="-4" r="7.5" fill="#E89B58"/><polygon points="-13,-10 -9,-14 -8,-8" fill="#4A2F1E"/><polygon points="-7,-10 -3,-14 -4,-8" fill="#E89B58"/><path d="M -11,-3 Q -9,-1 -7,-3" stroke="#4A2F1E" stroke-width="1.2" fill="none"/><path d="M 12 6 C 18 6 18 -2 12 -4" stroke="#E89B58" stroke-width="2.5" fill="none"/></g></svg>`
  },
  {
    id: 'sticker_birthday_cake',
    name: 'Birthday Cake',
    type: 'svg',
    svg: `<svg viewBox="0 0 40 40" width="40" height="40"><rect x="10" y="20" width="20" height="13" rx="2" fill="#FAF3E6" stroke="#4A2C2A" stroke-width="1.2"/><path d="M 10 20 Q 15 24 20 20 Q 25 24 30 20" fill="#961E33"/><line x1="20" y1="20" x2="20" y2="12" stroke="#961E33" stroke-width="2"/><ellipse cx="20" cy="8" rx="2.5" ry="3.8" fill="#F7CA45"/></svg>`
  },
  {
    id: 'sticker_party_hat',
    name: 'Party Hat',
    type: 'svg',
    svg: `<svg viewBox="0 0 40 40" width="40" height="40"><polygon points="20,8 10,32 30,32" fill="#C95B72" stroke="#8E1B2E" stroke-width="1.2"/><circle cx="20" cy="7" r="3.2" fill="#DFC27D"/><line x1="13" y1="25" x2="27" y2="25" stroke="#DFC27D" stroke-width="2"/><circle cx="17" cy="18" r="1.5" fill="#FAF3E6"/><circle cx="23" cy="22" r="1.5" fill="#FAF3E6"/></svg>`
  },
  {
    id: 'sticker_gold_stars',
    name: 'Sparkle Stars',
    type: 'svg',
    svg: `<svg viewBox="0 0 40 40" width="40" height="40"><path d="M 20 6 L 22 16 L 32 18 L 23 23 L 26 33 L 18 26 L 10 31 L 15 22 L 7 17 L 17 15 Z" fill="#DFC27D"/><circle cx="31" cy="9" r="1.8" fill="#DFC27D"/></svg>`
  },
  {
    id: 'sticker_butterfly',
    name: 'Little Butterfly',
    type: 'svg',
    svg: `<svg viewBox="0 0 40 40" width="40" height="40"><g transform="translate(20,20)"><path d="M -1 -8 C -14 -18 -18 2 -2 3 Z" fill="#D6763D"/><path d="M 1 -8 C 14 -18 18 2 2 3 Z" fill="#D6763D"/><path d="M -1 3 C -10 10 -12 18 -2 12 Z" fill="#BA5522"/><path d="M 1 3 C 10 10 12 18 2 12 Z" fill="#BA5522"/><ellipse cx="0" cy="1" rx="1.5" ry="8" fill="#2E1C14"/></g></svg>`
  }
];

const WASHI_TAPES = [
  { id: 'washi_floral', name: 'Vintage Floral', background: 'linear-gradient(45deg, #F3D2D9 25%, #EAA9B8 25%, #EAA9B8 50%, #F3D2D9 50%, #F3D2D9 75%, #EAA9B8 75%, #EAA9B8 100%)', size: '12px 12px' },
  { id: 'washi_burgundy_gingham', name: 'Burgundy Gingham', background: 'repeating-linear-gradient(0deg, rgba(142, 27, 46, 0.35) 0px, rgba(142, 27, 46, 0.35) 6px, transparent 6px, transparent 12px), repeating-linear-gradient(90deg, rgba(142, 27, 46, 0.35) 0px, rgba(142, 27, 46, 0.35) 6px, transparent 6px, transparent 12px)', size: '100% 100%' },
  { id: 'washi_gold_stars', name: 'Gold Foil Stars', background: '#DFC27D', pattern: 'dots' },
  { id: 'washi_sage_stripe', name: 'Sage Diagonal', background: 'repeating-linear-gradient(135deg, #B5C9A7, #B5C9A7 8px, #C6D8B9 8px, #C6D8B9 16px)' },
  { id: 'washi_parchment_plain', name: 'Translucent Parchment', background: 'rgba(240, 226, 206, 0.72)' }
];

const INSPIRATION_PROMPTS = [
  {
    theme: 'Romantic',
    title: 'A quiet memory of us',
    prompt: 'I was thinking about that evening when we... and how effortlessly time seemed to slip away.'
  },
  {
    theme: 'Long Distance',
    title: 'Across the miles',
    prompt: 'Even with all the distance between us right now, you are still the first thing I think of when the morning quiet settles in.'
  },
  {
    theme: 'Friendship',
    title: 'Thank you for being my anchor',
    prompt: 'I rarely say it out loud, but having you in my corner makes the world feel infinitely lighter.'
  },
  {
    theme: 'Open When Sad',
    title: 'A warm blanket for your heart',
    prompt: 'Take a deep breath and let your shoulders drop. Whatever is weighing on you today will pass, and I am right here cheering for you.'
  },
  {
    theme: 'Birthday Celebration',
    title: 'Another year of your light',
    prompt: 'Happy birthday to the human who brings pure magic into ordinary rooms. Here is everything I love about your year ahead...'
  },
  {
    theme: 'Just Because',
    title: 'A little love note out of the blue',
    prompt: 'No special occasion, no grand news — just wanted to remind you that you are deeply adored.'
  }
];

const SIGN_OFF_SUGGESTIONS = [
  'With all my love,',
  'Yours truly,',
  'Always,',
  'Thinking of you,',
  'Forever and ever,',
  'Your favourite human,',
  'Until we meet again,',
  'With gentle hugs,'
];

window.ENVELOPE_STYLES = ENVELOPE_STYLES;
window.PAPER_STYLES = PAPER_STYLES;
window.STICKERS_COLLECTION = STICKERS_COLLECTION;
window.WASHI_TAPES = WASHI_TAPES;
window.INSPIRATION_PROMPTS = INSPIRATION_PROMPTS;
window.SIGN_OFF_SUGGESTIONS = SIGN_OFF_SUGGESTIONS;
