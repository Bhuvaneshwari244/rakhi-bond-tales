import { motion } from "motion/react";
import sisterImg from "@/assets/sister.png";

type Props = {
  className?: string;
  mood?: "wave" | "reach" | "still";
};

/** The sister avatar. She sways gently, and waves or reaches out on cue. */
export function Sister({ className = "", mood = "wave" }: Props) {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={
        mood === "wave"
          ? { rotate: [-1.5, 1.5, -1.5], y: [0, -6, 0] }
          : mood === "reach"
            ? { rotate: [0, 4, 2], x: [0, 18, 12] }
            : { y: [0, -4, 0] }
      }
      transition={{ duration: mood === "reach" ? 1.6 : 4.2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
    >
      <div className="absolute inset-x-6 bottom-2 h-6 rounded-full bg-primary/20 blur-2xl" />
      <img
        src={sisterImg}
        alt="Illustration of a sister in a red and gold saree, waving warmly"
        width={768}
        height={1024}
        className="relative w-full select-none drop-shadow-[0_18px_40px_rgba(0,0,0,0.55)]"
      />
    </motion.div>
  );
}

export function SisterSays({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="panel-royal relative max-w-xl rounded-3xl px-6 py-5 text-pretty"
    >
      <span className="absolute -left-2 top-8 hidden size-4 rotate-45 border-b border-l border-border bg-card md:block" />
      <p className="font-display text-lg leading-relaxed text-ivory sm:text-xl">{children}</p>
    </motion.div>
  );
}
