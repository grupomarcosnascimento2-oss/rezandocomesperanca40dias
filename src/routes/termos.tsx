import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [{ title: "Termos de Uso | 40 Dias Rezando com Marcos Nascimento" }],
  }),
  component: Termos,
});

function Termos() {
  return (
    <main className="paper px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <Link to="/" className="text-gold text-sm">
          ← Voltar
        </Link>
        <h1 className="text-primary mt-6 font-serif text-3xl font-light">Termos de Uso</h1>
        <div className="text-foreground/80 mt-8 space-y-5 text-base leading-relaxed">
          <p>
            Ao adquirir o devocional "40 Dias Rezando com Marcos Nascimento", você concorda com os
            termos abaixo.
          </p>
          <p>
            <strong>Acesso.</strong> O acesso ao conteúdo é liberado de forma imediata após a
            confirmação da contribuição e permanece disponível por 12 meses a partir da data de
            compra.
          </p>
          <p>
            <strong>Uso do conteúdo.</strong> O material é de uso pessoal. É proibida a
            reprodução, distribuição ou revenda, total ou parcial, sem autorização prévia.
          </p>
          <p>
            <strong>Reembolso.</strong> Conforme o Código de Defesa do Consumidor (Art. 49), você
            tem até 7 dias corridos após a compra para solicitar o cancelamento e reembolso
            integral, caso ainda não tenha feito uso relevante do conteúdo.
          </p>
          <p>
            <strong>Suporte.</strong> Dúvidas sobre acesso ou pagamento podem ser tiradas pelo
            WhatsApp de suporte disponível no rodapé do site.
          </p>
          <p>
            <strong>Alterações.</strong> Estes termos podem ser atualizados periodicamente. A
            versão vigente estará sempre disponível nesta página.
          </p>
        </div>
      </div>
    </main>
  );
}
