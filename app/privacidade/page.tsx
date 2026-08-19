import Link from "next/link";

export const metadata = {
  title: "Política de Privacidade — Radar Vivo",
  description:
    "Saiba como o Radar Vivo coleta, usa e protege seus dados pessoais em conformidade com a LGPD.",
};

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-neutral-800 px-6 py-4">
        <Link href="/" className="text-xl font-bold">
          <span className="text-green-400">Radar</span>
          <span className="text-white">Vivo</span>
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Política de Privacidade</h1>
        <p className="text-neutral-400 text-sm mb-8">
          Última atualização: 17 de agosto de 2026
        </p>

        <div className="space-y-8 text-neutral-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              1. Quem somos
            </h2>
            <p>
              O <strong className="text-white">Radar Vivo</strong> é uma plataforma
              digital operada por profissional autônomo, inscrito no CPF sob o
              nº 062.347.914-17, com sede em Carpina/PE, Brasil. Este documento
              descreve como coletamos, usamos, armazenamos e protegemos seus
              dados pessoais, em conformidade com a{" "}
              <strong className="text-white">
                Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018)
              </strong>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              2. Dados que coletamos
            </h2>
            <p className="mb-3">
              Coletamos apenas os dados estritamente necessários para o
              funcionamento do serviço:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong className="text-white">Cadastro:</strong> nome completo,
                email e senha (criptografada).
              </li>
              <li>
                <strong className="text-white">Pagamento:</strong> dados de
                cobrança são processados integralmente pelo Stripe e{" "}
                <strong className="text-white">
                  não armazenamos números de cartão de crédito
                </strong>{" "}
                em nossos servidores.
              </li>
              <li>
                <strong className="text-white">Uso da plataforma:</strong>{" "}
                empresas pesquisadas, buscas realizadas e ações dentro do
                painel (para melhoria do serviço).
              </li>
              <li>
                <strong className="text-white">Cookies:</strong> cookies
                essenciais para login e preferências. Ver seção 7.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              3. Finalidade do tratamento
            </h2>
            <p className="mb-3">Seus dados são usados para:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Autenticar seu acesso e manter sua sessão segura.</li>
              <li>Processar assinaturas e cobranças.</li>
              <li>Entregar os relatórios e análises solicitados.</li>
              <li>Enviar comunicações sobre sua conta (confirmação, renovação, vencimento).</li>
              <li>Melhorar a qualidade da plataforma (estatísticas agregadas, sem identificação pessoal).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              4. Base legal para tratamento (art. 7º LGPD)
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong className="text-white">Consentimento:</strong> quando
                você aceita os Termos de Uso e esta Política ao se cadastrar.
              </li>
              <li>
                <strong className="text-white">Execução de contrato:</strong>{" "}
                para fornecer o serviço que você contratou (assinatura).
              </li>
              <li>
                <strong className="text-white">Legítimo interesse:</strong>{" "}
                para melhorias internas e prevenção de fraudes.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              5. Compartilhamento de dados
            </h2>
            <p>
              <strong className="text-white">
                Não vendemos, alugamos ou compartilhamos seus dados pessoais
                com terceiros
              </strong>{" "}
              para fins de marketing. Os dados são compartilhados apenas com:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>
                <strong className="text-white">Stripe:</strong> processamento
                de pagamentos (issorsão PCI-DSS).
              </li>
              <li>
                <strong className="text-white">Supabase:</strong> hospedagem
                do banco de dados (servidores nos EUA, com criptografia em
                trânsito e em repouso).
              </li>
              <li>
                <strong className="text-white">Vercel:</strong> hospedagem da
                aplicação (CDN global, criptografia TLS).
              </li>
              <li>
                <strong className="text-white">Google Places API:</strong>{" "}
                busca de dados públicos de empresas (nome, telefone, endereço,
                avaliação) — dados públicos, não dados pessoais seus.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              6. Retenção de dados
            </h2>
            <p>
              Seus dados são mantidos enquanto sua conta estiver ativa. Após
              exclusão da conta, os dados pessoais são removidos em até{" "}
              <strong className="text-white">30 dias</strong>, exceto quando
              exigido por lei (ex: dados de pagamento para obrigações fiscais,
              que podem ser mantidos por até 5 anos).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              7. Cookies
            </h2>
            <p className="mb-3">Utilizamos apenas cookies essenciais:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong className="text-white">Sessão:</strong> para manter
                você logado (Supabase Auth).
              </li>
              <li>
                <strong className="text-white">Preferências:</strong> para
                lembrar configurações do painel.
            </li>
            </ul>
            <p className="mt-3">
              <strong className="text-white">
                Não utilizamos cookies de rastreamento, analytics de
                terceiros ou publicidade comportamental
              </strong>
              . Não compartilhamos dados de cookies com terceiros.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              8. Seus direitos (arts. 17-22 LGPD)
            </h2>
            <p className="mb-3">Você tem direito a:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong className="text-white">Confirmação:</strong> saber se
                tratamos seus dados.
              </li>
              <li>
                <strong className="text-white">Acesso:</strong> solicitar uma
                cópia dos seus dados.
              </li>
              <li>
                <strong className="text-white">Correção:</strong> corrigir
                dados incompletos ou desatualizados.
              </li>
              <li>
                <strong className="text-white">Anonimização, bloqueio ou
                eliminação:</strong> de dados desnecessários ou excessivos.
              </li>
              <li>
                <strong className="text-white">Portabilidade:</strong> solicitar
                seus dados em formato estruturado.
              </li>
              <li>
                <strong className="text-white">Eliminação:</strong> solicitar a
                exclusão de todos os seus dados.
              </li>
              <li>
                <strong className="text-white">Revogação do consentimento:</strong>{" "}
                a qualquer momento.
              </li>
              <li>
                <strong className="text-white">Oposição:</strong> ao tratamento
                quando não houver consentimento.
              </li>
            </ul>
            <p className="mt-3">
              Para exercer qualquer direito, envie email para:{" "}
              <a
                href="mailto:radarvivocontato@gmail.com"
                className="text-green-400 hover:underline"
              >
                radarvivocontato@gmail.com
              </a>{" "}
              ou acesse{" "}
              <Link href="/meus-dados" className="text-green-400 hover:underline">
                Meus Dados
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              9. Segurança dos dados
            </h2>
            <p>
              Adotamos medidas técnicas e administrativas para proteger seus
              dados: criptografia TLS em trânsito, autenticação por token JWT,
              Row Level Security no banco de dados, acesso restrito por função
              e monitoramento de logs. Nenhum dado de cartão de crédito é
              armazenado em nossos servidores.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              10. Transferência internacional
            </h2>
            <p>
              Alguns serviços utilizados (Supabase, Vercel, Stripe) operam
              servidores fora do Brasil. Nesses casos, garantimos que a
              transferência ocorre com base em cláusulas contratuais padrão
              (art. 33, II, f LGPD) e medidas de segurança adequadas.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              11. Encarregado de dados (DPO)
            </h2>
            <p>
              O encarregado pelo tratamento de dados pode ser contactado em:{" "}
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
              12. Alterações nesta política
            </h2>
            <p>
              Esta política pode ser atualizada a qualquer momento. Alterações
              relevantes serão comunicadas por email. O uso continuado da
              plataforma após alterações constitui aceitação.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              13. Autoridade Nacional de Proteção de Dados (ANPD)
            </h2>
            <p>
              Caso não resolvida, você pode registrar reclamação junto à ANPD:{" "}
              <a
                href="https://www.gov.br/anpd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:underline"
              >
                www.gov.br/anpd
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
