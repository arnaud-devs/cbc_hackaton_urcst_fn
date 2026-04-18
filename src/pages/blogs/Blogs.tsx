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
import type { Article } from "@/types/article";
import { Link } from "react-router-dom";


const Blogs = () => {
  const { setActiveItem } = useNavbarContext();
  const { articles, loading, error, isUsingMockData } = useArticles();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);

  useDocumentTitle("Health");

  // Move setActiveItem to useEffect to avoid setState during render
  useEffect(() => {
    setActiveItem("Health");
  }, [setActiveItem]);

  // Filter articles based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.ArticleCategories.some(category =>
          category.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredArticles(filtered);
    }
  }, [articles, searchQuery]);


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const input = e.currentTarget.querySelector('input') as HTMLInputElement;
    setSearchQuery(input.value);
  };
  return (
    <div className="relative mt-10 mb-20 space-y-3 mx-[5%]">
      <BlogBanner />
      {isUsingMockData && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-800">
                <strong>Demo Mode:</strong> The API is currently unavailable. Showing sample articles for demonstration purposes.
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="sticky top-16 pt-7 pb-3 bg-background z-30">
        <h1 className="font-semibold text-[1.2rem] md:text-[1.3rem] lg:text-[1.4rem] mb-1">
          Health topics
        </h1>
        <p className="text-muted-foreground leading-4 text-[.9rem] md:text-[.95rem] lg:text-base">
          Explore the latest articles and insights on health and wellness.
        </p>
      </div>
      <div className="relative flex flex-col md:flex-row gap-y-10 sm:gap-y-16 gap-x-8 lg:gap-x-10">
        <div className=" space-y-5 md:basis-[65%] lg:basis-[75%]">
          <div className="sticky top-36 py-4 bg-background  flex gap-4 items-center justify-between z-20">
            <div className="flex items-center  gap-5">
              <span className="font-medium text-sm md:text-base">Topics: </span>
              <select name="" id="" className="text-sm" defaultValue="topic1">
                <option value="topic1">
                  All
                </option>
                <option value="topic1">Topic 1</option>
                <option value="topic2">Topic 2</option>
                <option value="topic3">Topic 3</option>
                <option value="topic4">Topic 4</option>
              </select>
            </div>
            <form
              onSubmit={handleSearch}
              className="w-full h-9 sm:h-[2.35rem] lg:h-11 max-w-[22rem] flex"
            >
              <Input
                type="text"
                placeholder="Search health topics..."
                className="!h-full bg-gray-100 focus:border focus-visible:border-primary border-primary/25  !ring-0 rounded-none rounded-l-sm w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" className="!h-full rounded-none rounded-r-sm  !px-4 lg:!px-5">
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
          ) : filteredArticles.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <p className="text-muted-foreground">No articles found</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 sm:gap-y-8 lg:gap-y-10 gap-x-3 sm:gap-x-5 md:gap-x-6 lg:gap-x-4 ">
              {filteredArticles.filter(article => article.status === "PUBLISHED").map((article) => (
                <BlogCard
                  className="w-full"
                  key={article.id}
                  id={article.id}
                  title={article.title}
                  authorName="Huzacare Team"
                  thumbnail={article.coverPhoto}
                  date={article.createdAt}
                  categories={article.ArticleCategories.map(cat => cat.title)}
                />
              ))}
            </div>
          )}
        </div>
        <div className="sticky top-[9.5rem] basis-[35%] lg:basis-[25%] h-fit ">
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
              {articles.filter(article=>article.status === 'PUBLISHED').slice(0, 4).map((article) => (
                <Link key={article.id} to={`/health/${article.id}`} className="flex gap-2 items-start hover:bg-muted/40 p-2 rounded-md transition">
                  <div>
                    <figure className="w-24 h-16 lg:w-28 lg:h-20">
                      <img
                        src={article.coverPhoto}
                        alt={article.title}
                        className="size-full object-cover rounded-sm"
                      />
                    </figure>
                  </div>
                  <div>
                    <h3 className="line-clamp-1 font-semibold text-sm md:text-[.95rem] lg:text-base leading-4 mb-1">
                      {article.title}
                    </h3>
                    <p className="text-justify text-sm md:text-[.8rem] lg:text-[.95rem] text-muted-foreground line-clamp-3 leading-4">
                      {article.content.replace(/<[^>]*>/g, '').slice(0, 150)}...
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
