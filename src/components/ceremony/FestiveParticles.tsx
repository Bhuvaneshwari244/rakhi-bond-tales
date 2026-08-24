import { useEffect, useState } from "react";

type Props = {
  count?: number;
  variant?: "petals" | "sparkles";
};

type Bit = {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
};

/** Ambient floating marigold petals / golden sparkles. Client-only (randomised). */
export function FestiveParticles({ count = 18, variant = "petals" }: Props) {
  const [bits, setBits] = useState<Bit[]>([]);

  useEffect(() => {
    setBits(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: variant === "petals" ? 6 + Math.random() * 10 : 3 + Math.random() * 5,
        delay: Math.random() * 14,
        duration: 16 + Math.random() * 16,
        opacity: 0.25 + Math.random() * 0.5,
      })),
    );
  }, [count, variant]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      {bits.map((b) => (
        <span
          key={b.id}
          className="animate-float-up absolute bottom-[-10vh] block bg-gilded"
          style={{
            left: `${b.left}%`,
            width: `${b.size}px`,
            height: `${variant === "petals" ? b.size * 0.7 : b.size}px`,
            borderRadius: variant === "petals" ? "60% 40% 55% 45%" : "9999px",
            opacity: b.opacity,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
