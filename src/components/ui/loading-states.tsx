import { Skeleton } from "./skeleton";

// Article Card Skeleton
export const ArticleCardSkeleton = () => (
  <div className="space-y-3">
    <Skeleton className="h-28 xs:h-36 lg:h-48 w-full" />
    <div className="flex space-x-2">
      <Skeleton className="h-5 w-16" />
      <Skeleton className="h-5 w-20" />
    </div>
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
    <div className="flex justify-between items-center">
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-3 w-16" />
    </div>
  </div>
);

// Blog Card Skeleton (matches BlogCard component)
export const BlogCardSkeleton = ({ className }: { className?: string }) => (
  <div className={`space-y-2 ${className}`}>
    <Skeleton className="h-28 xs:h-36 lg:h-48 w-full" />
    <div className="flex space-x-1 sm:space-x-2">
      <Skeleton className="h-5 w-16" />
      <Skeleton className="h-5 w-20" />
    </div>
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-3/4" />
    <div className="flex justify-between items-center">
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-3 w-16" />
    </div>
  </div>
);

// Article List Skeleton
export const ArticleListSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {Array.from({ length: count }).map((_, index) => (
      <ArticleCardSkeleton key={index} />
    ))}
  </div>
);

// Blog Grid Skeleton
export const BlogGridSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 sm:gap-y-8 lg:gap-y-10 gap-x-3 sm:gap-x-5 md:gap-x-6 lg:gap-x-4">
    {Array.from({ length: count }).map((_, index) => (
      <BlogCardSkeleton key={index} className="w-full" />
    ))}
  </div>
);

// Form Skeleton
export const FormSkeleton = () => (
  <div className="space-y-6">
    <div className="space-y-2">
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-10 w-full" />
    </div>
    <div className="space-y-2">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-10 w-full" />
    </div>
    <div className="space-y-2">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-32 w-full" />
    </div>
    <div className="flex gap-3">
      <Skeleton className="h-10 w-24" />
      <Skeleton className="h-10 w-20" />
    </div>
  </div>
);

// Table Skeleton
export const TableSkeleton = ({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) => (
  <div className="space-y-3">
    {/* Header */}
    <div className="flex space-x-4">
      {Array.from({ length: columns }).map((_, index) => (
        <Skeleton key={index} className="h-4 w-20" />
      ))}
    </div>
    {/* Rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} className="flex space-x-4">
        {Array.from({ length: columns }).map((_, colIndex) => (
          <Skeleton key={colIndex} className="h-4 w-16" />
        ))}
      </div>
    ))}
  </div>
);

// Dashboard Card Skeleton
export const DashboardCardSkeleton = () => (
  <div className="p-6 space-y-4">
    <div className="flex items-center justify-between">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-8 w-8 rounded-full" />
    </div>
    <Skeleton className="h-8 w-20" />
    <Skeleton className="h-4 w-24" />
  </div>
);

// Navigation Skeleton
export const NavigationSkeleton = () => (
  <div className="flex items-center space-x-4">
    <Skeleton className="h-8 w-8 rounded" />
    <Skeleton className="h-4 w-20" />
    <Skeleton className="h-4 w-16" />
    <Skeleton className="h-4 w-24" />
  </div>
);

// Profile Skeleton
export const ProfileSkeleton = () => (
  <div className="flex items-center space-x-4">
    <Skeleton className="h-12 w-12 rounded-full" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-3 w-24" />
    </div>
  </div>
);

// Recent Article Skeleton (for sidebar recent articles)
export const RecentArticleSkeleton = () => (
  <div className="space-y-4 mt-5">
    {Array.from({ length: 4 }).map((_, index) => (
      <div key={index} className="flex gap-2 items-start p-2">
        <Skeleton className="w-24 h-16 lg:w-28 lg:h-20 rounded-sm" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    ))}
  </div>
);