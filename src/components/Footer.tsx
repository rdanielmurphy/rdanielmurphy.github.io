import Link from "next/link";

const socials = [
  { label: "GitHub", href: "https://github.com/rdanielmurphy" },
  { label: "LinkedIn", href: "https://linkedin.com/in/rdanielmurphy" },
  { label: "Twitter", href: "https://twitter.com/rdanielmurphy" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-20">
      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} Daniel Murphy</p>
        <div className="flex gap-4">
          {socials.map((s) => (
            <Link key={s.label} href={s.href} target="_blank" className="hover:text-brand-500 transition-colors">
              {s.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
