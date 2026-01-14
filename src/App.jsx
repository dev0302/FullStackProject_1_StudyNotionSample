import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/common/Navbar'
import Login from './pages/Login'
import Signup from './pages/SignUp'
import Error from './pages/Error'
import ForgotPassword from './pages/ForgotPassword'
import UpdatePassword from './pages/UpdatePassword'
import VerifyEmail from './pages/VerifyEmail'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import MyProfile from './components/core/DashboardPage/MyProfile'
import OpenRoute from './components/core/auth/OpenRoute'
import PrivateRoute from './components/core/auth/PrivateRoute'
import Settings from './components/core/DashboardPage/Settings'
import EnrolledCourses from './components/core/DashboardPage/EnrolledCourses'
import Wishlist from './components/core/DashboardPage/Wishlist'
import { ACCOUNT_TYPE } from './utils/constants'
import { useSelector } from 'react-redux'
import Courses from './components/core/DashboardPage/Courses'
import MyJourney from './pages/MyJourney'
import MyCourses from './components/core/DashboardPage/MyCourses'
import AddCourse from './components/core/DashboardPage/AddCourse'
import EditCourse from './components/core/DashboardPage/MyCourses/EditCourse'
import Catalog from './pages/Catalog'
import CourseDetails from './pages/CourseDetails'
import ViewCourse from './pages/ViewCourse'
import VideoDetails from './components/core/ViewCoursePage/VideoDetails'
import Contact from './pages/Contact'
import InstructorDashboard from './components/core/DashboardPage/InstructorDashboard'
import PurchaseHistory from './components/core/DashboardPage/PurchaseHistory'


function App() {

  const { user } = useSelector((state) => state.profile);
  console.log(user?.accountType);
  

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">

      <Navbar></Navbar>

      <Routes>

        
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<OpenRoute><Login></Login></OpenRoute>}></Route>
        <Route path='/signup' element={<OpenRoute><Signup></Signup></OpenRoute>}></Route>
        <Route path='/forgot-password' element={<OpenRoute><ForgotPassword></ForgotPassword></OpenRoute>}></Route>
        <Route path='/update-password/:id' element={<UpdatePassword></UpdatePassword>}></Route>
        <Route path='/verify-email' element={<VerifyEmail></VerifyEmail>}></Route>
        <Route path='/about' element={<About></About>}></Route>
        <Route path='/catalog/:catalogName' element={<Catalog></Catalog>}></Route>
        <Route path='/courses/:courseId' element={<CourseDetails></CourseDetails>}></Route>
        <Route path='/my-journey' element={<MyJourney></MyJourney>}></Route>
        <Route path='/contact' element={<Contact></Contact>}></Route>


        {/* Parent route - DashBoard */}
        <Route element={<PrivateRoute><Dashboard /></PrivateRoute>}>

          {/* Child routes - DashBoard */}
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/settings" element={<Settings />} />

          { //since there routes are only logical to the STUDENTS
            user?.accountType === ACCOUNT_TYPE.STUDENT && 
            <>
              <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
              <Route path="dashboard/wishlist" element={<Wishlist />} />
              <Route path="dashboard/courses" element={<Courses />} />
              <Route path="dashboard/purchase-history" element={<PurchaseHistory />} />
            </>
          }

          { //since there routes are only logical to the INSTRUCTORS
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && 
            <>
              <Route path="dashboard/my-courses" element={<MyCourses />} />
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
              <Route path="dashboard/instructor" element={<InstructorDashboard />} />

            </>
          }

        </Route>


        {/* Parent route - VIEW COURSE */}
        <Route element={<PrivateRoute><ViewCourse /></PrivateRoute>}>


          { //since there routes are only logical to the STUDENTS
            user?.accountType === ACCOUNT_TYPE.STUDENT && 
            <>
              <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<VideoDetails />} />
              
            </>
          }

          { //since there routes are only logical to the INSTRUCTORS
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && 
            <>
              <Route path="dashboard/my-courses" element={<MyCourses />} />
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
            </>
          }

        </Route>

        {/* For all Unvalid Routes */}
        <Route path='*' element={<Error></Error>}></Route>
        
      </Routes>

    </div>
  )
}

export default App