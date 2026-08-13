import Img from "@/components/Img";

export const GalleryCard = ({ item, index = 0 }) => (
  <figure
    data-testid={`gallery-card-${index}`}
    className={`group relative overflow-hidden bg-night-2 ${index % 7 === 0 ? "sm:col-span-2 sm:row-span-2" : ""}`}
  >
    <div className={`w-full overflow-hidden ${index % 7 === 0 ? "aspect-square" : "aspect-[4/3]"}`}>
      <Img src={item.image} alt={item.alt || item.caption} zoom />
    </div>
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/85 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    <figcaption className="pointer-events-none absolute inset-x-4 bottom-4 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
      <span className="overline text-beige/80">{item.category}</span>
      <p className="mt-1 text-sm text-ink">{item.caption}</p>
    </figcaption>
  </figure>
);

export default GalleryCard;
