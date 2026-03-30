/**
 * AuroraBg — animated colored blobs with heavy blur, creating a northern-lights
 * aurora effect. Palette matches the cream/amber portfolio theme.
 * Inspired by Aceternity UI / 21st.dev aurora components.
 */
export default function AuroraBg() {
  return (
    <div className="aurora-root" aria-hidden>
      {/* SVG turbulence filter definition */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="aurora-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="55" result="blur" />
          </filter>
        </defs>
      </svg>

      <div className="aurora-canvas">
        {/* Blob 1 — warm amber, top-right */}
        <div className="aurora-blob a1" />
        {/* Blob 2 — creamy gold, center-top */}
        <div className="aurora-blob a2" />
        {/* Blob 3 — light tan, bottom-left */}
        <div className="aurora-blob a3" />
        {/* Blob 4 — deeper amber accent */}
        <div className="aurora-blob a4" />
        {/* Blob 5 — almost white/cream */}
        <div className="aurora-blob a5" />
      </div>

      {/* Noise grain overlay for texture */}
      <svg
        className="aurora-noise"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noise-f">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
          <feBlend in="SourceGraphic" mode="multiply" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-f)" opacity="0.04" />
      </svg>
    </div>
  )
}
