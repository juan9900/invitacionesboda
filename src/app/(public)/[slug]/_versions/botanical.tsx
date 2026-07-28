"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Countdown from "./countdown";
import RsvpForm from "../rsvp-form";
import type { InviteData } from "./shared";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Paleta ───────────────────────────────────────────────────────── */
const SAGE = "#6b7c5e";
const SAGE_DEEP = "#3d4a38";
const SAGE_MID = "#54664a";
const SAGE_SOFT = "#a8b89a";
const SAGE_PALE = "#f2f5ee";
const BLUSH = "#e8c4b4";
const BLUSH_SOFT = "#f5e0d6";
const BLUSH_DEEP = "#d49a85";
const WINE_SOFT = "#8a3340";
const INK = "#2a1a1d";
const CREAM = "#faf8f3";
const GOLD_SOFT = "#cbb07a";

/* ── Ornamentos SVG ───────────────────────────────────────────────── */

function BranchDivider({ flip, light }: { flip?: boolean; light?: boolean }) {
  const s = light ? "rgba(255,255,255,0.5)" : SAGE;
  const bf = light ? "rgba(255,255,255,0.4)" : BLUSH;
  const bs = light ? "rgba(255,255,255,0.28)" : BLUSH_SOFT;
  const sf = light ? "rgba(255,255,255,0.25)" : SAGE_SOFT;

  const Branch = ({ mirror }: { mirror?: boolean }) => (
    <svg
      viewBox="0 0 140 36"
      className={`w-[130px] h-[30px]${mirror ? " -scale-x-100" : ""}`}
      fill="none"
      stroke={s}
      strokeWidth="1"
      strokeLinecap="round"
    >
      <path
        d="M2 18 C18 12, 36 24, 54 18 C66 14, 72 18, 88 16 C100 14, 110 18, 130 17"
        strokeWidth="1.2"
      />
      <path d="M30 18 C26 8, 18 6, 20 14 C22 20, 30 18 30 18Z" />
      <path d="M56 18 C52 8, 44 7, 46 14 C48 20, 56 18 56 18Z" />
      <path d="M78 16 C74 7, 66 8, 68 14 C70 20, 78 16 78 16Z" />
      <path d="M30 18 C28 26, 22 28, 18 24" strokeWidth="0.8" />
      <path d="M56 18 C54 27, 48 28, 44 25" strokeWidth="0.8" />
      <circle cx="18" cy="24" r="2.5" fill={bf} stroke={s} strokeWidth="0.7" />
      <circle cx="44" cy="26" r="2.5" fill={bf} stroke={s} strokeWidth="0.7" />
      <circle cx="110" cy="17" r="2" fill={sf} stroke={s} strokeWidth="0.6" />
    </svg>
  );

  return (
    <div className={`flex items-center justify-center gap-[10px] my-8${flip ? " -scale-x-100" : ""}`}>
      <Branch />
      <Branch mirror />
    </div>
  );
}

function FloralWreath({
  size = 320,
  opacity = 0.18,
}: {
  size?: number;
  opacity?: number;
}) {
  const r = size / 2;
  const stems = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      style={{
        width: size,
        height: size,
        position: "absolute",
        inset: 0,
        opacity,
      }}
      fill="none"
      aria-hidden
    >
      {stems.map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = r + Math.cos(rad) * (r * 0.35),
          y1 = r + Math.sin(rad) * (r * 0.35);
        const x2 = r + Math.cos(rad) * (r * 0.85),
          y2 = r + Math.sin(rad) * (r * 0.85);
        const lx = r + Math.cos(rad - 0.5) * (r * 0.65),
          ly = r + Math.sin(rad - 0.5) * (r * 0.65);
        const rx = r + Math.cos(rad + 0.5) * (r * 0.65),
          ry = r + Math.sin(rad + 0.5) * (r * 0.65);
        return (
          <g key={deg} stroke={SAGE} strokeLinecap="round">
            <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="1.2" />
            <path
              d={`M${(x1 + x2) / 2} ${(y1 + y2) / 2} Q${lx} ${ly} ${lx + 3} ${ly + 3}`}
              strokeWidth="0.8"
            />
            <path
              d={`M${(x1 + x2) / 2} ${(y1 + y2) / 2} Q${rx} ${ry} ${rx - 3} ${ry + 3}`}
              strokeWidth="0.8"
            />
            <circle
              cx={x2}
              cy={y2}
              r="3.5"
              fill={deg % 60 === 0 ? BLUSH : SAGE_SOFT}
              stroke={SAGE}
              strokeWidth="0.7"
            />
          </g>
        );
      })}
      <circle cx={r} cy={r} r={r * 0.32} stroke={SAGE} strokeWidth="0.8" />
    </svg>
  );
}

function LeafSprig({ light }: { light?: boolean } = {}) {
  const color = light ? "rgba(255,255,255,0.65)" : SAGE;
  return (
    <svg
      viewBox="0 0 60 20"
      className="w-[52px] h-[16px]"
      fill="none"
      stroke={color}
      strokeWidth="0.9"
      strokeLinecap="round"
    >
      <path d="M2 10 C15 5, 30 12, 44 8 C50 6, 55 9, 58 10" />
      <path d="M14 10 C12 4, 7 4, 8 9Z" />
      <path d="M28 10 C26 3, 20 3, 22 9Z" />
      <path d="M42 8 C40 2, 34 3, 36 8Z" />
    </svg>
  );
}

function VerticalSprig() {
  return (
    <svg
      viewBox="0 0 20 54"
      className="w-[16px] h-[44px]"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Hoja apuntando hacia arriba */}
      <path
        d="M10 1 C16 5, 16 14, 10 18 C4 14, 4 5, 10 1 Z"
        fill={SAGE_SOFT}
        stroke={SAGE}
        strokeWidth="0.8"
        opacity="0.85"
      />
      <path
        d="M10 3 L10 16"
        stroke={SAGE_DEEP}
        strokeWidth="0.45"
        opacity="0.55"
      />
      {/* Tallo vertical */}
      <path d="M10 17 L10 52" stroke={SAGE} strokeWidth="0.9" />
      {/* Hoja izquierda */}
      <path
        d="M10 28 C5 25, 2 22, 3 26 C4 30, 10 28 10 28Z"
        fill={SAGE_SOFT}
        stroke={SAGE}
        strokeWidth="0.7"
        opacity="0.8"
      />
      <path
        d="M10 28 C7 26, 4 25, 3 26"
        stroke={SAGE_DEEP}
        strokeWidth="0.35"
        opacity="0.45"
      />
      {/* Hoja derecha */}
      <path
        d="M10 40 C15 37, 18 34, 17 38 C16 42, 10 40 10 40Z"
        fill={SAGE_SOFT}
        stroke={SAGE}
        strokeWidth="0.7"
        opacity="0.8"
      />
      <path
        d="M10 40 C13 38, 16 36, 17 38"
        stroke={SAGE_DEEP}
        strokeWidth="0.35"
        opacity="0.45"
      />
    </svg>
  );
}

/* ── 3 variantes de pétalo ────────────────────────────────────────── */
const PRIMARY = "#6a1023";
const PRIMARY_VEIN = "#3d0010";

function PetalSvg1() {
  return (
    <svg viewBox="0 0 16 24" className="w-[13px] h-[20px]" fill="none">
      <path
        d="M8 2 C12 6, 13 14, 8 22 C3 14, 4 6, 8 2Z"
        fill={PRIMARY}
        stroke={PRIMARY}
        strokeWidth="0.5"
      />
      <path
        d="M8 6 C9.5 10, 9.5 16, 8 20"
        stroke={PRIMARY_VEIN}
        strokeWidth="0.35"
        opacity="0.55"
      />
    </svg>
  );
}
function PetalSvg2() {
  return (
    <svg viewBox="0 0 18 26" className="w-[12px] h-[19px]" fill="none">
      <path
        d="M9 2 C15 7, 16 17, 9 24 C3 17, 4 7, 9 2Z"
        fill={PRIMARY}
        stroke={PRIMARY}
        strokeWidth="0.5"
      />
      <path
        d="M9 5 C11 11, 11 18, 9 22"
        stroke={PRIMARY_VEIN}
        strokeWidth="0.35"
        opacity="0.45"
      />
    </svg>
  );
}
function PetalSvg3() {
  return (
    <svg viewBox="0 0 14 22" className="w-[11px] h-[18px]" fill="none">
      <path
        d="M7 2 C11 5, 12 12, 7 20 C2 12, 3 5, 7 2Z"
        fill={PRIMARY}
        stroke={PRIMARY}
        strokeWidth="0.5"
      />
      <path
        d="M7 5 C8 9, 8 14, 7 18"
        stroke={PRIMARY_VEIN}
        strokeWidth="0.35"
        opacity="0.5"
      />
    </svg>
  );
}
const PETAL_SVGS = [PetalSvg1, PetalSvg2, PetalSvg3];
const PETAL_COUNT = 36;

/* ── Enredadera vertical de borde ─────────────────────────────────── */
function VineBorder({ side = "left" }: { side?: "left" | "right" }) {
  const flip = side === "right";
  // Posiciones relativas (0-1) a lo largo del tallo
  const leaves = [0.08, 0.19, 0.3, 0.41, 0.52, 0.63, 0.74, 0.85, 0.94];
  const H = 900;

  return (
    <svg
      data-bot-vine={side}
      viewBox={`0 0 44 ${H}`}
      className={`absolute top-0 w-[44px] h-full opacity-[0.22] pointer-events-none overflow-visible${flip ? " -scale-x-100" : ""}`}
      style={{ [flip ? "right" : "left"]: 0 }}
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      aria-hidden
    >
      {/* Tallo ondulado */}
      <path
        d={`M22 0 C14 ${H * 0.1}, 30 ${H * 0.22}, 20 ${H * 0.34} C10 ${H * 0.46}, 28 ${H * 0.57}, 22 ${H * 0.68} C16 ${H * 0.79}, 26 ${H * 0.88}, 22 ${H}`}
        stroke={SAGE}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {leaves.map((pos, i) => {
        const y = pos * H;
        const isLeft = i % 2 === 0;
        const lf = isLeft
          ? `M20 ${y} C10 ${y - 10}, 2 ${y - 15}, 3 ${y} C4 ${y + 10}, 20 ${y} 20 ${y}Z`
          : `M24 ${y} C34 ${y - 10}, 42 ${y - 15}, 41 ${y} C40 ${y + 10}, 24 ${y} 24 ${y}Z`;
        const cx = isLeft ? 3 : 41;
        return (
          <g key={i}>
            <path d={lf} fill={i % 3 === 0 ? SAGE : SAGE_SOFT} opacity="0.8" />
            {/* Nervio de hoja */}
            <path
              d={
                isLeft
                  ? `M20 ${y} C12 ${y - 3}, 5 ${y - 1}, 3 ${y}`
                  : `M24 ${y} C32 ${y - 3}, 39 ${y - 1}, 41 ${y}`
              }
              stroke={SAGE_DEEP}
              strokeWidth="0.5"
              opacity="0.4"
            />
            {/* Baya en algunas */}
            {i % 3 === 1 && (
              <>
                <circle
                  cx={cx}
                  cy={y}
                  r="3"
                  fill={BLUSH}
                  stroke={SAGE}
                  strokeWidth="0.5"
                  opacity="0.9"
                />
                {i % 6 === 1 && (
                  <circle
                    cx={cx + (isLeft ? 5 : -5)}
                    cy={y - 6}
                    r="2"
                    fill={BLUSH_DEEP}
                    stroke={SAGE}
                    strokeWidth="0.4"
                    opacity="0.75"
                  />
                )}
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ── Arco floral para el hero ─────────────────────────────────────── */
function FloralArch({ width = 360 }: { width?: number }) {
  const rx = width / 2;
  const H = width * 0.52;
  // Curva del arco: bezier cuadrático
  const bezier = (t: number) => {
    const P0x = 10,
      P0y = H + 20;
    const P1x = rx,
      P1y = 0;
    const P2x = width - 10,
      P2y = H + 20;
    return {
      x: (1 - t) * (1 - t) * P0x + 2 * (1 - t) * t * P1x + t * t * P2x,
      y: (1 - t) * (1 - t) * P0y + 2 * (1 - t) * t * P1y + t * t * P2y,
      tx: 2 * (1 - t) * (P1x - P0x) + 2 * t * (P2x - P1x),
      ty: 2 * (1 - t) * (P1y - P0y) + 2 * t * (P2y - P1y),
    };
  };

  const leafTs = [0.1, 0.22, 0.38, 0.5, 0.62, 0.78, 0.9];
  const berryTs = [0.05, 0.16, 0.3, 0.44, 0.56, 0.7, 0.84, 0.95];

  return (
    <svg
      viewBox={`0 0 ${width} ${H + 40}`}
      className="absolute -top-[16px] left-1/2 -translate-x-1/2 opacity-[0.32] pointer-events-none"
      style={{ width, height: H + 40 }}
      fill="none"
      aria-hidden
    >
      {/* Arco principal */}
      <path
        d={`M10 ${H + 20} Q${rx} 0, ${width - 10} ${H + 20}`}
        stroke={SAGE}
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
      {/* Hojas a lo largo del arco */}
      {leafTs.map((t, i) => {
        const { x, y, tx, ty } = bezier(t);
        const angle = (Math.atan2(ty, tx) * 180) / Math.PI + 90;
        const isCenter = i === 3;
        return (
          <g key={i} transform={`translate(${x},${y}) rotate(${angle})`}>
            {isCenter ? (
              // Flor central grande
              <>
                {[0, 60, 120, 180, 240, 300].map((deg, j) => {
                  const pr = (deg * Math.PI) / 180;
                  return (
                    <ellipse
                      key={j}
                      cx={Math.cos(pr) * 10}
                      cy={Math.sin(pr) * 10}
                      rx="5"
                      ry="3"
                      fill={BLUSH_SOFT}
                      stroke={SAGE}
                      strokeWidth="0.6"
                      transform={`rotate(${deg},${Math.cos(pr) * 10},${Math.sin(pr) * 10})`}
                      opacity="0.9"
                    />
                  );
                })}
                <circle
                  cx="0"
                  cy="0"
                  r="4"
                  fill={BLUSH}
                  stroke={SAGE}
                  strokeWidth="0.6"
                />
                <circle cx="0" cy="0" r="1.6" fill={GOLD_SOFT} opacity="0.7" />
              </>
            ) : (
              // Hoja
              <path
                d="M0 0 C-5 -9, -9 -16, -4 -16 C1 -16, 3 -7, 0 0Z"
                fill={i % 2 === 0 ? SAGE : SAGE_SOFT}
                opacity="0.8"
              />
            )}
          </g>
        );
      })}
      {/* Bayas pequeñas */}
      {berryTs.map((t, i) => {
        const { x, y } = bezier(t);
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="1.8"
            fill={i % 3 === 0 ? BLUSH : BLUSH_DEEP}
            stroke={SAGE}
            strokeWidth="0.4"
            opacity="0.8"
          />
        );
      })}
    </svg>
  );
}

/* ── Card ornamentada ─────────────────────────────────────────────── */
function Card({
  children,
  style,
  noCorners,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  noCorners?: boolean;
}) {
  return (
    <div
      className="relative rounded-3xl p-[clamp(2rem,5vw,3rem)] backdrop-blur-[10px] overflow-visible card-shadow"
      style={{
        background: `linear-gradient(148deg, ${CREAM} 0%, rgba(245,224,214,0.35) 48%, ${CREAM} 100%)`,
        border: `1.5px solid ${GOLD_SOFT}`,
        ...style,
      }}
    >
      {/* Filete interior */}
      <div
        className="absolute inset-[9px] rounded-[17px] pointer-events-none z-0"
        style={{
          border: `0.8px solid rgba(203,176,122,0.32)`,
        }}
      />
      {/* Contenido */}
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════ */
/*  COMPONENTE PRINCIPAL                                             */
/* ══════════════════════════════════════════════════════════════════ */

export default function BotanicalVersion({ data }: { data: InviteData }) {
  const root = useRef<HTMLDivElement>(null);
  const petalsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Remove the pre-hide class so gsap.from() reads the natural final opacity
    root.current?.classList.remove("gsap-init");

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      gsap.set("[data-bot-anim]", { opacity: 1, y: 0 });
      gsap.set("[data-bot-hero]", { opacity: 1, y: 0 });
      gsap.set("[data-bot-mask]", { clipPath: "inset(0 0 0 0)" });
      gsap.set("[data-bot-petal]", { opacity: 0 });
      gsap.set("[data-bot-corner]", { opacity: 1, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      /* ── Entrance del hero ──
         El sobre monta la invitación al tocarlo, pero el flash blanco la tapa
         hasta ~FLASH_CLEAR. A partir de ahí la foto se ve sola durante
         HERO_IMAGE_HOLD y luego el texto entra en cascada, cada bloque con su
         propio fade + subida. Los tweens `from` fijan su estado inicial al
         crearse, así que todo sigue oculto durante la espera. */
      const FLASH_CLEAR = 1.2;
      const HERO_IMAGE_HOLD = 1.0;
      const HERO_TEXT_DELAY = FLASH_CLEAR + HERO_IMAGE_HOLD;
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: HERO_TEXT_DELAY,
      });
      tl.from("[data-bot-names]", {
        opacity: 0,
        y: 34,
        filter: "blur(10px)",
        duration: 1,
      })
        .from(
          "[data-bot-honor]",
          { opacity: 0, y: 28, duration: 0.9 },
          ">-0.4",
        )
        .from(
          "[data-bot-guest]",
          { opacity: 0, y: 24, stagger: 0.25, duration: 0.85 },
          ">-0.35",
        )
        .from("[data-bot-cue]", { opacity: 0, duration: 0.7 }, ">-0.2");

      gsap.to("[data-bot-cue]", {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.4,
        ease: "sine.inOut",
        delay: HERO_TEXT_DELAY + tl.duration(),
      });

      /* ── Scroll reveals ── */
      gsap.utils.toArray<HTMLElement>("[data-bot-anim]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 48,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-bot-mask]").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 2.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      /* ── Ramilletes de esquina ── */
      gsap.utils.toArray<HTMLElement>("[data-bot-corner]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          scale: 0.5,
          rotate: -15,
          duration: 0.85,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: el,
            start: "top 93%",
            toggleActions: "play none none reverse",
          },
        });
      });

      /* ── Marcas de agua: parallax suave ── */
      gsap.utils.toArray<HTMLElement>("[data-bot-watermark]").forEach((el) => {
        gsap.to(el, {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      /* ── Pétalos cayendo ── */
      if (petalsRef.current) {
        const petals =
          petalsRef.current.querySelectorAll<HTMLElement>("[data-bot-petal]");
        petals.forEach((petal, i) => {
          const startX = Math.random() * window.innerWidth;
          const drift = (Math.random() - 0.5) * 220;
          const dur = 9 + Math.random() * 14;
          const delay = (i / petals.length) * 14;
          gsap.set(petal, {
            x: startX,
            y: -50,
            rotation: Math.random() * 360,
            scale: 0.5 + Math.random() * 0.8,
            opacity: 0,
          });
          const targetY = window.innerHeight * 0.82;
          gsap
            .timeline({ repeat: -1, delay })
            .to(petal, { opacity: 0.65, duration: 0.6, ease: "power1.out" })
            .to(
              petal,
              {
                y: targetY,
                x: `+=${drift}`,
                rotation: `+=${(Math.random() - 0.5) * 600}`,
                duration: dur,
                ease: "none",
              },
              "<",
            )
            .to(
              petal,
              { opacity: 0, duration: 3, ease: "power2.in" },
              `-=3`,
            )
            .set(petal, { x: Math.random() * window.innerWidth, y: -50 });
        });
      }

      /* ── Cita: palabras en scrub ── */
      const qs = document.querySelector("[data-bot-quote-section]");
      if (qs) {
        gsap.from("[data-bot-quote-word]", {
          opacity: 0,
          y: 28,
          filter: "blur(5px)",
          stagger: 0.09,
          ease: "power2.out",
          scrollTrigger: {
            trigger: qs,
            start: "top 82%",
            end: "bottom 58%",
            scrub: 0.5,
          },
        });
      }

      ScrollTrigger.refresh();
    }, root);

    return () => ctx.revert();
  }, []);

  const quoteWords = data.quote.split(" ");

  return (
    <div
      ref={root}
      className="gsap-init relative overflow-x-hidden bg-sage-pale font-serif text-ink"
    >
      {/* Overlay de grano (papel impreso) */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.038] mix-blend-multiply grain-overlay"
      />

      {/* ═══════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════ */}
      <section
        className="relative min-h-svh flex flex-col items-center justify-end text-center pt-[6rem] px-6 pb-[6rem] overflow-hidden bg-sage-deep md:pb-[3vh] lg:pb-[4vh]"
      >
        {/* Foto de fondo */}
        <Image
          src="/fotos/inicio.jpg"
          alt="Juan y Cynthia"
          fill
          priority
          sizes="100vw"
          className="object-cover z-0 origin-bottom scale-[1.12] object-[center_bottom] md:scale-100 md:object-[center_28%] lg:object-[center_25%]"
        />
        {/* Velo oscuro para legibilidad */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background:
              "linear-gradient(180deg, rgba(42,26,29,0.30) 0%, rgba(42,26,29,0.18) 30%, rgba(42,26,29,0.48) 58%, rgba(42,26,29,0.80) 100%)",
          }}
        />

        {/* Pétalos cayendo */}
        <div
          ref={petalsRef}
          aria-hidden
          className="absolute inset-0 pointer-events-none z-[1]"
        >
          {Array.from({ length: PETAL_COUNT }, (_, i) => {
            const Svg = PETAL_SVGS[i % PETAL_SVGS.length];
            return (
              <div key={i} data-bot-petal className="absolute top-0 left-0 will-change-transform">
                <Svg />
              </div>
            );
          })}
        </div>

        {/* Viñeta de bordes */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background:
              "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 55%, rgba(42,26,29,0.25) 100%)",
          }}
        />

        {/* Nombres */}
        <div
          data-bot-names
          className="relative z-[2] w-full max-w-[420px] md:max-w-[640px] mx-auto mb-[0.8rem]"
        >
          <span
            className="block font-script text-[clamp(.5rem,20vw,8rem)] [@media(max-height:720px)]:text-[3rem] md:text-[3.6rem] lg:text-[4.4rem] text-white leading-none tracking-[-0.01em] whitespace-nowrap"
            style={{ textShadow: "0 2px 32px rgba(0,0,0,0.4)" }}
          >
            J&amp;C
          </span>
        </div>

        {/* Invitación */}
        <h1
          data-bot-honor
          className="font-serif italic font-light text-[clamp(1.35rem,4vw,2.1rem)] [@media(max-height:720px)]:text-[1.15rem] md:text-[1.6rem] lg:text-[1.8rem] text-white opacity-90 max-w-[400px] md:max-w-[540px] leading-[1.35] mb-[1.8rem] [@media(max-height:720px)]:mb-[1.1rem] md:mb-[0.9rem] relative z-[2]"
          style={{ textShadow: "0 1px 12px rgba(0,0,0,0.35)" }}
        >
          Tenemos el honor de invitarles a la celebración de nuestro matrimonio
        </h1>

        {/* Invitado */}
        <p
          data-bot-guest
          className="text-[0.56rem] uppercase tracking-[0.32em] text-white/80 mb-2 font-sans relative z-[2]"
        >
          Para
        </p>
        <p
          data-bot-guest
          className="font-script text-[clamp(2.2rem,7.5vw,3.8rem)] [@media(max-height:720px)]:text-[1.8rem] md:text-[2.4rem] lg:text-[2.7rem] text-white leading-[1.1] mb-[0.4rem] relative z-[2]"
          style={{ textShadow: "0 1px 20px rgba(0,0,0,0.35)" }}
        >
          {data.nombres}
        </p>
        <p
          data-bot-guest
          className="text-[0.72rem] uppercase tracking-[0.32em] text-white opacity-90 font-sans relative z-[2]"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.35)" }}
        >
          {data.pases} {data.pases === 1 ? "pase" : "pases"}
        </p>

        {/* Flecha desliza */}
        <div
          data-bot-cue
          className="absolute top-[28px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-[6px] z-[2] opacity-75"
        >
          {/* Rama de rosa con hoja triangular en la punta — en blanco,
              a juego con el texto "Desliza" */}
          <svg
            viewBox="0 0 26 82"
            className="w-[20px] h-[66px]"
            fill="none"
            aria-hidden
          >
            {/* Hoja lanceolada en la punta — apunta hacia arriba */}
            <path
              d="M13 1 C10 6, 5 14, 6 20 C7 26, 11 29, 13 30 C15 29, 19 26, 20 20 C21 14, 16 6, 13 1 Z"
              fill="rgba(255,255,255,0.45)"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="0.75"
              opacity="0.95"
            />
            <path
              d="M13 3 C13 12, 13 22, 13 29"
              stroke="rgba(255,255,255,0.75)"
              strokeWidth="0.38"
              opacity="0.55"
              strokeLinecap="round"
            />
            <path
              d="M13 10 C10 12, 7 13, 6 16"
              stroke="rgba(255,255,255,0.75)"
              strokeWidth="0.28"
              opacity="0.35"
              strokeLinecap="round"
            />
            <path
              d="M13 10 C16 12, 19 13, 20 16"
              stroke="rgba(255,255,255,0.75)"
              strokeWidth="0.28"
              opacity="0.35"
              strokeLinecap="round"
            />
            {/* Tallo */}
            <path
              d="M13 29 C12.4 44, 13.6 60, 13 80"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            {/* Hoja izquierda */}
            <path
              d="M12.5 46 C5 40, 2 35, 4 39 C6 43, 12.5 46 12.5 46Z"
              fill="rgba(255,255,255,0.45)"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="0.65"
              opacity="0.9"
            />
            <path
              d="M12.5 46 C7.5 42.5, 4 39, 4 39"
              stroke="rgba(255,255,255,0.75)"
              strokeWidth="0.32"
              opacity="0.5"
            />
            {/* Hoja derecha */}
            <path
              d="M13.5 63 C21 57, 24 52, 22 56 C20 60, 13.5 63 13.5 63Z"
              fill="rgba(255,255,255,0.45)"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="0.65"
              opacity="0.9"
            />
            <path
              d="M13.5 63 C18.5 59.5, 22 56, 22 56"
              stroke="rgba(255,255,255,0.75)"
              strokeWidth="0.32"
              opacity="0.5"
            />
          </svg>
          <span className="text-[0.48rem] uppercase tracking-[0.42em] font-sans text-white/85">
            Desliza
          </span>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FECHA + COUNTDOWN
      ═══════════════════════════════════════════ */}
      <section
        className="relative pt-[4rem] px-6 pb-[3.5rem] overflow-hidden bg-primary text-center md:pt-[5.5rem] md:pb-[5rem] lg:pt-[6.5rem] lg:pb-[6rem]"
      >
        <div className="relative z-[1]">
          <div className="max-w-[560px] md:max-w-[620px] mx-auto">
            <div className="flex items-center justify-center gap-[clamp(1rem,4vw,2.5rem)]">
              {[
                { label: "día", value: data.dia, large: true },
                { label: "mes", value: data.mes, large: false },
                { label: "año", value: data.anio, large: true },
              ].map(({ label, value, large }, i) => (
                <div
                  key={label}
                  className="flex items-center gap-[clamp(1rem,4vw,2.5rem)]"
                >
                  {i > 0 && (
                    <svg
                      viewBox="0 0 6 60"
                      className="w-[6px] h-[56px]"
                      fill="none"
                    >
                      <path
                        d="M3 2 C3 20, 3 40, 3 58"
                        stroke="rgba(255,255,255,0.25)"
                        strokeWidth="1"
                      />
                      <circle
                        cx="3"
                        cy="2"
                        r="2"
                        fill="rgba(255,255,255,0.35)"
                      />
                      <circle
                        cx="3"
                        cy="58"
                        r="2"
                        fill="rgba(255,255,255,0.35)"
                      />
                    </svg>
                  )}
                  <div className="flex flex-col items-center">
                    <span className="text-[0.48rem] uppercase tracking-[0.38em] text-white/65 font-sans mb-[4px]">
                      {label}
                    </span>
                    <span
                      className="font-serif font-light text-white leading-none"
                      style={{
                        fontSize: large
                          ? "clamp(2.2rem, 6.5vw, 3.2rem)"
                          : "clamp(1.2rem, 3.5vw, 1.75rem)",
                      }}
                    >
                      {value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[0.56rem] uppercase tracking-[0.42em] text-white/65 font-sans">
              {data.weekday}
            </p>

            {/* Separador */}
            <div className="h-px w-[60px] mx-auto my-[1.2rem] bg-white/20" />

            <p className="text-[0.53rem] uppercase tracking-[0.42em] text-white/65 mb-[1.4rem] font-sans">
              Faltan
            </p>
            <Countdown targetIso={data.ceremonia_fecha_iso} variant="primary" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          DRESS CODE — foto del beso a sangre
      ═══════════════════════════════════════════ */}
      <section className="relative min-h-[70svh] lg:min-h-[80svh] flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden bg-sage-deep">
        <Image
          src="/fotos/beso.jpg"
          alt="Juan y Cynthia besándose"
          fill
          sizes="100vw"
          className="object-cover z-0 object-[center_58%] md:object-[center_62%]"
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background:
              "linear-gradient(180deg, rgba(42,26,29,0.55) 0%, rgba(42,26,29,0.48) 45%, rgba(42,26,29,0.62) 100%)",
          }}
        />
        <div data-bot-anim className="relative z-[2] max-w-[560px] mx-auto">
          <p
            className="text-[0.5rem] uppercase tracking-[0.42em] text-white/70 font-sans mb-[0.7rem]"
            style={{ textShadow: "0 1px 10px rgba(0,0,0,0.4)" }}
          >
            Código de vestimenta
          </p>
          <p
            className="font-script text-[clamp(2.8rem,11vw,4.6rem)] lg:text-[5.5rem] text-white leading-none"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.4)" }}
          >
            Formal
          </p>
          <BranchDivider light />
          <p
            className="font-serif italic text-[0.95rem] md:text-[1.05rem] text-white/85 leading-[1.4] max-w-[380px] mx-auto"
            style={{ textShadow: "0 1px 14px rgba(0,0,0,0.45)" }}
          >
            <span className="block not-italic uppercase tracking-[0.32em] text-[0.5rem] text-white/60 mb-[0.5rem] font-sans">
              Nota
            </span>
            Prescindir de blanco en todos sus tonos y<br />
            cuello en V en mujeres.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CEREMONIA
      ═══════════════════════════════════════════ */}
      <section
        className="relative pt-[4rem] px-6 pb-[4.5rem] overflow-hidden md:pt-[6rem] md:pb-[6.5rem] lg:pt-[7rem] lg:pb-[7.5rem]"
        style={{ background: CREAM }}
      >
        <div data-bot-anim className="relative z-[1]">
          <Card
            noCorners
            style={{
              maxWidth: 640,
              margin: "0 auto",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              background: "var(--primary)",
              border: `1.5px solid rgba(255,255,255,0.18)`,
              boxShadow: `0 12px 56px rgba(106,16,35,0.28), 0 3px 12px rgba(0,0,0,0.15)`,
            }}
          >
            <p className="text-[0.56rem] uppercase tracking-[0.46em] text-white/75 mb-[0.9rem] font-sans">
              Ceremonia
            </p>
            <h2
              data-bot-mask
              className="font-serif italic text-[clamp(2rem,6vw,3.2rem)] text-white leading-[1.15] mb-[0.7rem]"
            >
              {data.ceremonia_lugar}
            </h2>
            {data.ceremonia_direccion && (
              <p className="text-[0.82rem] text-white/70 mb-[1.3rem] leading-[1.65]">
                {data.ceremonia_direccion}
              </p>
            )}
            <div className="h-px w-[80px] mx-auto my-[0.8rem] bg-white/35" />
            <p
              data-bot-mask
              className="text-[0.9rem] text-white/75 mb-2"
            >
              {data.fecha_larga}
            </p>
            <p
              data-bot-mask
              className="font-serif italic text-[clamp(1.5rem,4.5vw,2.1rem)] text-white mb-[1.4rem]"
            >
              a las {data.hora}
            </p>
            {data.ceremonia_mapa_url && (
              <a
                href={data.ceremonia_mapa_url}
                target="_blank"
                rel="noreferrer"
                className="inline-block text-white py-[0.58rem] px-8 text-[0.56rem] uppercase tracking-[0.32em] rounded-full no-underline font-sans transition-all duration-[250ms]"
                style={{
                  border: `1.5px solid rgba(255,255,255,0.5)`,
                  background: `rgba(255,255,255,0.1)`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.22)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.8)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
                }}
              >
                Ver en el mapa
              </a>
            )}
          </Card>

          {!data.incluye_fiesta && (
            <p
              data-bot-anim
              className="font-serif italic text-sage-deep text-[clamp(1.1rem,3.5vw,1.5rem)] leading-[1.55] font-normal text-center max-w-[480px] mx-auto mt-8 opacity-80"
            >
              La ubicación de la fiesta se dará a conocer <br></br>durante la
              ceremonia.
            </p>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          REGALOS
      ═══════════════════════════════════════════ */}
      <section className="relative min-h-[75svh] lg:min-h-[85svh] flex flex-col items-center justify-center py-20 px-6 overflow-hidden bg-sage-deep">
        <Image
          src="/fotos/balcon.jpg"
          alt="Juan y Cynthia riendo en el balcón"
          fill
          sizes="100vw"
          quality={95}
          className="object-cover z-0 origin-bottom scale-[1.3] object-[center_45%] md:object-[center_54%]"
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background:
              "linear-gradient(180deg, rgba(42,26,29,0.62) 0%, rgba(42,26,29,0.5) 45%, rgba(42,26,29,0.66) 100%)",
          }}
        />
        <div data-bot-anim className="relative z-[2]">
          <div className="max-w-[540px] mx-auto text-center">
            <h2
              className="font-serif italic text-[clamp(1.9rem,5.5vw,2.8rem)] text-white mb-[0.7rem] leading-[1.05]"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.4)" }}
            >
              Tu presencia es nuestro mayor regalo
            </h2>
            <p
              className="text-[1.05rem] text-white/75 max-w-[360px] mx-auto mb-[1.6rem] leading-[1.75]"
              style={{ textShadow: "0 1px 14px rgba(0,0,0,0.45)" }}
            >
              Si además quieres tener un detalle con nosotros, puedes hacerlo
              por Zelle:
            </p>
            <Card
              noCorners
              style={{
                maxWidth: 290,
                // Baja el panel para no partir la cara de Cynthia por la mitad
                margin: "5rem auto 0",
                textAlign: "center",
                background: "rgba(42,26,29,0.38)",
                backdropFilter: "none",
                textShadow: "0 1px 10px rgba(0,0,0,0.55)",
                border: `1.5px solid rgba(203,176,122,0.5)`,
                boxShadow: `0 12px 56px rgba(0,0,0,0.28), 0 3px 12px rgba(0,0,0,0.15)`,
              }}
            >
              <p className="text-[0.48rem] uppercase tracking-[0.42em] text-white/70 mb-[0.8rem] font-sans">
                Zelle
              </p>
              <p className="font-mono text-[0.74rem] text-white mb-[0.8rem] opacity-90">
                correo-o-telefono@ejemplo.com
              </p>
              <div
                className="h-px my-[0.8rem] opacity-60"
                style={{
                  background: `linear-gradient(to right, transparent, ${GOLD_SOFT}, transparent)`,
                }}
              />
              <p className="text-[0.48rem] uppercase tracking-[0.28em] text-white/70 mb-[0.3rem] font-sans">
                Titular
              </p>
              <p className="font-serif italic text-[1.05rem] text-white">
                Nombre Apellido
              </p>
              <div
                className="h-px my-[0.8rem] opacity-60"
                style={{
                  background: `linear-gradient(to right, transparent, ${GOLD_SOFT}, transparent)`,
                }}
              />
              <p className="text-[0.48rem] uppercase tracking-[0.28em] text-white/70 mb-[0.5rem] font-sans">
                Referencia
              </p>
              <p className="font-mono text-[0.7rem] text-white/85 leading-[1.7]">
                Para: J&amp;C<br />De: [tu nombre]
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          RSVP
      ═══════════════════════════════════════════ */}
      <section
        id="rsvp-botanical"
        className="relative py-16 px-6 overflow-hidden bg-primary md:py-[6rem]"
      >
        <div data-bot-anim className="relative z-[1]">
          <Card style={{ maxWidth: 540, margin: "0 auto", background: CREAM }}>
            <h2 className="text-center font-serif italic text-[clamp(1.9rem,5.5vw,2.8rem)] text-sage-deep mb-[0.6rem]">
              ¿Nos acompañarás?
            </h2>
            <div
              className="h-px mx-auto mb-[1.6rem] w-[55%] opacity-[0.55]"
              style={{
                background: `linear-gradient(to right, transparent, ${GOLD_SOFT}, transparent)`,
              }}
            />
            {data.deadline_passed ? (
              <p className="text-center italic text-ink opacity-[0.58]">
                El plazo de confirmación ha terminado.
              </p>
            ) : (
              <RsvpForm
                slug={data.slug}
                pases={data.pases}
                confirmadoActual={data.confirmado}
                pasesConfirmadosActual={data.pases_confirmados}
              />
            )}
          </Card>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CIERRE
      ═══════════════════════════════════════════ */}
      <section className="relative min-h-[70svh] lg:min-h-[80svh] flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden bg-sage-deep">
        <Image
          src="/fotos/cierre.jpg"
          alt="Juan y Cynthia"
          fill
          sizes="100vw"
          className="object-cover z-0 md:object-[center_30%] lg:object-[center_28%]"
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background:
              "linear-gradient(180deg, rgba(42,26,29,0.45) 0%, rgba(42,26,29,0.35) 50%, rgba(42,26,29,0.6) 100%)",
          }}
        />
        <div data-bot-anim className="relative z-[2]">
          <p className="font-script text-[clamp(2.6rem,10vw,5rem)] lg:text-[6.5rem] text-white leading-none mb-3" style={{ textShadow: "0 2px 24px rgba(0,0,0,0.4)" }}>
            ¡Nos vemos!
          </p>
          <p className="text-[0.62rem] uppercase tracking-[0.42em] text-white/80 font-sans">
            J&amp;C · {data.fecha_larga}
          </p>
        </div>
      </section>
    </div>
  );
}
