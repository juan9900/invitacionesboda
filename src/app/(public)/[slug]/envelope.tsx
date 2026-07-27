"use client";

import { useEffect, useRef, useState } from "react";
import { useMusic } from "./music-player";

// Total time the closing animation takes before the envelope can be
// unmounted from the DOM: 1.9s delay + 1.1s envelopeOut keyframe (see
// globals.css `.env-root.opening .env-envelope`).
const CLOSE_DURATION_MS = 3000;

// Well inside the window where the white flash covers the whole screen (it
// hits full opacity around 800ms — 0.4s delay plus 25% of its 1.1s keyframe,
// measured from the re-render that adds `.opening` — and holds it until
// ~1.1s). The invitation stays invisible until then, otherwise it peeks
// through the unfolding panels: the reveal has to happen behind the white,
// never in front of it.
const FLASH_COVER_MS = 900;

export default function Envelope({ children }: { children: React.ReactNode }) {
  const [opening, setOpening] = useState(false);
  const [opened, setOpened] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const openingRef = useRef(false);
  const { start: startMusic } = useMusic();

  // Block body scroll only while the envelope is still closed. Once the tap
  // starts the opening animation the invitation is already visible and
  // interactive underneath (the overlay turns pointer-events:none), so keeping
  // the lock until the envelope finishes drifting away just froze the page.
  useEffect(() => {
    if (opening || hidden) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opening, hidden]);

  // Start fetching the invitation's JS chunk as soon as the envelope shows,
  // instead of waiting for the tap — otherwise the reveal is blocked on a
  // network round-trip right when the envelope finishes closing.
  useEffect(() => {
    import("./_versions/botanical").catch(() => {});
  }, []);

  function handleOpen() {
    if (openingRef.current) return;
    openingRef.current = true;

    // Fires inside this click handler (a user gesture), which is what lets
    // the browser's autoplay policy allow the play() call.
    startMusic();

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      setOpened(true);
      setRevealed(true);
      setHidden(true);
      return;
    }

    // Kicks off the CSS 3D unfold (see .env-root.opening rules) and mounts
    // the invitation underneath so its own entrance animation plays as the
    // envelope peels away.
    setOpening(true);
    setOpened(true);

    window.setTimeout(() => {
      setRevealed(true);
    }, FLASH_COVER_MS);

    window.setTimeout(() => {
      setHidden(true);
    }, CLOSE_DURATION_MS);
  }

  return (
    <>
      {/* Invitation content — mounts as the envelope starts opening (so the
          layout and GSAP measurements are ready) but stays invisible until the
          flash covers the screen. Opacity doesn't affect layout, and the
          switch happens behind the white so it can't be seen. */}
      {opened && (
        <div style={{ opacity: revealed ? 1 : 0 }}>{children}</div>
      )}

      {!hidden && (
        <section
          onClick={handleOpen}
          role="button"
          aria-label="Toca para abrir tu invitación"
          className={`env-root ${opening ? "opening" : ""}`}
        >
          <div className="env-stage">
            <div className="env-envelope">
              <div className="env-body">
                <div className="env-paper-noise" />
                <div className="env-left" />
                <div className="env-right" />
                <div className="env-bottom-flap" />
                <div className="env-top-flap" />

                {/* Wax seal — monogram, sits above all panels */}
                <button
                  type="button"
                  className="env-seal"
                  aria-label="Abrir sobre"
                  tabIndex={-1}
                >
                  <svg
                    viewBox="0 0 100 100"
                    className="env-seal-img"
                    fill="none"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      className="fill-primary-deep"
                      opacity="0.75"
                    />
                    <circle cx="50" cy="50" r="41" className="fill-primary" />
                    <circle
                      cx="50"
                      cy="50"
                      r="37"
                      fill="none"
                      className="stroke-primary-soft"
                      strokeWidth="1.2"
                      opacity="0.5"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="none"
                      stroke="white"
                      strokeWidth="0.4"
                      opacity="0.2"
                    />
                    {/* C — offset -17 from center (50) */}
                    <text
                      x="33"
                      y="66"
                      textAnchor="middle"
                      fontFamily="var(--font-cormorant), Georgia, serif"
                      fontStyle="italic"
                      fontWeight="400"
                      fontSize="41"
                      fill="white"
                    >
                      C
                    </text>
                    {/* & — centered */}
                    <text
                      x="52"
                      y="60"
                      textAnchor="middle"
                      fontFamily="var(--font-cormorant), Georgia, serif"
                      fontStyle="italic"
                      fontWeight="300"
                      fontSize="19"
                      fill="white"
                      opacity="0.72"
                    >
                      &amp;
                    </text>
                    {/* J — offset +17 from center (50) */}
                    <text
                      x="67"
                      y="66"
                      textAnchor="middle"
                      fontFamily="var(--font-cormorant), Georgia, serif"
                      fontStyle="italic"
                      fontWeight="400"
                      fontSize="41"
                      fill="white"
                    >
                      J
                    </text>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Fades out with the tap: it used to sit over the revealed
              invitation for the whole 3s the envelope takes to drift away. */}
          <div
            aria-hidden={opening}
            className={`pointer-events-none absolute bottom-[8%] left-0 right-0 text-center transition-opacity duration-300 ease-out ${
              opening ? "opacity-0" : "opacity-100"
            }`}
          >
            <p className="font-serif italic text-[16px] tracking-[0.35em] uppercase text-secondary opacity-70">
              · toca para abrir ·
            </p>
          </div>
        </section>
      )}

      {/* Sibling of .env-root (not nested) so it isn't clipped by the
          envelope panels' overflow:hidden. */}
      {!hidden && (
        <div className={`env-flash ${opening ? "env-flash-active" : ""}`} />
      )}
    </>
  );
}
