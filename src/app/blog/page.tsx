"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { blogPosts, blogCategories } from "@/data/blog";
import { ArrowUpRight, Calendar, Clock, Search } from "lucide-react";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === "all" || post.category === activeCategory;
    const matchesSearch = !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featured = blogPosts.filter((p) => p.featured);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Hero */}
      <section className="relative flex min-h-[40vh] items-center bg-dark-blue">
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px"}} />
        <Container className="relative z-10 pt-24">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-steel-blue">
            Insights
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl font-bold text-white md:text-7xl">
            Engineering Perspectives
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 max-w-2xl text-lg text-gray-300">
            Technical insights, project lessons, and industry perspectives from Namibia&apos;s trusted multidisciplinary engineering consultancy.
          </motion.p>
        </Container>
      </section>

      <Section className="bg-gray-50">
        <Container>
          {/* Featured posts */}
          {featured.length > 0 && !searchQuery && activeCategory === "all" && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-charcoal mb-8">Featured Articles</h2>
              <div className="grid gap-8 md:grid-cols-2">
                {featured.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 transition-all hover:shadow-xl hover:-translate-y-1">
                      <Badge variant="copper" className="mb-4">
                        {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                      </Badge>
                      <h3 className="text-xl font-semibold text-charcoal group-hover:text-steel-blue transition-colors">
                        {post.title}
                      </h3>
                      <p className="mt-3 text-sm text-slate leading-relaxed line-clamp-3">{post.excerpt}</p>
                      <div className="mt-6 flex items-center justify-between text-xs text-gray-400">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(post.date).toLocaleDateString("en-GB", { month: "long", day: "numeric", year: "numeric" })}</span>
                          <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                        </div>
                        <span className="text-copper font-medium group-hover:translate-x-1 transition-transform">Read →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Filters & Search */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-10">
            <div className="flex flex-wrap gap-2">
              {blogCategories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                    activeCategory === cat.value
                      ? "bg-dark-blue text-white"
                      : "bg-white text-slate hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-steel-blue/30 sm:w-64"
              />
            </div>
          </div>

          {/* All posts */}
          <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((post, i) => (
                <motion.div
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
                      <Badge className="mb-3" variant={post.category === "engineering" ? "default" : post.category === "sustainability" ? "accent" : "outline"}>
                        {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                      </Badge>
                      <h3 className="text-base font-semibold text-charcoal group-hover:text-steel-blue transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>
                      <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                        <Calendar size={12} />
                        <span>{new Date(post.date).toLocaleDateString("en-GB", { month: "short", day: "numeric", year: "numeric" })}</span>
                        <span className="text-gray-300">·</span>
                        <Clock size={12} />
                        <span>{post.readTime}</span>
                      </div>
                      <div className="mt-3 flex items-center gap-1 text-sm font-medium text-copper opacity-0 group-hover:opacity-100 transition-opacity">
                        Read Article <ArrowUpRight size={14} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg text-slate">No articles match your criteria.</p>
              <button onClick={() => { setActiveCategory("all"); setSearchQuery(""); }} className="mt-4 text-sm font-medium text-steel-blue hover:underline">
                Clear filters
              </button>
            </div>
          )}
        </Container>
      </Section>
    </motion.div>
  );
}