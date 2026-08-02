type MessageInput = {
  companyName: string;
  service: string;
};

export function generateMessage(
  input: MessageInput
): string {

  return `Olá!

Analisei gratuitamente a presença digital da empresa ${input.companyName}.

Encontrei algumas oportunidades que podem aumentar sua geração de clientes.

A principal oportunidade encontrada foi:

${input.service}

Posso lhe mostrar gratuitamente um relatório completo em poucos minutos.`;

}