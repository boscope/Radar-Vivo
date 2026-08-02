import { generateReports } from "../../src/core/engines/report/report-engine";

export default async function ReportList() {
  const reports = await generateReports();

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6">
        Relatórios Gerados
      </h2>

      <div className="space-y-5">
        {reports.map((report) => (
          <div
            key={report.id}
            className="border rounded-xl p-4"
          >
            <div className="flex justify-between">
              <h3 className="font-bold">{report.company}</h3>
              <span>Score {report.score}</span>
            </div>

            <p className="text-gray-600 mt-2">
              {report.classification}
            </p>

            <p className="text-xs text-gray-400 mt-2">
              {report.generatedAt}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
