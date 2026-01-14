import RenderSteps from './AddCoursePage/RenderSteps'

function AddCourse() {

  return (

    /* ✅ FIX: min-h-screen allows the page to grow. Removed h-full. 
       Used items-start so components don't stretch to fill height inappropriately. */
    <div className='flex min-h-screen w-full justify-center mx-auto flex-col-reverse lg:flex-row items-start gap-y-8 lg:gap-y-0'>

        <div className="w-11/12 lg:w-7/12 mt-8 flex flex-col gap-8 mx-auto lg:mx-0">



            <h2 className="mb-4 text-3xl font-medium text-richblack-5 text-center lg:text-left">Add Course</h2>
        

            <div className="relative">

                <RenderSteps></RenderSteps>

            </div>



            {/* end div for bottom space */}

            <div className="p-10 lg:p-2"></div>


        </div>

        {/* ✅ FIX: Changed from flex-1 to static/relative on mobile to allow natural scrolling.
           Only apply sticky on desktop (lg:sticky) if you want it to follow the scroll. */}
        <div className='lg:ml-4 mt-8 w-11/12 lg:w-3/12 mx-auto lg:mx-0 lg:sticky lg:top-10 lg:h-fit'>

            <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">

            <p className="mb-8 text-lg text-richblack-25">⚡ Course Upload Tips</p>

            <ul className="ml-5 list-item list-disc space-y-3 text-xs text-richblack-25">

                <li>Set the Course Price option or make it free.</li>

                <li>Standard size for the course thumbnail is 1024x576.</li>

                <li>Video section controls the course overview video.</li>

                <li>Course Builder is where you create & organize a course.</li>

                <li>

                Add Topics in the Course Builder section to create lessons,

                quizzes, and assignments.

                </li>

                <li>

                Information from the Additional Data section shows up on the

                course single page.

                </li>

                <li>Make Announcements to notify any important</li>

                <li>Notes to all enrolled students at once.</li>

            </ul>

            </div>

        </div>

    </div>

  )

}



export default AddCourse