"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export function SoundManager() {
  const [muted, setMuted] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);

  const playTick = useCallback(() => {
    if (muted || !audioContextRef.current) return;
    const ctx = audioContextRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.08);
  }, [muted]);

  const playSuccess = useCallback(() => {
    if (muted || !audioContextRef.current) return;
    const ctx = audioContextRef.current;
    const notes = [523, 659, 784]; // C5 E5 G5 chord
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
      gain.gain.setValueAtTime(0.04, ctx.currentTime + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.3);
      osc.start(ctx.currentTime + i * 0.08);
      osc.stop(ctx.currentTime + i * 0.08 + 0.3);
    });
  }, [muted]);

  const playWhoosh = useCallback(() => {
    if (muted || !audioContextRef.current) return;
    const ctx = audioContextRef.current;
    const bufferSize = ctx.sampleRate * 0.15;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(2000, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.15);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start();
  }, [muted]);

  useEffect(() => {
    // Expose sound functions globally for other components
    (window as any).__ofSounds = { playTick, playSuccess, playWhoosh };
  }, [playTick, playSuccess, playWhoosh]);

  const toggleMute = () => {
    if (muted && !audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    setMuted(!muted);
  };

  // Add click sounds to all buttons
  useEffect(() => {
    if (muted) return;
    const handler = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.tagName === "BUTTON" || el.closest("button")) {
        playTick();
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [muted, playTick]);

  return (
    <button
      onClick={toggleMute}
      className="fixed bottom-6 right-6 z-[101] w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
      style={{
        background: "var(--of-bg-glass)",
        backdropFilter: "blur(12px)",
        border: "1px solid var(--of-border)",
      }}
      aria-label={muted ? "Enable sound effects" : "Mute sound effects"}
    >
      {muted ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--of-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      )}
    </button>
  );
}
