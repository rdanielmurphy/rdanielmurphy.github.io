import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "src/content/blog");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));
  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(contentDir, file), "utf8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        excerpt: data.excerpt ?? "",
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPost(slug: string) {
  const raw = fs.readFileSync(path.join(contentDir, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  return { meta: { slug, title: data.title, date: data.date, excerpt: data.excerpt ?? "" }, content };
}
