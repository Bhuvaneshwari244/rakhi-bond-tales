import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { tilakStyles } from "@/lib/ceremony-data";
import { BrotherPortrait } from "./BrotherPortrait";
import { Sister, SisterSays } from "./Sister";
import { Stage, ChoiceCard, ContinueButton } from "./Stage";
import { TilakMark } from "./TilakMark";

export function StepTilak({
  photo,
  chosen,
  onChoose,
  onDone,
  onSparkle,
}: {
  photo: string | null;
  chosen: string | null;
  onChoose: (id: string) => void;
  onDone: () => void;
  onSparkle: () => void;
}) {
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  const select = (id: string) => {
    onChoose(id);
    setApplied(false);
    setApplying(true);
    onSparkle();
    window.setTimeout(() => {
      setApplying(false);
      setApplied(true);
    }, 1500);
  };

  return (
    <Stage
      eyebrow="Step One"
      title="A Mark of Blessing on Your Forehead"
      caption="Pick the tilak you'd like me to place — I still remember which one you always sat still for."
    >
      <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="relative">
          <BrotherPortrait photo={photo} tilak={chosen} showTilak={applied} glow={applied} rakhiImage={null} />

          <AnimatePresence>
            {applying ? (
              <motion.div
                key="hand"
                initial={{ opacity: 0, x: -90, y: 40 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: -70 }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
                className="pointer-events-none absolute left-1/2 top-[16%] -translate-x-1/2"
              >
                <span className="block size-5 rounded-full bg-destructive/90 shadow-[0_0_28px_rgba(255,120,60,0.9)]" />
              </motion.div>
            ) : null}
          </AnimatePresence>

          <Sister className="pointer-events-none absolute -left-6 bottom-0 hidden w-32 md:block" mood={applying ? "reach" : "still"} />
        </div>

        <div>
          <div className="grid gap-4 sm:grid-cols-3">
            {tilakStyles.map((t) => (
              <ChoiceCard
                key={t.id}
                selected={chosen === t.id}
                onSelect={() => select(t.id)}
                name={t.name}
                note={t.note}
              >
                <div className="relative h-20 w-16 rounded-xl bg-secondary/70">
                  <TilakMark styleId={t.id} small />
                </div>
              </ChoiceCard>
            ))}
          </div>

          <AnimatePresence>
            {applied ? (
              <motion.div key="caption" className="mt-7">
                <SisterSays>
                  Applying the sacred tilak for your long life, prosperity, and endless happiness.
                </SisterSays>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      {applied ? <ContinueButton onClick={onDone} label="Now let me show you the light ✨" /> : null}
    </Stage>
  );
}
