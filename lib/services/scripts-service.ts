import type { Lead } from "./leads-service";

export type ScriptsDeAbordagem = {
  mensagemWhatsApp: string;
  roteiroLigacao: string;
  quebrarObjecao: {
    objeção: string;
    resposta: string;
  }[];
  titulo: string;
};

const GANHOS_POR_CATEGORIA: Record<string, string> = {
  "Dentista": "odontologia",
  "Odontologia": "odontologia",
  "Barbearia": "barbearia",
  "Salão": "salão de beleza",
  "Restaurante": "restaurante",
  "Pizzaria": "pizzaria",
  "Cafeteria": "cafeteria",
  "Farmácia": "farmácia",
  "Supermercado": "supermercado",
  "Mercado": "mercado",
  "Clínica": "clínica",
  "Academia": "academia",
  "Hotel": "hotel",
  "Pet": "pet shop",
};

function normalizarCategoria(categoria?: string): string {
  if (!categoria) return "seu negócio";
  const chave = Object.keys(GANHOS_POR_CATEGORIA).find(
    (k) =>
      categoria.toLowerCase().includes(k.toLowerCase()) ||
      k.toLowerCase().includes(categoria.toLowerCase())
  );
  return chave ? GANHOS_POR_CATEGORIA[chave] : "seu negócio";
}

function gerarWhatsApp(lead: Lead): string {
  const nicho = normalizarCategoria(lead.category);
  const cidade = lead.city ? ` em ${lead.city}` : "";

  return [
    `Olá, tudo bem? 👋`,
    ``,
    `Vi o perfil do *${lead.company}*${cidade} e queria fazer uma proposta de valor que pode ajudar o ${nicho} a crescer de verdade.`,
    ``,
    `Fiz uma análise rápida do ${nicho} e identifiquei que clientes da região estão procurando ${nicho} online, mas o ${lead.company} não aparece bem nas buscas.`,
    ``,
    `Hoje, quem procura ${nicho}${cidade} normalmente abre o Google, vê os 3 primeiros resultados — e os que aparecem primeiro fecham mais clientes.`,
    ``,
    `Eu ajudo ${nicho}s a aparecer no topo, receber pedidos pelo WhatsApp e conquistar clientes novos todos os meses.`,
    ``,
    `Funciona assim: eu analiso seu negócio de graça, mostro exatamente o que está faltando (site, WhatsApp, presença no Google) e só depois você decide se quer seguir.`,
    ``,
    `Posso mandar essa análise gratuita pra você? Leva 2 minutos pra ler. Sem compromisso. 🙏`,
  ].join("\n");
}

function gerarRoteiroLigacao(lead: Lead): string {
  const nicho = normalizarCategoria(lead.category);
  const cidade = lead.city ? ` de ${lead.city}` : "";

  return [
    `1. ABERTURA — "Olá, [nome], aqui é [SEU NOME]! Perdi você há pouco tempo, mas encontrei o contato do ${lead.company} no Google. Falo com o responsável pela empresa?"`,
    ``,
    `2. CONTEXTO — "Trabalho com ${nicho}s${cidade} e estou mapeando quem já tem presença digital completa e quem ainda não. Achei o ${lead.company} muito bem avaliado, mas notei que vocês não aparecem bem no Google/WhatsApp."`,
    ``,
    `3. PONTO DE DOR — "Sabe o que acontece? Quem procura ${nicho} na região vê só os primeiros do Google. Se o ${lead.company} não estiver lá, o cliente nem chega a saber que vocês existem — vai no concorrente que está na frente."`,
    ``,
    `4. PROPOSTA DE VALOR — "Eu faço uma análise gratuita do negócio de vocês: mostro em 2 minutos o que está faltando (site, WhatsApp, anúncios, Google) e quanto isso pode gerar de clientes. Se fizer sentido, a gente conversa sobre implementar. Se não, te deixo a análise de graça mesmo assim."`,
    ``,
    `5. AGENDAMENTO — "Posso te mandar essa análise agora pelo WhatsApp? É só dizer sim que eu envio em 5 minutos."`,
  ].join("\n");
}

function gerarObjeções(lead: Lead): ScriptsDeAbordagem["quebrarObjecao"] {
  const nicho = normalizarCategoria(lead.category);

  return [
    {
      objeção: "Já tenho quem cuida disso.",
      resposta:
        `Que ótimo! Então vocês já devem aparecer no topo do Google quando alguém procura ${nicho} na região. Se quiser, eu faço a análise e te mostro em que posição vocês estão hoje. Se já estiverem bem, eu mesmo te falo — sem interesse em vender algo que não precisa.`,
    },
    {
      objeção: "Está muito caro.",
      resposta:
        `Entendo, e o primeiro contato não tem custo nenhum: a análise é gratuita e fica com vocês. Só depois, se fizer sentido pro ${nicho}, a gente monta um plano que cabe no orçamento. Você não paga nada pra ver o diagnóstico.`,
    },
    {
      objeção: "Vou pensar.",
      resposta:
        `Perfeito! Só uma pergunta pra eu te ajudar melhor: é mais o valor ou o momento que está pesando? Posso te mandar a análise gratuita pra você pensar com os dados na mão?`,
    },
    {
      objeção: "Não temos verba agora.",
      resposta:
        `Sem problema. Posso te deixar a análise gratuita pra quando tiverem? E tem uma versão mensal acessível que começa com o básico — site e WhatsApp. Muita gente fecha só com isso no começo.`,
    },
    {
      objeção: "Nossos clientes vêm por indicação, não precisamos do Google.",
      resposta:
        `Faz total sentido, indicação é o melhor marketing que existe! E a análise justamente mostra se dá pra complementar isso: enquanto o cliente indica vocês, quem não conhece ainda procura ${nicho} no Google — e hoje só acha os concorrentes. Dá pra crescer mantendo o que já funciona.`,
    },
  ];
}

export function gerarScriptsDeAbordagem(
  lead: Lead
): ScriptsDeAbordagem {

  return {
    titulo: `Abordagem · ${lead.company}`,
    mensagemWhatsApp: gerarWhatsApp(lead),
    roteiroLigacao: gerarRoteiroLigacao(lead),
    quebrarObjecao: gerarObjeções(lead),
  };

}

export function linkWhatsAppComMensagem(
  whatsapp: string,
  mensagem: string
): string {
  const digitos = whatsapp.replace(/\D/g, "").replace(/^0+/, "");
  return `https://wa.me/55${digitos}?text=${encodeURIComponent(mensagem)}`;
}
