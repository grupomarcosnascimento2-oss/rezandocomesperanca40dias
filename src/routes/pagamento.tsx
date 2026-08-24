import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import capa from "@/assets/40-dias-capa.png.asset.json";

type CreatePixResponse = {
  paymentId?: string;
  qrCode?: string;
  qrCodeBase64?: string;
  status?: string;
  error?: string;
};

type PixStatusResponse = { status?: string; error?: string };

type Step = "loading" | "awaiting" | "approved" | "error";

type PagamentoSearch = {
  nome?: string;
  whatsapp?: string;
  email?: string;
};

export const Route = createFileRoute("/pagamento")({
  validateSearch: (search: Record<string, unknown>): PagamentoSearch => ({
    nome: typeof search.nome === "string" ? search.nome : undefined,
    whatsapp: typeof search.whatsapp === "string" ? search.whatsapp : undefined,
    email: typeof search.email === "string" ? search.email : undefined,
  }),
  head: () => ({
    meta: [{ title: "Pagamento | 40 Dias Rezando com Marcos Nascimento" }],
  }),
  component: Pagamento,
});

function Pagamento() {
  const { nome, whatsapp, email } = Route.useSearch();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("loading");
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [qrCodeBase64, setQrCodeBase64] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!nome || !whatsapp || !email) {
      navigate({ to: "/", hash: "oferta" });
      return;
    }
    if (startedRef.current) return;
    startedRef.current = true;

    const criarPix = async () => {
      try {
        const res = await fetch("/api/create-pix", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome, whatsapp, email }),
        });
        const data = (await res.json()) as CreatePixResponse;
        if (!res.ok || data.error || !data.qrCode) {
          setErrorMsg(data.error ?? "Não foi possível gerar o Pix. Tente novamente.");
          setStep("error");
          return;
        }
        setQrCode(data.qrCode);
        setQrCodeBase64(data.qrCodeBase64 ?? null);
        setStep("awaiting");

        if (data.paymentId) {
          pollRef.current = setInterval(async () => {
            try {
              const statusRes = await fetch(
                `/api/pix-status?id=${encodeURIComponent(data.paymentId!)}`,
              );
              const statusData = (await statusRes.json()) as PixStatusResponse;
              if (statusData.status === "approved") {
                setStep("approved");
                if (pollRef.current) clearInterval(pollRef.current);
              }
            } catch {
              // tenta de novo no próximo ciclo
            }
          }, 4000);
        }
      } catch {
        setErrorMsg("Erro de conexão. Tente novamente.");
        setStep("error");
      }
    };

    criarPix();
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nome, whatsapp, email]);

  const handleCopy = async () => {
    if (!qrCode) return;
    try {
      await navigator.clipboard.writeText(qrCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignora
    }
  };

  return (
    <main className="woodgrain flex min-h-screen items-center justify-center px-6 py-16">
      <div className="mx-auto w-full max-w-md text-center">
        <img
          src={capa.url}
          alt="Capa do devocional 40 Dias Rezando com Marcos Nascimento"
          className="mx-auto w-24 rounded-sm shadow-[var(--shadow-book)]"
        />
        <p className="text-gold-light font-serif text-xl tracking-wide">40 Dias Rezando</p>
        <p className="script text-gold text-2xl">com Marcos Nascimento</p>
        <div className="hairline my-6 mx-auto w-32" />

        {step === "loading" && (
          <div className="border-gold/40 border bg-black/30 px-6 py-10">
            <p className="text-ivory/80 font-serif text-lg">Gerando seu Pix...</p>
            <p className="text-ivory/50 mt-2 text-sm">Só um instante, {nome?.split(" ")[0]}.</p>
          </div>
        )}

        {step === "error" && (
          <div className="border-gold/40 border bg-black/30 px-6 py-10">
            <p className="text-ivory font-serif text-lg">Não foi possível gerar o Pix</p>
            <p className="text-ivory/60 mt-2 text-sm">{errorMsg}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn-gold mt-6 w-full text-base"
            >
              Tentar novamente
            </button>
            <Link to="/" hash="oferta" className="text-gold-light mt-4 inline-block text-sm">
              ← Voltar
            </Link>
          </div>
        )}

        {step === "awaiting" && qrCode && (
          <div className="border-gold/40 border bg-black/30 px-6 py-8">
            <p className="text-ivory font-serif text-2xl">R$ 29,90</p>
            <p className="text-ivory/60 mt-1 text-sm">Contribuição única • Acesso Imediato por 12 meses!</p>
            <p className="text-gold-light mt-6 font-serif text-lg">
              Escaneie o QR Code ou copie o código
            </p>
            {qrCodeBase64 && (
              <img
                src={`data:image/png;base64,${qrCodeBase64}`}
                alt="QR Code Pix"
                className="mx-auto mt-5 w-52 rounded-sm bg-white p-2"
              />
            )}
            <button
              type="button"
              onClick={handleCopy}
              className="border-gold/40 text-gold-light mt-5 w-full border px-4 py-3 text-sm break-all"
            >
              {copied ? "Copiado!" : "📋 Copiar código Pix"}
            </button>
            <p className="text-ivory/60 mt-5 text-xs">
              Aguardando confirmação automática do pagamento...
            </p>
            <p className="text-ivory/40 mt-1 text-xs">
              Isso costuma levar poucos segundos após o Pix ser feito.
            </p>
          </div>
        )}

        {step === "approved" && (
          <div className="border-gold/40 border bg-black/30 px-6 py-10">
            <p className="text-gold-light font-serif text-2xl">✓ Pagamento confirmado!</p>
            <p className="text-ivory/70 mt-3 text-sm leading-relaxed">
              Obrigado por entrar nessa jornada de 40 dias, {nome?.split(" ")[0]}. Em instantes
              você recebe a confirmação por e-mail e WhatsApp com o acesso ao devocional.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
