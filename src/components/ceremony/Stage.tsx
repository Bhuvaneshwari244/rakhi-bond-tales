import { motion } from "motion/react";
import type { ReactNode } from "react";

export function Stage({
  eyebrow,
  title,
  caption,
  quote,
  children,
}: {
  eyebrow: string;
  title: string;
  caption: string;
  quote?: string;
  children: ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="mx-auto w-full max-w-5xl px-5 py-10 sm:py-14"
    >
      <p className="text-center text-xs uppercase tracking-[0.35em] text-primary/80">{eyebrow}</p>
      <h2 className="mt-3 text-center text-3xl text-gilded sm:text-4xl">{title}</h2>
      <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-muted-foreground sm:text-lg">
        {caption}
      </p>
      {quote ? (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mx-auto mt-5 max-w-xl text-center font-display text-lg italic leading-relaxed text-primary/90 sm:text-xl"
        >
          “{quote}”
        </motion.p>
      ) : null}
      <div className="mt-9">{children}</div>
    </motion.section>
  );
}

export function ChoiceCard({
  selected,
  onSelect,
  image,
  name,
  note,
  children,
}: {
  selected: boolean;
  onSelect: () => void;
  image?: string;
  name: string;
  note: string;
  children?: ReactNode;
}) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.97 }}
      className={`panel-royal group flex flex-col items-center gap-3 rounded-3xl px-4 py-5 text-center transition-colors ${
        selected ? "border-primary shadow-gold" : "hover:border-primary/60"
      }`}
    >
      <div className="flex h-24 w-full items-center justify-center">
        {image ? (
          <img src={image} alt={name} loading="lazy" className="max-h-24 w-auto object-contain" />
        ) : (
          children
        )}
      </div>
      <span className="font-display text-base text-ivory">{name}</span>
      <span className="text-xs leading-relaxed text-muted-foreground">{note}</span>
    </motion.button>
  );
}

export function ContinueButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className="mx-auto mt-10 block rounded-full bg-gilded px-8 py-3 font-display text-base text-primary-foreground shadow-gold"
    >
      {label}
    </motion.button>
  );
}
