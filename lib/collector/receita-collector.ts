export interface ReceitaData {
  cnpj?: string;
  razaoSocial?: string;
  nomeFantasia?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  logradouro?: string;
  bairro?: string;
  telefone?: string;
  email?: string;
  categoria?: string;
  situacao?: string;
}

const RECEITA_URL = "https://receitaws.com.br/v1/cnpj";

export async function collectReceitaWS(cnpj: string): Promise<ReceitaData | null> {
  const digits = cnpj.replace(/\D/g, "");

  if (digits.length !== 14) return null;

  try {
    const response = await fetch(`${RECEITA_URL}/${digits}`, {
      headers: { "Accept": "application/json" },
      next: { revalidate: 86400 },
    });

    if (!response.ok) return null;

    const data = await response.json();

    if (!data || data.status === "ERROR") return null;

    const category =
      data.atividade_principal?.[0]?.text ?? undefined;

    return {
      cnpj: data.cnpj,
      razaoSocial: data.nome,
      nomeFantasia: data.fantasia || data.nome,
      cidade: data.municipio,
      estado: data.uf,
      cep: data.cep,
      logradouro: data.logradouro,
      bairro: data.bairro,
      telefone: data.telefone || undefined,
      email: data.email || undefined,
      categoria: category,
      situacao: data.situacao,
    };
  } catch {
    return null;
  }
}
