import { FaFacebookSquare, FaVimeoSquare } from "react-icons/fa";
import { FaSquareXTwitter, FaYoutube } from "react-icons/fa6";

const SocialMedia = ({
  className,
  childrenClassName,
}: {
  className?: string;
  childrenClassName?: string;
}) => {
  return (
    <div className={`flex items-center justify-between gap-4 ${className}`}>
      <figure
        className={`cursor-pointer size-9 bg-primary-foreground/20 rounded-full p-2 ${childrenClassName}`}
      >
        <FaFacebookSquare className="!size-full" />
      </figure>
      <figure
        className={`cursor-pointer size-9 bg-primary-foreground/20 rounded-full p-2 ${childrenClassName}`}
      >
        <FaSquareXTwitter className="!size-full" />
      </figure>
      <figure
        className={`cursor-pointer size-9 bg-primary-foreground/20 rounded-full p-2 ${childrenClassName}`}
      >
        <FaVimeoSquare className="!size-full" />
      </figure>
      <figure
        className={`cursor-pointer size-9 bg-primary-foreground/20 rounded-full p-2 ${childrenClassName}`}
      >
        <FaYoutube className="!size-full" />
      </figure>
    </div>
  );
};

export default SocialMedia;
