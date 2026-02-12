import { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";

export const metadata: Metadata = { title: "Contact" };

const links = [
  { label: "GitHub", href: "https://github.com/rdanielmurphy", icon: "🐙" },
  { label: "LinkedIn", href: "https://linkedin.com/in/rdanielmurphy", icon: "💼" },
];

export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <AnimatedSection>
        <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-10">
          Feel free to reach out through any of these platforms.
        </p>
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-brand-500 dark:hover:border-brand-500 transition-colors"
            >
              <span className="text-2xl">{l.icon}</span>
              <span className="font-medium">{l.label}</span>
            </a>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
