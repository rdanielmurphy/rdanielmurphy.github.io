"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface Props {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

export default function BlogCard({ slug, title, date, excerpt }: Props) {
  return (
    <Link href={`/blog/${slug}`}>
      <motion.article
        whileHover={{ y: -2 }}
        className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-brand-500/50 dark:hover:border-brand-500/50 transition-colors"
      >
        <time className="text-xs text-gray-500 dark:text-gray-500">{date}</time>
        <h3 className="text-lg font-semibold mt-1 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{excerpt}</p>
      </motion.article>
    </Link>
  );
}
