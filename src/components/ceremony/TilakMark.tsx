import { motion } from "motion/react";

/** Renders the chosen tilak on the forehead area of the portrait. */
export function TilakMark({ styleId, small = false }: { styleId: string; small?: boolean }) {
  const scale = small ? 0.55 : 1;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.2 }}
      animate={{ opacity: 1, scale }}
      transition={{ type: "spring", stiffness: 220, damping: 14 }}
      className="absolute left-1/2 top-[17%] -translate-x-1/2"
      aria-hidden
    >
      {styleId === "kumkum" ? (
        <div className="relative">
          <div className="size-6 rounded-full bg-destructive shadow-[0_0_18px_rgba(220,60,40,0.7)]" />
          <div className="absolute -top-2 left-1/2 flex -translate-x-1/2 gap-0.5">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="block size-1 rounded-full bg-ivory/90" />
            ))}
          </div>
        </div>
      ) : null}

      {styleId === "chandan" ? (
        <div className="relative flex flex-col items-center">
          <div className="h-9 w-2.5 rounded-full bg-gradient-to-b from-ivory to-muted-foreground/60" />
          <div className="absolute top-1 h-6 w-1 rounded-full bg-destructive" />
        </div>
      ) : null}

      {styleId === "trishul" ? (
        <div className="relative h-10 w-8">
          <span className="absolute bottom-0 left-1/2 h-9 w-1.5 -translate-x-1/2 rounded-full bg-destructive" />
          <span className="absolute bottom-1 left-0 h-7 w-1.5 origin-bottom -rotate-12 rounded-full bg-destructive/90" />
          <span className="absolute bottom-1 right-0 h-7 w-1.5 origin-bottom rotate-12 rounded-full bg-destructive/90" />
          <span className="absolute bottom-0 left-1/2 size-2.5 -translate-x-1/2 rounded-full bg-primary" />
        </div>
      ) : null}

      <motion.div
        initial={{ opacity: 0.9, scale: 0.4 }}
        animate={{ opacity: 0, scale: 3 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 -m-4 rounded-full bg-primary/40 blur-xl"
      />
    </motion.div>
  );
}
