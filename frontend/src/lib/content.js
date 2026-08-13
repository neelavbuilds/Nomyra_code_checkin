import useSWR from "swr";
import { fetcher } from "@/lib/api";

const opts = { revalidateOnFocus: false, dedupingInterval: 60000 };

export const usePackages = () => useSWR("/packages", fetcher, opts);
export const useDestinations = (state) =>
  useSWR(state ? `/destinations?state=${encodeURIComponent(state)}` : "/destinations", fetcher, opts);
export const useExperiences = () => useSWR("/experiences", fetcher, opts);
export const useTestimonials = () => useSWR("/testimonials", fetcher, opts);
export const useGallery = () => useSWR("/gallery", fetcher, opts);
export const useBlog = () => useSWR("/blog", fetcher, opts);
export const useBlogPost = (slug) => useSWR(slug ? `/blog/${slug}` : null, fetcher, opts);
export const useDestination = (slug) => useSWR(slug ? `/destinations/${slug}` : null, fetcher, opts);
export const useExperience = (slug) => useSWR(slug ? `/experiences/${slug}` : null, fetcher, opts);
export const usePackage = (slug) => useSWR(slug ? `/packages/${slug}` : null, fetcher, opts);
export const useAbout = () => useSWR("/about", fetcher, opts);
export const useWhyUs = () => useSWR("/why-us", fetcher, opts);
