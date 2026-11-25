/**
 * Amorette - Postage Stamps Collection
 * Faithfully recreating reference images 6 (Apple Blossom 24c dark blue) and 7 (Sage Linocut Bird 15c),
 * plus an entire philatelic album of 12+ engraved and linocut stamps.
 */

const STAMPS_CATALOG = [
  {
    id: 'apple_blossom_24',
    name: 'Apple Blossom 24¢ (Engraved)',
    category: 'botanical',
    denomination: '24 cents',
    origin: 'Ref Image 6',
    bgColor: '#162C46',
    accentColor: '#E6A820',
    description: 'Dark-blue field with apple blossoms and gold denomination.',
    render: () => `
      <svg class="stamp-artwork" viewBox="0 0 140 180" xmlns="http://www.w3.org/2000/svg">
        <!-- Stamp Background -->
        <rect x="0" y="0" width="140" height="180" fill="#182E4B" />
        
        <!-- Faint Paper Crease & Texture -->
        <rect x="0" y="0" width="140" height="180" fill="none" stroke="#254266" stroke-width="1.5" />
        
        <!-- Gold Denomination Top Left -->
        <text x="14" y="32" font-family="'Playfair Display', Georgia, serif" font-size="28" font-weight="700" fill="#E8C366" letter-spacing="-1">24</text>
        <text x="48" y="24" font-family="'Playfair Display', Georgia, serif" font-size="11" font-weight="400" fill="#E8C366" font-style="italic">cents</text>
        
        <!-- Apple Blossom Branch (Hand-drawn SVG) -->
        <g class="apple-blossoms">
          <!-- Gnarled Branch -->
          <path d="M 140 150 Q 100 135 70 120 T 20 140" stroke="#4A3423" stroke-width="4.5" fill="none" stroke-linecap="round"/>
          <path d="M 70 120 Q 75 90 95 65" stroke="#4A3423" stroke-width="3" fill="none" stroke-linecap="round"/>
          <path d="M 90 75 Q 115 60 135 68" stroke="#4A3423" stroke-width="2" fill="none" stroke-linecap="round"/>
          <path d="M 45 125 Q 35 105 40 85" stroke="#4A3423" stroke-width="2.5" fill="none" stroke-linecap="round"/>
          
          <!-- Green Leaves with Veins -->
          <path d="M 60 110 C 45 95 55 75 75 90 C 85 105 70 120 60 110 Z" fill="#4B6636" opacity="0.9"/>
          <path d="M 60 110 L 70 90" stroke="#314421" stroke-width="1"/>
          
          <path d="M 100 100 C 115 85 130 95 125 115 C 110 125 95 115 100 100 Z" fill="#3D592C" opacity="0.9"/>
          <path d="M 78 60 C 65 45 80 35 95 45 C 100 55 90 70 78 60 Z" fill="#587A40" opacity="0.85"/>
          <path d="M 35 90 C 20 80 25 65 40 70 C 45 80 45 92 35 90 Z" fill="#466332" opacity="0.85"/>

          <!-- Blossom Clusters (Soft pink petals & golden stamen) -->
          <!-- Flower 1 Center -->
          <g transform="translate(85, 60)">
            <ellipse cx="-6" cy="0" rx="9" ry="7" fill="#FFF5F7" stroke="#EAA1B2" stroke-width="0.8"/>
            <ellipse cx="6" cy="-2" rx="9" ry="7" fill="#FDE6ED" stroke="#EAA1B2" stroke-width="0.8"/>
            <ellipse cx="0" cy="-7" rx="8" ry="9" fill="#FFFBFD" stroke="#EAA1B2" stroke-width="0.8"/>
            <ellipse cx="-4" cy="6" rx="8" ry="7" fill="#F8D4DE" stroke="#EAA1B2" stroke-width="0.8"/>
            <ellipse cx="5" cy="5" rx="8" ry="8" fill="#FFF5F7" stroke="#EAA1B2" stroke-width="0.8"/>
            <circle cx="0" cy="0" r="3.5" fill="#E8BD35"/>
            <!-- Stamen dots -->
            <circle cx="-2" cy="-2" r="0.9" fill="#8C2B3C"/>
            <circle cx="2" cy="1" r="0.9" fill="#8C2B3C"/>
          </g>

          <!-- Flower 2 (Upper right) -->
          <g transform="translate(112, 75)">
            <ellipse cx="-5" cy="0" rx="7" ry="6" fill="#FFF9FA" stroke="#EAA1B2" stroke-width="0.7"/>
            <ellipse cx="5" cy="-2" rx="7" ry="6" fill="#FCE1E8" stroke="#EAA1B2" stroke-width="0.7"/>
            <ellipse cx="0" cy="-5" rx="6" ry="7" fill="#FFFFFF" stroke="#EAA1B2" stroke-width="0.7"/>
            <ellipse cx="2" cy="5" rx="6" ry="6" fill="#F9D2DE" stroke="#EAA1B2" stroke-width="0.7"/>
            <circle cx="0" cy="0" r="2.8" fill="#E8BD35"/>
          </g>

          <!-- Flower 3 Buds (Lower Left cluster) -->
          <g transform="translate(48, 115)">
            <ellipse cx="0" cy="0" rx="6" ry="5" fill="#E88299"/>
            <ellipse cx="-4" cy="4" rx="5" ry="4" fill="#EAA2B4"/>
            <ellipse cx="4" cy="3" rx="5" ry="5" fill="#F2BAC8"/>
          </g>
        </g>
        
        <!-- Bottom Inscription "postage stamp" -->
        <text x="124" y="165" font-family="'Playfair Display', Georgia, serif" font-size="10" font-weight="400" fill="#E8C366" font-style="italic" text-anchor="end" letter-spacing="1.2">postage stamp</text>
      </svg>
    `
  },
  {
    id: 'sage_linocut_bird_15',
    name: 'Sage Hummingbird 15¢ (Linocut)',
    category: 'vintage',
    denomination: '15',
    origin: 'Ref Image 7',
    bgColor: '#96A98A',
    accentColor: '#4A2F22',
    description: 'Vintage sage-green stamp with brown linocut bird, asterisk, and cream border.',
    render: () => `
      <svg class="stamp-artwork" viewBox="0 0 140 180" xmlns="http://www.w3.org/2000/svg">
        <!-- Sage Outer Field -->
        <rect x="0" y="0" width="140" height="180" fill="#99AB8D" />
        
        <!-- Cream Inner Framed Border -->
        <rect x="12" y="12" width="116" height="156" fill="none" stroke="#E9E7D8" stroke-width="2.5" />
        <rect x="16" y="16" width="108" height="148" fill="#92A585" stroke="#7A8D6E" stroke-width="0.8" />
        
        <!-- Asterisk Top Left -->
        <g transform="translate(28, 30)" stroke="#4A2F22" stroke-width="2" stroke-linecap="round">
          <line x1="0" y1="-5" x2="0" y2="5" />
          <line x1="-5" y1="0" x2="5" y2="0" />
          <line x1="-3.5" y1="-3.5" x2="3.5" y2="3.5" />
          <line x1="-3.5" y1="3.5" x2="3.5" y2="-3.5" />
        </g>
        
        <!-- Denomination "15" Bottom Right -->
        <text x="110" y="152" font-family="'Playfair Display', Georgia, serif" font-size="24" font-weight="600" fill="#4A2F22" text-anchor="end">15</text>
        
        <!-- Linocut Hummingbird (Detailed woodblock SVG lines) -->
        <g class="linocut-bird" transform="translate(70, 92)" fill="#4A2F22" stroke="#4A2F22">
          <!-- Long delicate beak pointing right -->
          <path d="M 12 -22 Q 32 -26 42 -27" stroke-width="2" fill="none" stroke-linecap="round"/>
          <!-- Head & Eye -->
          <path d="M 4 -28 C 12 -30 18 -24 14 -18 C 10 -12 2 -14 0 -22 Z" stroke-width="0.5"/>
          <circle cx="8" cy="-23" r="1.8" fill="#92A585"/>
          <circle cx="8" cy="-23" r="0.8" fill="#4A2F22"/>
          
          <!-- Throat & Breast Hatching -->
          <path d="M 6 -16 C 14 -10 12 10 -2 20 C -8 10 -2 -6 6 -16 Z" stroke-width="0.8"/>
          <!-- Woodcut breast lines -->
          <path d="M 4 -12 L 8 -10 M 2 -6 L 8 -4 M 0 0 L 7 2 M -2 6 L 5 8" stroke="#92A585" stroke-width="1"/>
          
          <!-- Spreading Primary Wings (Linocut fan of feathers) -->
          <g class="wings">
            <!-- Wing Spine -->
            <path d="M -6 -18 C -14 -38 -28 -58 -32 -62 C -24 -50 -10 -30 2 -16" stroke-width="2.5" fill="none"/>
            <!-- Primary Feathers -->
            <path d="M -32 -62 Q -18 -45 -10 -25" stroke-width="1.8" fill="none"/>
            <path d="M -28 -56 Q -14 -40 -6 -20" stroke-width="1.8" fill="none"/>
            <path d="M -24 -48 Q -10 -34 -4 -16" stroke-width="1.8" fill="none"/>
            <path d="M -20 -40 Q -8 -28 -2 -12" stroke-width="1.8" fill="none"/>
            <path d="M -16 -32 Q -6 -22 0 -8" stroke-width="1.8" fill="none"/>
            <path d="M -12 -24 Q -4 -16 2 -4" stroke-width="1.8" fill="none"/>
            
            <!-- Secondary Wing Feathers (Left arch) -->
            <path d="M -32 -62 C -40 -40 -38 -15 -22 2 C -18 8 -8 5 -6 -8" stroke-width="1.2" fill="#4A2F22"/>
            <!-- Feather rib hatchings -->
            <line x1="-30" y1="-48" x2="-22" y2="-44" stroke="#92A585" stroke-width="1.2"/>
            <line x1="-30" y1="-38" x2="-20" y2="-34" stroke="#92A585" stroke-width="1.2"/>
            <line x1="-28" y1="-28" x2="-18" y2="-24" stroke="#92A585" stroke-width="1.2"/>
            <line x1="-24" y1="-18" x2="-14" y2="-14" stroke="#92A585" stroke-width="1.2"/>
          </g>
          
          <!-- Tapered Tail Feathers -->
          <g class="tail">
            <path d="M -6 18 C -12 32 -18 45 -22 52 C -18 45 -10 32 -4 20" stroke-width="2.2" fill="none"/>
            <path d="M -8 22 C -15 36 -24 48 -28 55" stroke-width="1.8" fill="none"/>
            <path d="M -4 24 C -8 34 -14 44 -18 48" stroke-width="1.6" fill="none"/>
          </g>
          
          <!-- Claws / Feet -->
          <path d="M 0 16 L 3 24 M 0 18 L 6 22" stroke-width="1.4" stroke-linecap="round"/>
        </g>
      </svg>
    `
  },
  {
    id: 'vintage_cherries_10',
    name: 'Sweet Cherries 10¢',
    category: 'botanical',
    denomination: '10¢',
    bgColor: '#FAF0E4',
    accentColor: '#931B2A',
    description: 'Engraved ruby cherries with delicate stem and leaf.',
    render: () => `
      <svg class="stamp-artwork" viewBox="0 0 140 180" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="140" height="180" fill="#FAF1E6" />
        <rect x="10" y="10" width="120" height="160" fill="none" stroke="#931B2A" stroke-width="1.5" stroke-dasharray="4,2"/>
        <text x="20" y="34" font-family="'Playfair Display', Georgia, serif" font-size="20" font-weight="700" fill="#931B2A">10¢</text>
        <text x="120" y="32" font-family="'Inter', sans-serif" font-size="8" font-weight="700" fill="#6B7258" text-anchor="end" letter-spacing="1">PAR AVION</text>
        
        <!-- Cherries Illustration -->
        <g transform="translate(70, 100)">
          <path d="M -5 -45 C 5 -48 20 -40 0 -15" stroke="#556B2F" stroke-width="2.4" fill="none"/>
          <path d="M 0 -15 C -15 5 -18 15 -18 18" stroke="#556B2F" stroke-width="2" fill="none"/>
          <path d="M 0 -15 C 15 5 18 15 18 18" stroke="#556B2F" stroke-width="2" fill="none"/>
          <!-- Leaf -->
          <path d="M -5 -45 C -25 -52 -32 -32 -10 -35 Z" fill="#6B8E23" stroke="#485F18" stroke-width="1"/>
          
          <!-- Left Cherry -->
          <circle cx="-18" cy="22" r="16" fill="#9E1528"/>
          <circle cx="-22" cy="18" r="4" fill="#E86E80" opacity="0.7"/>
          
          <!-- Right Cherry -->
          <circle cx="18" cy="24" r="16" fill="#82101F"/>
          <circle cx="14" cy="20" r="4" fill="#E86E80" opacity="0.7"/>
        </g>
        <text x="70" y="156" font-family="'Playfair Display', Georgia, serif" font-size="9" font-style="italic" fill="#5A4A42" text-anchor="middle">cerise douce</text>
      </svg>
    `
  },
  {
    id: 'luna_celestial_30',
    name: 'Midnight Luna 30¢',
    category: 'celestial',
    denomination: '30¢',
    bgColor: '#16192E',
    accentColor: '#DFC27D',
    description: 'Deep navy night sky with radiant golden crescent moon and constellation.',
    render: () => `
      <svg class="stamp-artwork" viewBox="0 0 140 180" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="140" height="180" fill="#141728" />
        <rect x="8" y="8" width="124" height="164" fill="none" stroke="#C9A24B" stroke-width="1.2" />
        <text x="70" y="28" font-family="'Playfair Display', Georgia, serif" font-size="11" font-weight="600" fill="#DFC27D" text-anchor="middle" letter-spacing="3">STELLAE</text>
        
        <!-- Crescent Moon -->
        <g transform="translate(68, 88)">
          <path d="M 10 -38 C -15 -38 -34 -18 -34 8 C -34 34 -15 54 10 54 C -5 44 -14 28 -14 8 C -14 -12 -5 -28 10 -38 Z" fill="#DFC27D"/>
          <!-- Star clusters -->
          <circle cx="24" cy="-22" r="2.2" fill="#FFFFFF"/>
          <circle cx="32" cy="5" r="1.5" fill="#FFFFFF" opacity="0.8"/>
          <circle cx="20" cy="28" r="1.8" fill="#FFFFFF"/>
          <line x1="24" y1="-22" x2="32" y2="5" stroke="#DFC27D" stroke-width="0.8" opacity="0.5"/>
          <line x1="32" y1="5" x2="20" y2="28" stroke="#DFC27D" stroke-width="0.8" opacity="0.5"/>
        </g>
        <text x="70" y="156" font-family="'Playfair Display', Georgia, serif" font-size="18" font-weight="700" fill="#DFC27D" text-anchor="middle">30¢</text>
      </svg>
    `
  },
  {
    id: 'monarch_butterfly_25',
    name: 'Monarch Butterfly 25¢',
    category: 'nature',
    denomination: '25¢',
    bgColor: '#FAF4E8',
    accentColor: '#C4621A',
    description: 'Detailed engraved linocut monarch butterfly with stained glass wings.',
    render: () => `
      <svg class="stamp-artwork" viewBox="0 0 140 180" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="140" height="180" fill="#F8F3E9" />
        <rect x="10" y="10" width="120" height="160" fill="none" stroke="#2B2625" stroke-width="1.8"/>
        <text x="20" y="32" font-family="'Playfair Display', Georgia, serif" font-size="20" font-weight="700" fill="#2B2625">25¢</text>
        
        <!-- Butterfly SVG -->
        <g transform="translate(70, 94)">
          <!-- Body -->
          <ellipse cx="0" cy="0" rx="2.5" ry="18" fill="#1E1917"/>
          <circle cx="0" cy="-18" r="3.2" fill="#1E1917"/>
          <path d="M -1 -21 Q -10 -32 -14 -35 M 1 -21 Q 10 -32 14 -35" stroke="#1E1917" stroke-width="1.2" fill="none"/>
          
          <!-- Left Wing -->
          <path d="M -2 -14 C -35 -40 -52 -10 -38 12 C -28 26 -8 18 -2 2 Z" fill="#D36B28" stroke="#1E1917" stroke-width="2"/>
          <path d="M -2 2 C -30 18 -36 38 -20 44 C -8 46 -2 24 -2 8 Z" fill="#C05C1D" stroke="#1E1917" stroke-width="2"/>
          
          <!-- Right Wing -->
          <path d="M 2 -14 C 35 -40 52 -10 38 12 C 28 26 8 18 2 2 Z" fill="#D36B28" stroke="#1E1917" stroke-width="2"/>
          <path d="M 2 2 C 30 18 36 38 20 44 C 8 46 2 24 2 8 Z" fill="#C05C1D" stroke="#1E1917" stroke-width="2"/>
        </g>
        <text x="70" y="158" font-family="'Playfair Display', Georgia, serif" font-size="10" font-style="italic" fill="#2B2625" text-anchor="middle" letter-spacing="1">Lepidoptera</text>
      </svg>
    `
  },
  {
    id: 'victorian_rose_18',
    name: 'Victorian Rose 18¢',
    category: 'botanical',
    denomination: '18¢',
    bgColor: '#FAF0F2',
    accentColor: '#962338',
    description: 'Crimson botanical rose with engraved petals and antique seal border.',
    render: () => `
      <svg class="stamp-artwork" viewBox="0 0 140 180" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="140" height="180" fill="#FAF0F2" />
        <rect x="10" y="10" width="120" height="160" fill="none" stroke="#962338" stroke-width="1.5" />
        <text x="20" y="32" font-family="'Playfair Display', Georgia, serif" font-size="18" font-weight="700" fill="#962338">18¢</text>
        <text x="120" y="32" font-family="'Pinyon Script', cursive" font-size="18" fill="#962338" text-anchor="end">Love</text>
        
        <g transform="translate(70, 92)" fill="#962338" stroke="#962338">
          <!-- Rose Bloom -->
          <circle cx="0" cy="-10" r="18" fill="#A8283E"/>
          <path d="M -8 -16 C -2 -22 10 -16 6 -10 C 2 -4 -6 -8 -8 -16 Z" fill="#FAD1D8"/>
          <path d="M -14 -10 C -12 2 4 4 10 -4" stroke="#FCE8EC" stroke-width="2" fill="none"/>
          <path d="M -10 -4 C -8 10 12 12 14 0" stroke="#FCE8EC" stroke-width="2" fill="none"/>
          <!-- Stem & Thorn -->
          <path d="M 0 8 Q 4 30 -2 50" stroke="#486333" stroke-width="3" fill="none"/>
          <path d="M 2 24 Q 16 18 14 30 Q 6 30 2 26" fill="#486333"/>
          <path d="M -1 36 Q -15 30 -13 42 Q -5 42 -1 38" fill="#486333"/>
        </g>
        <text x="70" y="160" font-family="'Playfair Display', Georgia, serif" font-size="9" fill="#962338" text-anchor="middle" letter-spacing="2">POSTAGE</text>
      </svg>
    `
  },
  {
    id: 'calico_cat_8',
    name: 'Sleeping Cat 8¢',
    category: 'whimsical',
    denomination: '8¢',
    bgColor: '#F6EFE6',
    accentColor: '#3C281F',
    description: 'Linocut sleeping kitten curled in a warm slumber.',
    render: () => `
      <svg class="stamp-artwork" viewBox="0 0 140 180" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="140" height="180" fill="#F7EFE4" />
        <rect x="12" y="12" width="116" height="156" fill="none" stroke="#3C281F" stroke-width="1.8"/>
        <text x="70" y="32" font-family="'Playfair Display', Georgia, serif" font-size="10" font-weight="600" fill="#3C281F" text-anchor="middle" letter-spacing="2">PETIT CHAT</text>
        
        <!-- Sleeping Cat SVG -->
        <g transform="translate(70, 92)">
          <!-- Curled Body -->
          <ellipse cx="0" cy="6" rx="34" ry="26" fill="#D48647"/>
          <ellipse cx="-4" cy="8" rx="26" ry="18" fill="#FAF6EE"/>
          <!-- Head -->
          <circle cx="-18" cy="-6" r="14" fill="#D48647"/>
          <polygon points="-26,-16 -18,-24 -16,-14" fill="#3C281F"/>
          <polygon points="-16,-18 -8,-24 -10,-12" fill="#D48647"/>
          <!-- Sleeping eyes -->
          <path d="M -24 -6 Q -20 -3 -16 -6 M -14 -6 Q -10 -3 -6 -6" stroke="#3C281F" stroke-width="1.8" fill="none" stroke-linecap="round"/>
          <!-- Calico patches -->
          <path d="M 8 -12 C 16 -16 26 -4 20 8 C 14 14 6 6 8 -12 Z" fill="#3C281F"/>
          <!-- Curled Tail -->
          <path d="M 28 14 C 36 12 36 -6 24 -12" stroke="#D48647" stroke-width="5" fill="none" stroke-linecap="round"/>
        </g>
        <text x="70" y="156" font-family="'Playfair Display', Georgia, serif" font-size="18" font-weight="700" fill="#3C281F" text-anchor="middle">8¢</text>
      </svg>
    `
  },
  {
    id: 'gilded_sol_50',
    name: 'Gilded Sun 50¢',
    category: 'celestial',
    denomination: '50¢',
    bgColor: '#231B15',
    accentColor: '#E2B84D',
    description: 'Radiating celestial sun with benevolent antique face and golden rays.',
    render: () => `
      <svg class="stamp-artwork" viewBox="0 0 140 180" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="140" height="180" fill="#201712" />
        <rect x="8" y="8" width="124" height="164" fill="none" stroke="#E2B84D" stroke-width="1.4"/>
        <text x="70" y="28" font-family="'Playfair Display', Georgia, serif" font-size="10" font-weight="700" fill="#E2B84D" text-anchor="middle" letter-spacing="3">SOLIS</text>
        
        <!-- Sun Face & Rays -->
        <g transform="translate(70, 90)">
          <!-- Rays -->
          ${[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => `
            <g transform="rotate(${deg})">
              <path d="M 0 -28 L 5 -46 L 0 -42 L -5 -46 Z" fill="#E2B84D"/>
              <line x1="0" y1="-28" x2="0" y2="-38" stroke="#E2B84D" stroke-width="1.5"/>
            </g>
          `).join('')}
          <circle cx="0" cy="0" r="26" fill="#D3A233"/>
          <circle cx="0" cy="0" r="24" fill="#E2B84D"/>
          <!-- Serene Face -->
          <path d="M -10 -4 Q -6 -2 -2 -4 M 2 -4 Q 6 -2 10 -4" stroke="#68470E" stroke-width="1.6" fill="none"/>
          <path d="M 0 -2 L 1 5 L -3 5" stroke="#68470E" stroke-width="1.4" fill="none"/>
          <path d="M -6 10 Q 0 15 6 10" stroke="#68470E" stroke-width="1.6" fill="none"/>
        </g>
        <text x="70" y="160" font-family="'Playfair Display', Georgia, serif" font-size="20" font-weight="700" fill="#E2B84D" text-anchor="middle">50¢</text>
      </svg>
    `
  },
  {
    id: 'forest_mushrooms_12',
    name: 'Forest Morel 12¢',
    category: 'nature',
    denomination: '12¢',
    bgColor: '#EAF0E6',
    accentColor: '#2F4832',
    description: 'Woodland mushrooms with pine needles and engraved botanical moss.',
    render: () => `
      <svg class="stamp-artwork" viewBox="0 0 140 180" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="140" height="180" fill="#EBF2E6" />
        <rect x="10" y="10" width="120" height="160" fill="none" stroke="#2B462F" stroke-width="1.5"/>
        <text x="20" y="32" font-family="'Playfair Display', Georgia, serif" font-size="18" font-weight="700" fill="#2B462F">12¢</text>
        
        <!-- Mushrooms -->
        <g transform="translate(70, 94)">
          <!-- Big Mushroom -->
          <path d="M -6 10 L -4 40 L 8 40 L 6 10" fill="#E6DAC8" stroke="#3E3025" stroke-width="1.2"/>
          <path d="M -26 10 C -26 -16 26 -16 26 10 Z" fill="#993326" stroke="#3E3025" stroke-width="1.8"/>
          <!-- Polka dots -->
          <circle cx="-12" cy="0" r="3" fill="#FFFBF0"/>
          <circle cx="8" cy="-4" r="3.5" fill="#FFFBF0"/>
          <circle cx="0" cy="5" r="2.5" fill="#FFFBF0"/>
          <!-- Small Baby Mushroom -->
          <path d="M -18 24 L -16 42 L -8 42 L -10 24" fill="#E6DAC8"/>
          <path d="M -24 24 C -24 10 -4 10 -4 24 Z" fill="#B34433"/>
          <!-- Grass blades -->
          <path d="M -30 42 Q -22 28 -14 42 M 10 42 Q 18 26 26 42" stroke="#4B6E3E" stroke-width="2" fill="none"/>
        </g>
        <text x="70" y="158" font-family="'Playfair Display', Georgia, serif" font-size="9" fill="#2B462F" text-anchor="middle" letter-spacing="1">SILVA</text>
      </svg>
    `
  },
  {
    id: 'lavender_provence_20',
    name: 'Wild Lavender 20¢',
    category: 'botanical',
    denomination: '20¢',
    bgColor: '#F3EEF8',
    accentColor: '#583F73',
    description: 'Fragrant French lavender bunch tied with an engraved cream bow.',
    render: () => `
      <svg class="stamp-artwork" viewBox="0 0 140 180" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="140" height="180" fill="#F4EDFA" />
        <rect x="10" y="10" width="120" height="160" fill="none" stroke="#5D437A" stroke-width="1.5"/>
        <text x="20" y="32" font-family="'Playfair Display', Georgia, serif" font-size="18" font-weight="700" fill="#5D437A">20¢</text>
        <text x="120" y="30" font-family="'Pinyon Script', cursive" font-size="16" fill="#5D437A" text-anchor="end">Provence</text>
        
        <g transform="translate(70, 95)" stroke="#5D437A">
          <!-- Stems -->
          <line x1="-8" y1="45" x2="0" y2="-20" stroke="#5B784E" stroke-width="2"/>
          <line x1="0" y1="45" x2="-14" y2="-15" stroke="#5B784E" stroke-width="2"/>
          <line x1="8" y1="45" x2="14" y2="-18" stroke="#5B784E" stroke-width="2"/>
          <!-- Florets -->
          <g fill="#7A589E" stroke="none">
            ${[-20, -14, -8, -2, 4].map(y => `
              <circle cx="0" cy="${y}" r="3"/>
              <circle cx="-4" cy="${y+2}" r="2.5"/>
              <circle cx="4" cy="${y+2}" r="2.5"/>
            `).join('')}
            ${[-15, -9, -3, 3].map(y => `
              <circle cx="-14" cy="${y}" r="2.6"/>
              <circle cx="-17" cy="${y+2}" r="2.2"/>
              <circle cx="-11" cy="${y+2}" r="2.2"/>
            `).join('')}
            ${[-18, -12, -6, 0].map(y => `
              <circle cx="14" cy="${y}" r="2.6"/>
              <circle cx="11" cy="${y+2}" r="2.2"/>
              <circle cx="17" cy="${y+2}" r="2.2"/>
            `).join('')}
          </g>
          <!-- Ribbon Bow -->
          <circle cx="0" cy="22" r="3.5" fill="#C9A24B" stroke="#947427"/>
          <path d="M -8 18 Q 0 22 -6 28 M 8 18 Q 0 22 6 28" stroke="#C9A24B" stroke-width="2" fill="none"/>
        </g>
        <text x="70" y="160" font-family="'Playfair Display', Georgia, serif" font-size="9" fill="#5D437A" text-anchor="middle" letter-spacing="1">LAVANDULA</text>
      </svg>
    `
  },
  {
    id: 'winged_heart_5',
    name: 'Airmail Heart 5¢',
    category: 'romantic',
    denomination: '5¢',
    bgColor: '#FAF2F4',
    accentColor: '#93182C',
    description: 'Classic engraved airmail wings holding an engraved crimson heart.',
    render: () => `
      <svg class="stamp-artwork" viewBox="0 0 140 180" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="140" height="180" fill="#FAF2F4" />
        <!-- Airmail border stripes -->
        <rect x="10" y="10" width="120" height="160" fill="none" stroke="#93182C" stroke-width="1.8"/>
        <text x="70" y="30" font-family="'Inter', sans-serif" font-size="9" font-weight="700" fill="#93182C" text-anchor="middle" letter-spacing="2">AIR MAIL</text>
        
        <g transform="translate(70, 92)">
          <!-- Wings Left -->
          <path d="M -12 -6 C -32 -26 -52 -10 -46 16 C -36 12 -22 6 -12 4 Z" fill="#E6D3DA" stroke="#93182C" stroke-width="1.5"/>
          <!-- Wings Right -->
          <path d="M 12 -6 C 32 -26 52 -10 46 16 C 36 12 22 6 12 4 Z" fill="#E6D3DA" stroke="#93182C" stroke-width="1.5"/>
          <!-- Heart -->
          <path d="M 0 18 C -22 4 -22 -16 0 -8 C 22 -16 22 4 0 18 Z" fill="#93182C"/>
        </g>
        <text x="70" y="156" font-family="'Playfair Display', Georgia, serif" font-size="22" font-weight="700" fill="#93182C" text-anchor="middle">5¢</text>
      </svg>
    `
  },
  {
    id: 'birthday_cake_35',
    name: 'Birthday Cake 35¢',
    category: 'seasonal',
    denomination: '35¢',
    bgColor: '#FDF4F6',
    accentColor: '#8C1D38',
    description: 'Candlelit celebratory birthday cake with golden spark and strawberry glaze.',
    render: () => `
      <svg class="stamp-artwork" viewBox="0 0 140 180" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="140" height="180" fill="#FBF2F4" />
        <rect x="10" y="10" width="120" height="160" fill="none" stroke="#8C1D38" stroke-width="1.5"/>
        <text x="20" y="32" font-family="'Playfair Display', Georgia, serif" font-size="18" font-weight="700" fill="#8C1D38">35¢</text>
        <text x="120" y="32" font-family="'Pinyon Script', cursive" font-size="18" fill="#8C1D38" text-anchor="end">Joyeux</text>
        
        <g transform="translate(70, 96)">
          <!-- Cake Stand -->
          <path d="M -30 36 L 30 36 M 0 36 L 0 44 M -16 44 L 16 44" stroke="#C9A24B" stroke-width="2"/>
          <!-- Bottom Tier -->
          <rect x="-24" y="14" width="48" height="22" rx="2" fill="#FAF0E1" stroke="#4A3423" stroke-width="1.2"/>
          <path d="M -24 14 Q -16 20 -8 14 Q 0 20 8 14 Q 16 20 24 14" fill="#C43B52"/>
          <!-- Top Tier -->
          <rect x="-16" y="-4" width="32" height="18" rx="2" fill="#FAF0E1" stroke="#4A3423" stroke-width="1.2"/>
          <path d="M -16 -4 Q -8 2 0 -4 Q 8 2 16 -4" fill="#C43B52"/>
          <!-- Candle & Flame -->
          <line x1="0" y1="-4" x2="0" y2="-16" stroke="#93182C" stroke-width="2.5"/>
          <ellipse cx="0" cy="-21" rx="3.5" ry="5.5" fill="#F5C038"/>
          <circle cx="0" cy="-20" r="1.8" fill="#E8482A"/>
        </g>
        <text x="70" y="160" font-family="'Playfair Display', Georgia, serif" font-size="9" fill="#8C1D38" text-anchor="middle" letter-spacing="1">CELEBRATION</text>
      </svg>
    `
  }
];

/**
 * Returns a postal cancellation mark SVG
 * (Circular postmark + wavy cancel lines)
 */
function renderPostmarkSVG(city = 'PARIS', date = '23.NOV.26') {
  return `
    <svg class="postmark-overlay" viewBox="0 0 160 90" xmlns="http://www.w3.org/2000/svg">
      <g stroke="#2C1D18" fill="none" opacity="0.68" transform="rotate(-6, 80, 45)">
        <!-- Circular Postal Ring -->
        <circle cx="45" cy="45" r="32" stroke-width="1.6"/>
        <circle cx="45" cy="45" r="29" stroke-width="0.8" stroke-dasharray="2,2"/>
        <text x="45" y="32" font-family="'Inter', sans-serif" font-size="7" font-weight="700" fill="#2C1D18" stroke="none" text-anchor="middle" letter-spacing="1.5">${city}</text>
        <text x="45" y="48" font-family="'Inter', sans-serif" font-size="6.5" font-weight="600" fill="#2C1D18" stroke="none" text-anchor="middle" letter-spacing="0.5">${date}</text>
        <text x="45" y="62" font-family="'Inter', sans-serif" font-size="6" font-weight="500" fill="#2C1D18" stroke="none" text-anchor="middle" letter-spacing="1">POSTES</text>

        <!-- Wavy Postal Cancellation Bars -->
        <path d="M 85 28 Q 95 24 105 28 T 125 28 T 145 28" stroke-width="1.4"/>
        <path d="M 82 38 Q 92 34 102 38 T 122 38 T 148 38" stroke-width="1.4"/>
        <path d="M 84 48 Q 94 44 104 48 T 124 48 T 150 48" stroke-width="1.4"/>
        <path d="M 86 58 Q 96 54 106 58 T 126 58 T 146 58" stroke-width="1.4"/>
      </g>
    </svg>
  `;
}

/**
 * Returns a complete stamp element with perforated SVG edges
 */
function renderCompleteStamp(stampId, hasPostmark = true) {
  const stamp = STAMPS_CATALOG.find(s => s.id === stampId) || STAMPS_CATALOG[0];
  return `
    <div class="amorette-stamp-wrapper" data-stamp-id="${stamp.id}">
      <div class="amorette-stamp-perforations">
        ${stamp.render()}
        ${hasPostmark ? renderPostmarkSVG() : ''}
      </div>
    </div>
  `;
}

window.STAMPS_CATALOG = STAMPS_CATALOG;
window.renderPostmarkSVG = renderPostmarkSVG;
window.renderCompleteStamp = renderCompleteStamp;
