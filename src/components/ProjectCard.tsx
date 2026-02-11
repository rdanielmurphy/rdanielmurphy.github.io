"use client";

import { motion } from "framer-motion";

interface Props {
  title: string;
  description: string;
  tags: string[];
  href?: string;
}

export default function ProjectCard({ title, description, tags, href }: Props) {
  const Card = (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-brand-500/50 dark:hover:border-brand-500/50 transition-colors cursor-pointer"
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <span key={t} className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );

  return href ? <a href={href} target="_blank" rel="noopener noreferrer">{Card}</a> : Card;
}
