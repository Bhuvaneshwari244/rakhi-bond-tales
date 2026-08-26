import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useAnimationFrame } from "motion/react";
import thaliImg from "@/assets/thali.png";
import { BrotherPortrait } from "./BrotherPortrait";
import { SisterSays } from "./Sister";
import { Stage, ContinueButton } from "./Stage";

const TOTAL_CIRCLES = 3;
const DEGREES_PER_SECOND = 72; // one slow circle every 5 seconds

export function StepAarti({
  photo,
  tilak,
  onDone,
  onBell,
}: {
  photo: string | null;
  tilak: string | null;
  onDone: () => void;
  onBell: () => void;
}) {
  const [angle, setAngle] = useState(0);
  const [running, setRunning] = useState(true);
  const circlesDone = Math.floor(angle / 360);
  const complete = circlesDone >= TOTAL_CIRCLES;
  const bellAt = useRef(0);

  useAnimationFrame((_, delta) => {
    if (!running || complete) return;
    setAngle((a) => Math.min(a + (delta / 1000) * DEGREES_PER_SECOND, TOTAL_CIRCLES * 360));
  });

  useEffect(() => {
    if (circlesDone > bellAt.current) {
      bellAt.current = circlesDone;
      onBell();
    }
  }, [circlesDone, onBell]);

  const radius = 168;

  return (
    <Stage
      eyebrow="Step Two"
      title="Circling the Light Around You"
      caption="Watch closely — the thali is moving in real time, three slow clockwise circles of light, exactly the way Amma taught me."
    >
      <div className="relative mx-auto flex h-[24rem] w-full max-w-xl select-none items-center justify-center sm:h-[28rem]">
        <div className="absolute size-[21rem] rounded-full border border-dashed border-primary/25 sm:size-[22rem]" />
        <BrotherPortrait photo={photo} tilak={tilak} showTilak glow={complete} rakhiImage={null} />

        {/* real-time revolving thali */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2"
          style={{
            transform: `translate(-50%, -50%) rotate(${angle - 90}deg) translateX(${radius}px) rotate(${-(angle - 90)}deg)`,
          }}
        >
          <div className="relative">
            <img
              src={thaliImg}
              alt="Golden aarti thali with a lit diya"
              width={768}
              height={768}
              className="w-24 sm:w-32"
            />
            <div className="animate-flicker absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-marigold/40 blur-2xl" />
            {[0, 1, 2, 3].map((i) => (
              <motion.span
                key={i}
                className="absolute left-1/2 top-1/3 size-2 rounded-full bg-ivory/40 blur-[2px]"
                animate={{ y: [-4, -46], opacity: [0.55, 0], x: [0, i % 2 ? 12 : -10] }}
                transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.6, ease: "easeOut" }}
              />
            ))}
          </div>
        </div>

        {/* soft trail of light left behind by the flame */}
        <div
          aria-hidden
          className="pointer-events-none absolute size-[23rem] rounded-full"
          style={{
            background: `conic-gradient(from ${angle - 100}deg, oklch(0.85 0.16 75 / 0.28), transparent 28%)`,
            mask: "radial-gradient(circle, transparent 62%, black 66%, black 74%, transparent 78%)",
            WebkitMask: "radial-gradient(circle, transparent 62%, black 66%, black 74%, transparent 78%)",
          }}
        />

        {complete ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0, 0.5, 0], scale: 2.2 }}
            transition={{ duration: 2, repeat: Infinity }}
            className="pointer-events-none absolute size-56 rounded-full bg-marigold/20 blur-3xl"
          />
        ) : null}
      </div>

      <div className="mt-2 flex flex-col items-center gap-5">
        <p className="font-display text-sm text-ivory/80">
          {complete
            ? "Three circles complete · aarti done 🪔"
            : `Circle ${Math.min(circlesDone + 1, TOTAL_CIRCLES)} of ${TOTAL_CIRCLES} · in progress 🪔`}
        </p>

        {!complete ? (
          <div className="flex flex-wrap justify-center gap-3">
            <motion.button
              type="button"
              onClick={() => setRunning((r) => !r)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="rounded-full border border-primary/60 px-7 py-3 font-display text-base text-ivory"
            >
              {running ? "Pause the aarti" : "Resume the aarti"}
            </motion.button>
            <motion.button
              type="button"
              onClick={() => setAngle(TOTAL_CIRCLES * 360)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="rounded-full border border-border px-7 py-3 font-display text-base text-ivory/85 hover:border-primary/60"
            >
              Skip ahead
            </motion.button>
          </div>
        ) : null}

        <AnimatePresence>
          {complete ? (
            <SisterSays>
              Circling the divine light to protect you from all obstacles and illuminate your path.
            </SisterSays>
          ) : null}
        </AnimatePresence>
      </div>

      {complete ? <ContinueButton onClick={onDone} label="Give me your right hand 🧵" /> : null}
    </Stage>
  );
}
