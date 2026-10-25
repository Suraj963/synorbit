/** The Synorbit rocket, shared by the launch loader and the 404 page. */
export function Rocket({ idPrefix, className }: { idPrefix: string; className?: string }) {
  const body = `${idPrefix}-rocket-body`;
  const fin = `${idPrefix}-rocket-fin`;
  return (
    <svg className={className} viewBox="0 0 64 128" role="presentation" aria-hidden>
      <defs>
        <linearGradient id={body} x1="0" x2="1">
          <stop offset="0" stopColor="#c9d3ea" />
          <stop offset="0.45" stopColor="#ffffff" />
          <stop offset="1" stopColor="#aeb9d4" />
        </linearGradient>
        <linearGradient id={fin} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#93b0ff" />
          <stop offset="1" stopColor="#4f7bff" />
        </linearGradient>
      </defs>
      <path d="M18 70 L5 98 L19 93 Z" fill={`url(#${fin})`} />
      <path d="M46 70 L59 98 L45 93 Z" fill={`url(#${fin})`} />
      <path
        d="M32 3 C45 16 47 40 47 64 L47 93 L17 93 L17 64 C17 40 19 16 32 3 Z"
        fill={`url(#${body})`}
      />
      <path d="M32 3 C38 9 41.5 16 43.5 24 L20.5 24 C22.5 16 26 9 32 3 Z" fill="#6f95ff" />
      <circle cx="32" cy="47" r="9.5" fill="#182031" />
      <circle cx="32" cy="47" r="6.5" fill="#45d3e6" />
      <circle cx="29.5" cy="44.5" r="2.2" fill="#eef1f7" opacity="0.85" />
      <rect x="29" y="64" width="6" height="22" rx="3" fill="#6f95ff" opacity="0.9" />
      <path d="M22 93 L42 93 L39 100 L25 100 Z" fill="#34415c" />
    </svg>
  );
}
