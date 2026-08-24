import { useEffect, useRef, useState } from "react";

type LeadForm = { nome: string; whatsapp: string; email: string };

type CreatePixResponse = {
  paymentId?: string;
  qrCode?: string;
  qrCodeBase64?: string;
  status?: string;
  error?: string;
};

type PixStatusResponse = { status?: string; error?: string };

type Step = "idle" | "loading" | "awaiting" | "approved" | "error";

export function PixCheckout({ leadForm }: { leadForm: LeadForm }) {
  const [step, setStep] = useState<Step>("idle");
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [qrCodeBase64, setQrCodeBase64] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isFormValid = Boolean(leadForm.nome && leadForm.whatsapp && leadForm.email);

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  const startPolling = (id: string) => {
    if (pollRef.current) clearInterval(pollRef.current);
    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/pix-status?id=${encodeURIComponent(id)}`);
        const data = (await res.json()) as PixStatusResponse;
        if (data.status === "approved") {
          setStep("approved");
          if (pollRef.current) clearInterval(pollRef.current);
        }
      } catch {
        // silencioso — tenta de novo no próximo ciclo
      }
    }, 4000);
  };

  const handleStart = async () => {
    if (!isFormValid) return;
    setStep("loading");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/create-pix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadForm),
      });
      const data = (await res.json()) as CreatePixResponse;
      if (!res.ok || data.error || !data.qrCode) {
        setErrorMsg(data.error ?? "Não foi possível gerar o Pix. Tente novamente.");
        setStep("error");
        return;
      }
      setQrCode(data.qrCode);
      setQrCodeBase64(data.qrCodeBase64 ?? null);
      setPaymentId(data.paymentId ?? null);
      setStep("awaiting");
      if (data.paymentId) startPolling(data.paymentId);
    } catch {
      setErrorMsg("Erro de conexão. Tente novamente.");
      setStep("error");
    }
  };

  const handleCopy = async () => {
    if (!qrCode) return;
    try {
      await navigator.clipboard.writeText(qrCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignora — usuário pode selecionar manualmente
    }
  };

  if (step === "approved") {
    return (
      <div className="border-gold/40 mt-6 border bg-black/30 px-6 py-8 text-center">
        <p className="text-gold-light font-serif text-2xl">✓ Pagamento confirmado!</p>
        <p className="text-ivory/70 mt-3 text-sm leading-relaxed">
          Obrigado por entrar nessa jornada de 40 dias. Em instantes você recebe a confirmação por
          e-mail e WhatsApp com o acesso ao devocional.
        </p>
      </div>
    );
  }

  if (step === "awaiting" && qrCode) {
    return (
      <div className="border-gold/40 mt-6 border bg-black/30 px-6 py-8 text-center">
        <p className="text-gold-light font-serif text-lg">Escaneie o QR Code ou copie o código</p>
        {qrCodeBase64 && (
          <img
            src={`data:image/png;base64,${qrCodeBase64}`}
            alt="QR Code Pix"
            className="mx-auto mt-5 w-48 rounded-sm bg-white p-2"
          />
        )}
        <button
          type="button"
          onClick={handleCopy}
          className="border-gold/40 text-gold-light mt-5 w-full border px-4 py-3 text-sm break-all"
        >
          {copied ? "Copiado!" : "📋 Copiar código Pix"}
        </button>
        <p className="text-ivory/60 mt-4 text-xs">
          Aguardando confirmação automática do pagamento...
        </p>
        <p className="text-ivory/40 mt-1 text-xs">Isso costuma levar poucos segundos após o Pix.</p>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={handleStart}
        disabled={!isFormValid || step === "loading"}
        className={`btn-gold mt-6 w-full text-base ${
          isFormValid ? "" : "pointer-events-none opacity-50"
        }`}
      >
        {step === "loading" ? "Gerando Pix..." : "🙏 Quero começar agora"}
      </button>
      {step === "error" && errorMsg && (
        <p className="mt-3 text-sm text-red-300">{errorMsg}</p>
      )}
    </>
  );
}
