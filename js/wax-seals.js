/**
 * Amorette - Realistic Wax Seal Generator
 * Inspired by reference images 1 (burgundy oval with lavender),
 * 2 (antique gold round with laurel wreath), and 3 (glossy navy with leaf branch).
 * Features layered SVG with realistic lighting filters, melted rim drips, inner bevels, and embossed emblems.
 */

const WAX_COLORS = {
  burgundy: {
    id: 'burgundy',
    name: 'Royal Burgundy',
    base: '#580D1B',
    highlight: '#992237',
    shadow: '#31040D',
    rim: '#6B1424',
    specular: '#FFB8C4',
    goldFoil: false
  },
  gold: {
    id: 'gold',
    name: 'Antique Gold',
    base: '#B88F28',
    highlight: '#F3D279',
    shadow: '#664C0F',
    rim: '#C89F35',
    specular: '#FFF5D0',
    goldFoil: true
  },
  navy: {
    id: 'navy',
    name: 'Midnight Navy',
    base: '#11223B',
    highlight: '#274B78',
    shadow: '#070F1B',
    rim: '#183153',
    specular: '#A5C9F3',
    goldFoil: false
  },
  forest: {
    id: 'forest',
    name: 'Forest Moss',
    base: '#1A3324',
    highlight: '#356348',
    shadow: '#0B1710',
    rim: '#244531',
    specular: '#A8DDB8',
    goldFoil: false
  },
  blush: {
    id: 'blush',
    name: 'Dusty Blush',
    base: '#C77587',
    highlight: '#EAA9B7',
    shadow: '#7A3544',
    rim: '#D48697',
    specular: '#FFF0F3',
    goldFoil: false
  },
  black: {
    id: 'black',
    name: 'Obsidian Noir',
    base: '#1D1A1C',
    highlight: '#403B3E',
    shadow: '#0B090A',
    rim: '#2B2629',
    specular: '#E0DFE1',
    goldFoil: false
  }
};

const WAX_EMBLEMS = {
  lavender: {
    id: 'lavender',
    name: 'Lavender Sprig',
    render: () => `
      <!-- Botanical Lavender Sprig (Reference Image 1) -->
      <g class="emblem-path">
        <!-- Main Stem -->
        <path d="M 60 92 Q 59 62 60 26" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" fill="none"/>
        <!-- Central Flower Spike Buds -->
        <path d="M 57 26 C 55 24 65 24 63 26 C 61 28 58 28 57 26 Z" fill="currentColor"/>
        <path d="M 56 31 C 53 29 67 29 64 31 C 61 33 58 33 56 31 Z" fill="currentColor"/>
        <path d="M 55 37 C 52 35 68 35 65 37 C 62 39 57 39 55 37 Z" fill="currentColor"/>
        <path d="M 54 44 C 50 42 70 42 66 44 C 63 46 56 46 54 44 Z" fill="currentColor"/>
        <path d="M 55 52 C 51 50 69 50 65 52 C 62 54 57 54 55 52 Z" fill="currentColor"/>
        <!-- Branching Leaves & Secondary Florets -->
        <path d="M 59 62 Q 50 56 46 44 Q 52 50 59 60" fill="currentColor"/>
        <path d="M 61 62 Q 70 56 74 44 Q 68 50 61 60" fill="currentColor"/>
        <path d="M 59 74 Q 46 70 41 58 Q 50 64 59 72" fill="currentColor"/>
        <path d="M 61 74 Q 74 70 79 58 Q 70 64 61 72" fill="currentColor"/>
        <path d="M 59 84 Q 44 80 38 72 Q 48 76 59 82" fill="currentColor"/>
        <path d="M 61 84 Q 76 80 82 72 Q 72 76 61 82" fill="currentColor"/>
      </g>
    `
  },
  laurel: {
    id: 'laurel',
    name: 'Neoclassical Laurel',
    render: () => `
      <!-- Laurel Wreath (Reference Image 2) -->
      <g class="emblem-path">
        <!-- Left Wreath Branch -->
        <path d="M 58 86 C 42 84 32 72 32 58 C 32 44 42 32 56 30" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>
        <!-- Right Wreath Branch -->
        <path d="M 62 86 C 78 84 88 72 88 58 C 88 44 78 32 64 30" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>
        <!-- Leaves Pair along Left -->
        <path d="M 33 48 C 27 45 28 38 36 43 C 40 45 36 50 33 48 Z" fill="currentColor"/>
        <path d="M 30 58 C 24 57 24 49 32 53 C 37 55 33 60 30 58 Z" fill="currentColor"/>
        <path d="M 33 68 C 28 69 27 61 35 63 C 39 65 37 70 33 68 Z" fill="currentColor"/>
        <path d="M 42 78 C 36 82 33 74 40 73 C 44 72 45 77 42 78 Z" fill="currentColor"/>
        <path d="M 44 37 C 39 33 43 27 48 33 C 51 36 47 39 44 37 Z" fill="currentColor"/>
        <!-- Leaves Pair along Right -->
        <path d="M 87 48 C 93 45 92 38 84 43 C 80 45 84 50 87 48 Z" fill="currentColor"/>
        <path d="M 90 58 C 96 57 96 49 88 53 C 83 55 87 60 90 58 Z" fill="currentColor"/>
        <path d="M 87 68 C 92 69 93 61 85 63 C 81 65 83 70 87 68 Z" fill="currentColor"/>
        <path d="M 78 78 C 84 82 87 74 80 73 C 76 72 75 77 78 78 Z" fill="currentColor"/>
        <path d="M 76 37 C 81 33 77 27 72 33 C 69 36 73 39 76 37 Z" fill="currentColor"/>
        <!-- Ribbon Tie at Bottom -->
        <path d="M 56 86 Q 60 89 64 86 Q 67 92 60 92 Q 53 92 56 86 Z" fill="currentColor"/>
        <circle cx="60" cy="58" r="3" fill="currentColor"/>
      </g>
    `
  },
  leaf_branch: {
    id: 'leaf_branch',
    name: 'Leaf Branch',
    render: () => `
      <!-- Leaf Branch (Reference Image 3) -->
      <g class="emblem-path">
        <!-- Elegant Curved Branch -->
        <path d="M 60 92 Q 62 65 58 30" stroke="currentColor" stroke-width="2.6" fill="none" stroke-linecap="round"/>
        <!-- Terminal Leaf -->
        <path d="M 58 30 C 52 20 68 20 62 30 C 60 33 59 33 58 30 Z" fill="currentColor"/>
        <!-- Leaf Vein -->
        <path d="M 60 28 L 60 23" stroke="currentColor" stroke-width="1.2"/>
        <!-- Left Leaf Upper -->
        <path d="M 58 44 C 40 38 46 26 58 40 Z" fill="currentColor"/>
        <path d="M 58 42 L 49 35" stroke="currentColor" stroke-width="1.2"/>
        <!-- Right Leaf Upper -->
        <path d="M 60 48 C 78 42 74 30 60 44 Z" fill="currentColor"/>
        <path d="M 60 46 L 69 39" stroke="currentColor" stroke-width="1.2"/>
        <!-- Left Leaf Lower -->
        <path d="M 59 62 C 38 60 42 46 59 58 Z" fill="currentColor"/>
        <path d="M 59 60 L 48 54" stroke="currentColor" stroke-width="1.2"/>
        <!-- Right Leaf Lower -->
        <path d="M 61 68 C 82 66 78 52 61 64 Z" fill="currentColor"/>
        <path d="M 61 66 L 72 60" stroke="currentColor" stroke-width="1.2"/>
      </g>
    `
  },
  heart: {
    id: 'heart',
    name: 'Victorian Heart',
    render: () => `
      <g class="emblem-path">
        <!-- Ornate Heart -->
        <path d="M 60 84 C 36 68 30 46 44 36 C 54 28 60 38 60 38 C 60 38 66 28 76 36 C 90 46 84 68 60 84 Z" fill="currentColor"/>
        <!-- Inner Filigree Crown -->
        <path d="M 52 48 Q 60 54 68 48 Q 60 62 52 48 Z" fill="none" stroke="#FFFFFF" stroke-width="1.8" opacity="0.6"/>
        <circle cx="60" cy="45" r="2.2" fill="#FFFFFF" opacity="0.7"/>
      </g>
    `
  },
  rose: {
    id: 'rose',
    name: 'Garden Rose',
    render: () => `
      <g class="emblem-path">
        <!-- Rose Petals Layering -->
        <path d="M 60 44 C 54 44 54 50 60 50 C 66 50 66 44 60 44 Z" fill="currentColor"/>
        <path d="M 54 46 C 46 50 48 60 56 60 C 64 60 62 52 54 46 Z" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M 64 47 C 72 52 70 62 62 62 C 54 62 56 54 64 47 Z" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M 50 54 C 40 60 44 72 58 72 C 72 72 76 60 66 54" fill="none" stroke="currentColor" stroke-width="2.2"/>
        <path d="M 60 72 Q 58 84 60 88" stroke="currentColor" stroke-width="2.4" fill="none"/>
        <path d="M 59 78 Q 48 76 45 70" stroke="currentColor" stroke-width="2" fill="none"/>
        <path d="M 60 82 Q 72 80 75 74" stroke="currentColor" stroke-width="2" fill="none"/>
      </g>
    `
  },
  flower: {
    id: 'flower',
    name: 'Wild Anemone',
    render: () => `
      <g class="emblem-path">
        <!-- 5 Petal Flower -->
        <path d="M 60 58 C 58 40 62 40 60 58" fill="none"/>
        <path d="M 60 48 C 52 32 68 32 60 48 Z" fill="currentColor"/>
        <path d="M 52 54 C 36 44 44 32 56 50 Z" fill="currentColor"/>
        <path d="M 54 64 C 38 72 34 58 52 60 Z" fill="currentColor"/>
        <path d="M 66 64 C 82 72 86 58 68 60 Z" fill="currentColor"/>
        <path d="M 68 54 C 84 44 76 32 64 50 Z" fill="currentColor"/>
        <circle cx="60" cy="58" r="5" fill="currentColor"/>
        <circle cx="60" cy="58" r="2.5" fill="#FFFFFF" opacity="0.6"/>
      </g>
    `
  },
  initials: {
    id: 'initials',
    name: 'Embossed Initials',
    render: (initials = 'A') => `
      <g class="emblem-path">
        <!-- Neoclassical Oval Bevel Frame for Monogram -->
        <ellipse cx="60" cy="58" rx="24" ry="28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-dasharray="2,3"/>
        <text x="60" y="66" 
          font-family="'Playfair Display', 'Cormorant Garamond', Georgia, serif" 
          font-size="${initials.length > 1 ? '22' : '28'}" 
          font-weight="700" 
          text-anchor="middle" 
          fill="currentColor" 
          letter-spacing="${initials.length > 1 ? '1' : '0'}"
          style="text-shadow: 0 1px 2px rgba(255,255,255,0.4);">${escapeHtml(initials)}</text>
      </g>
    `
  }
};

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[m]);
}

/**
 * Generates an organic, melted wax puddle path with realistic drips and uneven lobes
 */
function generateWaxPuddlePath(shape = 'round', seed = 1) {
  if (shape === 'oval') {
    // Reference Image 1: Burgundy Oval with subtle drippy molten rim
    return `M 60 10 
      C 84 10, 96 24, 98 44 
      C 100 58, 97 76, 91 92 
      C 86 104, 74 110, 60 110 
      C 46 110, 34 104, 29 92 
      C 23 76, 20 58, 22 44 
      C 24 24, 36 10, 60 10 Z`;
  }
  // Round puddle with melted outer lobes (Reference Images 2 & 3)
  return `M 60 14 
    C 78 12, 92 18, 98 32 
    C 104 46, 108 58, 102 74 
    C 96 90, 86 102, 70 104 
    C 54 106, 42 108, 30 98 
    C 18 88, 12 76, 14 58 
    C 16 40, 24 22, 42 16 
    C 48 14, 54 15, 60 14 Z`;
}

/**
 * Render a complete realistic SVG wax seal
 * @param {Object} options
 * @param {string} options.color - burgundy, gold, navy, forest, blush, black
 * @param {string} options.emblem - lavender, laurel, leaf_branch, heart, rose, flower, initials
 * @param {string} options.initials - Letters to emboss when emblem is initials
 * @param {string} options.shape - 'round' or 'oval'
 * @param {number} options.size - width and height in px
 * @param {string} options.id - unique id for filters
 */
function renderWaxSealSVG({
  color = 'burgundy',
  emblem = 'lavender',
  initials = 'A',
  shape = 'oval',
  size = 110,
  id = null
} = {}) {
  const colorData = WAX_COLORS[color] || WAX_COLORS.burgundy;
  const emblemData = WAX_EMBLEMS[emblem] || WAX_EMBLEMS.lavender;
  const filterId = id || 'wax-filter-' + Math.random().toString(36).substr(2, 9);
  const puddlePath = generateWaxPuddlePath(shape);
  const isOval = shape === 'oval';

  const viewBox = isOval ? "0 0 120 120" : "0 0 120 120";

  return `
    <svg class="amorette-wax-seal-svg" width="${size}" height="${size}" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- 3D Specular & Organic Melt Filter -->
        <filter id="${filterId}" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" result="distorted"/>
          <feGaussianBlur in="distorted" stdDeviation="1.2" result="blurred"/>
          
          <!-- Bevel & Specular Highlight -->
          <feSpecularLighting in="blurred" surfaceScale="4.5" specularConstant="1.2" specularExponent="24" lighting-color="${colorData.specular}" result="specularLight">
            <feDistantLight azimuth="225" elevation="52" />
          </feSpecularLighting>
          
          <feComposite in="specularLight" in2="SourceAlpha" operator="in" result="specularHighlight"/>
          <feDiffuseLighting in="blurred" surfaceScale="2" diffuseConstant="1.1" lighting-color="${colorData.highlight}" result="diffuseLight">
            <feDistantLight azimuth="225" elevation="55" />
          </feDiffuseLighting>
          
          <feBlend in="SourceGraphic" in2="diffuseLight" mode="multiply" result="lit"/>
          <feComposite in="lit" in2="specularHighlight" operator="arithmetic" k1="0" k2="1" k3="0.8" k4="0"/>
        </filter>

        <!-- Drop shadow for the wax puddle -->
        <filter id="${filterId}-shadow" x="-30%" y="-20%" width="160%" height="160%">
          <feDropShadow dx="0" dy="6" stdDeviation="5" flood-color="rgba(15, 3, 7, 0.55)" />
        </filter>

        <!-- Gradients -->
        <radialGradient id="${filterId}-puddle-grad" cx="45%" cy="40%" r="65%">
          <stop offset="0%" stop-color="${colorData.highlight}" />
          <stop offset="60%" stop-color="${colorData.base}" />
          <stop offset="100%" stop-color="${colorData.shadow}" />
        </radialGradient>

        <radialGradient id="${filterId}-inner-grad" cx="42%" cy="38%" r="60%">
          <stop offset="0%" stop-color="${colorData.highlight}" stop-opacity="0.9" />
          <stop offset="70%" stop-color="${colorData.base}" />
          <stop offset="100%" stop-color="${colorData.shadow}" />
        </radialGradient>

        <linearGradient id="${filterId}-rim-grad" x1="20%" y1="20%" x2="80%" y2="80%">
          <stop offset="0%" stop-color="${colorData.specular}" stop-opacity="0.5" />
          <stop offset="50%" stop-color="${colorData.rim}" stop-opacity="0.2" />
          <stop offset="100%" stop-color="${colorData.shadow}" stop-opacity="0.7" />
        </linearGradient>
      </defs>

      <!-- Outer Puddle (Organic Melted Edges) with Drop Shadow -->
      <g filter="url(#${filterId}-shadow)">
        <path d="${puddlePath}" fill="url(#${filterId}-puddle-grad)" filter="url(#${filterId})" />
      </g>

      <!-- Raised Melted Rim Ring -->
      ${isOval ? `
        <!-- Oval Raised Outer Ring (Image 1) -->
        <ellipse cx="60" cy="60" rx="36" ry="46" fill="none" stroke="url(#${filterId}-rim-grad)" stroke-width="7" opacity="0.85"/>
        <ellipse cx="60" cy="60" rx="33" ry="43" fill="url(#${filterId}-inner-grad)"/>
        <!-- Inner Bevel Trench -->
        <ellipse cx="60" cy="60" rx="31" ry="41" fill="none" stroke="${colorData.shadow}" stroke-width="2.5" opacity="0.6"/>
        <ellipse cx="60" cy="59" rx="30" ry="40" fill="none" stroke="${colorData.specular}" stroke-width="1.2" opacity="0.45"/>
      ` : `
        <!-- Round Raised Outer Ring (Image 2 & 3) -->
        <circle cx="60" cy="60" r="39" fill="none" stroke="url(#${filterId}-rim-grad)" stroke-width="7.5" opacity="0.88"/>
        <circle cx="60" cy="60" r="35" fill="url(#${filterId}-inner-grad)"/>
        <!-- Inner Bevel Trench -->
        <circle cx="60" cy="60" r="33.5" fill="none" stroke="${colorData.shadow}" stroke-width="2.5" opacity="0.65"/>
        <circle cx="60" cy="59" r="33" fill="none" stroke="${colorData.specular}" stroke-width="1.2" opacity="0.45"/>
      `}

      <!-- Embossed Emblem Layer with 3D Emboss Shadow & Highlight -->
      <g class="wax-seal-emblem" color="${colorData.highlight}">
        <!-- Emboss Deep Shadow Offset -->
        <g transform="translate(0, 1.4)" color="${colorData.shadow}" opacity="0.7">
          ${emblemData.render(initials)}
        </g>
        <!-- Emboss Specular Highlight Offset -->
        <g transform="translate(0, -0.8)" color="${colorData.specular}" opacity="0.5">
          ${emblemData.render(initials)}
        </g>
        <!-- Main Emblem Face -->
        <g color="${colorData.rim}">
          ${emblemData.render(initials)}
        </g>
      </g>

      <!-- Gloss Arc Highlight on Upper Edge -->
      <path d="${isOval ? 'M 38 28 C 48 20 72 20 82 28' : 'M 35 32 C 48 24 72 24 85 32'}" 
        fill="none" stroke="${colorData.specular}" stroke-width="2.2" stroke-linecap="round" opacity="0.45" />
    </svg>
  `;
}

window.WAX_COLORS = WAX_COLORS;
window.WAX_EMBLEMS = WAX_EMBLEMS;
window.renderWaxSealSVG = renderWaxSealSVG;
