import { ReportList } from "../../components/report/ReportList";
import { generateReports } from "@/src/core/engines/report/report-engine";

export const dynamic = "force-dynamic";

export default async function ReportEngine() {

  const reports = await generateReports();

  return (

    <div className="min-h-screen bg-neutral-100 p-10">

      <h1 className="text-5xl font-bold mb-10">

        Report Engine

      </h1>

      <ReportList reports={reports} />

    </div>

  );

}
