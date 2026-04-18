import React from 'react'
import { Button } from "../../components/ui/button"
import { useIsMobile } from '@/hooks/use-mobile'
import { ArrowLeft } from 'lucide-react';
type OnboardInfo = {
  image: string
  title: string
  sub_title: string
}

type OnboardScreenProps = {
  info: OnboardInfo
  currentSlide: number
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>
  totalSlides: number
}


const OnboardScreen: React.FC<OnboardScreenProps> = ({ info, currentSlide,setCurrentSlide}) => {
const isMobile = useIsMobile()

const handleBack = () => {
    if (currentSlide > 0) {
        setCurrentSlide(prev => prev - 1)
    }
}

  return (
    <div className='w-full flex-shrink-0 flex flex-col  items-center justify-center relative'>
        {currentSlide > 0 && isMobile && (
            <Button variant='outline' className="absolute top-0 left-4 z-10 w-fit" onClick={handleBack}><ArrowLeft/></Button>
        )}
    <div className="box-border  flex flex-col gap-[17px] max-md:gap-0 items-center  w-full max-w-[600px]">
      <div className="mb-4 max-md:mb-0 bg-center bg-contain bg-no-repeat h-[350px]  max-md:h-[52vh]  shrink-0 w-full "
      style={{backgroundImage: `url('${info.image}')`}}>
      </div>
      <div className='border-box w-full px-4 pb-2'>
        <div className="mb-4 max-md:mb-2">
          <span className="block text-lg font-bold">{info.title}</span>
          <span className="block text-sm text-gray-600">{info.sub_title}</span>
        </div>
      </div>
    </div>
    </div>
  )
}

export default OnboardScreen
