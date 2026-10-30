# Bem Me Quero 🌸✨

E-commerce moderno com curadoria exclusiva de produtos, experiência de compra sob demanda e finalização de pedidos integrada diretamente via **WhatsApp**.

---

## 🚀 Tecnologias

- **Next.js 15** (App Router, Server Components e Client Components)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Lucide React** (Ícones modernos)
- **Context API** (Gerenciamento de estado do carrinho com persistência em `localStorage`)

---

## 🛠️ Como Iniciar o Projeto

### 1. Clonar o repositório
```bash
git clone https://github.com/MathSales02/bem-me-quero.git
cd bem-me-quero
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar variáveis de ambiente
Copie o arquivo de exemplo e defina o número do WhatsApp da loja:
```bash
cp .env.example .env.local
```

Abra `.env.local` e configure:
```env
# Formato internacional: código do país + DDD + número (somente dígitos)
NEXT_PUBLIC_WHATSAPP_NUMBER=5511999999999
```

### 4. Executar em modo de desenvolvimento
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 🔒 Segurança e Boas Práticas

- **Zero vazamento de credenciais:** Arquivos `.env*` estão devidamente incluídos no `.gitignore`.
- **Template seguro:** O arquivo `.env.example` fornece as diretrizes sem dados sensíveis.
- **Validação de entradas:** Validações robustas no formato de telefone e sanitização de dados no envio para a API do WhatsApp.

---

## 📦 Estrutura de Pastas

```text
├── app/               # Rotas e páginas (Next.js App Router)
│   ├── carrinho/      # Página dedicada de carrinho
│   ├── catalogo/      # Catálogo completo com busca e filtros
│   ├── produto/[slug] # Página dinâmica de detalhes do produto
│   ├── sobre/         # Como funciona e pilares da marca
│   ├── privacidade/   # Política de privacidade
│   └── termos/        # Termos e condições de uso
├── public/            # Assets estáticos (imagens, logos, banners)
└── src/
    ├── components/    # Componentes reutilizáveis (Header, Footer, CartDrawer, etc.)
    ├── contexts/      # CartContext (estado do carrinho)
    ├── data/          # Dados de catálogo e categorias
    ├── lib/           # Utilitários (formatação monetária, gerador de link WhatsApp)
    └── types/         # Definições TypeScript
```

---

Desenvolvido com carinho para **Bem Me Quero**.
