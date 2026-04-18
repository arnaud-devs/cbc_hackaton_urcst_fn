import BlogCategory from "@/components/blog/BlogCategory";
import { useNavbarContext } from "@/context/NavbarContext";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { useArticle } from "@/hooks/useArticles";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Blog = () => {
  const { setActiveItem } = useNavbarContext();
  setActiveItem("Health");
  const { id } = useParams<{ id: string }>();
  const { article, loading, error } = useArticle(id || "");

  useDocumentTitle(article?.title || "Loading Article...");

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading article...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground">Article not found</p>
      </div>
    );
  }

  return (
    <div className="relative mx-[10%] mb-20">
      <div className="sticky top-16 sm:top-[4.5rem] bg-white space-y-5 pb-5 pt-10 border-b border-gray-300 ">
        <h1 className="font-semibold text-[1.3rem] md:text-[1.6rem] lg:text-3xl leading-6 md:leading-8">
          {article.title}
        </h1>
        <div className="flex gap-x-6">
          <p className="text-[.9rem] sm:text-[.95rem] md:text-base">
            {new Date(article.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <div className="flex space-x-1 sm:space-x-2">
            <BlogCategory category={article.category} />
          </div>
        </div>
      </div>
      <figure className="w-full h-[13rem] xs:h-[16rem] sm:h-[22rem] md:h-[25rem] lg:h-[30rem] xl:h-[33rem] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=1200&h=600&fit=crop"
          alt={article.title}
          className="size-full object-cover"
        />
      </figure>
      <div 
        className="py-5 text-[.9rem] sm:text-[.95rem] md:text-base prose prose-sm max-w-none rich-text-content"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  );
};

export default Blog;
