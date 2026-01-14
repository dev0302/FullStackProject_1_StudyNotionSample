import TimeLineImage from "../../../assets/Images/TimelineImage.png";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";

const TimeLine = [
    {
      Logo: Logo1,
      Heading: "Leadership",
      Description: "Fully committed to the success company",
    },
    {
      Logo: Logo2,
      Heading: "Responsibility",
      Description: "Students will always be our top priority",
    },
    {
      Logo: Logo3,
      Heading: "Flexibility",
      Description: "The ability to switch is an important skills",
    },
    {
      Logo: Logo4,
      Heading: "Solve the problem",
      Description: "Code your way to a solution",
    },
  ];

function TimeLineSection() {
  return (
    <div>
      {/* Container Logic: flex-col for mobile, flex-row for desktop */}
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center mt-12 lg:mt-20 text-richblack-50">

        {/* Left Section (Timeline Content) */}
        <div className="w-full lg:w-[45%] flex flex-col gap-3 lg:gap-5 text-richblack-50">
          {
            TimeLine.map((ele, i) => {
              return (
                <div className="flex flex-col items-start" key={i}>
                  <div className="flex gap-6">
                    <div className="w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0] shrink-0">
                      <img src={ele.Logo} alt={ele.Heading} />
                    </div>
                    <div>
                      <h2 className="font-semibold text-[18px]">{ele.Heading}</h2>
                      <p className="text-base text-richblack-200">{ele.Description}</p>
                    </div>
                  </div>
                  
                  {/* Vertical Dotted Line logic */}
                  <div
                    className={`${
                      TimeLine.length - 1 === i ? "hidden" : "block"
                    } h-8 lg:h-14 border-dotted border-r border-richblack-100 bg-richblack-400/0 w-[26px] my-1`}>
                  </div>
                </div>
              )
            })
          }
        </div>

        {/* Right Section (Image & Floating Badge) */}
        <div className="w-full lg:w-[55%] relative shadow-blue-200 shadow-[0px_0px_30px_0px]">
          
          {/* Main Image - Adjusted shadow for mobile */}
          <img 
            src={TimeLineImage} 
            alt="Timeline Image" 
            className="shadow-white shadow-[10px_10px_0_0] lg:shadow-[20px_20px_0_0] object-cover h-fit rounded-md" 
          />

          {/* Green Floating Badge - Responsive Layout */}
          <div className="absolute bg-caribbeangreen-700 flex flex-col sm:flex-row text-white py-5 lg:py-10 left-[50%] translate-x-[-50%] translate-y-[-50%] w-[90%] lg:w-fit lg:min-w-[500px] justify-center items-center rounded-sm">
            
            {/* Stat 1 */}
            <div className="flex gap-5 items-center border-b sm:border-b-0 sm:border-r border-caribbeangreen-300 px-7 lg:px-14 py-3 sm:py-0">
              <p className="text-2xl lg:text-3xl font-bold">10</p>
              <p className="text-caribbeangreen-300 text-xs lg:text-sm uppercase max-w-[75px] leading-tight">
                Years Experiences
              </p>
            </div>

            {/* Stat 2 */}
            <div className="flex gap-5 items-center px-7 lg:px-14 py-3 sm:py-0">
              <p className="text-2xl lg:text-3xl font-bold">250</p>
              <p className="text-caribbeangreen-300 text-xs lg:text-sm uppercase max-w-[75px] leading-tight">
                types of courses
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default TimeLineSection