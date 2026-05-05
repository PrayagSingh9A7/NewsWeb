export const categories = [
  { label: "Home", slug: "general", path: "/" },
  { label: "Business", slug: "business", path: "/business" },
  { label: "Sports", slug: "sports", path: "/sports" },
  { label: "Technology", slug: "technology", path: "/technology" },
  { label: "Health", slug: "health", path: "/health" },
  { label: "Science", slug: "science", path: "/science" },
];

export const getCategoryLabel = (slug) => {
  return categories.find((category) => category.slug === slug)?.label || "News";
};
