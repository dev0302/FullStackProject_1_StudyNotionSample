import IconBtn from "./IconBtn"

function ConfirmationModal({modalData}) {
    
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
        <div className="w-11/12 max-w-[350px] rounded-xl border-2 border-sky-300/50 bg-richblack-800 p-6 shadow-lg shadow-sky-500/10">

            {/* heading */}
            <p className="text-2xl font-semibold text-richblack-5">
                {modalData.text1}
            </p>

            {/* para below it*/}
            <p className="mt-3 mb-5 leading-6 text-richblack-200">
                {modalData.text2}
            </p>

            {/* now buttons */}
            <div className="flex items-center justify-center gap-20">
                {/* now since one button works dynamically, creating usable component of it */}
                <IconBtn 
                    onClick={modalData?.btn1Handler} //2️⃣ What problem does ?. solve? It prevents your app from crashing when modalData is null or undefined

                    text={modalData?.btn1Text}
                >
                </IconBtn>

                {/* cancel btn (normal) */}

                <button onClick={modalData?.btn2Handler} 
                className="flex-1 py-2 px-5 rounded-md font-medium bg-gray-800 hover:bg-gray-700 transition-colors text-gray-200 text-lg">
                    {modalData?.btn2Text}
                </button>

            </div>

        </div>
    </div>
  )
}

export default ConfirmationModal;