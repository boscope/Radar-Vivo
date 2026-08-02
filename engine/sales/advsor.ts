type SalesInput = {
  hasSite: boolean;
  hasSeo: boolean;
  hasAutomation: boolean;
};

export function generateSalesPlan(
  data: SalesInput
) {

  const plan: string[] = [];

  if (!data.hasSite) {
    plan.push(
      "1º Venda um novo site profissional."
    );
  }

  if (!data.hasSeo) {
    plan.push(
      "2º Ofereça SEO Local para melhorar o Google."
    );
  }

  if (!data.hasAutomation) {
    plan.push(
      "3º Apresente automação de WhatsApp."
    );
  }

  plan.push(
    "4º Ofereça acompanhamento mensal."
  );

  return plan;

}