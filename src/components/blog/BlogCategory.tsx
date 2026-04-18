const BlogCategory = ({ category }: { category: string }) => {
  return (
    <div className="flex items-center justify-center border border-primary text-secondary-foreground px-[8px] sm:px-2 h-5 sm:h-6 rounded-sm">
      <span className="text-[.75rem] sm:text-[.8rem] font-normal text-primary -foreground ">{category}</span>
    </div>
  );
};

export default BlogCategory;
