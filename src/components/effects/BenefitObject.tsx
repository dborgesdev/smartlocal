// Original decorative vector objects. Each represents the benefit it accompanies.
export default function BenefitObject({ index }: { index: number }) {
  const gradient = `glass-${index}`;
  return (
    <svg
      className={`benefit-object object-${index}`}
      viewBox="0 0 200 160"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={gradient}
          x1="32"
          y1="25"
          x2="158"
          y2="146"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#d9ddff" stopOpacity=".7" />
          <stop offset=".5" stopColor="#6576fa" stopOpacity=".18" />
          <stop offset="1" stopColor="#465bee" stopOpacity=".07" />
        </linearGradient>
      </defs>
      <g stroke="#b8c1ff" strokeWidth="1.4" fill={`url(#${gradient})`}>
        {index === 0 && (
          <>
            <path d="m100 17 58 29v66l-58 30-58-30V46z" />
            <path d="m100 32 43 22v49l-43 23-43-23V54z" />
            <path
              d="M91 58c-19-7-30 9-16 20l31 15c13 12-2 24-22 16"
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path d="m42 46 58 30 58-30M100 76v66" opacity=".35" />
          </>
        )}
        {index === 1 && (
          <>
            <rect x="23" y="31" width="127" height="85" rx="8" />
            <path d="M23 99h127M70 117v13m-18 0h48" />
            <rect
              x="119"
              y="64"
              width="49"
              height="82"
              rx="10"
              stroke="#e1e5ff"
            />
            <path d="M136 72h15M139 137h10" fill="none" strokeLinecap="round" />
            <path d="m43 73 16 12 31-31" fill="none" strokeWidth="3" />
          </>
        )}
        {index === 2 && (
          <>
            <path d="m52 36 81-13 22 107-81 15z" opacity=".4" />
            <rect x="40" y="32" width="106" height="108" rx="9" />
            <path
              d="m57 59 5 5 9-12m10 8h44M57 85l5 5 9-12m10 8h35M57 111l5 5 9-12m10 8h44"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect x="73" y="20" width="40" height="22" rx="6" />
          </>
        )}
        {index === 3 && (
          <>
            <path d="M34 124h37V94H34zM82 124h37V68H82zM130 124h37V38h-37z" />
            <path
              d="m42 68 40-27 33 4 40-29m-22 1 22-1-2 22"
              fill="none"
              stroke="#e2e5ff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M26 136h149" opacity=".5" />
          </>
        )}
      </g>
    </svg>
  );
}
