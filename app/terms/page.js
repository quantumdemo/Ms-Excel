import InfoPageLayout from "@/components/layout/InfoPageLayout";

export default function TermsPage() {
  return (
    <InfoPageLayout title="Terms of Service">
      <div className="prose prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-bold text-white mb-3">Acceptance of Terms</h2>
          <p className="text-slate-400 leading-relaxed">
            By using LearnExcelAI, you agree to comply with these terms. If you do not agree, please do not use the platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Educational Purpose</h2>
          <p className="text-slate-400 leading-relaxed italic">
            LearnExcelAI is provided for educational purposes only. While we strive for accuracy, users should verify professional Excel tasks independently.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">User Responsibilities</h2>
          <p className="text-slate-400 mb-4">Users agree not to:</p>
          <ul className="list-disc list-inside text-slate-400 space-y-2">
            <li>Attempt to scrape or resell content from LearnExcelAI.</li>
            <li>Use the platform for spam or unauthorized commercial activities.</li>
            <li>Attempt to bypass security or rate-limiting layers.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Intellectual Property</h2>
          <p className="text-slate-400 leading-relaxed">
            All content, including lesson text, interactive spreadsheets, custom UI designs, and animations, belong exclusively to LearnExcelAI.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Future Services</h2>
          <p className="text-slate-400 leading-relaxed">
            LearnExcelAI may introduce premium features or subscriptions in the future. Current free features are subject to change.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Termination</h2>
          <p className="text-slate-400 leading-relaxed">
            We reserve the right to suspend or terminate accounts that violate these terms or engage in abusive behavior.
          </p>
        </section>
      </div>
    </InfoPageLayout>
  );
}
