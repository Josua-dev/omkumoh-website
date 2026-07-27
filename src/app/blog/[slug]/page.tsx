"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { blogPosts } from "@/data/blog";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <Section className="min-h-screen bg-white pt-32">
        <Container className="text-center">
          <h1 className="text-4xl font-bold text-charcoal">Article Not Found</h1>
          <p className="mt-4 text-slate">The article you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/blog" className="mt-6 inline-flex items-center gap-2 text-steel-blue font-medium">
            ← Back to Articles
          </Link>
        </Container>
      </Section>
    );
  }

  // Render content as paragraphs (split by double newlines)
  const paragraphs = post.content.split("\n\n").map((block, i) => {
    if (block.startsWith("## ")) {
      return (
        <h2 key={i} className="mt-10 mb-4 text-2xl font-bold text-charcoal">
          {block.replace("## ", "")}
        </h2>
      );
    }
    if (block.startsWith("**") && block.endsWith("**")) {
      return (
        <p key={i} className="text-lg font-semibold text-charcoal mt-6 mb-2">
          {block.replace(/\*\*/g, "")}
        </p>
      );
    }
    if (block.startsWith("- ")) {
      const items = block.split("\n").filter((l) => l.startsWith("- ")).map((l) => l.replace("- ", ""));
      return (
        <ul key={i} className="my-4 space-y-2 list-disc pl-6 text-slate leading-relaxed">
          {items.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ul>
      );
    }
    if (block.match(/^\d\. /)) {
      const items = block.split("\n").filter((l) => l.match(/^\d\. /)).map((l) => l.replace(/^\d\. /, ""));
      return (
        <ol key={i} className="my-4 space-y-2 list-decimal pl-6 text-slate leading-relaxed">
          {items.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ol>
      );
    }
    return (
      <p key={i} className="my-4 text-lg leading-relaxed text-slate">
        {block}
      </p>
    );
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Header */}
      <section className="relative bg-dark-blue py-32">
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px"}} />
        <Container className="relative z-10">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-2 text-sm text-steel-blue hover:text-soft-cyan">
            <ArrowLeft size={14} /> All Articles
          </Link>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant={post.category === "engineering" ? "default" : post.category === "sustainability" ? "accent" : "outline"}>
              {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
            </Badge>
          </div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-white md:text-5xl lg:text-6xl max-w-3xl">
            {post.title}
          </motion.h1>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1.5"><User size={14} /> {post.author}</span>
            <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(post.date).toLocaleDateString("en-GB", { month: "long", day: "numeric", year: "numeric" })}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime}</span>
          </motion.div>
        </Container>
      </section>

      {/* Content */}
      <Section className="bg-white">
        <Container>
          <div className="mx-auto max-w-3xl">
            <article className="prose prose-lg max-w-none">
              {paragraphs}
            </article>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="subtle">{tag}</Badge>
                ))}
              </div>
            </div>

            {/* Author */}
            <div className="mt-8 rounded-2xl bg-gray-50 p-6 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-steel-blue/10 text-lg font-bold text-steel-blue">
                {post.author.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <p className="font-semibold text-charcoal">{post.author}</p>
                <p className="text-sm text-slate">OM&apos;KUMOH Consulting Engineers</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-8 flex justify-between">
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-steel-blue hover:text-soft-cyan">
                ← Back to Articles
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </motion.div>
  );
}