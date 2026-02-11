import { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import ProjectCard from "@/components/ProjectCard";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = { title: "Projects" };

const projects = [
  {
    title: "Personal Website",
    description: "This site! Built with Next.js 14, Tailwind CSS, Framer Motion, and MDX.",
    tags: ["Next.js", "TypeScript", "Tailwind", "MDX"],
    href: "https://github.com/rdanielmurphy",
  },
  {
    title: "Project Alpha",
    description: "A full-stack web application with real-time features and modern UI.",
    tags: ["React", "Node.js", "PostgreSQL", "WebSockets"],
  },
  {
    title: "Project Beta",
    description: "Mobile-first progressive web app with offline support.",
    tags: ["TypeScript", "PWA", "Service Workers"],
  },
  {
    title: "Project Gamma",
    description: "CLI tool for automating development workflows.",
    tags: ["Node.js", "CLI", "Automation"],
  },
];

export default function Projects() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <AnimatedSection>
        <h1 className="text-4xl font-bold mb-8">Projects</h1>
      </AnimatedSection>
      <div className="grid sm:grid-cols-2 gap-4">
        {projects.map((p, i) => (
          <ScrollReveal key={p.title}>
            <ProjectCard {...p} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
