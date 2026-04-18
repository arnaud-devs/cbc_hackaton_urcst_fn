import BlogCategory from "./BlogCategory";
import { useNavigate } from "react-router-dom";

const BlogCard = ({
  className,
  id,
  thumbnail,
  categories,
  title,
  authorName,
  date,
}: {
  className?: string;
  id: string;
  title: string;
  authorName: string;
  thumbnail: string;
  date: string;
  categories: string[];
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={`relative group/card  cursor-pointer space-y-2 ${className}`}
      onClick={() => navigate(`/health/${id}`)}
    >
      <div className="z-10  bg-none group-hover/card:bg-primary/5 h-full  absolute inset-0 -bottom-2 mt-auto duration-300" />
      <figure className="w-full h-28 xs:h-36 lg:h-48 overflow-hidden">
        <img src={thumbnail} alt={title} className="size-full object-cover" />
      </figure>
      <div className="flex space-x-1 sm:space-x-2">
        {categories.map((category) => (
          <BlogCategory key={category} category={category} />
        ))}
      </div>
      <h2 className="font-medium text-[.95rem] md:text-[1.05rem] line-clamp-2 leading-5">
        {title}
      </h2>
      <div className="flex flex-wrap items-center justify-between -mt-2 text-xs sm:text-sm text-muted-foreground">
        <p className="">{authorName}</p>
        <p className="text-muted-foreground leading-3">
          {new Date(date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
