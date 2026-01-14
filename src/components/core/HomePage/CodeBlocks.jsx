import { TypeAnimation } from "react-type-animation"
import CTAButton from "./CTAButton"
import HighLightText from "./HighLightText"

function CodeBlocks({position, heading, subheading, ctabtn1, ctabtn2,codeblock, backgroundGradient, codeColor}) {
  return (
    <div className={`flex ${position} my-20 justify-between flex-col lg:gap-10 gap-10`}>

        {/* section-1 [Left Section] */}
        <div className="w-[100%] lg:w-[50%] flex flex-col gap-8">

            <h1 className="text-4xl font-semibold text-white">
                {heading}
                {/* Unlock your 
                <HighLightText text={"coding potential"}></HighLightText>
                with our online courses. */}
            </h1>

            <p className="text-lg font-bold text-richblack-300">{subheading}</p>

            {/* btns */}

            <div className="mt-4 flex gap-6">
                <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>{ctabtn1.btnText}</CTAButton>

                <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>{ctabtn2.btnText}</CTAButton>
            </div>

        </div>

        {/* section-2 [Right Section] */}

        <div className="h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]">
            
             {backgroundGradient}
             {/* Indexing */}
            <div className="text-center flex flex-col   w-[10%] select-none text-richblack-400 font-inter font-bold ">
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>

            {/* Codes */}
            <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1`} >
            <TypeAnimation
                sequence={[codeblock, 1000, ""]}
                cursor={true}
                repeat={Infinity}
                style={{
                whiteSpace: "pre-line",
                display: "block",
                }}
                omitDeletionAnimation={true}
            />
            </div>

        </div>



    </div>
  )
}

export default CodeBlocks