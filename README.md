# Amorette ✦ Digital Letter-Writing & Sealed Stationery

> **Amorette** (/ˈæm.ə.ɹɛt/ • *noun* — little love; beloved.)
> A romantic, tactile digital letter-writing web application. Design realistic envelopes, stamp them with engraved linocut stamps, pen your heart on creamy textured parchment, press molten wax seals, and share ceremonial unsealing experiences.

Built with **plain HTML, CSS, vanilla JavaScript (no framework)** and **Supabase** for backend persistence.

---

## ✦ Aesthetic & Reference Visuals

The entire visual identity is candlelit romance: a dark wine-colored chamber (`#2A0A12`) with warm ambient light, velvet texture, and antique gold accents. Against this dark room, the stationery itself remains realistic, tactile, and bright in warm ivory, cream, and blush.

### Reference Reproductions (from attached reference images):
1. **Wax Seal 1 (Burgundy Oval with Lavender Sprig)**: Rendered via layered SVG with `feTurbulence`, `feSpecularLighting`, and `feDiffuseLighting`, irregular melted outer lobes, inner bevel trench, and embossed lavender buds.
2. **Wax Seal 2 (Antique Gold Round Laurel)**: Neoclassical laurel wreath rim with warm specular highlights and melted gold puddle drips.
3. **Wax Seal 3 (Glossy Navy Leaf Branch)**: Deep midnight navy seal with glossy reflection arc and veined botanical leaflets.
4. **Envelope 4 (Embossed Cream Scalloped Flap)**: Textured off-white paper envelope with ornate die-cut scalloped flap and embossed filigree relief.
5. **Envelope 5 (Airmail Par Avion)**: Vintage cream paper envelope with alternating 45° diagonal red and navy blue striped borders.
6. **Stamp 6 (Apple Blossom 24¢ Engraved)**: Dark-blue field, hand-drawn apple blossom branch with pink petals, gold 24¢ denomination, "postage stamp" banner, and wavy postal cancellation mark.
7. **Stamp 7 (Sage Linocut Bird 15¢)**: Sage-green field, brown woodblock hummingbird with hatched feathers, asterisk mark, "15" denomination, and perforated edges.

---

## ✦ Features & Ceremonial Flow

1. **Top Brand Header (Dictionary Definition Card)**:
   - Line 1: **AMORETTE** (bold modern sans, wide letter-spacing).
   - Line 2: `/ˈæm.ə.ɹɛt/ • *noun* — little love; beloved.`
   - Interactive: clicking returns to the writing desk.
   - Automatically adapts: full size on Dashboard, slim compact during writing steps, and quiet on recipient opening.
2. **Desk Dashboard**:
   - Writing desk scene with stationery stack, inkwell & fountain pen, stamp cushion pad, and brass letterbox slot.
   - Quick actions: "write a letter" and "make a postcard".
   - Autosaved drafts list and sent letter archive.
3. **Envelope Studio**:
   - 3D CSS envelope preview with live address customization in flowing copperplate script.
   - 9 envelope palettes (Royal Burgundy hero, Embossed Scalloped, Airmail Stripe, Dusty Blush, Butter Cream, Sage Meadow, Powder Blue, Lavender, Vintage Kraft).
4. **Philatelic Stamp Album**:
   - 12+ meticulously engraved stamps with perforated edges and postal cancel marks.
5. **Paper & Stationery Picker**:
   - French Ruled Linen, Aged Deckle Parchment, Romantic Floral Border, Minimal Ivory, Dusty Rose Petal, Neoclassical Filigree, Dear Diary, and Vintage Postcard.
6. **Writing Editor**:
   - Date, salutation ("Dearest Sofia,"), free-writing body, sign-off suggestions ("With all my love,"), sender name, and P.S.
   - "Need inspiration?" drawer with 6 poetic prompt themes.
   - Draggable & removable stickers (gold hearts, velvet bows, cherries, pressed daisies, sleeping kitten, birthday cake, party hat, stars, butterflies).
   - Authentic Polaroids with client-side photo upload/compression, editable handwritten caption, and realistic 3D brass/crimson pushpins.
   - Procedural Web Audio API sound effects (paper rustles, stamp thuds, wax squishes, pen scratches, chimes) with instant mute toggle.
   - Autosave to drafts on every keystroke.
7. **The Sealing Ceremony**:
   - Letter folds in thirds with 3D paper shading.
   - Slides into envelope.
   - Flap folds down with 3D flip.
   - Molten wax spoon pours expanding puddle; user taps/holds to stamp with satisfying squish.
   - "Your letter is ready to travel."
8. **Send & Privacy Controls**:
   - Shareable unguessable link (`/letter/{token}` or `#letter/{token}`).
   - WhatsApp, Telegram, Messenger, and Email share buttons.
   - Passcode protection with SHA-256 client/server check.
   - "Open When..." capsule labels.
9. **Recipient Opening Experience (Matching Video)**:
   - Metallic mail slot at screen top with "YOU GOT A MAIL!"
   - Envelope slides out with realistic pendulum swing.
   - Crimson pill button: `click here to claim your mail`.
   - Seal cracks, flap opens in 3D, and letter rises out.
   - Scene transitions to dark velvet/corkboard with warm ivory paper pinned by a realistic pushpin, surrounded by scattered polaroids, washi tape, and stickers in a bouncy staggered entrance.
   - Reaction emojis (❤️, ✨, 🥺, 🌹, ✉️) with floating burst particle animations.
   - Replay animation, Print/Save keepsake, and Reply button.

---

## ✦ Supabase Backend Setup

Amorette operates in two seamless modes:
- **Instant Local Mode**: Works immediately offline using browser persistent storage.
- **Supabase Cloud Mode**: Syncs letters, reactions, and replies across the internet.

### 1. Database Schema
1. Open your Supabase project dashboard at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** tab.
3. Paste and run the entire contents of `supabase_setup.sql`.

### 2. Connect Your App
Click the **"cloud sync"** button in the top right of Amorette, or set:
- **Supabase URL**: `https://your-project.supabase.co`
- **Supabase Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

---

## ✦ How to Run Locally

You can run Amorette with any static file server:

### Python 3:
```bash
python -m http.server 8000
```
Then visit: `http://localhost:8000`

### Node.js:
```bash
npx serve .
```

---

## ✦ File Structure
```
amorette/
├── index.html              # Main single-page application & screens
├── supabase_setup.sql      # Supabase database schema & RLS policies
├── README.md               # Documentation & setup guide
├── css/
│   └── style.css           # Design tokens, candlelit theme, 3D paper transforms
├── js/
│   ├── audio.js            # Web Audio API analog sound synthesizer
│   ├── wax-seals.js        # SVG wax seal engine with realistic specular filters
│   ├── stamps.js           # 12+ engraved/linocut stamps & perforated borders
│   ├── stationery.js       # Papers, envelopes, stickers, washi tapes & prompts
│   ├── decorations.js      # Realistic pushpins, polaroids & photo compressor
│   ├── supabase-client.js  # Supabase REST client with persistent fallback
│   └── app.js              # Application state, route handling & ceremonies
```
