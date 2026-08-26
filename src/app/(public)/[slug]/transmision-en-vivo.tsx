"use client";

const YOUTUBE_CANAL = "https://youtube.com/@cynthiayjuan?si=faBKS3rGSOu_yK2h";

export default function TransmisionEnVivo({
  parcial,
  pases,
}: {
  parcial?: boolean;
  pases: number;
}) {
  return (
    <div className="animate-[fade-in_0.4s_ease-out] rounded-lg border border-[var(--wine)]/30 bg-white/70 p-5 text-center">
      <span className="block text-[10px] uppercase tracking-[0.25em] text-[var(--wine-deep)]">
        {pases > 1 ? "Los" : "Te"} esperamos en línea
      </span>
      <p className="mt-2 font-serif text-xl italic text-[var(--wine-deep)]">
        Nos harán falta
      </p>
      <p className="mt-2 text-sm text-[var(--ink)]/80">
        {parcial
          ? "Sabemos que no todos podrán acompañarnos en persona, pero queremos que sean parte de este día igual."
          : "Sabemos que no podrán acompañarnos en persona, pero queremos que sean parte de este día igual."}{" "}
        Transmitiremos la ceremonia en vivo por nuestro canal de YouTube.
      </p>

      <div className="mx-auto my-4 h-px w-24 bg-gradient-to-r from-transparent via-[#cbb07a] to-transparent" />

      <a
        href={YOUTUBE_CANAL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex max-w-full items-center justify-center gap-2 text-balance rounded-full bg-[var(--wine)] px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-[var(--wine-deep)]"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-3.5 w-3.5 shrink-0 fill-current"
        >
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
        </svg>
        Suscribirme al canal
      </a>

      <p className="mt-3 text-xs text-[var(--ink)]/60">
        Te enviaremos el enlace del directo unos días antes de la boda.
      </p>
    </div>
  );
}
