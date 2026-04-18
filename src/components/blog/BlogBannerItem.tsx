import { Button } from "../ui/button";
import foodImage from "@/assets/food.jpg";

const BlogBannerItem = () => {
  return (
    <div className="relative size-full z-10">
      <div className="size-full absolute inset-0 bg-gradient-to-t from-black/70 to-black/40" />
      <figure className="size-full">
        <img
          src={foodImage}
          alt="Blog Header"
          className="size-full object-cover"
        />
      </figure>
      <div className="absolute inset-0 z-20 space-y-3 sm:space-y-5 flex flex-col justify-end pl-6 sm:pl-10 md:pl-14 lg:pl-16 pb-10 text-white">
        <h2 className="line-clamp-1 w-2/3 md:w-1/2 text-xl md:text-2xl font-semibold">
          What Makes Up a Balanced Diet?
        </h2>
        <p className="line-clamp-2 md:line-clamp-3 w-10/11 md:w-7/11 lg:w-5/11 leading-6 text-[.9rem] md:text-base">
          A balanced diet provides your body with the essential nutrients it
          needs to function properly. It includes the right proportions of
          carbohydrates, proteins, fats, vitamins, minerals, and water—sourced
          from a variety of foods like fruits, vegetables, whole grains, lean
          meats, dairy, and healthy oils. Eating a balanced diet helps maintain
          energy levels, boosts immunity, supports growth and development, and
          reduces the risk of chronic diseases.
        </p>
        <Button className="bg-background text-primary w-fit px-6 ">
          Read More
        </Button>
      </div>
    </div>
  );
};

export default BlogBannerItem;
