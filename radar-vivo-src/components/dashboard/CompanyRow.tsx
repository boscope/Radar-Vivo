import Link from "next/link";
import type { Company } from "@/types/company";

type Props = {
  company: Company;
};

export default function CompanyRow({ company }: Props) {
  return (
    <tr className="border-t border-zinc-800 hover:bg-zinc-800 transition">

      <td className="p-4">

        <Link
          href={`/dashboard/company/${company.id}`}
          className="text-green-400 font-bold hover:text-green-300"
        >
          {company.company_name}
        </Link>

      </td>

      <td className="p-4">
        {company.city}
      </td>

      <td className="p-4">
        {company.category}
      </td>

      <td className="text-center p-4">

        <span className="bg-green-500 text-black px-3 py-1 rounded-full font-bold">
          {company.rv_index}
        </span>

      </td>

      <td className="text-center p-4 font-bold text-green-400">

        {Number(company.estimated_value).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}

      </td>

    </tr>
  );
}