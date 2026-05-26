import InfoPageLayout from "@/components/layout/InfoPageLayout";
import Image from "next/image";
import { Target, Rocket, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <InfoPageLayout title="About LearnExcel">
      <div className="space-y-12">
        <section className="text-center py-6">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <Image src="/logo.png" alt="Logo" fill className="object-contain" />
          </div>
          <h2 className="text-3xl font-black mb-4">Our Mission</h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Making Excel mastery accessible to everyone through mobile-first interactive learning.
          </p>
        </section>

        <section className="space-y-6">
           <AboutCard
             icon={<Target className="text-purple-500" />}
             title="Why We Exist"
             text="Traditional Excel courses are built for desktops, but our lives are mobile. We bridge the gap between passive watching and active mastery."
           />
           <AboutCard
             icon={<Users className="text-blue-500" />}
             title="The Developer"
             text="LearnExcel was founded by Afeez Alimi with a vision to empower African and global learners with professional analytics skills."
           />
           <AboutCard
             icon={<Rocket className="text-excel-green" />}
             title="The Vision"
             text="We are building the future of spreadsheet education—integrating AI tutors, certificates, and community-driven learning paths."
           />
        </section>

        <div className="text-center pb-10">
           <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">Version 1.0.0</p>
           <p className="text-[10px] text-slate-700">Built with Next.js & Supabase</p>
        </div>
      </div>
    </InfoPageLayout>
  );
}

function AboutCard({ icon, title, text }) {
  return (
    <div className="bg-white/5 border border-white/5 p-6 rounded-3xl">
      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{text}</p>
    </div>
  );
}
