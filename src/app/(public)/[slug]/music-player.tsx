"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const SONG_URL = "/audio/air-on-the-g-string.mp3";

type MusicContextValue = {
  playing: boolean;
  started: boolean;
  start: () => void;
  toggle: () => void;
};

const MusicContext = createContext<MusicContextValue | null>(null);

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return ctx;
}

export default function MusicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const startedRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  // iOS keeps an <audio> element playing when Safari goes to the background
  // and surfaces it in Control Center like a music track. Pause as soon as the
  // page stops being visible, and resume on return — but only if it was
  // actually playing, so a visitor who muted it doesn't get it back.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const wasPlaying = { current: false };

    const pauseForBackground = () => {
      if (audio.paused) return;
      wasPlaying.current = true;
      audio.pause();
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        pauseForBackground();
        return;
      }
      if (wasPlaying.current) {
        wasPlaying.current = false;
        audio.play().catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    // Safari fires this when navigating away or entering the bfcache, where
    // visibilitychange isn't guaranteed to arrive.
    window.addEventListener("pagehide", pauseForBackground);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", pauseForBackground);
    };
  }, []);

  // Meant to be called synchronously from within a user gesture (the
  // envelope tap) so the browser's autoplay policy allows it.
  const start = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    setStarted(true);
    audioRef.current?.play().catch(() => {
      // Autoplay was blocked (e.g. gesture didn't qualify) — the visitor
      // can still start it manually with the toggle button.
    });
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      startedRef.current = true;
      setStarted(true);
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, []);

  return (
    <MusicContext.Provider value={{ playing, started, start, toggle }}>
      <audio ref={audioRef} src={SONG_URL} loop preload="auto" />
      {children}
      {started && <MusicToggleButton playing={playing} onToggle={toggle} />}
    </MusicContext.Provider>
  );
}

function MusicToggleButton({
  playing,
  onToggle,
}: {
  playing: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={playing ? "Silenciar música" : "Reproducir música"}
      className="music-toggle fixed bottom-6 right-6 z-[9998] flex h-12 w-12 items-center justify-center rounded-full bg-primary text-cream card-shadow transition-transform active:scale-95"
    >
      {playing ? (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M14 4c3.5 1 6 4 6 8s-2.5 7-6 8v-2c2.4-.9 4-3.2 4-6s-1.6-5.1-4-6V4Z" />
          <path d="M3 9v6h4l5 4V5L7 9H3Z" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M3 9v6h4l5 4V5L7 9H3Z" />
          <line
            x1="15"
            y1="8"
            x2="21"
            y2="16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="21"
            y1="8"
            x2="15"
            y2="16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}
