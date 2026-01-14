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
    <div className="w-full flex mx-auto justify-between gap-28 items-center mt-20">

        {/* left section */}
        <div className="w-[40%] flex flex-col gap-6">

          {
            TimeLine.map((ele,i)=>{
              return (
                <div className="flex flex-col lg:gap-3" key={i}>
                  <div className="flex gap-6" key={i}>
                    <div className="w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]">
                      <img src={ele.Logo} alt="" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-[18px]">{ele.Heading}</h2>
                      <p className="text-base">{ele.Description}</p>
                    </div>
                  </div>
                  <div
                    className={`hidden ${
                      TimeLine.length - 1 === i ? "hidden" : "lg:block"
                    }  h-14 border-dotted border-r border-richblack-100 bg-richblack-400/0 w-[26px]`}></div>
              </div>
              )
              
            })
          }

        </div>


        {/* right section */}
        <div className="w-[60%] relative shadow-blue-200 shadow-[0px_0px_30px_0px]">

          <img src={TimeLineImage} alt="nf" className="shadow-[20px_20px_rgba(255,255,255)] " />

          <div className="absolute flex bg-caribbeangreen-700 text-white py-8 w-11/12 left-[50%] translate-x-[-50%] translate-y-[-50%] justify-center">

            <div className="flex gap-16 items-center border-r border-caribbeangreen-300 px-12">
              <p className="text-3xl font-bold">10</p>
              <p className="text-caribbeangreen-300 uppercase max-w-24">Years Experiences</p>
            </div>

            <div className="flex gap-16 items-center px-12">
              <p className="text-3xl font-bold">250</p>
              <p className="text-caribbeangreen-300 uppercase max-w-24">types of courses</p>
            </div>
            

          </div>



        </div>

    </div>
  )
}

export default TimeLineSection