export const formatDate = (dateString) => {
  if (!dateString) return "Recently published";

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(dateString));
};
