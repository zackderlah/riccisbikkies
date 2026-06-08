interface AnimatedLogoProps {
  text: string;
}

// Renders each letter twice (stacked). On parent `group` hover, every letter
// rolls upward to reveal an accent-coloured copy, staggered for a wave effect.
export default function AnimatedLogo({ text }: AnimatedLogoProps) {
  return (
    <span className="inline-flex leading-[1.05]" aria-hidden="true">
      {text.split("").map((char, i) => {
        if (char === " ") {
          return (
            <span key={i} className="inline-block w-[0.3em]" />
          );
        }
        const delay = `${i * 15}ms`;
        return (
          <span
            key={i}
            className="relative inline-block overflow-hidden align-top"
          >
            <span
              className="block transition-transform duration-200 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full"
              style={{ transitionDelay: delay }}
            >
              {char}
            </span>
            <span
              className="absolute left-0 top-full block text-accent transition-transform duration-200 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full"
              style={{ transitionDelay: delay }}
            >
              {char}
            </span>
          </span>
        );
      })}
    </span>
  );
}
