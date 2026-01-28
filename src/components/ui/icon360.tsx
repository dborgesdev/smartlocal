export const Icon360 = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" opacity="0.2" />
    <path d="M7 12a5 5 0 0 1 5-5M17 12a5 5 0 0 0-5-5" />
    <path d="M12 7V3M12 21v-4M7 12H3M21 12h-4" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </svg>
);