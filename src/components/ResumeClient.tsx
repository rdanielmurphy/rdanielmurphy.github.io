"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import ScrollReveal from "@/components/ScrollReveal";

// ── Data ─────────────────────────────────────────────────────────────────────

const jobs = [
  {
    company: "Intra-spect Reporting",
    role: "Part Owner",
    period: "09/2025 – Present",
    bullets: [
      "Launched a mobile app using React Native for iOS and Android, enabling users to create inspection reports, with a projected launch in early 2026.",
    ],
    skills: ["React Native", "JavaScript", "TypeScript", "OpenClaw"],
  },
  {
    company: "Capitalize",
    role: "Sr. Software Engineer",
    period: "11/2021 – Present",
    bullets: [
      "Integrated Stripe billing into a React application to launch new subscription services.",
      "Led development of a B2B advisor platform in React.",
      "Enabled SSO login for major advisor firms.",
      "Built automation scripts using Puppeteer.",
      "Developed a React-based embedded webview for enterprise partners.",
      "Leveraged AWS Bedrock and custom LLM integration to build AI features, including RAG-based knowledge retrieval and prompt engineering for enhanced user interactions.",
    ],
    skills: ["React", "JavaScript", "TypeScript", "REST", "AWS Bedrock", "LLM Integration", "RAG", "Prompt Engineering"],
  },
  {
    company: "Novetta",
    role: "Frontend Developer",
    period: "07/2020 – 11/2021",
    bullets: [
      "Developed the frontend for a government workflow application using TypeScript, React, Semantic UI, SASS, Webpack, Apollo, Mobx, and Jest.",
      "Worked with REST and GraphQL backends.",
    ],
    skills: ["TypeScript", "React", "GraphQL", "REST", "Jest", "Mobx"],
  },
  {
    company: "Tiger Team Consulting",
    role: "Software Engineer",
    period: "04/2019 – 06/2020",
    bullets: [
      "Updated a PIM software suite for an international client.",
      "Led a complete rewrite from jQuery/Backbone to VueJS, Vuex, and Vuetify.",
      "C# backend with Azure and MS SQL Server.",
    ],
    skills: ["Vue", "Vuex", "C#", "JavaScript", "TypeScript"],
  },
  {
    company: "Unisys",
    role: "Software Engineer",
    period: "01/2017 – 04/2019",
    bullets: [
      "Built responsive Angular 7 TypeScript web app for broker applications.",
      "Jasmine tests with 80%+ code coverage.",
      "Refactored Angular 2 to Angular 6; fixed Webpack build.",
      "Refactored codebase into AMD modules.",
    ],
    skills: ["Angular", "TypeScript", "JavaScript", "Jest"],
  },
  {
    company: "Atlasly LLC",
    role: "Owner",
    period: "01/2017 – 01/2018",
    bullets: [
      "Supported a client's Cesium.js geospatial temporal application.",
      "Added features with AngularJs and D3.",
    ],
    skills: ["Angular", "Cesium", "D3", "JavaScript"],
  },
  {
    company: "Patrocinium Systems",
    role: "Senior Engineer",
    period: "10/2015 – 01/2017",
    bullets: [
      "Lead full-stack developer on a 3D geospatial and temporal web application using CesiumJS, D3, AngularJs, Bootstrap, NodeJs, Hapi, and ElasticSearch.",
      "Managed development team.",
      "Deployed on AWS with Elastic Beanstalk and S3.",
      "Developed a patent for emergency visualizations.",
    ],
    skills: ["Angular", "Cesium", "D3", "NodeJs", "ElasticSearch", "AWS", "JavaScript"],
  },
  {
    company: "Ringtail Design",
    role: "UX Developer",
    period: "03/2014 – 06/2015",
    bullets: [
      "Worked on a C#.Net 3D geospatial and temporal desktop application for DoD.",
      "Touch screen and keyboard/mouse interaction design.",
    ],
    skills: ["C#", "Cesium"],
  },
  {
    company: "Information Management Services",
    role: "Software Developer",
    period: "05/2009 – 03/2014",
    bullets: [
      "Developed C++.NET and Java Swing desktop apps for cancer records.",
      "Worked on a compiler using JFlex/CUP.",
      "Added threading to C++ program, achieving 300% throughput increase.",
    ],
    skills: ["C++", "Java", "C"],
  },
];

const skillCategories: { label: string; skills: string[] }[] = [
  { label: "Languages", skills: ["JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "C"] },
  { label: "Frontend", skills: ["React", "React Native", "Angular", "Vue", "Vuex", "Redux", "Three.js", "Mobx", "Next.js", "D3", "Tailwind CSS", "Cesium"] },
  { label: "Backend", skills: ["Node.js", "GraphQL", "REST"] },
  { label: "Database", skills: ["Postgres", "MongoDB", "SQLite", "ElasticSearch"] },
  { label: "AI / ML", skills: ["AWS Bedrock", "OpenClaw", "LLM Integration", "Prompt Engineering", "RAG"] },
  { label: "DevOps / Cloud", skills: ["AWS", "Docker", "Git"] },
  { label: "Testing", skills: ["Jest"] },
];

const tabs = ["Experience", "Education", "Awards", "Publications", "Volunteering"] as const;
type Tab = (typeof tabs)[number];

// ── Pill component ───────────────────────────────────────────────────────────

function SkillPill({
  skill,
  active,
  onClick,
}: {
  skill: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 border ${
        active
          ? "bg-brand-500 text-white border-brand-500 shadow-lg shadow-brand-500/30"
          : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-brand-500/50 hover:text-brand-500"
      }`}
    >
      {skill}
    </button>
  );
}

// ── Timeline Item ────────────────────────────────────────────────────────────

function TimelineItem({
  job,
  highlighted,
  index,
}: {
  job: (typeof jobs)[number];
  highlighted: boolean;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      className="relative pl-8 pb-8 last:pb-0"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      {/* vertical line */}
      <div className="absolute left-[7px] top-3 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800" />
      {/* dot */}
      <div
        className={`absolute left-0 top-2 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
          highlighted
            ? "bg-brand-500 border-brand-500 shadow-[0_0_8px_2px_rgba(99,102,241,0.5)]"
            : "bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-600"
        }`}
      />
      <button
        onClick={() => setOpen(!open)}
        className={`w-full text-left rounded-xl p-4 transition-all duration-300 border ${
          highlighted
            ? "border-brand-500/50 bg-brand-500/5 shadow-md shadow-brand-500/10"
            : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700"
        }`}
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-lg">{job.company}</h3>
            <p className="text-brand-500 text-sm font-medium">{job.role}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-gray-500 dark:text-gray-400">{job.period}</span>
            <motion.svg
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="w-4 h-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </div>
        </div>
        {/* skill mini-tags */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {job.skills.map((s) => (
            <span
              key={s}
              className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
            >
              {s}
            </span>
          ))}
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden ml-4 mt-2 space-y-1"
          >
            {job.bullets.map((b, i) => (
              <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex gap-2">
                <span className="text-brand-500 mt-1 shrink-0">▹</span>
                <span>{b}</span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────

export default function ResumeClient() {
  const [activeTab, setActiveTab] = useState<Tab>("Experience");
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const highlightedJobs = useMemo(() => {
    if (!activeSkill) return new Set<number>();
    return new Set(
      jobs.map((j, i) => (j.skills.includes(activeSkill) ? i : -1)).filter((i) => i >= 0)
    );
  }, [activeSkill]);

  const toggleSkill = (s: string) => setActiveSkill((prev) => (prev === s ? null : s));

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Header */}
      <AnimatedSection>
        <h1 className="text-4xl font-bold mb-1">Daniel Murphy</h1>
        <p className="text-lg text-brand-500 font-medium mb-1">Senior Software Engineer</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Houston, TX · rdanielmurphy@gmail.com ·{" "}
          <a
            href="https://github.com/rdanielmurphy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-500 transition-colors"
          >
            github.com/rdanielmurphy
          </a>
        </p>
        <a
          href="/DM_Resume.pdf"
          download
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors font-medium"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Download PDF
        </a>
      </AnimatedSection>

      {/* Skills */}
      <ScrollReveal className="mt-14">
        <h2 className="text-2xl font-bold mb-6">Skills</h2>
        <div className="space-y-4">
          {skillCategories.map((cat) => (
            <div key={cat.label}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                {cat.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((s) => (
                  <SkillPill key={s} skill={s} active={activeSkill === s} onClick={() => toggleSkill(s)} />
                ))}
              </div>
            </div>
          ))}
        </div>
        {activeSkill && (
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Showing jobs using <span className="text-brand-500 font-medium">{activeSkill}</span> ·{" "}
            <button onClick={() => setActiveSkill(null)} className="underline hover:text-brand-500">
              clear
            </button>
          </p>
        )}
      </ScrollReveal>

      {/* Tabs */}
      <ScrollReveal className="mt-14">
        <div className="flex gap-1 border-b border-gray-200 dark:border-gray-800 mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? "text-brand-500"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "Experience" && (
              <div>
                {jobs.map((job, i) => (
                  <TimelineItem
                    key={job.company}
                    job={job}
                    index={i}
                    highlighted={activeSkill ? highlightedJobs.has(i) : false}
                  />
                ))}
              </div>
            )}

            {activeTab === "Education" && (
              <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 bg-white dark:bg-gray-900">
                <h3 className="font-semibold text-lg">Bachelor of Science in Computer Science</h3>
                <p className="text-brand-500 text-sm font-medium">Minor in Mathematics</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                  Towson University · 09/2006 – 05/2009
                </p>
              </div>
            )}

            {activeTab === "Awards" && (
              <div className="space-y-4">
                {[
                  { title: "First Place — Health Hack DC", date: "01/2013" },
                  { title: "Second Place — SBA Mobile App Contest", date: "01/2011" },
                ].map((a) => (
                  <div
                    key={a.title}
                    className="border border-gray-200 dark:border-gray-800 rounded-xl p-5 bg-white dark:bg-gray-900 flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-500 shrink-0">
                      🏆
                    </div>
                    <div>
                      <h3 className="font-semibold">{a.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{a.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "Publications" && (
              <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 bg-white dark:bg-gray-900">
                <a href="https://ppubs.uspto.gov/api/patents/html/9794755?source=USPAT&requestToken=eyJzdWIiOiJhYzlhYzk1MS1lYTdhLTQ2NTctODczZi1iYTE2NTVjNjhmYjEiLCJ2ZXIiOiI5YmIxYjM5MC0yYjNhLTQ5MTgtYjA3Mi1mNzdlNzJjYWFiMWEiLCJleHAiOjB9" target="_blank" rel="noopener noreferrer" className="font-semibold text-lg text-brand-500 hover:text-brand-600 transition-colors">
                  &quot;Interactive emergency visualization methods&quot;
                </a>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  US Patent No: US 9794755 B1 · October 2017
                </p>
              </div>
            )}

            {activeTab === "Volunteering" && (
              <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 bg-white dark:bg-gray-900">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 shrink-0">
                    🚒
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Cape Royale Fire Department</h3>
                    <p className="text-brand-500 text-sm font-medium">Volunteer Firefighter</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                  Coldspring, TX · 04/2024 – Present
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Boat rescue, traffic control, structure and forest fires.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </ScrollReveal>
    </div>
  );
}
