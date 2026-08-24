import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";
import { FestiveParticles } from "@/components/ceremony/FestiveParticles";
import { Welcome } from "@/components/ceremony/Welcome";
import { StepTilak } from "@/components/ceremony/StepTilak";
import { StepAarti } from "@/components/ceremony/StepAarti";
import { StepRakhi } from "@/components/ceremony/StepRakhi";
import { StepSweet } from "@/components/ceremony/StepSweet";
import { StepHug } from "@/components/ceremony/StepHug";
import { Finale } from "@/components/ceremony/Finale";
import { rakhiOptions, STEP_TITLES } from "@/lib/ceremony-data";
import { playBell, playSparkle, startMusic, stopMusic } from "@/lib/festive-audio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Virtual Raksha Bandhan Ceremony — Tilak, Aarti, Rakhi & a Hug" },
      {
        name: "description",
        content:
          "A cinematic virtual Raksha Bandhan ceremony: apply the tilak, perform the aarti, tie the rakhi, share a sweet, and send your brother a warm hug across the miles.",
      },
      { property: "og:title", content: "Virtual Raksha Bandhan Ceremony" },
      {
        property: "og:description",
        content:
          "Celebrate Rakhi together even when miles apart — tilak, aarti, rakhi, sweets, a warm hug, and a keepsake letter.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Ceremony,
});

function Ceremony() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [tilak, setTilak] = useState<string | null>(null);
  const [rakhi, setRakhi] = useState<string | null>(null);
  const [sweet, setSweet] = useState<string | null>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("name");
    if (param) setName(param);
  }, []);

  useEffect(() => {
    if (muted) stopMusic();
    else startMusic();
    return () => stopMusic();
  }, [muted]);

  const sparkle = () => playSparkle(muted);
  const bell = () => playBell(muted);
  const next = () => setStep((s) => Math.min(s + 1, 6));
  const rakhiImage = rakhiOptions.find((r) => r.id === rakhi)?.image ?? null;

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <FestiveParticles count={20} variant="petals" />

      <header className="relative z-10 flex items-center justify-between px-5 pt-5">
        <p className="font-display text-sm tracking-[0.25em] text-primary/80">रक्षा बंधन</p>
        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? "Play festive music" : "Mute festive music"}
          className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs text-ivory/85 hover:border-primary/60"
        >
          {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
          {muted ? "Play music" : "Mute"}
        </button>
      </header>

      {step > 0 && step < 6 ? (
        <nav className="relative z-10 mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-2 px-5">
          {STEP_TITLES.slice(1, 6).map((label, i) => (
            <span
              key={label}
              className={`rounded-full px-3 py-1 text-[11px] tracking-wide transition-colors ${
                i + 1 <= step ? "bg-gilded text-primary-foreground" : "border border-border text-muted-foreground"
              }`}
            >
              {label}
            </span>
          ))}
        </nav>
      ) : null}

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {step === 0 ? (
            <Welcome name={name} onNameChange={setName} onBegin={next} />
          ) : null}

          {step === 1 ? (
            <StepTilak photo={null} chosen={tilak} onChoose={setTilak} onDone={next} onSparkle={sparkle} />
          ) : null}

          {step === 2 ? (
            <StepAarti photo={null} tilak={tilak} onDone={next} onBell={bell} />
          ) : null}

          {step === 3 ? (
            <StepRakhi chosen={rakhi} onChoose={setRakhi} onDone={next} onSparkle={sparkle} />
          ) : null}

          {step === 4 ? (
            <StepSweet
                photo={null}
                tilak={tilak}
                rakhiImage={rakhiImage}
                chosen={sweet}
                onChoose={setSweet}
                onDone={next}
                onSparkle={sparkle}
              />
          ) : null}

          {step === 5 ? (
            <StepHug name={name} onDone={next} onSparkle={sparkle} />
          ) : null}

          {step === 6 ? (
            <Finale
                name={name}
                tilak={tilak}
                rakhi={rakhi}
                sweet={sweet}
                onReplay={() => {
                  setTilak(null);
                  setRakhi(null);
                  setSweet(null);
                  setStep(0);
                }}
              />
          ) : null}
        </AnimatePresence>
      </div>

      <footer className="relative z-10 pb-10 text-center text-xs text-muted-foreground">
        Made with love, for a bond no distance can touch.
      </footer>
    </main>
  );
}
