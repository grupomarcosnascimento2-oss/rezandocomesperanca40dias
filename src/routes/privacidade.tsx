import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [{ title: "Política de Privacidade | 40 Dias Rezando com Marcos Nascimento" }],
  }),
  component: Privacidade,
});

function Privacidade() {
  return (
    <main className="paper px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <Link to="/" className="text-gold text-sm">
          ← Voltar
        </Link>
        <h1 className="text-primary mt-6 font-serif text-3xl font-light">
          Política de Privacidade
        </h1>
        <div className="text-foreground/80 mt-8 space-y-5 text-base leading-relaxed">
          <p>
            Esta página explica, de forma simples, como os dados fornecidos por você são tratados
            ao usar este site.
          </p>
          <p>
            <strong>Dados coletados.</strong> Ao preencher o formulário de contribuição,
            coletamos nome, WhatsApp e e-mail, usados exclusivamente para liberar seu acesso ao
            devocional e para contato relacionado à compra.
          </p>
          <p>
            <strong>Uso dos dados.</strong> Não vendemos, alugamos ou compartilhamos seus dados
            com terceiros para fins de marketing sem sua autorização.
          </p>
          <p>
            <strong>Armazenamento.</strong> Os dados são armazenados de forma segura pelo tempo
            necessário para cumprir a finalidade de contato e suporte.
          </p>
          <p>
            <strong>Seus direitos.</strong> Você pode solicitar a atualização ou exclusão dos seus
            dados a qualquer momento pelo WhatsApp de suporte disponível no rodapé do site.
          </p>
          <p>
            <strong>Contato.</strong> Em caso de dúvidas sobre esta política, entre em contato
            pelo WhatsApp de suporte.
          </p>
        </div>
      </div>
    </main>
  );
}
