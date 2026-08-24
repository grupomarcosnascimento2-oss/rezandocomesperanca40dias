import { Link } from "@tanstack/react-router";

type LeadForm = { nome: string; whatsapp: string; email: string };

export function PixCheckout({ leadForm }: { leadForm: LeadForm }) {
  const isFormValid = Boolean(leadForm.nome && leadForm.whatsapp && leadForm.email);

  return (
    <Link
      to="/pagamento"
      search={{ nome: leadForm.nome, whatsapp: leadForm.whatsapp, email: leadForm.email }}
      className={`btn-gold mt-6 block w-full text-center text-base ${
        isFormValid ? "" : "pointer-events-none opacity-50"
      }`}
      aria-disabled={!isFormValid}
    >
      🙏 Quero começar agora
    </Link>
  );
}
