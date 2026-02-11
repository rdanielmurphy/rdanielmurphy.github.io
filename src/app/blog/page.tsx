import { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import BlogCard from "@/components/BlogCard";
import AnimatedSection from "@/components/AnimatedSection";

export const metadata: Metadata = { title: "Blog" };

export default function Blog() {
  const posts = getAllPosts();

  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <AnimatedSection>
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
      </AnimatedSection>
      <div className="space-y-4">
        {posts.map((post, i) => (
          <AnimatedSection key={post.slug} delay={0.1 * (i + 1)}>
            <BlogCard {...post} />
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
