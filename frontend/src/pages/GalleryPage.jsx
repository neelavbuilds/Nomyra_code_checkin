import { useMemo, useState } from "react";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import GalleryCard from "@/components/cards/GalleryCard";
import { useGallery } from "@/lib/content";

const CATEGORIES = [
  "All", "Meghalaya", "Arunachal Pradesh", "Assam", "Camping",
  "Waterfalls", "Mountains", "Villages", "Adventure",
];

export default function GalleryPage() {
  const { data: items = [] } = useGallery();
  const [filter, setFilter] = useState("All");

  const visible = useMemo(
    () => (filter === "All" ? items : items.filter((i) => i.category === filter)),
    [items, filter]
  );

  return (
    <>
      <Seo
        title="Northeast India Photo Gallery"
        description="Photographs from across Meghalaya, Assam and Arunachal Pradesh — waterfalls, rivers, camps, mountains, villages and adventure."
        path="/gallery"
        image={items[0]?.image}
      />
      <PageHero
        overline="Gallery"
        title="Northeast India, Frame by Frame"
        subtitle="Mountains, rivers, camps and villages across Meghalaya, Assam and Arunachal Pradesh."
        image={items[0]?.image}
        alt={items[0]?.alt}
      />

      <section className="bg-night py-20 md:py-28" data-testid="gallery-page">
        <div className="shell">
          <div className="no-scrollbar mb-12 flex gap-2.5 overflow-x-auto pb-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                data-testid={`gallery-filter-${c.toLowerCase().replace(/\s+/g, "-")}`}
                className={`flex-none rounded-sm border px-4 py-2.5 text-xs uppercase tracking-[0.12em] transition-colors ${
                  filter === c ? "border-beige bg-beige text-night" : "border-white/12 text-ink-soft hover:border-beige/50 hover:text-beige"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {visible.length === 0 ? (
            <p className="text-sm text-ink-faint" data-testid="gallery-empty">No photographs in this category yet.</p>
          ) : (
            <div className="grid auto-rows-[190px] grid-cols-2 gap-3 sm:grid-cols-4 md:auto-rows-[240px]">
              {visible.map((item, i) => (
                <GalleryCard key={item.id || i} item={item} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
