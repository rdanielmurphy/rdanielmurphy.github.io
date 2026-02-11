import { Metadata } from "next";
import { getAllPosts, getPost } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import AnimatedSection from "@/components/AnimatedSection";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const { meta } = getPost(params.slug);
  return { title: meta.title };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const { meta, content } = getPost(params.slug);

  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <AnimatedSection>
        <time className="text-sm text-gray-500">{meta.date}</time>
        <h1 className="text-4xl font-bold mt-2 mb-8">{meta.title}</h1>
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <article className="prose">
          <MDXRemote source={content} />
        </article>
      </AnimatedSection>
    </div>
  );
}
