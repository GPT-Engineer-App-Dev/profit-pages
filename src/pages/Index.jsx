import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

const fetchFeaturedNews = async () => {
  const response = await fetch("https://api.example.com/featured-news");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const fetchLatestNews = async () => {
  const response = await fetch("https://api.example.com/latest-news");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const Index = () => {
  const { data: featuredNews, error: featuredError, isLoading: isLoadingFeatured } = useQuery({
    queryKey: ["featuredNews"],
    queryFn: fetchFeaturedNews,
  });

  const { data: latestNews, error: latestError, isLoading: isLoadingLatest } = useQuery({
    queryKey: ["latestNews"],
    queryFn: fetchLatestNews,
  });

  if (isLoadingFeatured || isLoadingLatest) {
    return <div>Loading...</div>;
  }

  if (featuredError || latestError) {
    return <div>Error loading news</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Featured News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredNews.map((news) => (
            <Card key={news.id}>
              <CardHeader>
                <CardTitle>{news.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <img src={news.image} alt={news.title} className="mb-4" />
                <p>{news.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {latestNews.map((news) => (
            <Card key={news.id}>
              <CardHeader>
                <CardTitle>{news.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <img src={news.image} alt={news.title} className="mb-4" />
                <p>{news.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;