import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { rakhiOptions, sweetOptions, tilakStyles } from "@/lib/ceremony-data";

function Fireworks() {
  const bursts = [
    { x: "18%", y: "22%", delay: 0 },
    { x: "76%", y: "18%", delay: 0.8 },
    { x: "50%", y: "34%", delay: 1.6 },
    { x: "30%", y: "60%", delay: 2.4 },
    { x: "68%", y: "58%", delay: 3.2 },
  ];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {bursts.map((b, bi) => (
        <div key={bi} className="absolute" style={{ left: b.x, top: b.y }}>
          {[...Array(14)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute size-1.5 rounded-full bg-gilded"
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 0],
                x: Math.cos((i / 14) * Math.PI * 2) * (60 + bi * 8),
                y: Math.sin((i / 14) * Math.PI * 2) * (60 + bi * 8),
              }}
              transition={{ duration: 1.8, delay: b.delay + i * 0.02, repeat: Infinity, repeatDelay: 3.2 }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function Finale({
  name,
  tilak,
  rakhi,
  sweet,
  onReplay,
}: {
  name: string;
  tilak: string | null;
  rakhi: string | null;
  sweet: string | null;
  onReplay: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    const url = new URL(window.location.href);
    if (name.trim()) url.searchParams.set("name", name.trim());
    setShareUrl(url.toString());
  }, [name]);

  const download = async () => {
    if (!cardRef.current) return;
    setBusy(true);
    try {
      const { default: html2canvas } = await import("html2canvas");
      const canvas = await html2canvas(cardRef.current, { backgroundColor: null, scale: 2, useCORS: true });
      const link = document.createElement("a");
      link.download = `raksha-bandhan-${name.trim().toLowerCase() || "memory"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      setBusy(false);
    }
  };

  const shareText = `Happy Raksha Bandhan${name.trim() ? `, ${name.trim()}` : ""}! No distance can ever weaken our bond. 💖 ${shareUrl}`;

  const chosenTilak = tilakStyles.find((t) => t.id === tilak)?.name ?? "Traditional tilak";
  const chosenRakhi = rakhiOptions.find((r) => r.id === rakhi) ?? null;
  const chosenSweet = sweetOptions.find((s) => s.id === sweet)?.name ?? "Kaju Katli";

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative mx-auto w-full max-w-3xl px-5 py-12"
    >
      <Fireworks />

      <p className="relative text-center text-xs uppercase tracking-[0.35em] text-primary/80">Our Keepsake</p>
      <h2 className="relative mt-3 text-center text-3xl text-gilded sm:text-4xl">Happy Raksha Bandhan!</h2>

      <div
        ref={cardRef}
        className="relative mx-auto mt-9 overflow-hidden rounded-[2rem] border border-primary/50 p-8 text-center shadow-royal"
        style={{
          backgroundImage:
            "radial-gradient(120% 100% at 50% 0%, oklch(0.95 0.03 88), oklch(0.9 0.05 85))",
        }}
      >
        <div className="pointer-events-none absolute inset-3 rounded-[1.6rem] border border-[oklch(0.45_0.1_60_/_0.35)]" />
        <p
          className="font-display text-xs uppercase tracking-[0.4em]"
          style={{ color: "oklch(0.45 0.12 30)" }}
        >
          Raksha Bandhan {new Date().getFullYear()}
        </p>
        <h3 className="mt-4 font-display text-3xl" style={{ color: "oklch(0.32 0.13 25)" }}>
          For {name.trim() || "my dearest brother"}
        </h3>
        {chosenRakhi ? (
          <img src={chosenRakhi.image} alt={chosenRakhi.name} className="mx-auto my-5 w-52" />
        ) : null}
        <p
          className="mx-auto max-w-md font-display text-lg leading-relaxed"
          style={{ color: "oklch(0.35 0.1 28)" }}
        >
          No distance can ever weaken our bond. Happy Raksha Bandhan! 💖
        </p>
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed" style={{ color: "oklch(0.45 0.06 40)" }}>
          Tilak: {chosenTilak} · Rakhi: {chosenRakhi?.name ?? "Traditional Zari"} · Sweet: {chosenSweet}
        </p>
        <p className="mt-6 font-display text-base" style={{ color: "oklch(0.4 0.14 25)" }}>
          — With all my love, your sister
        </p>
      </div>

      <div className="relative mt-9 flex flex-wrap justify-center gap-3">
        <motion.button
          type="button"
          onClick={download}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          disabled={busy}
          className="rounded-full bg-gilded px-7 py-3 font-display text-base text-primary-foreground shadow-gold disabled:opacity-70"
        >
          {busy ? "Preparing…" : "Download Memory Card"}
        </motion.button>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-primary/60 px-7 py-3 font-display text-base text-ivory hover:border-primary"
        >
          Share on WhatsApp
        </a>
        <button
          type="button"
          onClick={onReplay}
          className="rounded-full border border-border px-7 py-3 font-display text-base text-ivory/85 hover:border-primary/60"
        >
          Celebrate again
        </button>
      </div>
    </motion.section>
  );
}
