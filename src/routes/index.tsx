import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import capa from "@/assets/40-dias-capa.png.asset.json";
import marcos from "@/assets/marcos-nascimento.jpg.asset.json";
import { Reveal, Ornament } from "@/components/Reveal";
import { PixCheckout } from "@/components/PixCheckout";

const CHECKOUT_URL = "#oferta";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "40 Dias Rezando com Marcos Nascimento | Devocional" },
      {
        name: "description",
        content:
          "Um devocional de 40 dias para fortalecer a fé em todas as circunstâncias da vida: orações diárias, áudios, vídeos, reflexões e comunidade de oração.",
      },
      { property: "og:title", content: "40 Dias Rezando com Marcos Nascimento" },
      {
        property: "og:description",
        content:
          "Uma jornada diária de oração, reflexão e esperança para fortalecer a fé e descansar o coração na presença de Deus.",
      },
    ],
  }),
  component: Index,
});

function CTA({ label = "🙏 QUERO COMEÇAR MINHA JORNADA DE 40 DIAS", className = "" }) {
  return (
    <a href={CHECKOUT_URL} className={`btn-gold ${className}`}>
      {label}
    </a>
  );
}

const dores = [
  "Cansaço",
  "Preocupação",
  "Tristeza",
  "Medo",
  "Problemas familiares",
  "Falta de esperança",
];

const pilares = [
  { icon: "🙏", title: "Oração", text: "Uma oração conduzida para cada dia da jornada." },
  { icon: "🎧", title: "Áudio", text: "Reze comigo, ouvindo, mesmo no meio da correria." },
  { icon: "🎥", title: "Vídeo", text: "Uma condução breve e simples, todos os dias." },
  { icon: "📖", title: "Reflexão", text: "Uma palavra para levar no coração o dia inteiro." },
];

const passos = [
  { n: "01", t: "Entre" },
  { n: "02", t: "Escolha o dia" },
  { n: "03", t: "Ouça e leia" },
  { n: "04", t: "Reze comigo" },
  { n: "05", t: "Entregue seu coração a Deus" },
];

const quarenta = [
  { nome: "Noé", texto: "40 dias de chuva." },
  { nome: "Moisés", texto: "40 dias no Monte Sinai." },
  { nome: "Israel", texto: "40 anos no deserto." },
  { nome: "Jesus", texto: "40 dias no deserto antes do início de sua missão pública." },
];

const etapas = [
  "Caminhando com Deus",
  "Quando a vida aperta",
  "O poder da oração",
  "Deus cuida de mim",
  "Perdão e recomeço",
  "Fé para viver",
  "Quando Deus age no impossível",
  "Uma nova vida com Deus",
];

const temas = [
  "Senhor, hoje eu entrego minha vida em Tuas mãos.",
  "Aumenta a minha fé, Senhor.",
  "Senhor, eu não aguento mais sozinho.",
  "Cuida da minha família.",
  "Ensina-me a esperar.",
  "Não permitas que eu desista.",
  "Cura aquilo que ainda dói em mim.",
  "Mesmo sem entender, eu escolho confiar.",
  "Senhor, ensina-me a perdoar.",
  "Para Deus, nada é impossível.",
  "Eu quero continuar caminhando contigo.",
];

const recebe = [
  "40 dias de devocional",
  "Orações diárias",
  "Áudios",
  "Vídeos",
  "Reflexões",
  "Comunidade permanente",
  "Encontro semanal de oração",
  "1 ano de acesso",
];

const paraQuem = [
  "Está passando por um momento difícil.",
  "Está triste ou desanimado.",
  "Precisa de consolo.",
  "Está enfrentando problemas pessoais ou familiares.",
  "Quer fortalecer sua fé.",
  "Quer voltar a ter uma rotina de oração.",
  "Deseja encontrar alguns minutos de paz.",
  "Quer se aproximar de Deus.",
  "Está precisando de esperança.",
];

const objecoes = [
  {
    q: "“Eu não tenho tempo.”",
    a: "Você não precisa de horas. Precisa de alguns minutos para estar com Deus.",
  },
  { q: "“Eu não sei rezar.”", a: "Você não precisa saber. Eu vou conduzir você." },
  {
    q: "“Tenho medo de não conseguir completar.”",
    a: "Não transforme a jornada em cobrança. Se precisar parar, volte. Se cair, recomece.",
  },
  {
    q: "“Minha situação é muito difícil.”",
    a: "Você não precisa resolver tudo antes de começar a rezar.",
  },
];

const faqs = [
  {
    q: "Preciso ter experiência com oração para participar?",
    a: "Não. Você será conduzido passo a passo, todos os dias, sem precisar saber orações prontas.",
  },
  {
    q: "Quanto tempo preciso dedicar por dia?",
    a: "Poucos minutos por dia. A jornada foi pensada para caber na sua rotina, não para pesar nela.",
  },
  {
    q: "Como funciona o acesso ao conteúdo?",
    a: "Você acessa direto pelo navegador, sem precisar instalar nada. Assim que confirmar a contribuição, o acesso é liberado imediatamente.",
  },
  {
    q: "Por quanto tempo terei acesso?",
    a: "Você terá acesso imediato por 12 meses a todo o conteúdo dos 40 dias, podendo rever quantas vezes quiser.",
  },
  {
    q: "E se eu não conseguir seguir todos os dias seguidos?",
    a: "Não tem problema. Não é uma cobrança, é uma caminhada. Se precisar parar, volte quando puder e continue de onde parou.",
  },
  {
    q: "A comunidade de oração e o encontro semanal têm custo extra?",
    a: "Não. Os dois são bônus inclusos gratuitamente para quem entra na jornada dos 40 dias.",
  },
  {
    q: "Este devocional é indicado para qualquer momento de vida?",
    a: "Sim. Foi pensado especialmente para quem está cansado, preocupado, triste ou precisando reacender a esperança — mas serve para qualquer pessoa que deseje se aproximar de Deus.",
  },
];

function Index() {
  const [leadForm, setLeadForm] = useState({ nome: "", whatsapp: "", email: "" });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <main className="paper overflow-x-hidden pb-24 md:pb-0">
      {/* HERO */}
      <section className="woodgrain relative">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_60%_20%,rgba(201,164,90,0.22),transparent_70%)]" />
        <div className="relative mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
          <Reveal>
            <p className="eyebrow text-gold-light/90">Você não chegou aqui por acaso!</p>
            <h1 className="text-ivory mt-7 text-4xl leading-[1.12] font-light md:text-6xl">
              Talvez você não precise
              <br className="hidden md:block" /> de mais forças.
            </h1>
            <p className="script gold-text mt-4 text-4xl md:text-5xl">
              Talvez precise apenas de um momento para rezar.
            </p>
            <div className="hairline my-8 md:mx-auto md:w-40" />
          </Reveal>

          <Reveal className="mt-12" delay={150}>
            <div className="relative mx-auto max-w-sm md:max-w-md">
              <div className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(201,164,90,0.28),transparent_65%)] blur-2xl" />
              <img
                src={capa.url}
                alt="Capa do devocional 40 Dias Rezando com Marcos Nascimento"
                width={1058}
                height={1500}
                className="relative w-full rounded-sm shadow-[var(--shadow-book)]"
              />
            </div>
            <p className="text-ivory/70 mx-auto mt-6 max-w-lg text-base leading-relaxed">
              Uma jornada diária de oração, reflexão e esperança para quem deseja fortalecer a fé,
              encontrar consolo e descansar o coração na presença de Deus.
            </p>
          </Reveal>

          <Reveal className="mt-9" delay={220}>
            <CTA className="w-full md:w-auto" />
            <p className="text-ivory/60 mt-4 text-sm tracking-wide">Acesso Imediato!</p>
          </Reveal>
        </div>
      </section>

      {/* FRASE DE IMPACTO */}
      <section className="bg-ivory px-6 py-24 text-center">
        <Reveal className="mx-auto max-w-3xl">
          <h2 className="text-primary font-serif text-3xl leading-snug font-light md:text-5xl">
            Há momentos em que não precisamos de respostas.
          </h2>
          <p className="script gold-text mt-6 text-5xl md:text-6xl">Precisamos de esperança.</p>
          <Ornament className="my-8" />
          <p className="text-muted-foreground text-lg leading-relaxed">
            E talvez a esperança que você procura comece com uma simples oração.
          </p>
        </Reveal>
      </section>

      {/* IDENTIFICAÇÃO */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <h2 className="text-primary font-serif text-3xl font-light md:text-5xl">
              Como está o seu coração hoje?
            </h2>
            <div className="text-foreground/85 mx-auto mt-8 max-w-2xl space-y-3 font-serif text-xl leading-relaxed md:text-2xl">
              <p>Talvez você esteja passando por um momento que ninguém conhece.</p>
              <p>Talvez esteja cansado.</p>
              <p>Talvez esteja preocupado com sua família.</p>
              <p>Talvez exista uma situação que você já não sabe como resolver.</p>
              <p>
                Talvez esteja sorrindo por fora, enquanto por dentro pede apenas um pouco de paz.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3">
            {dores.map((d, i) => (
              <Reveal key={d} delay={i * 70}>
                <div className="card-paper flex h-full items-center justify-center px-4 py-7">
                  <span className="text-primary/80 font-serif text-lg tracking-wide">{d}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14">
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg italic">
              Se alguma dessas palavras encontrou você, talvez esta jornada tenha chegado no momento
              certo.
            </p>
            <a href={CHECKOUT_URL} className="btn-gold mt-8">
              QUERO ENCONTRAR PAZ E ESPERANÇA NA ORAÇÃO AGORA!
            </a>
          </Reveal>
        </div>
      </section>

      {/* PROMESSA */}
      <section className="woodgrain px-6 py-24">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-ivory font-serif text-3xl leading-snug font-light md:text-4xl">
            Deus não prometeu uma vida sem problemas.
          </h2>
          <p className="script gold-text mt-5 text-4xl md:text-5xl">
            Deus prometeu que caminhará com você em meio aos problemas.
          </p>
          <p className="text-ivory/70 mx-auto mt-8 max-w-xl text-lg leading-relaxed">
            Durante 40 dias, você terá um momento diário para parar, respirar, ouvir, refletir e
            rezar.
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {["40 dias", "Uma oração por dia", "Um momento com Deus"].map((t) => (
              <div
                key={t}
                className="border-gold/40 text-gold-light border px-6 py-6 font-serif text-lg"
              >
                {t}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* APRESENTAÇÃO */}
      <section className="bg-ivory px-6 py-24">
        <div className="mx-auto max-w-5xl text-center">
          <Reveal>
            <p className="eyebrow text-gold">Devocional online</p>
            <h2 className="text-primary font-serif text-5xl font-light md:text-6xl">40 Dias</h2>
            <p className="script gold-text -mt-1 text-5xl md:text-6xl">Rezando</p>
            <p className="text-primary/80 mt-2 font-serif text-2xl">
              com <span className="script text-gold text-3xl">Marcos Nascimento</span>
            </p>
            <Ornament className="my-8" />
            <div className="text-muted-foreground mx-auto max-w-2xl space-y-2 text-lg">
              <p>Este não é apenas um conteúdo para ler.</p>
              <p className="text-primary font-serif text-2xl">É uma jornada para viver.</p>
              <p>
                Todos os dias você encontrará uma condução simples para reservar alguns minutos da
                sua rotina e colocar sua vida diante de Deus.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pilares.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div className="card-paper h-full px-6 py-9 text-center">
                  <div className="text-3xl">{p.icon}</div>
                  <h3 className="text-primary mt-4 font-serif text-xl tracking-widest uppercase">
                    {p.title}
                  </h3>
                  <div className="hairline my-4" />
                  <p className="text-muted-foreground text-sm leading-relaxed">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal className="text-center">
            <h2 className="text-primary font-serif text-3xl font-light md:text-4xl">
              É simples. Você só precisa começar.
            </h2>
            <Ornament className="mt-6" />
          </Reveal>
          <ol className="border-gold/30 mt-12 space-y-8 border-l pl-8">
            {passos.map((p, i) => (
              <Reveal key={p.n} as="li" delay={i * 70}>
                <div className="relative">
                  <span className="bg-gold absolute top-3 -left-[2.3rem] h-2 w-2 rotate-45" />
                  <span className="text-gold font-serif text-2xl">{p.n}</span>
                  <p className="text-primary font-serif text-xl tracking-wide uppercase">{p.t}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <Reveal className="text-muted-foreground mt-12 space-y-2 text-center text-lg">
            <p>Você não precisa saber fazer uma oração perfeita.</p>
            <p>Não precisa conhecer palavras bonitas.</p>
            <p className="script text-gold text-3xl">Eu vou conduzir você.</p>
          </Reveal>
        </div>
      </section>

      {/* POR QUE 40 DIAS */}
      <section className="woodgrain px-6 py-24">
        <div className="mx-auto max-w-5xl text-center">
          <Reveal>
            <h2 className="text-ivory font-serif text-3xl font-light tracking-wide md:text-4xl">
              Por que 40 dias?
            </h2>
            <Ornament className="my-7" />
            <p className="text-ivory/70 mx-auto max-w-2xl text-lg leading-relaxed">
              Na Bíblia, o número 40 aparece associado a períodos de preparação, provação,
              amadurecimento, transformação e encontro com Deus.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {quarenta.map((q, i) => (
              <Reveal key={q.nome} delay={i * 80}>
                <div className="border-gold/30 h-full border bg-black/20 px-6 py-8">
                  <h3 className="text-gold-light font-serif text-xl tracking-[0.2em] uppercase">
                    {q.nome}
                  </h3>
                  <div className="hairline my-4" />
                  <p className="text-ivory/70 text-sm">{q.texto}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14">
            <p className="text-ivory/80 font-serif text-xl">
              Por isso, estes 40 dias não são apenas uma contagem.
            </p>
            <p className="text-gold-light font-serif text-2xl">São um convite.</p>
            <div className="script gold-text mt-8 space-y-1 text-3xl md:text-4xl">
              <p>40 dias para parar.</p>
              <p>40 dias para rezar.</p>
              <p>40 dias para confiar.</p>
              <p>40 dias para entregar.</p>
              <p>40 dias para fortalecer a fé.</p>
              <p>40 dias para reacender a esperança.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FORÇA DA ORAÇÃO */}
      <section className="bg-ivory px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="text-primary font-serif text-3xl leading-snug font-light md:text-4xl">
              Talvez você não consiga mudar tudo hoje.
            </h2>
            <p className="script gold-text mt-4 text-4xl md:text-5xl">
              Mas você pode começar rezando.
            </p>
            <div className="text-muted-foreground mt-8 space-y-2 text-lg">
              <p>A oração não é fugir dos problemas.</p>
              <p>É colocar os problemas diante de Deus.</p>
              <p>
                Quando rezamos, podemos dizer aquilo que talvez não consigamos dizer para mais
                ninguém.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 space-y-3">
            {[
              "Senhor, estou cansado.",
              "Senhor, cuida da minha família.",
              "Senhor, eu não sei o que fazer.",
              "Senhor, aumenta a minha fé.",
              "Senhor, eu entrego tudo em Tuas mãos.",
            ].map((f, i) => (
              <Reveal key={f} delay={i * 60}>
                <p className="card-paper text-primary/85 px-6 py-5 font-serif text-xl italic">
                  “{f}”
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-muted-foreground mt-12 space-y-1 text-lg">
            <p>Às vezes Deus muda a situação.</p>
            <p>Às vezes Deus muda o nosso coração para atravessar a situação.</p>
          </Reveal>
        </div>
      </section>

      {/* MINHA HISTÓRIA */}
      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
          <Reveal className="flex justify-center">
            <img
              src={marcos.url}
              alt="Marcos Nascimento"
              width={1297}
              height={1212}
              loading="lazy"
              className="border-gold/30 max-w-[260px] rounded-sm border shadow-[var(--shadow-soft)] md:max-w-[320px]"
            />
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow text-gold">Minha história</p>
            <h2 className="text-primary mt-5 font-serif text-3xl leading-snug font-light">
              Por que eu estou conduzindo você nessa jornada?
            </h2>
            <div className="text-muted-foreground mt-6 space-y-4 leading-relaxed">
              <p>Minha caminhada com a Igreja Católica já atravessa décadas.</p>
              <p>
                Durante esse caminho, vivi experiências de fé, serviço, evangelização e formação.
              </p>
              <p>
                Como palestrante e formador, tive a oportunidade de estar próximo de muitas pessoas,
                ajudar na formação de líderes e participar da vida pastoral.
              </p>
              <p>
                Mas existe algo que aprendi acima de tudo: a fé não pode ser apenas falada. Ela
                precisa ser vivida.
              </p>
              <p>É na oração que muitas vezes encontramos forças para continuar.</p>
            </div>
            <div className="border-gold/40 mt-8 border-l-2 pl-6">
              <p className="script text-primary/85 text-3xl">
                Não escrevo estas páginas como alguém que já venceu todas as batalhas.
              </p>
              <p className="text-gold mt-3 font-serif text-xl">
                Escrevo como alguém que aprendeu a não lutar sozinho.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* OS 40 DIAS */}
      <section className="bg-ivory px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal className="text-center">
            <h2 className="text-primary font-serif text-3xl font-light md:text-4xl">
              Uma caminhada, um dia de cada vez em diversas áreas do devocional online.
            </h2>
            <Ornament className="mt-6" />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {etapas.map((e, i) => (
              <Reveal key={e} delay={i * 60}>
                <div className="card-paper relative h-full px-6 py-8">
                  <span className="text-gold/70 font-serif text-3xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="hairline my-3" />
                  <p className="text-primary font-serif text-lg leading-snug tracking-wide uppercase">
                    Área: {e}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIÊNCIA MULTIMÍDIA */}
      <section className="bg-ivory px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <h2 className="text-primary font-serif text-3xl font-light md:text-4xl">
              Você não vai apenas ler no devocional on-line.
            </h2>
            <p className="script gold-text mt-3 text-4xl md:text-5xl">Você vai rezar comigo.</p>
          </Reveal>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {["🎧 Áudios", "🎥 Vídeos", "📖 Textos", "🙏 Orações", "💭 Reflexões"].map((t) => (
              <span
                key={t}
                className="border-gold/40 text-primary/80 border px-5 py-2 text-sm tracking-wide"
              >
                {t}
              </span>
            ))}
          </div>

          <Reveal className="mt-14">
            <div className="border-gold/40 bg-primary mx-auto max-w-xl border p-1 shadow-[var(--shadow-soft)]">
              <div className="paper p-7 text-left">
                <p className="eyebrow text-gold">Dia 01</p>
                <h3 className="text-primary mt-2 font-serif text-2xl">Caminhando com Deus</h3>
                <div className="hairline my-4" />
                <div className="space-y-3">
                  <div className="border-gold/30 flex items-center gap-3 border px-4 py-3">
                    <span>🎧</span>
                    <span className="text-muted-foreground text-sm">Áudio da oração</span>
                  </div>
                  <div className="border-gold/30 flex items-center gap-3 border px-4 py-3">
                    <span>🎥</span>
                    <span className="text-muted-foreground text-sm">Vídeo de condução</span>
                  </div>
                  <div className="border-gold/30 flex items-center gap-3 border px-4 py-3">
                    <span>📖</span>
                    <span className="text-muted-foreground text-sm">Reflexão do dia</span>
                  </div>
                </div>
                <p className="script text-gold mt-5 text-2xl">
                  Senhor, hoje eu caminho contigo.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* COMUNIDADE + ENCONTRO SEMANAL */}
      <section className="woodgrain px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <h2 className="text-ivory font-serif text-3xl font-light md:text-4xl">
              E você não vai caminhar sozinho.
            </h2>
            <p className="text-ivory/70 mx-auto mt-6 max-w-2xl text-lg">
              Além do devocional, você fará parte de uma comunidade permanente de oração e
              intercessão.
            </p>
          </Reveal>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {["Pedidos de oração", "Intercessão", "Testemunhos", "Esperança", "Comunhão"].map(
              (t) => (
                <span
                  key={t}
                  className="border-gold/40 text-gold-light border px-5 py-2 text-sm tracking-wide"
                >
                  {t}
                </span>
              ),
            )}
          </div>
          <Reveal className="mt-12">
            <p className="text-ivory/80 font-serif text-xl">Uma pessoa rezando já é uma oração.</p>
            <p className="script gold-text mt-2 text-4xl">
              Uma comunidade rezando é uma corrente de fé.
            </p>
          </Reveal>

          <div className="hairline my-14 mx-auto w-40" />

          <Reveal>
            <h2 className="text-ivory font-serif text-3xl font-light md:text-4xl">
              Uma vez por semana, vamos parar juntos.
            </h2>
            <p className="text-ivory/70 mt-6 text-lg">
              Você também terá acesso a um encontro semanal de oração e intercessão, ao vivo e
              online, com os membros da comunidade.
            </p>
          </Reveal>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {["Ao vivo", "Online", "Oração", "Intercessão"].map((t) => (
              <span
                key={t}
                className="border-gold/40 text-gold-light border px-5 py-2 text-xs tracking-[0.2em] uppercase"
              >
                {t}
              </span>
            ))}
          </div>
          <Reveal className="mt-10">
            <p className="text-gold-light font-serif text-lg">
              A comunidade permanente de oração e o encontro semanal são bônus gratuitos para quem
              entra na jornada dos 40 dias de oração.
            </p>
          </Reveal>
          <a href={CHECKOUT_URL} className="btn-outline-gold mt-8">
            Quero fazer parte dessa comunidade
          </a>
        </div>
      </section>

      {/* DEPOIMENTOS — desabilitada temporariamente até termos depoimentos reais dos participantes
      <section className="bg-ivory px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal className="text-center">
            <h2 className="text-primary font-serif text-3xl leading-snug font-light md:text-4xl">
              Quando a oração entra na vida, algo começa a mudar.
            </h2>
            <Ornament className="mt-6" />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[1, 2, 3].map((n, i) => (
              <Reveal key={n} delay={i * 90}>
                <div className="card-paper h-full px-7 py-9 text-center">
                  <div className="border-gold/40 text-gold/60 mx-auto flex h-16 w-16 items-center justify-center rounded-full border text-2xl">
                    ✦
                  </div>
                  <p className="text-muted-foreground mt-5 text-sm italic">
                    Espaço reservado para o depoimento real de um participante da jornada.
                  </p>
                  <div className="hairline my-4" />
                  <p className="text-primary/70 font-serif tracking-wide">Nome do participante</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* OBJEÇÕES */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal className="text-center">
            <h2 className="text-primary font-serif text-3xl font-light md:text-4xl">
              Talvez você esteja pensando…
            </h2>
            <Ornament className="mt-6" />
          </Reveal>
          <div className="mt-10 space-y-4">
            {objecoes.map((o, i) => (
              <Reveal key={o.q} delay={i * 70}>
                <div className="card-paper px-7 py-6">
                  <p className="text-primary font-serif text-xl">{o.q}</p>
                  <div className="hairline my-3" />
                  <p className="text-muted-foreground">{o.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CHAMAMENTO FINAL */}
      <section className="bg-ivory px-6 py-24 text-center">
        <Reveal className="mx-auto max-w-2xl">
          <h2 className="text-primary font-serif text-3xl font-light md:text-4xl">
            Talvez esta seja a hora de parar.
          </h2>
          <div className="text-muted-foreground mt-8 space-y-2 text-lg">
            <p>Você pode continuar carregando tudo sozinho.</p>
            <p>Pode continuar tentando encontrar respostas.</p>
            <p>Pode continuar dizendo que está tudo bem.</p>
            <p className="text-primary font-serif text-2xl">Ou pode fazer algo diferente.</p>
          </div>
          <div className="text-gold mt-10 space-y-2 font-serif text-2xl tracking-[0.3em] uppercase">
            {["Parar.", "Respirar.", "Rezar.", "Confiar.", "Esperar.", "Entregar."].map((w, i) => (
              <Reveal key={w} delay={i * 90}>
                <p>{w}</p>
              </Reveal>
            ))}
          </div>
          <Ornament className="my-10" />
          <p className="script gold-text text-4xl md:text-5xl">
            Senhor, eu entrego minha vida em Tuas mãos.
          </p>
        </Reveal>
      </section>

      {/* OFERTA */}
      <section id="oferta" className="woodgrain px-6 py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-ivory font-serif text-3xl leading-snug font-light md:text-4xl">
            Sua caminhada com Deus pode começar hoje.
          </h2>
          <p className="text-gold-light mt-4 font-serif text-lg">
            Contribua hoje mesmo para mantermos essa plataforma no ar!
          </p>
          <div className="border-gold/40 mt-10 border bg-black/25 px-7 py-10">
            <p className="text-gold-light font-serif text-2xl tracking-wide">40 Dias Rezando</p>
            <p className="script text-gold text-3xl">com Marcos Nascimento</p>
            <div className="hairline my-6" />
            <p className="text-ivory font-serif text-5xl">R$ 29,90</p>
            <p className="text-ivory/60 mt-2 text-sm tracking-[0.2em] uppercase">
              Contribuição única • Acesso Imediato por 12 meses!
            </p>
            <ul className="mx-auto mt-8 max-w-sm space-y-2 text-left">
              {[
                "Devocional online",
                "40 dias",
                "Áudios",
                "Vídeos",
                "Orações",
                "Reflexões",
                "Comunidade de oração",
                "Encontro semanal ao vivo",
                "1 ano de acesso",
              ].map((r) => (
                <li key={r} className="text-ivory/80 flex items-center gap-3">
                  <span className="text-gold">✓</span>
                  {r}
                </li>
              ))}
            </ul>
            <div className="mx-auto mt-9 max-w-sm space-y-3 text-left">
              <input
                type="text"
                placeholder="Nome"
                value={leadForm.nome}
                onChange={(e) => setLeadForm((f) => ({ ...f, nome: e.target.value }))}
                className="border-gold/40 text-ivory placeholder:text-ivory/50 w-full border bg-black/20 px-4 py-3 text-sm"
              />
              <input
                type="tel"
                placeholder="WhatsApp"
                value={leadForm.whatsapp}
                onChange={(e) => setLeadForm((f) => ({ ...f, whatsapp: e.target.value }))}
                className="border-gold/40 text-ivory placeholder:text-ivory/50 w-full border bg-black/20 px-4 py-3 text-sm"
              />
              <input
                type="email"
                placeholder="E-mail"
                value={leadForm.email}
                onChange={(e) => setLeadForm((f) => ({ ...f, email: e.target.value }))}
                className="border-gold/40 text-ivory placeholder:text-ivory/50 w-full border bg-black/20 px-4 py-3 text-sm"
              />
            </div>
            <PixCheckout leadForm={leadForm} />
            <p className="text-ivory/60 mt-4 text-sm">
              Contribuição única • Acesso Imediato por 12 meses!
            </p>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="woodgrain px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal className="text-center">
            <h2 className="text-ivory font-serif text-3xl font-light md:text-4xl">
              Perguntas Frequentes
            </h2>
            <Ornament className="mt-6" />
          </Reveal>
          <div className="mt-12 space-y-3">
            {faqs.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <Reveal key={f.q} delay={i * 50}>
                  <div className="border-gold/30 border-b">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    >
                      <span className="text-gold-light font-serif text-lg">{f.q}</span>
                      <span
                        className={`text-gold shrink-0 text-xl transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      >
                        +
                      </span>
                    </button>
                    <div
                      className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-ivory/70 text-base leading-relaxed">{f.a}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal className="mt-14 text-center">
            <CTA label="🙏 Sim, eu quero começar" className="w-full sm:w-auto" />
            <p className="text-ivory/60 mt-4 text-sm">Acesso Imediato por 12 meses!</p>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-warm-black px-6 py-14 text-center">
        <p className="text-gold-light font-serif text-xl">
          40 Dias Rezando com Marcos Nascimento
        </p>
        <p className="text-ivory/50 mt-2 text-sm">
          Um devocional para fortalecer a fé em todas as circunstâncias da vida.
        </p>
        <div className="text-ivory/50 mt-6 flex flex-wrap justify-center gap-6 text-sm">
          <a href="/termos" className="hover:text-gold-light transition-colors">
            Termos de uso
          </a>
          <a href="/privacidade" className="hover:text-gold-light transition-colors">
            Política de privacidade
          </a>
          <a
            href="https://wa.me/5561999999340"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gold-light transition-colors"
          >
            Suporte
          </a>
        </div>
        <p className="text-ivory/40 mt-8 text-xs">
          © 2026 Marcos Nascimento. Todos os direitos reservados.
        </p>
      </footer>

      {/* CTA FIXO MOBILE */}
      <div className="border-gold/40 bg-warm-black/95 fixed inset-x-0 bottom-0 z-50 border-t px-4 py-3 backdrop-blur md:hidden">
        <a href={CHECKOUT_URL} className="btn-gold w-full text-[0.72rem]">
          🙏 Começar meus 40 dias — R$ 29,90
        </a>
      </div>
    </main>
  );
}
