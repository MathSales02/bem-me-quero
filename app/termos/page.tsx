import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description: 'Termos e condições de uso do site Bem Me Quero.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="bg-ivory-warm border-b border-border-light">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <h1 className="font-display text-3xl font-bold text-graphite sm:text-4xl">
            Termos de Uso
          </h1>
          <p className="mt-2 text-graphite-light">Última atualização: outubro de 2026</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="prose-custom space-y-8 text-graphite-light leading-relaxed text-sm sm:text-base">
          <section>
            <h2 className="font-display text-xl font-bold text-graphite mb-3">
              1. Sobre o serviço
            </h2>
            <p>
              A Bem Me Quero é uma plataforma de catálogo de produtos que facilita o
              contato entre compradores e vendedores. O site permite a visualização de
              produtos, montagem de pedidos e encaminhamento ao vendedor via WhatsApp.
            </p>
            <p className="mt-2">
              A Bem Me Quero não processa pagamentos online. Todas as transações,
              incluindo confirmação de pedido, pagamento e entrega, são combinadas
              diretamente entre comprador e vendedor.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-graphite mb-3">
              2. Produtos e preços
            </h2>
            <p>
              Os preços exibidos no site são informativos e podem ser atualizados a
              qualquer momento. A disponibilidade e os valores finais devem ser
              confirmados diretamente com o vendedor antes da conclusão da compra.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-graphite mb-3">
              3. Responsabilidades
            </h2>
            <p>
              O site é oferecido como ferramenta de apresentação de produtos.
              A Bem Me Quero se empenha em manter as informações atualizadas, mas não
              garante a disponibilidade ou exatidão de todos os dados exibidos em tempo real.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-graphite mb-3">
              4. Propriedade intelectual
            </h2>
            <p>
              Todo o conteúdo do site, incluindo textos, imagens, logotipos e design,
              é de propriedade da Bem Me Quero ou de seus respectivos proprietários.
              É proibida a reprodução sem autorização.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-graphite mb-3">
              5. Uso aceitável
            </h2>
            <p>
              O usuário se compromete a usar o site de forma responsável e a não
              realizar atividades que possam prejudicar o funcionamento do serviço
              ou a experiência de outros usuários.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-graphite mb-3">
              6. Alterações nos termos
            </h2>
            <p>
              Estes termos podem ser atualizados periodicamente. O uso continuado
              do site após as alterações constitui aceitação dos novos termos.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
