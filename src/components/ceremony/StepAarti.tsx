import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import thaliImg from "@/assets/thali.png";
import { BrotherPortrait } from "./BrotherPortrait";
import { SisterSays } from "./Sister";
import { Stage, ContinueButton } from "./Stage";

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
  const areaRef = useRef<HTMLDivElement>(null);
  const lastAngle = useRef<number | null>(null);
  const [angle, setAngle] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [auto, setAuto] = useState(false);
  const complete = Math.abs(angle) >= 330;

  const angleFrom = (clientX: number, clientY: number) => {
    const box = areaRef.current?.getBoundingClientRect();
    if (!box) return 0;
    const cx = box.left + box.width / 2;
    const cy = box.top + box.height / 2;
    return (Math.atan2(clientY - cy, clientX - cx) * 180) / Math.PI;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    lastAngle.current = angleFrom(e.clientX, e.clientY);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging || auto) return;
    const current = angleFrom(e.clientX, e.clientY);
    if (lastAngle.current !== null) {
      let delta = current - lastAngle.current;
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;
      setAngle((a) => {
        const next = a + delta;
        if (Math.abs(a) < 330 && Math.abs(next) >= 330) onBell();
        return next;
      });
    }
    lastAngle.current = current;
  };

  const endDrag = () => {
    setDragging(false);
    lastAngle.current = null;
  };

  const performAarti = () => {
    if (auto) return;
    setAuto(true);
    onBell();
    setAngle(360);
    window.setTimeout(() => setAuto(false), 3000);
  };

  return (
    <Stage
      eyebrow="Step Two"
      title="Circling the Light Around You"
      caption="Move the thali slowly, clockwise — the way Amma taught me, three gentle circles of light."
    >
      <div
        ref={areaRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className="relative mx-auto flex h-[24rem] w-full max-w-xl touch-none select-none items-center justify-center sm:h-[28rem]"
      >
        <div className="absolute size-[19rem] rounded-full border border-dashed border-primary/25 sm:size-[22rem]" />
        <BrotherPortrait photo={photo} tilak={tilak} showTilak glow={complete} rakhiImage={null} />

        <motion.div
          className="pointer-events-none absolute size-[24rem] sm:size-[28rem]"
          animate={{ rotate: angle }}
          transition={auto ? { duration: 3, ease: "easeInOut" } : { type: "spring", stiffness: 260, damping: 26 }}
        >
          <motion.div
            className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
            animate={{ rotate: -angle }}
            transition={auto ? { duration: 3, ease: "easeInOut" } : { type: "spring", stiffness: 260, damping: 26 }}
          >
            <div className="relative">
              <img src={thaliImg} alt="Golden aarti thali with a lit diya" width={768} height={768} className="w-28 sm:w-36" />
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
          </motion.div>
        </motion.div>

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
        <motion.button
          type="button"
          onClick={performAarti}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="rounded-full border border-primary/60 px-7 py-3 font-display text-base text-ivory"
        >
          Or let me do it for you 🪔
        </motion.button>

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
