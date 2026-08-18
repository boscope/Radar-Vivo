import Link from "next/link";

export const metadata = {
  title: "Termos de Uso — Radar Vivo",
  description:
    "Termos e condições de uso da plataforma Radar Vivo.",
};

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-neutral-800 px-6 py-4">
        <Link href="/" className="text-xl font-bold">
          <span className="text-green-400">Radar</span>
          <span className="text-white">Vivo</span>
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Termos de Uso</h1>
        <p className="text-neutral-400 text-sm mb-8">
          Última atualização: 17 de agosto de 2026
        </p>

        <div className="space-y-8 text-neutral-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              1. Aceitação dos termos
            </h2>
            <p>
              Ao acessar ou usar o <strong className="text-white">Radar Vivo</strong>,
              você concorda integralmente com estes Termos de Uso. Se não concordar,
              não utilize a plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              2. Descrição do serviço
            </h2>
            <p>
              O Radar Vivo é uma plataforma de inteligência comercial que identifica
              oportunidades de venda para agências digitais e profissionais de marketing,
              cruzando dados públicos de empresas locais (Google, OpenStreetMap) com
              análise de presença digital.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              3. Elegibilidade
            </h2>
            <p>
              O serviço é destinado a maiores de 18 anos ou pessoas jurídicas devidamente
              constituídas. Ao se cadastrar, você declara ter capacidade legal para
              firmar contratos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              4. Cadastro e conta
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>É obrigatório fornecer dados verdadeiros no cadastro.</li>
              <li>Você é responsável por manter a confidencialidade de sua senha.</li>
              <li>Uma pessoa pode ter apenas uma conta ativa.</li>
              <li>Podemos suspender contas com uso fraudulento sem aviso prévio.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              5. Planos e pagamento
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong className="text-white">Teste Grátis:</strong> 3 dias de acesso
                completo sem custo. Após o período, o acesso é suspenso até assinatura.
              </li>
              <li>
                <strong className="text-white">Plano Pro (R$ 197/mês):</strong> acesso
                ilimitado a todas as funcionalidades.
              </li>
              <li>
                <strong className="text-white">Plano Agência (R$ 397/mês):</strong>{" "}
                acesso para equipes com até 5 usuários.
              </li>
              <li>Pagamentos são processados pelo Stripe (cartão de crédito).</li>
              <li>As assinaturas são renovadas automaticamente mensalmente.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              6. Direito de arrependimento (CDC, art. 49)
            </h2>
            <p>
              Conforme o Código de Defesa do Consumidor, você tem o direito de cancelar
              a assinatura em até <strong className="text-white">7 dias corridos</strong>{" "}
              após a primeira cobrança, sem necessidade de justificativa, com devolução
              integral do valor pago. Para solicitar o cancelamento, entre em contato:{" "}
              <a
                href="mailto:radarvivocontato@gmail.com"
                className="text-green-400 hover:underline"
              >
                radarvivocontato@gmail.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              7. Cancelamento e reembolso
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Você pode cancelar a assinatura a qualquer momento pelo painel.</li>
              <li>O cancelamento é efetivo ao final do período já pago.</li>
              <li>Não há reembolso proporcional por cancelamento no meio do período.</li>
              <li>Para cancelar: acesse Dashboard → Gerenciar assinatura → Stripe Portal.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              8. Uso aceitável
            </h2>
            <p className="mb-3">É proibido:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Revender, compartilhar ou redistribuir os dados obtidos via plataforma.</li>
              <li>Usar os dados para spam, assédio ou práticas antiéticas.</li>
              <li>Tentar acessar contas de outros usuários.</li>
              <li>Realizar engenharia reversa, scraping ou tentativas de bypass de segurança.</li>
              <li>Usar a plataforma para fins ilegais ou que violem direitos de terceiros.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              9. Propriedade intelectual
            </h2>
            <p>
              Todo o código, design, marca, logotipo e conteúdo do Radar Vivo são de
              propriedade do titular da plataforma. É vedada a reprodução, distribuição
              ou uso sem autorização expressa.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              10. Limitação de responsabilidade
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Os dados de empresas (nome, telefone, avaliação) são obtidos de fontes
                públicas (Google, OpenStreetMap) e podem estar desatualizados.
              </li>
              <li>
                O Radar Vivo não garante a precisão dos dados nem o sucesso comercial
                decorrente do uso da plataforma.
              </li>
              <li>
                Em nenhuma circunstância o Radar Vivo será responsável por danos
                indiretos, lucros cessantes ou perdas decorrentes do uso.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              11. Disponibilidade do serviço
            </h2>
            <p>
              O serviço é fornecido &quot;como está&quot;. Podemos realizar manutenções
              programadas ou não programadas. Não garantimos disponibilidade de 100%
              do tempo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              12. Marco Civil da Internet
            </h2>
            <p>
              O uso do Radar Vivo observa a Lei nº 12.965/2014 (Marco Civil da Internet).
              Os registros de acesso são mantidos pelo período legal e fornecidos apenas
              por ordem judicial, conforme art. 15.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              13. Alterações nestes termos
            </h2>
            <p>
              Estes termos podem ser atualizados a qualquer momento. Alterações relevantes
              serão comunicadas por email. O uso continuado após alterações constitui
              aceitação.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              14. Foro e legislação aplicável
            </h2>
            <p>
              Estes termos são regidos pelas leis da República Federativa do Brasil.
              Fica eleito o foro da Comarca de Londrina/PR para dirimir quaisquer
              questões, com renúncia a qualquer outro por mais privilegiado que seja.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              15. Contato
            </h2>
            <p>
              Dúvidas sobre estes termos:{" "}
              <a
                href="mailto:radarvivocontato@gmail.com"
                className="text-green-400 hover:underline"
              >
                radarvivocontato@gmail.com
              </a>
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800 text-center">
          <Link href="/" className="text-green-400 hover:underline">
            ← Voltar para o início
          </Link>
        </div>
      </main>
    </div>
  );
}
