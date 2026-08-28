import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SisterSays } from "./Sister";
import { Stage, ContinueButton } from "./Stage";
// Bundled in public/ so it works on any static host (Vercel, etc.), not only Lovable CDN.
const hugIllustrationUrl = "/media/hug-illustration.png";

export function StepHug({ name, onDone, onSparkle }: { name: string; onDone: () => void; onSparkle: () => void }) {
  const [blessed, setBlessed] = useState(false);

  return (
    <Stage
      eyebrow="Step Five"
      title="A Hug That Crosses Every Mile"
      caption="Close your eyes for a second. Feel that? That's me holding on tight."
      quote="No matter how many miles stand between us, you will never be out of my arms' reach in my heart."
    >
      <div className="relative mx-auto flex h-[26rem] w-full max-w-2xl items-end justify-center overflow-hidden rounded-[2.5rem] border border-border bg-secondary/40 sm:h-[30rem]">
        {/* arms wrapping */}
        <motion.div
          initial={{ scaleX: 0.2, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="pointer-events-none absolute inset-x-6 bottom-16 h-40 rounded-[100%] border-[14px] border-b-0 border-primary/35"
        />
        <motion.div
          animate={{ scale: [1, 1.16, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute top-16 size-28 rounded-full bg-accent/40 blur-2xl"
        />
        <motion.div
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 font-display text-5xl"
        >
          💖
        </motion.div>

        {[...Array(14)].map((_, i) => (
          <motion.span
            key={i}
            className="pointer-events-none absolute bottom-0 size-2 rounded-full bg-gold-soft/70"
            initial={{ x: (i - 7) * 26, y: 0, opacity: 0 }}
            animate={{ y: -320 - Math.random() * 80, opacity: [0, 0.9, 0] }}
            transition={{ duration: 5 + Math.random() * 3, repeat: Infinity, delay: i * 0.35 }}
          />
        ))}

        <motion.div
          initial={{ scale: 0.85, y: 70, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="relative w-[min(72vw,22rem)]"
        >
          <img
            src={hugIllustration.url}
            alt="Brother and sister sharing a heartfelt hug"
            className="w-full drop-shadow-2xl"
          />
        </motion.div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-6">
        <SisterSays>
          Sending you the tightest, warmest hug across all the miles. Always stay safe and blessed, my dearest
          {name?.trim() ? ` ${name}` : " Annayya"}.
        </SisterSays>

        <motion.button
          type="button"
          onClick={() => {
            setBlessed(true);
            onSparkle();
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-full border border-primary/60 px-7 py-3 font-display text-base text-ivory"
        >
          Touch Sister's Head for Blessings 🙏
        </motion.button>

        <AnimatePresence>
          {blessed ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="panel-royal max-w-xl rounded-3xl px-6 py-5 text-center"
            >
              <p className="font-display text-lg leading-relaxed text-gilded">
                Thank you for always being my pillar of strength, my secret-keeper, and my forever protector.
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {blessed ? <ContinueButton onClick={onDone} label="I wrote you a letter 💌" /> : null}
    </Stage>
  );
}
