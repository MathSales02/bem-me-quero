import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Saiba como a Bem Me Quero trata seus dados pessoais.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="bg-ivory-warm border-b border-border-light">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <h1 className="font-display text-3xl font-bold text-graphite sm:text-4xl">
            Política de Privacidade
          </h1>
          <p className="mt-2 text-graphite-light">Última atualização: outubro de 2026</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="prose-custom space-y-8 text-graphite-light leading-relaxed text-sm sm:text-base">
          <section>
            <h2 className="font-display text-xl font-bold text-graphite mb-3">
              1. Informações que coletamos
            </h2>
            <p>
              A Bem Me Quero não exige cadastro para navegar ou montar um pedido.
              Quando você finaliza um pedido pelo WhatsApp, as informações compartilhadas
              (nome, número de telefone e dados do pedido) são aquelas que você envia
              diretamente ao vendedor na conversa.
            </p>
            <p className="mt-2">
              O site pode armazenar localmente (no seu navegador) os itens adicionados ao
              carrinho para conveniência. Esses dados permanecem apenas no seu dispositivo.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-graphite mb-3">
              2. Como usamos suas informações
            </h2>
            <p>
              Utilizamos as informações apenas para processar e confirmar pedidos.
              Não vendemos, compartilhamos ou cedemos dados pessoais a terceiros
              para fins publicitários.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-graphite mb-3">
              3. Armazenamento local
            </h2>
            <p>
              Utilizamos o armazenamento local do navegador (localStorage) apenas para
              manter os itens do seu carrinho entre sessões. Você pode limpar esses dados
              a qualquer momento através das configurações do navegador.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-graphite mb-3">
              4. Links externos
            </h2>
            <p>
              O site pode conter links para serviços externos, como o WhatsApp.
              Não nos responsabilizamos pelas políticas de privacidade desses serviços.
              Recomendamos que consulte as políticas de cada plataforma antes de compartilhar
              informações.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-graphite mb-3">
              5. Seus direitos
            </h2>
            <p>
              Você pode solicitar informações sobre seus dados, correção ou exclusão
              entrando em contato diretamente com o vendedor pelos canais disponíveis.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-graphite mb-3">
              6. Alterações nesta política
            </h2>
            <p>
              Esta política pode ser atualizada periodicamente. Quaisquer alterações
              serão publicadas nesta página com a data de atualização.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
