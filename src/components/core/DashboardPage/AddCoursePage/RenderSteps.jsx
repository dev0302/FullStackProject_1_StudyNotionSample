// files
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import PublishCourse from "./PublishCourse/PublishCourse";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";

// react libraries
import React from "react";
import { useSelector } from "react-redux"

// icons
import { FaCheck } from "react-icons/fa"


function RenderSteps() {

  const {step} = useSelector((state)=>state.course); //initially-1 ////This pulls step from the Redux course slice, step is a number: 1, 2, or 3
  // let step = 2;
  const steps = [ //Instead of hardcoding UI three times, you: Store step metadata in an array, Loop over it to generate: step circles, connecting lines, step labels
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ]

  return (
      <>
        {/* Top row: circles + connector lines */}
        <div className="relative mb-2 flex w-full justify-center">
          {steps.map((item) => (
            <React.Fragment key={item.id}>
              <div className="flex flex-col items-center">
                <button
                  className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px]
                    ${
                      step === item.id
                        ? "border-yellow-50 bg-yellow-500 text-yellow-800"
                        : "border-richblack-700 bg-richblack-800 text-richblack-300"
                    }
                    ${step > item.id ? "bg-yellow-50 text-yellow-50" : ""}
                  `}
                >
                  {step > item.id ? (
                    <FaCheck className="font-bold text-richblack-900" />
                  ) : (
                    item.id
                  )}
                </button>
              </div>

              {item.id !== steps.length && (
                <div
                  className={`h-[calc(34px/2)] w-[25%] sm:w-[33%] border-dashed border-b-2 ${
                    step > item.id ? "border-yellow-50" : "border-richblack-500"
                  }`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Bottom row: step titles */}
        <div className="relative mb-16 flex w-full select-none justify-between">
          {steps.map((item) => (
            <React.Fragment key={item.id}>
              {/* ✅ Media Query: Adjusted min-width for mobile to prevent overlapping */}
              <div className="flex min-w-[80px] sm:min-w-[130px] flex-col items-center gap-y-2">
                <p
                  className={`text-xs sm:text-sm text-center ${
                    step >= item.id ? "text-richblack-5" : "text-richblack-500"
                  }`}
                >
                  {item.title}
                </p>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Render component based on step */}
        {step === 1 && <CourseInformationForm />}
        {step === 2 && <CourseBuilderForm />}
        {step === 3 && <PublishCourse />}
      </>
  );

}

export default RenderSteps;