/**
 * Generates stylized, crisp SVG product illustrations for Ajota Mart items.
 * Uses SVG data-URIs so products load instantly and reliably with zero external dependencies.
 */

export function createProductImage(
  type: string,
  title: string,
  category: string,
  primaryColor: string,
  accentColor: string
): string {
  const encodedTitle = encodeURIComponent(title.length > 20 ? title.slice(0, 18) + '..' : title);
  
  let iconSvg = '';
  switch (type) {
    case 'flour': // Sack
      iconSvg = `
        <rect x="120" y="110" width="160" height="200" rx="20" fill="${primaryColor}" />
        <path d="M 120 150 Q 200 130 280 150 L 280 290 Q 200 320 120 290 Z" fill="${accentColor}" opacity="0.25"/>
        <path d="M 160 110 Q 200 80 240 110" stroke="#FFE885" stroke-width="8" fill="none" stroke-linecap="round"/>
        <circle cx="200" cy="200" r="36" fill="#FFF8EC" />
        <text x="200" y="206" font-family="sans-serif" font-weight="900" font-size="20" fill="${primaryColor}" text-anchor="middle">CHAKKI</text>
      `;
      break;
    case 'oil': // Bottle / Tin
      iconSvg = `
        <rect x="150" y="80" width="100" height="35" rx="8" fill="${accentColor}" />
        <rect x="175" y="55" width="50" height="25" rx="6" fill="#FFE885" />
        <path d="M 150 115 L 120 160 L 120 310 Q 200 330 280 310 L 280 160 L 250 115 Z" fill="${primaryColor}" />
        <rect x="135" y="175" width="130" height="110" rx="12" fill="#FFF8EC" />
        <circle cx="200" cy="225" r="24" fill="${accentColor}" opacity="0.2" />
        <path d="M 200 205 Q 185 230 200 245 Q 215 230 200 205 Z" fill="${accentColor}" />
      `;
      break;
    case 'ghee': // Jar / Tin
      iconSvg = `
        <rect x="120" y="120" width="160" height="180" rx="24" fill="${primaryColor}" />
        <ellipse cx="200" cy="120" rx="80" ry="24" fill="${accentColor}" />
        <ellipse cx="200" cy="115" rx="60" ry="16" fill="#FFE885" />
        <rect x="135" y="160" width="130" height="110" rx="14" fill="#FFF8EC" />
        <text x="200" y="215" font-family="sans-serif" font-weight="900" font-size="24" fill="#C2570C" text-anchor="middle">PURE</text>
        <text x="200" y="242" font-family="sans-serif" font-weight="700" font-size="14" fill="#1B1209" text-anchor="middle">DESI GHEE</text>
      `;
      break;
    case 'spices': // Pouch
      iconSvg = `
        <path d="M 130 90 L 270 90 L 285 300 Q 200 330 115 300 Z" fill="${primaryColor}" />
        <line x1="130" y1="110" x2="270" y2="110" stroke="#FFE885" stroke-width="4" stroke-dasharray="6,4" />
        <rect x="135" y="145" width="130" height="120" rx="16" fill="#FFF8EC" />
        <circle cx="200" cy="200" r="28" fill="${accentColor}" />
        <text x="200" y="206" font-family="sans-serif" font-weight="800" font-size="18" fill="#FFF8EC" text-anchor="middle">MASALA</text>
      `;
      break;
    case 'snack': // Biscuit / Chips packet
      iconSvg = `
        <rect x="110" y="120" width="180" height="170" rx="20" fill="${primaryColor}" />
        <path d="M 100 120 L 110 110 L 110 300 L 100 290 Z" fill="${accentColor}" opacity="0.6"/>
        <path d="M 300 120 L 290 110 L 290 300 L 300 290 Z" fill="${accentColor}" opacity="0.6"/>
        <circle cx="200" cy="205" r="45" fill="#FFE885" />
        <circle cx="200" cy="205" r="35" fill="${accentColor}" />
        <text x="200" y="212" font-family="sans-serif" font-weight="900" font-size="18" fill="#FFF8EC" text-anchor="middle">CRISP</text>
      `;
      break;
    case 'beverage': // Bottle / Box
      iconSvg = `
        <rect x="130" y="100" width="140" height="210" rx="18" fill="${primaryColor}" />
        <rect x="165" y="65" width="70" height="35" rx="8" fill="${accentColor}" />
        <rect x="145" y="145" width="110" height="130" rx="14" fill="#FFF8EC" />
        <path d="M 180 195 Q 200 170 220 195 Q 200 235 180 195 Z" fill="${accentColor}" />
        <text x="200" y="250" font-family="sans-serif" font-weight="800" font-size="14" fill="${primaryColor}" text-anchor="middle">CHAI / SIP</text>
      `;
      break;
    case 'cream': // Jar / Cosmetic
      iconSvg = `
        <rect x="125" y="160" width="150" height="130" rx="28" fill="${primaryColor}" />
        <ellipse cx="200" cy="160" rx="75" ry="24" fill="${accentColor}" />
        <ellipse cx="200" cy="155" rx="60" ry="16" fill="#FFE885" />
        <rect x="145" y="200" width="110" height="65" rx="12" fill="#FFF8EC" />
        <text x="200" y="240" font-family="sans-serif" font-weight="800" font-size="15" fill="${primaryColor}" text-anchor="middle">GLOW</text>
      `;
      break;
    case 'shampoo': // Bottle
      iconSvg = `
        <rect x="175" y="65" width="50" height="30" rx="6" fill="${accentColor}" />
        <path d="M 155 95 Q 200 80 245 95 L 260 295 Q 200 325 140 295 Z" fill="${primaryColor}" />
        <rect x="155" y="145" width="90" height="120" rx="16" fill="#FFF8EC" />
        <path d="M 190 190 Q 200 160 210 190 Q 220 220 200 220 Q 180 220 190 190 Z" fill="${accentColor}" />
        <text x="200" y="250" font-family="sans-serif" font-weight="800" font-size="13" fill="${primaryColor}" text-anchor="middle">CARE</text>
      `;
      break;
    case 'notebook': // Book
      iconSvg = `
        <rect x="110" y="80" width="180" height="240" rx="12" fill="${primaryColor}" />
        <rect x="110" y="80" width="28" height="240" rx="6" fill="${accentColor}" />
        <line x1="124" y1="100" x2="124" y2="300" stroke="#FFE885" stroke-width="4" stroke-dasharray="10,8" />
        <rect x="155" y="130" width="115" height="140" rx="8" fill="#FFF8EC" />
        <line x1="168" y1="165" x2="255" y2="165" stroke="#CBD5E1" stroke-width="3" />
        <line x1="168" y1="190" x2="255" y2="190" stroke="#CBD5E1" stroke-width="3" />
        <line x1="168" y1="215" x2="255" y2="215" stroke="#CBD5E1" stroke-width="3" />
        <line x1="168" y1="240" x2="225" y2="240" stroke="#CBD5E1" stroke-width="3" />
      `;
      break;
    case 'pen': // Stationery set
      iconSvg = `
        <rect x="120" y="100" width="160" height="210" rx="16" fill="#FFF8EC" stroke="${accentColor}" stroke-width="4" />
        <!-- Pens -->
        <rect x="145" y="120" width="16" height="150" rx="4" fill="${primaryColor}" />
        <polygon points="145,270 161,270 153,290" fill="#1B1209" />
        <rect x="175" y="115" width="16" height="155" rx="4" fill="${accentColor}" />
        <polygon points="175,270 191,270 183,290" fill="#1B1209" />
        <rect x="205" y="120" width="16" height="150" rx="4" fill="#2563EB" />
        <polygon points="205,270 221,270 213,290" fill="#1B1209" />
        <rect x="235" y="125" width="16" height="145" rx="4" fill="#059669" />
        <polygon points="235,270 251,270 243,290" fill="#1B1209" />
      `;
      break;
    case 'cleaner': // Trigger / Jug
      iconSvg = `
        <rect x="180" y="60" width="40" height="40" rx="4" fill="${accentColor}" />
        <path d="M 220 70 L 255 70 L 255 85 L 220 85 Z" fill="${accentColor}" />
        <path d="M 150 110 Q 200 95 250 110 L 265 300 Q 200 330 135 300 Z" fill="${primaryColor}" />
        <rect x="150" y="170" width="100" height="100" rx="14" fill="#FFF8EC" />
        <path d="M 190 200 L 205 215 L 225 190" stroke="#16A34A" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round" />
        <text x="200" y="250" font-family="sans-serif" font-weight="800" font-size="12" fill="${primaryColor}" text-anchor="middle">CLEAN</text>
      `;
      break;
    case 'detergent': // Bag
      iconSvg = `
        <path d="M 125 100 L 275 100 L 290 305 Q 200 330 110 305 Z" fill="${primaryColor}" />
        <rect x="170" y="75" width="60" height="25" rx="6" fill="${accentColor}" />
        <circle cx="200" cy="205" r="48" fill="#FFF8EC" />
        <path d="M 175 205 Q 200 170 225 205 Q 200 240 175 205 Z" fill="${accentColor}" />
        <text x="200" y="240" font-family="sans-serif" font-weight="900" font-size="14" fill="${primaryColor}" text-anchor="middle">WASH</text>
      `;
      break;
    case 'pooja': // Agarbatti / Camphor
      iconSvg = `
        <rect x="120" y="90" width="160" height="230" rx="14" fill="${primaryColor}" />
        <rect x="135" y="110" width="130" height="190" rx="10" fill="#FFF8EC" />
        <!-- Diya / Flame -->
        <ellipse cx="200" cy="230" rx="35" ry="14" fill="${accentColor}" />
        <path d="M 195 220 Q 200 185 205 185 Q 210 215 195 220 Z" fill="#F59E0B" />
        <path d="M 197 215 Q 200 195 203 195 Q 206 210 197 215 Z" fill="#EF4444" />
        <text x="200" y="160" font-family="sans-serif" font-weight="900" font-size="14" fill="${primaryColor}" text-anchor="middle">POOJA</text>
      `;
      break;
    default:
      iconSvg = `
        <rect x="120" y="110" width="160" height="190" rx="20" fill="${primaryColor}" />
        <rect x="140" y="150" width="120" height="110" rx="12" fill="#FFF8EC" />
        <circle cx="200" cy="205" r="28" fill="${accentColor}" />
      `;
  }

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
      <defs>
        <radialGradient id="cardBg" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="100%" stop-color="#F8F3EA" />
        </radialGradient>
        <filter id="itemShadow" x="-10%" y="-10%" width="125%" height="125%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#1B1209" flood-opacity="0.12" />
        </filter>
      </defs>
      <!-- Background Card -->
      <rect width="400" height="400" rx="24" fill="url(#cardBg)" />
      
      <!-- Subtle Decorative Floor shadow -->
      <ellipse cx="200" cy="335" rx="105" ry="16" fill="#000000" fill-opacity="0.06" />

      <!-- Rendered Product Asset -->
      <g filter="url(#itemShadow)">
        ${iconSvg}
      </g>

      <!-- Category watermark at bottom -->
      <text x="200" y="375" font-family="'Poppins', sans-serif" font-size="13" font-weight="600" fill="#9C816E" text-anchor="middle" letter-spacing="1">
        AJOTA MART · ${category.toUpperCase()}
      </text>
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;
}
