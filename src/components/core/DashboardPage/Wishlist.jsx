import { useSelector } from "react-redux";
import Spinner from "../../common/Spinner";
import RenderCartCourses from "./WishlistPage/RenderCartCourses";
import RenderTotalAmount from "./WishlistPage/RenderTotalAmount";


function Wishlist() {

  const {totalItems} = useSelector((state)=>state.cart);

  return (
    <div className='flex min-h-[calc(100vh-5.5rem)] w-full justify-center bg-richblack-900'>
        <div className="w-11/12 max-w-[1000px] my-8 flex flex-col gap-8">

          <h2 className="mb-4 text-3xl font-medium text-richblack-5">My Wishlist</h2>

          <div className={`h-full rounded-lg overflow-hidden ${ totalItems > 0 ? "border border-richblack-700 shadow-md" : "" }`} >

            {/* now the real mapping of coureses */}

                {
                  totalItems == 0 ? (

                    <p className="flex h-[25vh] w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-richblack-600 bg-richblack-800 text-center text-richblack-200 p-6">

                        <span className="text-lg font-medium">
                            Nothing in your wishlist yet
                        </span>
                        <span className="text-sm text-richblack-400">
                            Browse courses and add the ones you like.
                        </span>

                    </p>

                  ) :
                  (
                  
                    /* ✅ Responsive Flex logic: Column on mobile, Row on Large screens */
                    <div className="mt-4 flex flex-col items-start gap-x-10 gap-y-6 lg:flex-row p-4 lg:p-0">
                      <div className="w-full lg:w-[70%]">
                        <RenderCartCourses> </RenderCartCourses>
                      </div>
                      <div className="w-full lg:w-[30%]">
                        <RenderTotalAmount> </RenderTotalAmount>
                      </div>
                    </div>

                  )
                    
                }
          </div>
            
  

          {/* end div for bottom space */}
            
          <div className="p-2"></div>

        </div>

    </div>
  )
}

export default Wishlist;