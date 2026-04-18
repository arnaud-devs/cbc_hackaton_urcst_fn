const Stepper = ({
  steps,
  currentStep,
  setCurrentStep,
}: {
  steps: Array<string>;
  currentStep: number;
  setCurrentStep: (value: number) => void;
}) => {
  return (
    <div className="flex items-center w-full">
      {steps.map((step, index) => (
        <>
          <div
            key={index + "item"}
            onClick={() => setCurrentStep(index + 1)}
            className="relative"
          >
            <span className="absolute -top-4 sm:-top-5 w-7 sm:w-8 md:w-9 lg:w-10 flex justify-center text-center text-nowrap text-[.8rem] md:text-[.9rem]">
              {step}
            </span>
            <div>
              <div
                className={`${
                  currentStep - 1 >= index
                    ? "bg-primary delay-[50ms]"
                    : "bg-gray-400/90"
                } cursor-pointer hover:bg-gray-500/90 duration-200 flex items-center justify-center rounded-full text-white  size-7 sm:size-8 md:size-9 lg:size-10 md text-sm `}
              >
                {index + 1}
              </div>
            </div>
          </div>
          {index !== steps.length - 1 && (
            <div
              key={index + "sep"}
              className={`${
                currentStep - 1 >= index + 1
                  ? "bg-primary"
                  : "bg-gray-400/90 delay-100"
              } h-[3px] sm:h-[4px] md:h-[5px] duration-100 lg:h-[6px] w-full bg-gray-400/90 -mx-[.03rem]`}
            />
          )}
        </>
      ))}
    </div>
  );
};

export default Stepper;
