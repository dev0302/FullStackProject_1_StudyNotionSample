import HighLightText from "./HighLightText"
import Know_your_progress from "../../../assets/Images/Know_your_progress.png";
import Compare_with_others from "../../../assets/Images/Compare_with_others.svg";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.svg";
import CTAButton from "./CTAButton";


function LearningLanguageSection() {
  return (
    <div className="w-full flex flex-col mx-auto justify-between items-center mt-28">

        {/* texts div */}
        <div className="flex flex-col gap-4 mx-auto text-center w-[70%]">
            <h1 className="text-4xl font-semibold tracking-wide">
                Your swiss knife for
                <HighLightText text={"learning any language"}></HighLightText>
            </h1>
            <p className="text-richblack-700 font-medium leading-6 text-base">
                Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </p>
        </div>

        {/* images div */}
        <div className="flex flex-col lg:flex-row items-center justify-center mt-8 lg:mt-0">
              <img
                src={Know_your_progress}
                alt=""
                className="object-contain  lg:-mr-32 "
              />
              <img
                src={Compare_with_others}
                alt=""
                className="object-contain lg:-mb-10 lg:-mt-0 -mt-12"
              />
              <img
                src={Plan_your_lessons}
                alt=""
                className="object-contain  lg:-ml-36 lg:-mt-5 -mt-16"
              />
        </div>

        {/* btn */}
        <div className="mt-10 mb-20">
          <CTAButton active={true} linkto="/signUp">
            Learn More
          </CTAButton>
        </div>

    </div>
  )
}

export default LearningLanguageSection