import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles,
  ShoppingBag,
  MessageCircle,
  Truck,
  ShieldCheck,
  HeartHandshake,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Como Funciona | Sobre a Bem Me Quero',
  description:
    'Entenda como funciona a Bem Me Quero: curadoria exclusiva de produtos sob demanda, atendimento direto via WhatsApp e entrega segura.',
};

export default function SobrePage() {
  const steps = [
    {
      step: '01',
      icon: ShoppingBag,
      title: 'Escolha seus itens favoritos',
      description:
        'Navegue pelo nosso catálogo de produtos selecionados, escolha suas variações de cor/tamanho e adicione ao carrinho.',
    },
    {
      step: '02',
      icon: MessageCircle,
      title: 'Envie seu pedido pelo WhatsApp',
      description:
        'Com um clique, seu carrinho é formatado em uma mensagem clara e enviado diretamente para nosso atendimento no WhatsApp.',
    },
    {
      step: '03',
      icon: HeartHandshake,
      title: 'Atendimento humanizado e confirmação',
      description:
        'Nossa equipe confirma a disponibilidade, calcula o frete ideal para sua região e tira todas as suas dúvidas.',
    },
    {
      step: '04',
      icon: Truck,
      title: 'Envio rápido e acompanhamento',
      description:
        'Após a confirmação do pagamento seguro via Pix ou cartão, seu pedido é preparado com todo cuidado e despachado até você.',
    },
  ];

  const pillars = [
    {
      icon: Sparkles,
      title: 'Curadoria Atenta',
      description:
        'Trabalhamos sob demanda para trazer produtos modernos, funcionais e com excelente custo-benefício que você realmente quer ter.',
    },
    {
      icon: ShieldCheck,
      title: 'Transparência Total',
      description:
        'Sem pegadinhas ou cobranças ocultas. Todas as condições de valor, prazo e garantia são combinadas abertamente com você.',
    },
    {
      icon: HeartHandshake,
      title: 'Atendimento Próximo',
      description:
        'Aqui você fala com pessoas reais prontas para ajudar, propor soluções e garantir sua melhor experiência de compra.',
    },
  ];

  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero Section */}
      <section className="bg-ivory-warm border-b border-border-light">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-forest/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-forest mb-4">
            Sobre a Bem Me Quero
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-graphite tracking-tight">
            Produtos pensados para o seu dia a dia, com atendimento de verdade.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-graphite-light leading-relaxed max-w-3xl mx-auto">
            A <strong>Bem Me Quero</strong> nasceu para simplificar sua experiência de compra. Reunimos produtos selecionados com foco em utilidade, beleza e praticidade, conectados diretamente a você através de um atendimento ágil e transparente pelo WhatsApp.
          </p>
        </div>
      </section>

      {/* Como Funciona - Step by Step */}
      <section className="py-16 sm:py-20 border-b border-border-light bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl font-bold text-graphite">
              Como funciona o processo de compra?
            </h2>
            <p className="mt-3 text-graphite-light">
              Do carrinho até a sua casa em 4 etapas descomplicadas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="relative flex flex-col rounded-2xl border border-border-light bg-ivory/50 p-6 sm:p-8 transition-shadow hover:shadow-md"
                >
                  <span className="text-3xl font-display font-extrabold text-forest/20 mb-4">
                    {item.step}
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest text-white mb-5 shadow-sm">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-graphite mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-graphite-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Nossos Pilares */}
      <section className="py-16 sm:py-20 bg-ivory">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl font-bold text-graphite">
              Por que comprar na Bem Me Quero?
            </h2>
            <p className="mt-3 text-graphite-light">
              Compromisso com satisfação, clareza e respeito ao cliente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-border bg-white p-8 shadow-sm hover:border-forest/30 transition-colors"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest/10 text-forest mb-6">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-graphite mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-graphite-light text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Garantias & Dúvidas */}
      <section className="py-16 bg-white border-y border-border-light">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-ivory-warm border border-border p-8 sm:p-10">
            <h3 className="font-display text-2xl font-bold text-graphite mb-6">
              Compromisso e Segurança
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-forest mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base text-graphite">
                  <strong>Acompanhamento em tempo real:</strong> Você recebe o status de envio e o código de rastreio diretamente no WhatsApp.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-forest mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base text-graphite">
                  <strong>Pagamento facilitado:</strong> Opções via Pix com confirmação imediata ou cartão de crédito.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-forest mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base text-graphite">
                  <strong>Direito de arrependimento e garantia:</strong> Respeitamos o Código de Defesa do Consumidor para trocas e devoluções.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 sm:py-24 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-graphite">
            Pronto para encontrar o que procura?
          </h2>
          <p className="mt-4 text-graphite-light text-base sm:text-lg">
            Explore nossas novidades e monte seu pedido agora mesmo.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/catalogo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-forest px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-forest-light transition-colors"
            >
              Explorar Catálogo
              <ArrowRight size={18} />
            </Link>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-8 py-3.5 text-base font-semibold text-graphite hover:bg-ivory-warm transition-colors"
            >
              <MessageCircle size={18} />
              Tirar Dúvidas no WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
