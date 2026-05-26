import InfoPageLayout from "@/components/layout/InfoPageLayout";

export default function PrivacyPage() {
  return (
    <InfoPageLayout title="Privacy Policy">
      <div className="prose prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-bold text-white mb-3">Introduction</h2>
          <p className="text-slate-400 leading-relaxed">
            LearnExcel respects your privacy and is committed to protecting your personal information. This policy explains how we handle your data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Information We Collect</h2>
          <ul className="list-disc list-inside text-slate-400 space-y-2">
            <li>Google account information (name, email, avatar) via Firebase.</li>
            <li>Learning progress, including completed lessons and scores.</li>
            <li>XP and achievement data.</li>
            <li>Usage statistics and device/browser identifiers.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">How We Use Data</h2>
          <p className="text-slate-400 leading-relaxed">
            Your data is used solely to provide and improve the LearnExcel experience, save your progress across devices, and prevent system abuse.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Authentication</h2>
          <p className="text-slate-400 leading-relaxed">
            We use Firebase Authentication for Google Sign-In. LearnExcel does not store your passwords directly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Third-Party Services</h2>
          <p className="text-slate-400 leading-relaxed">
            We utilize secure third-party services including Firebase (Auth), Supabase (Database), Upstash (Rate Limiting), and Vercel (Hosting).
          </p>
        </section>

        <section className="bg-white/5 p-6 rounded-3xl border border-white/5">
          <h2 className="text-lg font-bold text-white mb-2">Contact Support</h2>
          <p className="text-sm text-slate-500 mb-4">Questions about your data? Reach out to us.</p>
          <a href="mailto:afeezolalekanalimi@gmail.com" className="text-excel-green font-bold underline">
            afeezolalekanalimi@gmail.com
          </a>
        </section>
      </div>
    </InfoPageLayout>
  );
}
