import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { rakhiOptions } from "@/lib/ceremony-data";
import { SisterSays } from "./Sister";
import { Stage, ChoiceCard, ContinueButton } from "./Stage";

export function StepRakhi({
  chosen,
  onChoose,
  onDone,
  onSparkle,
}: {
  chosen: string | null;
  onChoose: (id: string) => void;
  onDone: () => void;
  onSparkle: () => void;
}) {
  const [tied, setTied] = useState(false);
  const selected = rakhiOptions.find((r) => r.id === chosen) ?? null;

  const select = (id: string) => {
    onChoose(id);
    setTied(false);
    onSparkle();
    window.setTimeout(() => setTied(true), 1600);
  };

  return (
    <Stage
      eyebrow="Step Three"
      title="The Thread That Ties Us Forever"
      caption="Choose the rakhi that feels most like you — I'll tie it snug, and I promise not to knot it too tight this time."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {rakhiOptions.map((r) => (
          <ChoiceCard
            key={r.id}
            selected={chosen === r.id}
            onSelect={() => select(r.id)}
            image={r.image}
            name={r.name}
            note={r.note}
          />
        ))}
      </div>

      <AnimatePresence>
        {selected ? (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="panel-royal relative mx-auto mt-10 flex h-56 w-full max-w-lg items-center justify-center overflow-hidden rounded-3xl"
          >
            {/* wrist */}
            <div className="absolute h-24 w-full max-w-sm rounded-full bg-gradient-to-b from-[oklch(0.72_0.07_60)] to-[oklch(0.55_0.07_50)] shadow-inner" />
            <motion.img
              src={selected.image}
              alt={selected.name}
              initial={{ scale: 1.5, y: -80, opacity: 0, rotate: -12 }}
              animate={tied ? { scale: 1, y: 0, opacity: 1, rotate: 0 } : { scale: 1.25, y: -30, opacity: 1, rotate: -6 }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
              className="relative w-64"
            />
            {tied ? (
              <>
                <motion.div
                  animate={{ opacity: [0.15, 0.5, 0.15], scale: [1, 1.15, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity }}
                  className="pointer-events-none absolute size-48 rounded-full bg-primary/25 blur-3xl"
                />
                {[...Array(10)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="pointer-events-none absolute size-1.5 rounded-full bg-gold-soft"
                    initial={{ opacity: 0, x: 0, y: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      x: Math.cos((i / 10) * Math.PI * 2) * 90,
                      y: Math.sin((i / 10) * Math.PI * 2) * 55,
                    }}
                    transition={{ duration: 1.6, delay: i * 0.06, repeat: Infinity, repeatDelay: 1.4 }}
                  />
                ))}
              </>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>

      {tied ? (
        <>
          <div className="mt-8 flex justify-center">
            <SisterSays>
              Tying this sacred thread of eternal love, trust, and sisterly protection around your wrist.
            </SisterSays>
          </div>
          <ContinueButton onClick={onDone} label="Open your mouth, something sweet 🍬" />
        </>
      ) : null}
    </Stage>
  );
}
