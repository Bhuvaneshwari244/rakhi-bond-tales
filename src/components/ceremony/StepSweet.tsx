import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { sweetOptions } from "@/lib/ceremony-data";
import { BrotherPortrait } from "./BrotherPortrait";
import { SisterSays } from "./Sister";
import { Stage, ChoiceCard, ContinueButton } from "./Stage";

export function StepSweet({
  photo,
  tilak,
  rakhiImage,
  chosen,
  onChoose,
  onDone,
  onSparkle,
}: {
  photo: string | null;
  tilak: string | null;
  rakhiImage: string | null;
  chosen: string | null;
  onChoose: (id: string) => void;
  onDone: () => void;
  onSparkle: () => void;
}) {
  const [fed, setFed] = useState(false);
  const selected = sweetOptions.find((s) => s.id === chosen) ?? null;

  const select = (id: string) => {
    onChoose(id);
    setFed(false);
    onSparkle();
    window.setTimeout(() => setFed(true), 1500);
  };

  return (
    <Stage
      eyebrow="Step Four"
      title="One Bite, For All Our Sweetest Days"
      caption="Pick your favourite from the box — and no, you can't have all four. Well… maybe you can."
      quote="May your life always be this sweet, bhaiya — and may I always be there to steal a bite."
    >
      <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="relative">
          <BrotherPortrait photo={photo} tilak={tilak} showTilak glow={fed} rakhiImage={rakhiImage} />

          <AnimatePresence>
            {selected ? (
              <motion.img
                key={selected.id}
                src={selected.image}
                alt={selected.name}
                initial={{ opacity: 0, y: 190, x: -140, scale: 1.1 }}
                animate={{ opacity: fed ? 0 : 1, y: fed ? 10 : 40, x: 0, scale: fed ? 0.5 : 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="pointer-events-none absolute left-1/2 top-[40%] w-20 -translate-x-1/2"
              />
            ) : null}
          </AnimatePresence>

          {fed ? (
            <>
              {[...Array(16)].map((_, i) => (
                <motion.span
                  key={i}
                  className="pointer-events-none absolute left-1/2 top-1/2 size-2 rounded-sm bg-gilded"
                  initial={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                  animate={{
                    opacity: 0,
                    x: (Math.random() - 0.5) * 320,
                    y: (Math.random() - 0.9) * 300,
                    rotate: Math.random() * 540,
                  }}
                  transition={{ duration: 1.8, delay: i * 0.04 }}
                />
              ))}
              <motion.p
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gilded px-4 py-1 font-display text-sm text-primary-foreground"
              >
                Mmm… delicious! ✨
              </motion.p>
            </>
          ) : null}
        </div>

        <div>
          <div className="grid gap-4 sm:grid-cols-2">
            {sweetOptions.map((s) => (
              <ChoiceCard
                key={s.id}
                selected={chosen === s.id}
                onSelect={() => select(s.id)}
                image={s.image}
                name={s.name}
                note={s.note}
              />
            ))}
          </div>

          {fed ? (
            <div className="mt-7">
              <SisterSays>
                A bite of sweetness to celebrate our sweetest memories and endless laughter!
              </SisterSays>
            </div>
          ) : null}
        </div>
      </div>

      {fed ? <ContinueButton onClick={onDone} label="Now come here for a hug 🤗" /> : null}
    </Stage>
  );
}
