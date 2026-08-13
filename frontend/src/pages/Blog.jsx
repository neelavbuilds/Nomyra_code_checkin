import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import Img from "@/components/Img";
import { Reveal, Overline } from "@/components/Reveal";
import { useBlog } from "@/lib/content";

export default function Blog() {
  const { data: posts = [] } = useBlog();
  const [filter, setFilter] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((p) => p.category).filter(Boolean)))],
    [posts]
  );
  const visible = filter === "All" ? posts : posts.filter((p) => p.category === filter);
  const [lead, ...rest] = visible;

  return (
    <>
      <Seo
        title="Northeast Travel Stories & Guides"
        description="Meghalaya, Assam and Arunachal Pradesh travel guides: best places to visit, hidden gems, camping, treks, road trips and the best time to go."
        path="/blog"
        image={posts[0]?.cover_image}
      />
      <PageHero
        overline="Journal"
        title="Northeast Travel Stories"
        subtitle="Guides, routes and honest advice from the road."
        image={posts[0]?.cover_image}
        alt={posts[0]?.cover_alt}
      />

      <section className="bg-night py-20 md:py-28" data-testid="blog-list">
        <div className="shell">
          <div className="no-scrollbar mb-14 flex gap-2.5 overflow-x-auto pb-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                data-testid={`blog-filter-${c.toLowerCase().replace(/\s+/g, "-")}`}
                className={`flex-none rounded-sm border px-4 py-2.5 text-xs uppercase tracking-[0.12em] transition-colors ${
                  filter === c ? "border-beige bg-beige text-night" : "border-white/12 text-ink-soft hover:border-beige/50 hover:text-beige"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {lead && (
            <Reveal className="mb-20">
              <Link to={`/blog/${lead.slug}`} data-testid={`blog-lead-${lead.slug}`} className="group grid gap-8 lg:grid-cols-12 lg:gap-12">
                <div className="aspect-[16/10] overflow-hidden lg:col-span-7">
                  <Img src={lead.cover_image} alt={lead.cover_alt || lead.title} zoom priority />
                </div>
                <div className="lg:col-span-5 lg:self-center">
                  <Overline className="mb-4">{lead.category} · {lead.read_time}</Overline>
                  <h2 className="text-4xl leading-tight text-ink transition-colors group-hover:text-beige lg:text-5xl">{lead.title}</h2>
                  <p className="mt-5 text-base leading-relaxed text-ink-soft">{lead.excerpt}</p>
                </div>
              </Link>
            </Reveal>
          )}

          <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.06}>
                <Link to={`/blog/${p.slug}`} data-testid={`blog-card-${p.slug}`} className="group block">
                  <div className="aspect-[4/3] overflow-hidden">
                    <Img src={p.cover_image} alt={p.cover_alt || p.title} zoom />
                  </div>
                  <Overline className="mt-6">{p.category} · {p.read_time}</Overline>
                  <h3 className="mt-3 text-2xl leading-tight text-ink transition-colors group-hover:text-beige">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{p.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
