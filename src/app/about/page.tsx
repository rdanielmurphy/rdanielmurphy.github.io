import { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = { title: "About" };

const skills = [
  "TypeScript", "JavaScript", "React", "Next.js", "Node.js", "Python",
  "Java", "SQL", "PostgreSQL", "MongoDB", "AWS", "Docker",
  "Git", "REST APIs", "GraphQL", "Tailwind CSS",
];

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <AnimatedSection>
        <h1 className="text-4xl font-bold mb-6">About Me</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
          I'm Daniel, a full-stack developer based in the DFW area who's equally comfortable architecting infrastructure, designing databases, building backends, and crafting frontends—though I'll admit I have a soft spot for React and React Native. There's something satisfying about bringing ideas to life through clean, responsive interfaces that people actually enjoy using.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
          When I'm not deep in code, you'll find me chasing waves while surfing, staying active, or working on something with my hands. I believe the best developers are the ones who step away from the screen regularly—whether that's to build something physical, break a sweat, or just remember what it feels like to be a user experiencing the world beyond a browser.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
          I build things that work, look good, and solve real problems. Let's create something together.
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          I&apos;ve been writing software professionally for years, working across the full stack
          from databases to deployment. When I&apos;m not coding, you&apos;ll find me traveling,
          at a poker table, or exploring the local food scene.
        </p>
      </AnimatedSection>

      <ScrollReveal>
        <h2 className="text-2xl font-bold mb-4">Skills & Tech</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
          {skills.map((s) => (
            <div key={s} className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm text-center">
              {s}
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <h2 className="text-2xl font-bold mb-4">Beyond Code</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { emoji: "✈️", title: "Travel", desc: "Always planning the next trip" },
            { emoji: "♠️", title: "Poker", desc: "Texas Hold'em enthusiast" },
            { emoji: "🍕", title: "Food", desc: "DC food scene explorer" },
          ].map((i) => (
            <div key={i.title} className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 text-center">
              <div className="text-3xl mb-2">{i.emoji}</div>
              <h3 className="font-semibold">{i.title}</h3>
              <p className="text-sm text-gray-500">{i.desc}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}
