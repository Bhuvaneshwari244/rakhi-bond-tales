/**
 * Tiny WebAudio "festive ensemble": a soft sitar/shehnai-like drone with a
 * slow plucked raga phrase, plus a temple bell one-shot. No audio assets.
 */

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let droneNodes: OscillatorNode[] = [];
let phraseTimer: ReturnType<typeof setInterval> | null = null;

function ensureContext() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
    master = ctx.createGain();
    master.gain.value = 0.0001;
    master.connect(ctx.destination);
  }
  void ctx.resume();
  return ctx;
}

const RAGA = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33];

function pluck(at: number, freq: number, gain = 0.06) {
  if (!ctx || !master) return;
  const osc = ctx.createOscillator();
  const env = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 2400;
  osc.type = "triangle";
  osc.frequency.setValueAtTime(freq, at);
  env.gain.setValueAtTime(0, at);
  env.gain.linearRampToValueAtTime(gain, at + 0.04);
  env.gain.exponentialRampToValueAtTime(0.0001, at + 2.2);
  osc.connect(filter).connect(env).connect(master);
  osc.start(at);
  osc.stop(at + 2.4);
}

export function startMusic() {
  const c = ensureContext();
  if (!c || !master) return;
  master.gain.cancelScheduledValues(c.currentTime);
  master.gain.linearRampToValueAtTime(0.5, c.currentTime + 1.4);

  if (droneNodes.length === 0) {
    [130.81, 196.0].forEach((f, i) => {
      const osc = c.createOscillator();
      const g = c.createGain();
      osc.type = i === 0 ? "sine" : "triangle";
      osc.frequency.value = f;
      g.gain.value = 0.035;
      osc.connect(g).connect(master!);
      osc.start();
      droneNodes.push(osc);
    });
  }

  if (!phraseTimer) {
    let i = 0;
    const step = () => {
      if (!ctx) return;
      const t = ctx.currentTime + 0.05;
      pluck(t, RAGA[i % RAGA.length]!);
      if (i % 4 === 3) pluck(t + 0.9, RAGA[(i + 2) % RAGA.length]!, 0.04);
      i += 1;
    };
    step();
    phraseTimer = setInterval(step, 2000);
  }
}

export function stopMusic() {
  if (!ctx || !master) return;
  master.gain.cancelScheduledValues(ctx.currentTime);
  master.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
  if (phraseTimer) {
    clearInterval(phraseTimer);
    phraseTimer = null;
  }
}

/** Temple bell / chime — plays even when the ambience is muted only if audible. */
export function playBell(muted: boolean) {
  if (muted) return;
  const c = ensureContext();
  if (!c || !master) return;
  const partials = [1, 2.01, 2.98, 4.2];
  partials.forEach((mult, idx) => {
    const osc = c.createOscillator();
    const env = c.createGain();
    osc.type = "sine";
    osc.frequency.value = 660 * mult;
    const t = c.currentTime;
    const peak = 0.16 / (idx + 1);
    env.gain.setValueAtTime(0, t);
    env.gain.linearRampToValueAtTime(peak, t + 0.01);
    env.gain.exponentialRampToValueAtTime(0.0001, t + 3.2);
    osc.connect(env).connect(master!);
    osc.start(t);
    osc.stop(t + 3.4);
  });
}

export function playSparkle(muted: boolean) {
  if (muted) return;
  const c = ensureContext();
  if (!c || !master) return;
  [880, 1320, 1760].forEach((f, i) => {
    const t = c.currentTime + i * 0.07;
    const osc = c.createOscillator();
    const env = c.createGain();
    osc.type = "sine";
    osc.frequency.value = f;
    env.gain.setValueAtTime(0, t);
    env.gain.linearRampToValueAtTime(0.09, t + 0.01);
    env.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
    osc.connect(env).connect(master!);
    osc.start(t);
    osc.stop(t + 0.6);
  });
}
