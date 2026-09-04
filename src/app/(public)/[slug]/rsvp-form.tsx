"use client";

import { useActionState, useEffect, useState } from "react";
import { submitRsvp, type RsvpResult } from "@/app/actions/rsvp";
import TransmisionEnVivo from "./transmision-en-vivo";
import { COPY, type Lang } from "@/lib/i18n";

export default function RsvpForm({
  slug,
  pases,
  confirmadoActual,
  pasesConfirmadosActual,
  lang = "es",
}: {
  slug: string;
  pases: number;
  confirmadoActual: boolean | null;
  pasesConfirmadosActual: number | null;
  lang?: Lang;
}) {
  const t = COPY[lang];
  const [confirmado, setConfirmado] = useState<"si" | "no" | "">(
    confirmadoActual === true ? "si" : confirmadoActual === false ? "no" : "",
  );
  const [pasesCount, setPasesCount] = useState<number>(
    pasesConfirmadosActual ?? pases,
  );
  const [state, formAction, pending] = useActionState<
    RsvpResult | null,
    FormData
  >(submitRsvp, null);
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    if (state?.ok) setEditando(false);
  }, [state]);

  if (state?.ok && !editando) {
    if (confirmado === "no") {
      return (
        <div className="flex flex-col gap-4 text-center">
          <p className="font-serif text-2xl italic text-[var(--wine-deep)]">
            {t.rsvpGraciasAvisar}
          </p>
          <TransmisionEnVivo pases={pases} lang={lang} />
          <button
            type="button"
            onClick={() => setEditando(true)}
            className="text-xs uppercase tracking-[0.2em] text-[var(--wine)] underline-offset-4 hover:underline"
          >
            {t.rsvpModificar}
          </button>
        </div>
      );
    }
    const pasesSinUsar = pases - pasesCount;
    return (
      <div className="flex flex-col gap-4 text-center">
        <div className="rounded-lg border border-[var(--wine)]/30 bg-white/70 p-6 text-center">
          <p className="font-serif text-2xl italic text-[var(--wine-deep)]">
            {t.rsvpGracias}
          </p>
          <p className="mt-2 text-sm text-[var(--ink)]/80">
            {t.rsvpGuardado}
          </p>
          <button
            type="button"
            onClick={() => setEditando(true)}
            className="mt-3 text-xs uppercase tracking-[0.2em] text-[var(--wine)] underline-offset-4 hover:underline"
          >
            {t.rsvpModificar}
          </button>
        </div>
        {pasesSinUsar > 0 && (
          <TransmisionEnVivo parcial pases={pases} lang={lang} />
        )}
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <input type="hidden" name="slug" value={slug} />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label
          className={`group cursor-pointer rounded-lg border px-5 py-4 text-center transition ${
            confirmado === "si"
              ? "border-[var(--wine)] bg-[var(--wine)] text-white shadow-md"
              : "border-[var(--wine)]/40 bg-white/70 text-[var(--ink)] hover:border-[var(--wine)]"
          }`}
        >
          <input
            type="radio"
            name="confirmado"
            value="si"
            checked={confirmado === "si"}
            onChange={() => setConfirmado("si")}
            className="sr-only"
          />
          <span className="block font-serif text-xl">
            {pases > 1 ? t.rsvpSiPlural : t.rsvpSiSingular}
          </span>
          <span className="mt-1 block text-[10px] uppercase tracking-[0.25em] opacity-70">
            {t.rsvpConGusto}
          </span>
        </label>
        <label
          className={`group cursor-pointer rounded-lg border px-5 py-4 text-center transition ${
            confirmado === "no"
              ? "border-[var(--wine-deep)] bg-[var(--wine-deep)] text-white shadow-md"
              : "border-[var(--wine)]/40 bg-white/70 text-[var(--ink)] hover:border-[var(--wine-deep)]"
          }`}
        >
          <input
            type="radio"
            name="confirmado"
            value="no"
            checked={confirmado === "no"}
            onChange={() => setConfirmado("no")}
            className="sr-only"
          />
          <span className="block font-serif text-xl">
            {pases > 1 ? t.rsvpNoPlural : t.rsvpNoSingular}
          </span>
          <span className="mt-1 block text-[10px] uppercase tracking-[0.25em] opacity-70">
            {pases > 1 ? t.rsvpCorazonPlural : t.rsvpCorazonSingular}
          </span>
        </label>
      </div>

      {confirmado === "si" && pases > 1 && (
        <label className="flex flex-col gap-2 text-sm text-[var(--ink)]">
          <span className="text-xs uppercase tracking-[0.25em] text-[var(--wine-deep)]">
            {t.rsvpCuantosPases(pases)}
          </span>
          <input
            type="number"
            name="pases_confirmados"
            min={1}
            max={pases}
            value={pasesCount}
            onChange={(e) => setPasesCount(Number(e.target.value))}
            className="rounded border border-[var(--wine)]/40 bg-white px-3 py-2 text-base text-[var(--ink)] focus:border-[var(--wine-deep)] focus:outline-none"
          />
        </label>
      )}
      {confirmado === "si" && pases === 1 && (
        <input type="hidden" name="pases_confirmados" value={1} />
      )}

      <button
        type="submit"
        disabled={!confirmado || pending}
        className="rounded-full bg-[var(--wine)] px-6 py-3 text-sm uppercase tracking-[0.3em] text-white transition hover:bg-[var(--wine-deep)] disabled:opacity-40"
      >
        {pending ? t.rsvpGuardando : t.rsvpConfirmar}
      </button>

      {state?.ok === false && (
        <p className="text-center text-sm text-red-700">{state.error}</p>
      )}
    </form>
  );
}
