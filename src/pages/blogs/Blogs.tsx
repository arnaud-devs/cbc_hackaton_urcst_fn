import BlogBanner from "@/components/blog/BlogBanner";
import BlogCard from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BlogGridSkeleton, RecentArticleSkeleton } from "@/components/ui/loading-states";
import { useNavbarContext } from "@/context/NavbarContext";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { useArticles } from "@/hooks/useArticles";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const PLACEHOLDER = "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&h=400&fit=crop";

const Blogs = () => {
  const { setActiveItem } = useNavbarContext();
  const { articles, loading, error } = useArticles();
  const [searchQuery, setSearchQuery] = useState("");

  useDocumentTitle("Health");

  useEffect(() => {
    setActiveItem("Health");
  }, [setActiveItem]);

  const filtered = searchQuery.trim()
    ? articles.filter(
        (a) =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : articles;

  return (
    <div className="relative mt-10 mb-20 space-y-3 mx-[5%]">
      <BlogBanner />
      <div className="sticky top-16 pt-7 pb-3 bg-background z-30">
        <h1 className="font-semibold text-[1.2rem] md:text-[1.3rem] lg:text-[1.4rem] mb-1">
          Health topics
        </h1>
        <p className="text-muted-foreground leading-4 text-[.9rem] md:text-[.95rem] lg:text-base">
          Explore the latest articles and insights on health and wellness.
        </p>
      </div>
      <div className="relative flex flex-col md:flex-row gap-y-10 sm:gap-y-16 gap-x-8 lg:gap-x-10">
        <div className="space-y-5 md:basis-[65%] lg:basis-[75%]">
          <div className="sticky top-36 py-4 bg-background flex gap-4 items-center justify-between z-20">
            <div className="flex items-center gap-5">
              <span className="font-medium text-sm md:text-base">Topics: </span>
              <select className="text-sm" defaultValue="all">
                <option value="all">All</option>
                {[...new Set(articles.map((a) => a.category))].map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="w-full h-9 sm:h-[2.35rem] lg:h-11 max-w-[22rem] flex"
            >
              <Input
                type="text"
                placeholder="Search health topics..."
                className="!h-full bg-gray-100 focus:border focus-visible:border-primary border-primary/25 !ring-0 rounded-none rounded-l-sm w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" className="!h-full rounded-none rounded-r-sm !px-4 lg:!px-5">
                <div className="size-4 md:size-[1.15rem] lg:size-5">
                  <Search strokeWidth={2.5} className="size-full" />
                </div>
              </Button>
            </form>
          </div>
          {loading ? (
            <BlogGridSkeleton count={6} />
          ) : error ? (
            <div className="flex items-center justify-center py-20">
              <p className="text-red-500">Error: {error}</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <p className="text-muted-foreground">No articles found</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 sm:gap-y-8 lg:gap-y-10 gap-x-3 sm:gap-x-5 md:gap-x-6 lg:gap-x-4">
              {filtered.map((article) => (
                <BlogCard
                  className="w-full"
                  key={article.id}
                  id={article.id}
                  title={article.title}
                  authorName={article.admin.name}
                  thumbnail={PLACEHOLDER}
                  date={article.createdAt}
                  categories={[article.category]}
                />
              ))}
            </div>
          )}
        </div>
        <div className="sticky top-[9.5rem] basis-[35%] lg:basis-[25%] h-fit">
          <h2 className="font-semibold text-[1.15rem] md:text-[1.2rem] lg:text-[1.25rem] mb-1">
            Recent topics
          </h2>
          {loading ? (
            <RecentArticleSkeleton />
          ) : error ? (
            <div className="flex items-center justify-center py-20">
              <p className="text-red-500">Error: {error}</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <p className="text-muted-foreground">No articles found</p>
            </div>
          ) : (
            <div className="space-y-4 mt-5">
              {articles.slice(0, 4).map((article) => (
                <Link
                  key={article.id}
                  to={`/health/${article.id}`}
                  className="flex gap-2 items-start hover:bg-muted/40 p-2 rounded-md transition"
                >
                  <figure className="w-24 h-16 lg:w-28 lg:h-20 shrink-0">
                    <img
                      src={PLACEHOLDER}
                      alt={article.title}
                      className="size-full object-cover rounded-sm"
                    />
                  </figure>
                  <div>
                    <h3 className="line-clamp-1 font-semibold text-sm md:text-[.95rem] lg:text-base leading-4 mb-1">
                      {article.title}
                    </h3>
                    <p className="text-justify text-sm md:text-[.8rem] lg:text-[.95rem] text-muted-foreground line-clamp-3 leading-4">
                      {article.content.replace(/<[^>]*>/g, "").slice(0, 150)}...
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
