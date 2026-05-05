const API_URL = "https://gnews.io/api/v4";

const topicMap = {
  general: "breaking-news",
  business: "business",
  sports: "sports",
  technology: "technology",
  health: "health",
  science: "science",
};

export default async function handler(request, response) {
  const { category = "general", page = "1", search = "" } = request.query;

  if (!process.env.GNEWS_API_KEY) {
    return response.status(500).json({
      errors: ["Missing GNEWS_API_KEY on server."],
    });
  }

  const params = new URLSearchParams({
    lang: "en",
    country: "in",
    max: "9",
    page,
    apikey: process.env.GNEWS_API_KEY,
  });

  let endpoint = "top-headlines";

  if (search.trim()) {
    endpoint = "search";
    params.append("q", search.trim());
  } else {
    params.append("topic", topicMap[category] || "breaking-news");
  }

  try {
    const apiResponse = await fetch(`${API_URL}/${endpoint}?${params.toString()}`);
    const data = await apiResponse.json();

    return response.status(apiResponse.status).json(data);
  } catch {
    return response.status(500).json({
      errors: ["Unable to fetch news right now."],
    });
  }
}
