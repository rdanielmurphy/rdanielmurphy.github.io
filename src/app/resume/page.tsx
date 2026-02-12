import { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = { title: "Resume" };

export default function Resume() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <AnimatedSection>
        <h1 className="text-4xl font-bold mb-4">Resume</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Experienced Full Stack Developer with a passion for building clean, scalable web applications.
        </p>
        <a
          href="/DM_Resume.pdf"
          download
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors font-medium"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download PDF
        </a>
      </AnimatedSection>

      <ScrollReveal className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Highlights</h2>
        <div className="space-y-6">
          {[
            { title: "Full Stack Development", desc: "End-to-end web application development with modern JavaScript/TypeScript frameworks." },
            { title: "Cloud & Infrastructure", desc: "Experience with AWS, Docker, CI/CD pipelines, and infrastructure as code." },
            { title: "Database Design", desc: "SQL and NoSQL database design, optimization, and management." },
            { title: "Team Leadership", desc: "Mentoring developers, code reviews, and agile project management." },
          ].map((h) => (
            <div key={h.title} className="border-l-2 border-brand-500 pl-4">
              <h3 className="font-semibold">{h.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{h.desc}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}
