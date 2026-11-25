/**
 * Amorette - Decorations, Polaroids, Pushpins & Textures
 */

function renderPushpinSVG(color = 'crimson') {
  const isRed = color === 'crimson';
  const headColor = isRed ? '#961B2E' : '#B88F28';
  const headHighlight = isRed ? '#F27488' : '#FCE28A';
  const headShadow = isRed ? '#520B16' : '#694E0C';

  return `
    <svg class="amorette-pushpin" viewBox="0 0 32 38" width="30" height="36" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="pin-head-${color}" cx="35%" cy="32%" r="65%">
          <stop offset="0%" stop-color="${headHighlight}"/>
          <stop offset="60%" stop-color="${headColor}"/>
          <stop offset="100%" stop-color="${headShadow}"/>
        </radialGradient>
        <filter id="pin-shadow" x="-30%" y="-20%" width="160%" height="160%">
          <feDropShadow dx="2" dy="5" stdDeviation="2.5" flood-color="rgba(18, 4, 8, 0.45)"/>
        </filter>
      </defs>
      
      <!-- Needle Tip with shadow -->
      <line x1="16" y1="24" x2="16" y2="34" stroke="#666666" stroke-width="2" stroke-linecap="round" />
      <line x1="15.5" y1="24" x2="15.5" y2="33" stroke="#B0B0B0" stroke-width="0.8" />
      
      <!-- Round Pushpin Head with Specular Ball Highlight -->
      <g filter="url(#pin-shadow)">
        <!-- Rim Base -->
        <ellipse cx="16" cy="22" rx="9" ry="4" fill="${headShadow}"/>
        <!-- Barrel -->
        <path d="M 9 22 L 12 12 L 20 12 L 23 22 Z" fill="${headColor}"/>
        <!-- Top Dome -->
        <circle cx="16" cy="11" r="7.5" fill="url(#pin-head-${color})"/>
        <!-- Glint Highlight -->
        <circle cx="13.5" cy="8.5" r="2.2" fill="#FFFFFF" opacity="0.75"/>
      </g>
    </svg>
  `;
}

/**
 * Renders an authentic Polaroid with editable handwritten caption,
 * slight organic tilt, and a brass/crimson pushpin.
 */
function createPolaroidElement({
  id = 'polaroid-' + Date.now(),
  imageUrl = 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=400&q=80',
  caption = 'our favourite afternoon',
  rotation = -3,
  left = 20,
  top = 40,
  pinColor = 'crimson'
} = {}) {
  const container = document.createElement('div');
  container.className = 'amorette-polaroid drag-item';
  container.id = id;
  container.style.transform = `rotate(${rotation}deg)`;
  container.style.left = `${left}px`;
  container.style.top = `${top}px`;

  container.innerHTML = `
    <div class="polaroid-pin-wrapper">
      ${renderPushpinSVG(pinColor)}
    </div>
    <div class="polaroid-inner">
      <div class="polaroid-photo-frame">
        <img class="polaroid-img" src="${imageUrl}" alt="Polaroid photo" loading="lazy" />
        <label class="polaroid-change-label" title="Change photo">
          <input type="file" accept="image/*" class="polaroid-file-input" style="display:none;" />
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
        </label>
      </div>
      <div class="polaroid-caption" contenteditable="true" spellcheck="false">${caption}</div>
    </div>
    <button class="polaroid-delete-btn" title="Remove photo" aria-label="Remove photo">×</button>
  `;

  // Attach file upload listener with client-side image compression
  const fileInput = container.querySelector('.polaroid-file-input');
  const imgEl = container.querySelector('.polaroid-img');
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        compressImageToDataUrl(file, 600, 0.85, (compressedUrl) => {
          imgEl.src = compressedUrl;
        });
      }
    });
  }

  // Delete button
  const delBtn = container.querySelector('.polaroid-delete-btn');
  if (delBtn) {
    delBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      container.remove();
    });
  }

  return container;
}

/**
 * Client-side photo compression for instant lightweight uploads
 */
function compressImageToDataUrl(file, maxDimension = 600, quality = 0.85, callback) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      let width = img.width;
      let height = img.height;
      if (width > height) {
        if (width > maxDimension) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        }
      } else {
        if (height > maxDimension) {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL('image/jpeg', quality);
      callback(dataUrl);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

window.renderPushpinSVG = renderPushpinSVG;
window.createPolaroidElement = createPolaroidElement;
window.compressImageToDataUrl = compressImageToDataUrl;
