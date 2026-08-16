import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-20 py-10 px-8 border-t border-white/5 bg-black/20 text-center">
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 mb-8">
        <FooterLink href="/about" label="About" />
        <FooterLink href="/support" label="Support" />
        <FooterLink href="/feedback" label="Feedback" />
        <FooterLink href="/donate" label="Donate" />
        <FooterLink href="/contact" label="Contact" />
        <FooterLink href="/privacy" label="Privacy" />
        <FooterLink href="/terms" label="Terms" />
      </div>

      <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
        LearnExcelAI © {new Date().getFullYear()}
      </p>
    </footer>
  );
}

function FooterLink({ href, label }) {
  return (
    <Link href={href} className="text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider">
      {label}
    </Link>
  );
}
