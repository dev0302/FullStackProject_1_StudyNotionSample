import HighLightText from "./HighLightText"
import Know_your_progress from "../../../assets/Images/Know_your_progress.png";
import Compare_with_others from "../../../assets/Images/Compare_with_others.svg";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.svg";
import CTAButton from "./CTAButton";


function LearningLanguageSection() {
  return (
    <div className="w-full flex flex-col mx-auto justify-between items-center mt-16 lg:mt-28">

        {/* texts div */}
        <div className="flex flex-col gap-3 lg:gap-4 mx-auto text-center w-full lg:w-[70%] px-4">
            <h1 className="text-3xl lg:text-4xl font-semibold tracking-wide">
                Your swiss knife for
                <HighLightText text={"learning any language"}></HighLightText>
            </h1>
            <p className="text-richblack-700 font-medium leading-6 text-sm lg:text-base max-w-[90%] lg:max-w-none mx-auto">
                Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </p>
        </div>

        {/* images div */}
        {/* On mobile: items stack vertically. On desktop: they overlap horizontally */}
        <div className="flex flex-col lg:flex-row items-center justify-center mt-10 lg:mt-0">
              <img
                src={Know_your_progress}
                alt="Know your progress"
                className="object-contain lg:-mr-32 w-[80%] lg:w-auto"
              />
              <img
                src={Compare_with_others}
                alt="Compare with others"
                
                className="object-contain lg:-mb-10 lg:-mt-0 -mt-20 lg:-ml-0 w-[85%] lg:w-auto"
              />
              <img
                src={Plan_your_lessons}
                alt="Plan your lessons"
                className="object-contain lg:-ml-36 lg:-mt-5 -mt-24 lg:-mr-0 w-[85%] lg:w-auto"
              />
        </div>

        {/* btn */}
        <div className="mt-8 lg:mt-10 mb-10 lg:mb-20">
          <CTAButton active={true} linkto="/signUp">
            Learn More
          </CTAButton>
        </div>

    </div>
  )
}

export default LearningLanguageSection