"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { blogPosts } from "@/data/blog";
import { ArrowLeft, Calendar, Clock, User, ArrowUpRight } from "lucide-react";

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

  // Related posts — same category, exclude current
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);

  // Render content
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

  // Share URLs
  const shareUrl = typeof window !== "undefined" ? window.location.href : `https://www.omkumoh.com.na/blog/${slug}`;
  const shareText = encodeURIComponent(post.title);
  const shareLink = encodeURIComponent(shareUrl);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Header */}
      <section className="relative bg-dark-blue py-32">
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px"}} />
        <Container className="relative z-10">
          <Breadcrumb items={[{ label: "Insights", href: "/blog" }, { label: post.title }]} className="mb-6" />
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

            {/* Tags + Share */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="subtle">{tag}</Badge>
                  ))}
                </div>

                {/* Social share */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium uppercase tracking-wider text-gray-400">Share</span>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on LinkedIn"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-all hover:bg-steel-blue hover:text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on X (Twitter)"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-all hover:bg-charcoal hover:text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768M17.232 4.768l-6.768 6.768"/></svg>
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Facebook"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-all hover:bg-[#1877F2] hover:text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </a>
                </div>
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

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <Section className="bg-gray-50 border-t border-gray-100">
          <Container>
            <h2 className="text-2xl font-bold text-charcoal mb-8">Related Articles</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((rp) => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`}>
                  <Card className="group p-6 h-full hover:shadow-lg transition-all">
                    <div className="mb-3">
                      <Badge variant={rp.category === "engineering" ? "default" : rp.category === "sustainability" ? "accent" : "outline"} className="text-[10px]">
                        {rp.category.charAt(0).toUpperCase() + rp.category.slice(1)}
                      </Badge>
                    </div>
                    <h3 className="text-base font-semibold text-charcoal group-hover:text-steel-blue transition-colors line-clamp-2">
                      {rp.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate line-clamp-2">{rp.excerpt}</p>
                    <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                      <Calendar size={12} />
                      <span>{new Date(rp.date).toLocaleDateString("en-GB", { month: "short", day: "numeric", year: "numeric" })}</span>
                      <span className="text-gray-300">·</span>
                      <Clock size={12} />
                      <span>{rp.readTime}</span>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-xs font-medium text-steel-blue opacity-0 group-hover:opacity-100 transition-opacity">
                      Read Article <ArrowUpRight size={12} />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </motion.div>
  );
}