import { Report } from "@/src/core/engines/report/report-engine";

type Props = {
  reports: Report[];
};

export function ReportList({ reports }: Props) {

  return (
    <div className="space-y-5">

      {reports.map((report) => (

        <div
          key={report.id}
          className="rounded-xl border border-white/10 bg-white/5 p-5"
        >

          <h3 className="text-lg font-semibold">
            {report.company?.name ?? "Empresa"}
          </h3>

          <p className="text-sm text-white/60">
            {report.company?.city ?? ""}
            {report.company?.state
              ? ` - ${report.company.state}`
              : ""}
          </p>

        </div>

      ))}

    </div>
  );

}
