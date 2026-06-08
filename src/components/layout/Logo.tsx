interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <span
      className={`font-logo italic leading-none whitespace-nowrap ${className}`}
      aria-hidden="true"
    >
      Ricci&apos;s Bikkies
    </span>
  );
}
