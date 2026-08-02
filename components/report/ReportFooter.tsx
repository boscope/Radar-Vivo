export default function ReportFooter(){

    const year=new Date().getFullYear();

    return(

        <footer className="border-t pt-6 mt-10 text-center text-sm text-gray-500">

            <p className="font-semibold">

                Radar Vivo • Inteligência Comercial com IA

            </p>

            <p className="mt-2">

                Relatório gerado automaticamente pelo Radar Vivo.

            </p>

            <p className="mt-2">

                © {year} Radar Vivo. Todos os direitos reservados.

            </p>

        </footer>

    );

}
