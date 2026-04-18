import  findHospital  from '@/assets/findHospital.png';
import healthTips from '@/assets/health_tips.png';
import booking from '@/assets/booking.png';
import OnboardScreen from './OnboardScreen';
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { Button } from "../../components/ui/button"
import { useIsMobile } from '@/hooks/use-mobile'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
const OnBoard = () => {
    useDocumentTitle("Onboard")
    const onBoardScreens = [
        {
            id: 1,
            image: findHospital,
            title: "Reba Amavuriro",
            sub_title : "Reba amavuriro akwegereye nta kongera guta umwanya."
        },
        {
            id: 2,
            image: healthTips,
            title: "Menya amakuru",
            sub_title : "Menya amakuru kubigendanye n'ubuzima "
        },
        {
            id: 3,
            image: booking,
            title: "Saba Gahunda",
            sub_title : "Ubu nibikiri ngombwa ko uva aho uri  ngo ugiye gushaka gahunda ."
        }
    ]
    const navigate = useNavigate()
    const isMobile = useIsMobile()
    const [currentSlide, setCurrentSlide] = useState(0);
    const isLastSlide = currentSlide === onBoardScreens.length - 1;
    const canGoBack = currentSlide > 0 && !isMobile;

useEffect(() => {
  let touchstartX = 0;
  let touchendX = 0;

  const checkDirection = () => {
    if (touchendX < touchstartX) {
      if (currentSlide < onBoardScreens.length - 1) {
        setCurrentSlide(prev => prev + 1);
      }
    }
    if (touchendX > touchstartX) {
      if (currentSlide > 0) {
        setCurrentSlide(prev => prev - 1);
      }
    }
  };

  const handleTouchStart = (e:TouchEvent) => {
    touchstartX = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    touchendX = e.changedTouches[0].screenX;
    checkDirection();
  };

  document.addEventListener("touchstart", handleTouchStart);
  document.addEventListener("touchend", handleTouchEnd);

  return () => {
    document.removeEventListener("touchstart", handleTouchStart);
    document.removeEventListener("touchend", handleTouchEnd);
  };
}, [currentSlide, onBoardScreens.length, setCurrentSlide]);

 const handleNext = () => {
  if (currentSlide < onBoardScreens.length - 1) {
    setCurrentSlide(prev => prev + 1)
} else {
    navigate('/')
}
}
const handleBack = () => {
    if (currentSlide > 0) {
        setCurrentSlide(prev => prev - 1)
    }
}

return (
    <section className='min-h-[89vh] flex flex-col overflow-auto '>
        <div className='flex-grow flex flex-col justify-center items-center '>
        <div className='flex flex-col items-center max-md:px-[20px] container mx-auto px-4' >
        <div className='relative  overflow-hidden w-full max-w-[600px]'>
            <div className='flex transition-transform duration-500 ease-in-out '
            style={{
                transform: `translateX(-${currentSlide * 100}%)`,
            }}>
            {
            onBoardScreens.map((el)=>(
                <OnboardScreen
                key={el.id}
                info={el}
                currentSlide={currentSlide}
                setCurrentSlide={setCurrentSlide}
                totalSlides={onBoardScreens.length}
                />
            ))
        }
        </div>
        <div className='flex flex-col  px-4'>
            <div className="flex justify-between max-md:flex-col max-md:gap-3">
          {canGoBack && (
            <Button variant="outline" className="max-md:order-2 max-md:w-full" onClick={handleBack}>Back</Button>
          )}
          <Button variant="link"  className="underline max-md:order-2 max-md:w-full" onClick={()=>navigate('/')}>{isLastSlide?" ": "Skip to Home"}</Button>
          <Button onClick={handleNext} className="bg-primary text-white px-4 py-2 rounded max-md:w-full">{isLastSlide?"Go to Home": "Continue"}</Button>
        </div>
        <div className="flex w-full justify-center mt-5 max-md:mt-3 gap-2">
        {onBoardScreens.map((_, index) =>
        index === currentSlide ? (
            <div key={index} className="w-3 h-3 px-3 bg-primary rounded-full" onClick={() => setCurrentSlide(index)}></div>
        ) : (
            <div key={index} className="w-3 h-3 bg-gray-200 rounded-full" onClick={() => setCurrentSlide(index)}></div>
        )
        )}
    </div>
    </div>
        </div>
        </div>
    </div>
    </section>

)
}

export default OnBoard
