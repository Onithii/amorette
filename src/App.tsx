import { useEffect, useState } from 'react';

type Tab = 'Envelope' | 'Paper' | 'Photos' | 'Stickers';
type AppView = 'home' | 'editor' | 'reveal';
type Photo = { id: string; name: string; src: string };
type Draft = {
  envelopeIndex: number;
  paperTexture: number;
  fontStyle: number;
  fontSize: number;
  fontColour: string;
  greeting: string;
  message: string;
  signoff: string;
  selectedStickers: number[];
  photos: Photo[];
};

const envelopeDesigns = [
  {
    name: 'Olive Keepsake',
    closed: '/assets/envelope-collection-olive.webp',
    open: '/assets/envelope-olive-open.png',
    openFilter: 'none',
  },
  {
    name: 'Midnight Botanica',
    closed: '/assets/envelope-collection-navy.png',
    open: '/assets/envelope-olive-open.png',
    openFilter: 'grayscale(1) sepia(1) hue-rotate(170deg) saturate(3) brightness(.65)',
  },
  {
    name: 'Ivory Heirloom',
    closed: '/assets/envelope-collection-ivory-seal.png',
    open: '/assets/envelope-ivory-open.png',
    openFilter: 'none',
  },
  {
    name: 'Blush Lace',
    closed: '/assets/envelope-collection-pink-lace.webp',
    open: '/assets/envelope-ivory-open.png',
    openFilter: 'sepia(.45) saturate(1.25) hue-rotate(300deg) brightness(1.06)',
  },
  {
    name: 'Burgundy Ribbon',
    closed: '/assets/envelope-collection-burgundy-bow.webp',
    open: '/assets/envelope-burgundy-open.png',
    openFilter: 'none',
  },
  {
    name: 'Embossed Ivory',
    closed: '/assets/envelope-collection-ivory-embossed.webp',
    open: '/assets/envelope-ivory-open.png',
    openFilter: 'none',
  },
];

const paperTextures = [
  { name: 'Vintage rose', src: '/assets/paper-vintage-rose.webp' },
  { name: 'Midnight stars', src: '/assets/paper-midnight-stars.webp', dark: true },
  { name: 'Teal heirloom', src: '/assets/paper-teal-ornate.webp', dark: true },
  { name: 'Cotton', src: '/assets/paper-cotton.webp' },
  { name: 'Aged parchment', src: '/assets/paper-parchment.webp' },
  { name: 'Hand ruled', src: '/assets/paper-ruled.webp' },
  { name: 'Golden botanical', src: '/assets/paper-golden-botanical.webp' },
  { name: 'Blush filigree', src: '/assets/paper-blush-filigree.webp' },
];

const stickerItems = [
  { name: 'Water lilies', src: '/assets/sticker-water-lilies.png' },
  { name: 'Stretching cat', src: '/assets/sticker-cat.png' },
  { name: 'Maroon flower', src: '/assets/sticker-maroon-flower.png' },
  { name: 'Favorite person', src: '/assets/sticker-favorite-person.png' },
  { name: 'White tulips', src: '/assets/sticker-tulips.png' },
  { name: 'Falling stars', src: '/assets/sticker-stars.png' },
  { name: 'Gingham bow', src: '/assets/sticker-bow.png' },
  { name: 'Newsprint hearts', src: '/assets/sticker-newsprint-hearts.png' },
  { name: 'Brown butterfly', src: '/assets/sticker-brown-butterfly.png' },
  { name: 'Golden moon', src: '/assets/sticker-golden-moon.png' },
  { name: 'Cupid archer', src: '/assets/sticker-cupid-archer.png' },
  { name: 'Dreaming cherub', src: '/assets/sticker-dreaming-cherub.png' },
  { name: 'Flower fairy', src: '/assets/sticker-flower-fairy.png' },
  { name: 'Pink blossoms', src: '/assets/sticker-pink-blossoms.png' },
  { name: 'Star maiden', src: '/assets/sticker-star-maiden.png' },
  { name: 'Star face', src: '/assets/sticker-star-face.png' },
  { name: 'Patterned moon', src: '/assets/sticker-patterned-moon.png' },
  { name: 'Burgundy lotus', src: '/assets/sticker-burgundy-lotus.png' },
];

const fontStyles = [
  { name: 'Allura', label: 'Handwritten', className: 'font-handwriting' },
  { name: 'Playfair Display', label: 'Literary serif', className: 'font-classic' },
  { name: 'Courier New', label: 'Typewritten', className: 'font-typewriter' },
  { name: 'Inter', label: 'Modern correspondence', className: 'font-modern' },
];

const suggestedInk = ['#3A1F24', '#722F40', '#1F3653', '#4F5B3A', '#8A5B39', '#F8F0E5'];

function decodeSharedDraft(): Partial<Draft> | null {
  if (!window.location.hash) return null;
  try {
    const encoded = window.location.hash.slice(1);
    const bytes = Uint8Array.from(atob(encoded), (character) => character.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    return null;
  }
}

function encodeDraft(draft: Draft) {
  const bytes = new TextEncoder().encode(JSON.stringify(draft));
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function readDraft(): Partial<Draft> {
  const shared = decodeSharedDraft();
  if (shared) return shared;
  try {
    return JSON.parse(localStorage.getItem('amorette-composition-draft') || '{}');
  } catch {
    return {};
  }
}

function TabPill({
  label,
  active,
  onClick,
}: {
  label: Tab;
  active: boolean;
  onClick: () => void;
}) {
  const icon = { Envelope: '✉', Paper: '▤', Photos: '▧', Stickers: '✦' }[label];
  return (
    <button
      className={`tab-pill ${active ? 'is-active' : ''}`}
      onClick={onClick}
      type="button"
    >
      <span aria-hidden="true">{icon}</span>
      {label}
    </button>
  );
}

function Polaroid({ photo, index }: { photo: Photo; index: number }) {
  return (
    <div className={`polaroid polaroid-memory-${index}`}>
      <div className="polaroid-image">
        <img alt={photo.name} src={photo.src} />
      </div>
      <div className="polaroid-caption">a little memory</div>
    </div>
  );
}

function ReadOnlyLetter({
  paperTexture,
  fontStyle,
  fontSize,
  fontColour,
  greeting,
  message,
  signoff,
}: {
  paperTexture: (typeof paperTextures)[number];
  fontStyle: string;
  fontSize: number;
  fontColour: string;
  greeting: string;
  message: string;
  signoff: string;
}) {
  return (
    <article
      aria-label="Your letter"
      className={`paper-letter reveal-paper ${paperTexture.dark ? 'is-dark-paper' : ''} ${fontStyle}`}
      style={
        {
          '--letter-colour': fontColour,
          '--letter-size': `${fontSize * 1.25}px`,
          backgroundImage: `linear-gradient(135deg, rgb(255 255 255 / 6%), rgb(83 40 30 / 4%)), url("${paperTexture.src}")`,
        } as React.CSSProperties
      }
    >
      <p className="letter-dear">{greeting}</p>
      <p className="letter-body">{message}</p>
      <p className="letter-signoff">{signoff}</p>
    </article>
  );
}

function RevealPage({
  draft,
  recipientMode,
  onBack,
}: {
  draft: Draft;
  recipientMode: boolean;
  onBack: () => void;
}) {
  const [opened, setOpened] = useState(false);
  const [copied, setCopied] = useState(false);
  const envelope = envelopeDesigns[draft.envelopeIndex] ?? envelopeDesigns[0];
  const paper = paperTextures[draft.paperTexture] ?? paperTextures[3];
  const font = fontStyles[draft.fontStyle] ?? fontStyles[1];
  const shareLink = `${window.location.origin}${window.location.pathname}?view=reveal&shared=1#${encodeDraft(draft)}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
    } catch {
      const input = document.createElement('textarea');
      input.value = shareLink;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      input.remove();
    }
    setCopied(true);
  };

  const openLetter = () => {
    setOpened(true);
    window.requestAnimationFrame(() => {
      document.querySelector('.reveal-stage')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  };

  return (
    <main className={`reveal-shell ${opened ? 'letter-is-open' : ''}`}>
      {!recipientMode && (
        <button className="reveal-back" onClick={onBack} type="button">
          <span aria-hidden="true">←</span> Back to design
        </button>
      )}

      <header className="reveal-heading">
        <p>AMORETTE</p>
        <h1>{opened ? 'A letter, just for you' : 'Something lovely is waiting'}</h1>
        <span>{opened ? 'Kept in every word.' : 'Sent with a little bit of heart.'}</span>
      </header>

      <section className="reveal-stage" aria-live="polite">
        <div className="reveal-canvas">
          <div className={`reveal-composition composition ${opened ? 'is-open' : 'is-closed'}`}>
            <div className="real-envelope reveal-envelope" aria-hidden="true">
              <img
                alt=""
                className={`envelope-state-image envelope-closed ${opened ? '' : 'is-visible'}`}
                src={envelope.closed}
              />
              <img
                alt=""
                className={`envelope-state-image envelope-open ${opened ? 'is-visible' : ''}`}
                src={envelope.open}
                style={{ '--envelope-open-filter': envelope.openFilter } as React.CSSProperties}
              />
            </div>

            {draft.photos.map((photo, index) => (
              <Polaroid index={index} key={photo.id} photo={photo} />
            ))}

            {draft.selectedStickers.map((stickerIndex, position) => {
              const sticker = stickerItems[stickerIndex];
              if (!sticker) return null;
              return (
                <img
                  alt={sticker.name}
                  className={`sticker keepsake-sticker sticker-memory-${position}`}
                  draggable={false}
                  key={`${sticker.name}-${position}`}
                  src={sticker.src}
                  style={{ '--pulse-stagger': `${position * 55}ms` } as React.CSSProperties}
                />
              );
            })}

            <ReadOnlyLetter
              fontColour={draft.fontColour}
              fontSize={draft.fontSize}
              fontStyle={font.className}
              greeting={draft.greeting}
              message={draft.message}
              paperTexture={paper}
              signoff={draft.signoff}
            />
          </div>
        </div>

        {!opened && (
          <button className="open-letter-button" onClick={openLetter} type="button">
            Open your letter
            <span aria-hidden="true">↓</span>
          </button>
        )}
      </section>

      {!recipientMode && (
        <section className="share-letter-section">
          <p className="share-kicker">PASS IT ON</p>
          <h2>Psst... you've got mail!</h2>
          <p>Some things are too lovely to keep to yourself. Send this little letter their way.</p>
          <div className="share-link-row">
            <input aria-label="Shareable letter link" readOnly value={shareLink} />
            <button onClick={copyLink} type="button">
              Copy Link
            </button>
          </div>
          <span className={`copy-confirmation ${copied ? 'is-visible' : ''}`} role="status">
            Copied! Off it goes.
          </span>
        </section>
      )}
    </main>
  );
}

function HomePage({
  onGetStarted,
  onHome,
}: {
  onGetStarted: () => void;
  onHome: () => void;
}) {
  return (
    <main className="home-page">
      <header className="home-nav">
        <a
          className="home-brand"
          href="/"
          onClick={(event) => {
            event.preventDefault();
            onHome();
          }}
        >
          Amorette
        </a>
        <nav aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#letters">Letters</a>
          <a href="#sign-in">Sign In</a>
        </nav>
      </header>

      <section aria-labelledby="home-title" className="home-hero" id="about">
        <h1 id="home-title">Amorette</h1>
        <p className="home-definition">
          <span>/ˈæm.ə.ɹɛt/</span>
          <span className="home-part-of-speech">• noun</span>
          <span className="home-meaning">— little love; beloved.</span>
        </p>
        <div aria-hidden="true" className="home-divider" />
        <p className="home-subtitle">
          Send someone a real letter. Design a textured envelope, pen your
          <br className="home-subtitle-break" /> heart on creamy parchment, and press a wax seal.
        </p>

        <div className="home-envelope-stage" id="letters">
          <img
            alt="A deep burgundy textured envelope"
            className="home-envelope"
            src="/assets/envelope-burgundy-closed.png"
          />
          <span aria-hidden="true" className="home-wax-seal">
            <img alt="" src="/assets/seal-cupid.png" />
            <span>♥</span>
          </span>
        </div>

        <button className="home-get-started" onClick={onGetStarted} type="button">
          Get Started
        </button>
      </section>
    </main>
  );
}

function LetterPreview({
  envelope,
  paperTexture,
  fontStyle,
  fontSize,
  fontColour,
  greeting,
  setGreeting,
  message,
  setMessage,
  signoff,
  setSignoff,
  photos,
  selectedStickers,
  open,
  onToggle,
}: {
  envelope: (typeof envelopeDesigns)[number];
  paperTexture: (typeof paperTextures)[number];
  fontStyle: string;
  fontSize: number;
  fontColour: string;
  greeting: string;
  setGreeting: (value: string) => void;
  message: string;
  setMessage: (value: string) => void;
  signoff: string;
  setSignoff: (value: string) => void;
  photos: Photo[];
  selectedStickers: number[];
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`composition ${open ? 'is-open' : 'is-closed'}`}>
      <button
        aria-label={open ? `Fold ${envelope.name}` : `Open ${envelope.name}`}
        className="real-envelope"
        onClick={onToggle}
        type="button"
      >
        <img
          alt=""
          className={`envelope-state-image envelope-closed ${open ? '' : 'is-visible'}`}
          src={envelope.closed}
        />
        <img
          alt=""
          className={`envelope-state-image envelope-open ${open ? 'is-visible' : ''}`}
          src={envelope.open}
          style={{ '--envelope-open-filter': envelope.openFilter } as React.CSSProperties}
        />
      </button>

      {photos.map((photo, index) => (
        <Polaroid index={index} key={photo.id} photo={photo} />
      ))}

      {selectedStickers.map((stickerIndex, position) => {
        const sticker = stickerItems[stickerIndex];
        return (
          <img
            alt={sticker.name}
            className={`sticker keepsake-sticker sticker-memory-${position}`}
            key={sticker.name}
            src={sticker.src}
            style={{ '--pulse-stagger': `${position * 55}ms` } as React.CSSProperties}
          />
        );
      })}

      <article
        className={`paper-letter ${paperTexture.dark ? 'is-dark-paper' : ''} ${fontStyle}`}
        style={
          {
            '--letter-colour': fontColour,
            '--letter-size': `${fontSize}px`,
            backgroundImage: `linear-gradient(135deg, rgb(255 255 255 / 6%), rgb(83 40 30 / 4%)), url("${paperTexture.src}")`,
          } as React.CSSProperties
        }
      >
        <span className="tap-label">Write your letter</span>
        <input
          aria-label="Letter greeting"
          className="letter-dear"
          maxLength={80}
          onChange={(event) => setGreeting(event.target.value)}
          placeholder="Dear Sofia,"
          value={greeting}
        />
        <textarea
          aria-label="Letter message"
          className="letter-body"
          maxLength={820}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Start writing your heart out…"
          value={message}
        />
        <textarea
          aria-label="Letter sign-off"
          className="letter-signoff"
          maxLength={80}
          onChange={(event) => setSignoff(event.target.value)}
          placeholder={'Love,\nAshen'}
          rows={2}
          value={signoff}
        />
      </article>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="control-section">
      <h3>{title}</h3>
      {children}
    </section>
  );
}

function EnvelopePanel({
  envelopeIndex,
  setEnvelopeIndex,
}: {
  envelopeIndex: number;
  setEnvelopeIndex: (value: number) => void;
}) {
  return (
    <>
      <div className="collection-heading">
        <span>THE ENVELOPE COLLECTION</span>
        <p>Choose the final keepsake for your letter.</p>
      </div>
      <div className="envelope-design-grid">
        {envelopeDesigns.map((design, index) => (
          <button
            aria-label={design.name}
            aria-pressed={envelopeIndex === index}
            className={`envelope-design-option ${
              envelopeIndex === index ? 'is-selected' : ''
            }`}
            key={design.name}
            onClick={() => setEnvelopeIndex(index)}
            type="button"
          >
            <span className="envelope-thumb">
              <img alt="" src={design.closed} />
            </span>
          </button>
        ))}
      </div>
    </>
  );
}

function PaperPanel({
  paperTexture,
  setPaperTexture,
  fontStyle,
  setFontStyle,
  fontSize,
  setFontSize,
  fontColour,
  setFontColour,
}: {
  paperTexture: number;
  setPaperTexture: (value: number) => void;
  fontStyle: number;
  setFontStyle: (value: number) => void;
  fontSize: number;
  setFontSize: (value: number) => void;
  fontColour: string;
  setFontColour: (value: string) => void;
}) {
  return (
    <>
      <Section title="Choose your stationery">
        <div className="paper-texture-grid">
          {paperTextures.map((item, index) => (
            <button
              aria-label={item.name}
              aria-pressed={paperTexture === index}
              className={`paper-texture-option ${
                paperTexture === index ? 'is-selected' : ''
              }`}
              key={item.name}
              onClick={() => setPaperTexture(index)}
              type="button"
            >
              <img alt="" src={item.src} />
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </Section>

      <Section title="Your handwriting">
        <div className="font-grid">
          {fontStyles.map((font, index) => (
            <button
              aria-pressed={fontStyle === index}
              className={`font-card ${fontStyle === index ? 'is-selected' : ''}`}
              key={font.name}
              onClick={() => setFontStyle(index)}
              type="button"
            >
              <span className={font.className}>Dearest Sofia</span>
              <small>{font.name}</small>
            </button>
          ))}
        </div>
      </Section>

      <Section title="Ink and size">
        <div className="typography-controls">
          <div className="size-control">
            <span>Small</span>
            <input
              aria-label="Letter font size"
              max="24"
              min="14"
              onChange={(event) => setFontSize(Number(event.target.value))}
              type="range"
              value={fontSize}
            />
            <span>Large</span>
            <b>{fontSize}</b>
          </div>
          <div className="ink-row">
            {suggestedInk.map((colour) => (
              <button
                aria-label={`Use ${colour} ink`}
                aria-pressed={fontColour === colour}
                className={fontColour === colour ? 'is-selected' : ''}
                key={colour}
                onClick={() => setFontColour(colour)}
                style={{ background: colour }}
                type="button"
              />
            ))}
            <label className="custom-colour">
              <input
                aria-label="Custom ink colour"
                onChange={(event) => setFontColour(event.target.value)}
                type="color"
                value={fontColour}
              />
              Custom
            </label>
          </div>
        </div>
      </Section>
    </>
  );
}

function PhotosPanel({
  photos,
  addPhotos,
  removePhoto,
}: {
  photos: Photo[];
  addPhotos: (files: FileList | null) => void;
  removePhoto: (id: string) => void;
}) {
  return (
    <>
      <div className="panel-heading-row">
        <div>
          <h3>Personal memories</h3>
          <p>Choose up to four photographs to tuck inside.</p>
        </div>
        <span>{photos.length} of 4</span>
      </div>
      <div className="photo-grid">
        {photos.map((photo) => (
          <div className="photo-slot filled" key={photo.id}>
            <button
              aria-label={`Remove ${photo.name}`}
              onClick={() => removePhoto(photo.id)}
              type="button"
            >
              ×
            </button>
            <img alt={photo.name} src={photo.src} />
            <p>{photo.name}</p>
          </div>
        ))}
        {photos.length < 4 && (
          <label className="photo-slot empty">
            <input
              accept="image/*"
              multiple
              onChange={(event) => {
                addPhotos(event.target.files);
                event.target.value = '';
              }}
              type="file"
            />
            <strong>+</strong>
            Add photographs
          </label>
        )}
      </div>
      <p className="helper-copy">
        Your memories will spring from the envelope when it is opened.
      </p>
    </>
  );
}

function StickersPanel({
  selected,
  toggleSticker,
  clearStickers,
}: {
  selected: number[];
  toggleSticker: (index: number) => void;
  clearStickers: () => void;
}) {
  return (
    <>
      <div className="panel-heading-row">
        <div>
          <h3>Little decorations</h3>
          <p>Choose any keepsakes that feel like yours.</p>
        </div>
        <span>{selected.length} selected</span>
      </div>
      <div className="sticker-grid">
        {stickerItems.map((item, index) => (
          <button
            aria-label={`${selected.includes(index) ? 'Remove' : 'Add'} ${item.name}`}
            aria-pressed={selected.includes(index)}
            className={selected.includes(index) ? 'is-selected' : ''}
            key={item.name}
            onClick={() => toggleSticker(index)}
            type="button"
          >
            <img alt="" src={item.src} />
            <span>{item.name}</span>
          </button>
        ))}
      </div>
      <div className="sticker-count">
        <span>{selected.length ? 'Placed with your letter' : 'No stickers selected'}</span>
        {selected.length > 0 && (
          <button onClick={clearStickers} type="button">
            Clear all
          </button>
        )}
      </div>
    </>
  );
}

export default function App() {
  const draft = readDraft();
  const initialParams = new URLSearchParams(window.location.search);
  const [view, setView] = useState<AppView>(() => {
    if (initialParams.get('view') === 'reveal' || initialParams.get('shared') === '1') {
      return 'reveal';
    }
    return initialParams.get('view') === 'editor' ? 'editor' : 'home';
  });
  const recipientMode = initialParams.get('shared') === '1';
  const [tab, setTab] = useState<Tab>('Envelope');
  const [envelopeIndex, setEnvelopeIndex] = useState(draft.envelopeIndex ?? 0);
  const [paperTexture, setPaperTexture] = useState(draft.paperTexture ?? 3);
  const [fontStyle, setFontStyle] = useState(draft.fontStyle ?? 1);
  const [fontSize, setFontSize] = useState(draft.fontSize ?? 17);
  const [fontColour, setFontColour] = useState(draft.fontColour ?? '#3A1F24');
  const [greeting, setGreeting] = useState(draft.greeting ?? 'Dear Sofia,');
  const [message, setMessage] = useState(
    draft.message ??
      'Happy Birthday! I hope you have an amazing day filled with laughter, lovely surprises, and memories worth keeping.',
  );
  const [signoff, setSignoff] = useState(draft.signoff ?? 'Love,\nAshen');
  const [selectedStickers, setSelectedStickers] = useState<number[]>(
    draft.selectedStickers ?? [],
  );
  const [photos, setPhotos] = useState<Photo[]>(draft.photos ?? []);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      if (params.get('view') === 'reveal' || params.get('shared') === '1') {
        setView('reveal');
      } else {
        setView(params.get('view') === 'editor' ? 'editor' : 'home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        'amorette-composition-draft',
        JSON.stringify({
          envelopeIndex,
          paperTexture,
          fontStyle,
          fontSize,
          fontColour,
          greeting,
          message,
          signoff,
          selectedStickers,
          photos,
        }),
      );
    } catch {
      // The editor remains usable when local storage is unavailable.
    }
  }, [
    envelopeIndex,
    paperTexture,
    fontStyle,
    fontSize,
    fontColour,
    greeting,
    message,
    signoff,
    selectedStickers,
    photos,
  ]);

  const addPhotos = (files: FileList | null) => {
    if (!files) return;
    const available = Math.max(0, 4 - photos.length);
    Array.from(files)
      .filter((file) => file.type.startsWith('image/'))
      .slice(0, available)
      .forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          const src = reader.result;
          if (typeof src !== 'string') return;
          setPhotos((current) => {
            if (current.length >= 4) return current;
            return [
              ...current,
              { id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`, name: file.name, src },
            ];
          });
        };
        reader.readAsDataURL(file);
      });
  };

  const toggleSticker = (index: number) => {
    setSelectedStickers((current) => {
      if (current.includes(index)) return current.filter((item) => item !== index);
      return [...current, index];
    });
  };

  const currentDraft: Draft = {
    envelopeIndex,
    paperTexture,
    fontStyle,
    fontSize,
    fontColour,
    greeting,
    message,
    signoff,
    selectedStickers,
    photos,
  };

  const navigateTo = (nextView: AppView) => {
    const url = nextView === 'home' ? window.location.pathname : `${window.location.pathname}?view=${nextView}`;
    window.history.pushState({}, '', url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setView(nextView);
  };

  const showReveal = () => navigateTo('reveal');
  const showEditor = () => navigateTo('editor');
  const showHome = () => navigateTo('home');

  if (view === 'reveal') {
    return <RevealPage draft={currentDraft} onBack={showEditor} recipientMode={recipientMode} />;
  }

  if (view === 'home') {
    return <HomePage onGetStarted={showEditor} onHome={showHome} />;
  }

  return (
    <main className="designer-shell">
      <header className="top-bar">
        <button className="ghost-button" type="button">
          <span>←</span> back
        </button>
        <div className="step-heading">
          <h1>
            Step 2 of 4 <span>· Design</span>
          </h1>
          <div className="progress-dots" aria-label="Step 2 of 4">
            {[0, 1, 2, 3].map((dot) => (
              <span className={dot < 2 ? 'filled' : ''} key={dot} />
            ))}
          </div>
        </div>
        <button className="primary-button" onClick={showReveal} type="button">
          Next <span>→</span>
        </button>
      </header>

      <div className="workspace">
        <section className="preview-column">
          <div className="preview-card">
            <div className="preview-eyebrow">
              <span>YOUR LETTER</span>
              <span>Draft saved locally</span>
            </div>
            <LetterPreview
              envelope={envelopeDesigns[envelopeIndex]}
              fontColour={fontColour}
              fontSize={fontSize}
              fontStyle={fontStyles[fontStyle].className}
              greeting={greeting}
              message={message}
              onToggle={() => setOpen((current) => !current)}
              open={open}
              paperTexture={paperTextures[paperTexture]}
              photos={photos}
              selectedStickers={selectedStickers}
              setGreeting={setGreeting}
              setMessage={setMessage}
              setSignoff={setSignoff}
              signoff={signoff}
            />
          </div>

          <div className="preview-controls">
            <div className="segmented-toggle">
              <button
                className={!open ? 'is-active' : ''}
                onClick={() => setOpen(false)}
                type="button"
              >
                Sealed
              </button>
              <button
                className={open ? 'is-active' : ''}
                onClick={() => setOpen(true)}
                type="button"
              >
                Open letter
              </button>
            </div>
            <button className="animation-link" onClick={() => setOpen(false)} type="button">
              Replay opening
            </button>
          </div>
        </section>

        <aside className="control-panel">
          <div className="sheet-handle" />
          <div className="tab-row">
            {(['Envelope', 'Paper', 'Photos', 'Stickers'] as Tab[]).map((item) => (
              <TabPill
                active={tab === item}
                key={item}
                label={item}
                onClick={() => setTab(item)}
              />
            ))}
          </div>
          <div className="panel-divider" />
          <div className="panel-content">
            {tab === 'Envelope' && (
              <EnvelopePanel
                envelopeIndex={envelopeIndex}
                setEnvelopeIndex={setEnvelopeIndex}
              />
            )}
            {tab === 'Paper' && (
              <PaperPanel
                fontColour={fontColour}
                fontSize={fontSize}
                fontStyle={fontStyle}
                paperTexture={paperTexture}
                setFontColour={setFontColour}
                setFontSize={setFontSize}
                setFontStyle={setFontStyle}
                setPaperTexture={setPaperTexture}
              />
            )}
            {tab === 'Photos' && (
              <PhotosPanel
                addPhotos={addPhotos}
                photos={photos}
                removePhoto={(id) =>
                  setPhotos((current) => current.filter((photo) => photo.id !== id))
                }
              />
            )}
            {tab === 'Stickers' && (
              <StickersPanel
                clearStickers={() => setSelectedStickers([])}
                selected={selectedStickers}
                toggleSticker={toggleSticker}
              />
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}
