import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sister, SisterSays } from "./Sister";

export function Welcome({
  name,
  onNameChange,
  onBegin,
}: {
  name: string;
  onNameChange: (value: string) => void;
  onBegin: () => void;
}) {
  const [draft, setDraft] = useState(name);
  const [pouting, setPouting] = useState(false);

  useEffect(() => {
    setDraft((current) => (current ? current : name));
  }, [name]);

  const handleNo = () => {
    setPouting(true);
    window.setTimeout(() => {
      setPouting(false);
      onBegin();
    }, 3200);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      className="mx-auto grid w-full max-w-5xl items-center gap-8 px-5 py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:py-16"
    >
      <Sister className="mx-auto w-[min(62vw,17rem)]" mood={pouting ? "still" : "wave"} />

      <div className="flex flex-col items-center gap-6 md:items-start">
        <p className="text-xs uppercase tracking-[0.35em] text-primary/80">Raksha Bandhan · Together in spirit</p>
        <h1 className="text-center font-display text-4xl leading-tight text-gilded sm:text-5xl md:text-left">
          Our Rakhi Ceremony
          <span className="mt-2 block text-2xl text-ivory sm:text-3xl">
            for {name?.trim() ? name : "my dearest brother"}
          </span>
        </h1>

        <AnimatePresence mode="wait">
          {pouting ? (
            <SisterSays key="pout">
              "No" isn't an option when it comes to your sister! Come on now — sit still, let me tie your Rakhi. 🥺
            </SisterSays>
          ) : (
            <SisterSays key="hello">
              Hello my dearest Brother! Even though miles separate us today, our bond is unbreakable. Shall we
              celebrate our Rakhi ceremony together?
            </SisterSays>
          )}
        </AnimatePresence>

        <div className="w-full max-w-md">
          <label htmlFor="brother-name" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            His name
          </label>
          <div className="mt-2 flex gap-2">
            <input
              id="brother-name"
              value={draft}
              onChange={(e) => {
                setDraft(e.target.value);
                onNameChange(e.target.value);
              }}
              placeholder="Type your brother's name"
              className="w-full rounded-full border border-input bg-secondary/60 px-5 py-3 text-ivory outline-none placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <motion.button
            type="button"
            onClick={onBegin}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="rounded-full bg-gilded px-7 py-3 font-display text-base text-primary-foreground shadow-gold"
          >
            Yes, let's celebrate! 💖
          </motion.button>
          <motion.button
            type="button"
            onClick={handleNo}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            className="rounded-full border border-border px-7 py-3 font-display text-base text-ivory/85 hover:border-primary/60"
          >
            No / Maybe later 🥺
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
}
