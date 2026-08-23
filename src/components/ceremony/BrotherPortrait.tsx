import { motion } from "motion/react";
import brotherImg from "@/assets/brother.jpg";
import { TilakMark } from "./TilakMark";

type Props = {
  photo?: string | null;
  tilak?: string | null;
  showTilak?: boolean;
  glow?: boolean;
  rakhiImage?: string | null;
};

/** Ornate golden frame holding the brother's portrait, tilak and rakhi glow. */
export function BrotherPortrait({ photo, tilak, showTilak, glow, rakhiImage }: Props) {
  return (
    <motion.div
      className="relative mx-auto w-[min(78vw,20rem)]"
      animate={glow ? { boxShadow: ["0 0 0 rgba(0,0,0,0)"] } : undefined}
    >
      <div
        className={`relative overflow-hidden rounded-[2rem] border-4 border-primary/70 bg-secondary p-1 shadow-royal ${
          glow ? "glow-diya" : ""
        }`}
      >
        <img
          src={photo || brotherImg}
          alt="Portrait of the brother being honoured in the ceremony"
          width={768}
          height={768}
          className="aspect-square w-full rounded-[1.7rem] object-cover"
        />
        {showTilak && tilak ? <TilakMark styleId={tilak} /> : null}
        {rakhiImage ? (
          <motion.img
            src={rakhiImage}
            alt=""
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -bottom-3 left-1/2 w-2/3 -translate-x-1/2"
          />
        ) : null}
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-primary/30" />
    </motion.div>
  );
}
