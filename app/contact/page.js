import InfoPageLayout from "@/components/layout/InfoPageLayout";
import { Mail, MessageSquare, Briefcase, Handshake } from "lucide-react";

export default function ContactPage() {
  return (
    <InfoPageLayout title="Contact Us">
      <div className="space-y-6">
        <p className="text-slate-500 mb-8 px-2">We'd love to hear from you. Select the type of inquiry below.</p>

        <ContactCard
          icon={<Mail className="text-excel-green" />}
          title="General Support"
          sub="For login and lesson issues"
          email="afeezolalekanalimi@gmail.com"
        />

        <ContactCard
          icon={<Briefcase className="text-blue-500" />}
          title="Business Inquiries"
          sub="Enterprise licensing & training"
          email="afeezolalekanalimi@gmail.com"
        />

        <ContactCard
          icon={<Handshake className="text-purple-500" />}
          title="Partnerships"
          sub="Collaborate on content"
          email="afeezolalekanalimi@gmail.com"
        />

        <div className="bg-white/5 p-8 rounded-[2.5rem] mt-10 text-center">
           <MessageSquare size={32} className="mx-auto mb-4 text-slate-700" />
           <p className="text-slate-500 text-sm italic">"Our average response time is under 24 hours."</p>
        </div>
      </div>
    </InfoPageLayout>
  );
}

function ContactCard({ icon, title, sub, email }) {
  return (
    <a href={`mailto:${email}`} className="block bg-card-dark border border-white/5 p-6 rounded-3xl active:scale-[0.98] transition-all">
      <div className="flex items-center gap-5">
        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-slate-200">{title}</h3>
          <p className="text-xs text-slate-500">{sub}</p>
        </div>
      </div>
    </a>
  );
}
