import BlogCard from "@/components/blog/BlogCard";
import GetInTouch from "@/components/home/GetInTouch";
import HeroSection from "@/components/home/HeroSection";
import SuccessStories from "@/components/home/SuccessStories";
import BookingBtn from "@/components/Appointment/BookingBtn";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useNavbarContext } from "@/context/NavbarContext";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { useArticles } from "@/hooks/useArticles";
import { ArrowRight, ChevronRight, MapPin, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import patientConsultationWithDoctorsImage from "@/assets/patient_consultation_with_doctors.png";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getDoctorImage } from "@/constants/doctorImages";

const API_BASE = import.meta.env.VITE_API_URL ?? "https://cbc-hackaton-urcst-bn.onrender.com/api";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  languages: string[];
  rating: number;
  totalSessions: number;
}

const Home = () => {
  useDocumentTitle("Home");
  const navigate = useNavigate();
  const { articles, loading: articlesLoading } = useArticles();
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/doctors`)
      .then((r) => r.json())
      .then((json) => { if (json.status === "success") setDoctors(json.data.slice(0, 6)); })
      .catch(() => {});
  }, []);

  const { setActiveItem } = useNavbarContext();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            switch (entry.target.id) {
              case "what-is-huza-care":
                setActiveItem("What is HuzaCare?");
                break;
              case "success-stories":
                setActiveItem("Success Stories");
                break;
              default:
                setActiveItem("Home");
            }
          } else {
            setActiveItem("Home");
          }
        });
      },
      { threshold: 0.9 }
    );

    ["what-is-huza-care", "success-stories"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col mx-[5%] space-y-6 sm:space-y-10 min-h-screen bg-background mb-20 mb:mb-40">
      <HeroSection />
      <div className="space-y-8 sm:space-y-20">
        <div>
          <h1 className="font-semibold text-[1.1rem] sm:text-2xl mb-1 sm:mb-2">
            Trending health topics
          </h1>
          <div className="">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full group"
            >
              <CarouselContent>
                {articlesLoading ? (
                  // Loading skeleton
                  Array.from({ length: 6 }).map((_, index) => (
                    <CarouselItem
                      key={index}
                      className="basis-1/2 sm:basis-1/3 md:basis-1/4"
                    >
                      <div className="max-w-[16rem] sm:max-w-[17rem] md:max-w-[18rem] space-y-2">
                        <div className="w-full h-28 xs:h-36 lg:h-48 bg-gray-200 animate-pulse rounded" />
                        <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
                        <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
                      </div>
                    </CarouselItem>
                  ))
                ) : (
                  articles.filter(article => article.status === "PUBLISHED").slice(0, 6).map((article) => (
                    <CarouselItem
                      key={article.id}
                      className="basis-1/2 sm:basis-1/3 md:basis-1/4"
                    >
                      <BlogCard
                        className="max-w-[16rem] sm:max-w-[17rem] md:max-w-[18rem]"
                        id={article.id}
                        title={article.title}
                        authorName="HuzaCare Team"
                        thumbnail={article.coverPhoto}
                        date={article.createdAt}
                        categories={article.ArticleCategories.map(cat => cat.title)}
                      />
                    </CarouselItem>
                  ))
                )}
                <CarouselItem className="flex items-center justify-center basis-[45%] sm:basis-1/5">
                  <div
                    className="size-[4.5rem] sm:size-28 border rounded-full flex flex-col items-center justify-center hover:bg-black/5 cursor-pointer "
                    onClick={() => navigate("/health")}
                  >
                    <figure className="size-4 sm:size-6">
                      <ArrowRight className="size-full" />
                    </figure>
                    <span className="text-xs tracking-tight md:text-sm">
                      See More
                    </span>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="hidden sm:group-hover:inline-flex size-10 bg-primary/15 border-2 border-primary/85 -left-3 sm:-left-5 disabled:!hidden" />
              <CarouselNext className="hidden sm:group-hover:inline-flex size-10 bg-primary/15 border-2 border-primary/85 -right-3 sm:-right-5 disabled:!hidden" />
            </Carousel>
          </div>
        </div>
        <div className="w-full">
          <h1 className="font-semibold text-[1.1rem] sm:text-2xl mb-1 sm:mb-2">
            Top Doctors
          </h1>
          <Carousel opts={{ align: "start" }} className="w-full group">
            <CarouselContent>
              {doctors.map((doctor, index) => (
                <CarouselItem key={doctor.id} className="basis-[80%] xs:basis-[60%] sm:basis-1/2 md:basis-1/3 lg:basis-1/3 xl:basis-1/4">
                  <div className="w-full max-w-[20rem] border rounded-md shadow-sm overflow-hidden bg-background">
                    <figure className="w-full h-[10rem] bg-muted overflow-hidden">
                      <img src={getDoctorImage(index)} alt={doctor.name} className="w-full h-full object-cover object-top" />
                    </figure>
                    <div className="p-3 space-y-1.5">
                      <Link to={`/doctors/${doctor.id}`} className="font-semibold hover:text-primary hover:underline line-clamp-1">
                        {doctor.name}
                      </Link>
                      <div className="flex items-center gap-1.5 text-primary text-sm">
                        <Icon icon="hugeicons:doctor-01" width="16" height="16" />
                        <span className="line-clamp-1">{doctor.specialty}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="size-3.5" />
                        <span>Kigali, Rwanda</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="size-3.5 fill-yellow-400 stroke-yellow-400" />
                        <span>{doctor.rating}</span>
                        <span className="text-muted-foreground text-xs">({doctor.totalSessions} sessions)</span>
                      </div>
                      <BookingBtn href={`/book/${doctor.id}`} outline={false} className="w-full mt-1" />
                    </div>
                  </div>
                </CarouselItem>
              ))}
              <CarouselItem className="flex items-center justify-center basis-[45%] sm:basis-1/5">
                <div className="size-[4.5rem] sm:size-28 border rounded-full flex flex-col items-center justify-center hover:bg-black/5 cursor-pointer" onClick={() => navigate("/doctors")}>
                  <figure className="size-4 sm:size-6"><ArrowRight className="size-full" /></figure>
                  <span className="text-xs tracking-tight md:text-sm">See More</span>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="hidden sm:group-hover:inline-flex size-10 bg-primary/15 border-2 border-primary/85 -left-3 sm:-left-5 disabled:!hidden" />
            <CarouselNext className="hidden sm:group-hover:inline-flex size-10 bg-primary/15 border-2 border-primary/85 -right-3 sm:-right-5 disabled:!hidden" />
          </Carousel>
        </div>
        <div
          className="flex items-center justify-center  text-center md:text-left scroll-mt-36"
          id="what-is-huza-care"
        >
          <div>
            <h1 className="font-semibold text-[1.5rem] md:text-[1.75rem] lg:text-[2rem] mb-6 lg:mb-10 ">
              What is HuzaCare ?
            </h1>
            <div className="space-y-10 max-w-[32rem] mb-10 lg:mb-20">
              <p className="text-muted-foreground lg:text-lg ">
                HuzaCare, we are redefining the way people access and experience
                healthcare. Our platform brings together essential medical
                services from virtual consultations and clinic appointments to
                pharmacy orders and donation support all in one easy-to-use
                space. We believe healthcare should be accessible, personalized,
                and seamless.
              </p>
              <div>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-fit border-primary text-primary px-6"
                >
                  Learn More...
                </Button>
                <Button size="lg" className="ml-3 w-fit border-primary  px-6">
                  Get Started
                  <div className="size-5">
                    <ChevronRight strokeWidth={2.5} className="size-full" />
                  </div>
                </Button>
              </div>
            </div>
          </div>
          <figure className="hidden md:block w-[30rem] mt-14">
            <img
              src={patientConsultationWithDoctorsImage}
              alt="patient_consultation_with_doctors"
              className="size-full object-cover"
            />
          </figure>
        </div>
        <SuccessStories />
        <GetInTouch />
      </div>
    </div>
  );
};

export default Home;
