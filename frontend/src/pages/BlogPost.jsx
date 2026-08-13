import { useParams, Link } from "react-router-dom";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import CTAButton from "@/components/CTAButton";
import { Overline } from "@/components/Reveal";
import { useBlogPost, useBlog } from "@/lib/content";
import { useEnquiry } from "@/context/EnquiryContext";

/** Minimal markdown-ish renderer for headings, bullets and bold text. */
const inline = (text) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

const renderBody = (body = "") => {
  const nodes = [];
  let bullets = [];
  const flush = () => {
    if (bullets.length) {
      nodes.push(
        <ul key={`ul-${nodes.length}`}>
          {bullets.map((b, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: inline(b) }} />
          ))}
        </ul>
      );
      bullets = [];
    }
  };

  body.split("\n").forEach((raw) => {
    const line = raw.trim();
    if (!line) return;
    if (/^[-*] /.test(line)) {
      bullets.push(line.replace(/^[-*] /, ""));
      return;
    }
    flush();
    if (line.startsWith("## ")) nodes.push(<h2 key={nodes.length}>{line.slice(3)}</h2>);
    else nodes.push(<p key={nodes.length} dangerouslySetInnerHTML={{ __html: inline(line) }} />);
  });
  flush();
  return nodes;
};

export default function BlogPost() {
  const { slug } = useParams();
  const { data: post, error } = useBlogPost(slug);
  const { data: posts = [] } = useBlog();
  const { openEnquiry } = useEnquiry();

  if (error) {
    return (
      <div className="shell py-40 text-center">
        <h1 className="text-4xl">Article not found</h1>
        <CTAButton to="/blog" variant="outline" className="mt-8">All stories</CTAButton>
      </div>
    );
  }
  if (!post) return <div className="min-h-[70vh]" />;

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <Seo
        title={post.meta_title || post.title}
        description={post.meta_description || post.excerpt}
        image={post.cover_image}
        path={`/blog/${post.slug}`}
        schema={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.meta_description || post.excerpt,
          image: post.cover_image,
          articleSection: post.category,
          keywords: (post.tags || []).join(", "),
          author: { "@type": "Organization", name: "Nomyra Travels" },
          publisher: { "@type": "Organization", name: "Nomyra Travels" },
        }}
      />
      <PageHero
        overline={`${post.category} · ${post.read_time}`}
        title={post.title}
        subtitle={post.excerpt}
        image={post.cover_image}
        alt={post.cover_alt}
      />

      <article className="bg-night py-20 md:py-28" data-testid="blog-article">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="prose-nomyra lg:col-span-7">{renderBody(post.body)}</div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="border border-white/10 bg-night-2 p-8">
              <Overline className="mb-4">Plan this trip</Overline>
              <p className="font-display text-2xl leading-snug">Want this as a real itinerary?</p>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                Tell us your dates and we will turn this guide into a journey built around you.
              </p>
              <CTAButton onClick={() => openEnquiry({ message: `I read "${post.title}" and would like to plan this trip.` })} className="mt-7 w-full" data-testid="blog-enquire-btn">
                Plan My Trip
              </CTAButton>
            </div>
            {(post.tags || []).length > 0 && (
              <div className="mt-8">
                <Overline className="mb-4">Tags</Overline>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((t) => (
                    <span key={t} className="rounded-sm border border-white/10 px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.12em] text-ink-faint">{t}</span>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-night-2 py-20">
          <div className="shell">
            <h2 className="text-3xl md:text-4xl leading-tight">Keep reading</h2>
            <ul className="mt-10 divide-y divide-white/8 border-t border-white/8">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link to={`/blog/${p.slug}`} data-testid={`related-blog-${p.slug}`} className="group flex flex-col gap-2 py-6 md:flex-row md:items-center md:justify-between">
                    <span className="font-display text-2xl text-ink transition-colors group-hover:text-beige">{p.title}</span>
                    <span className="overline">{p.category}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
