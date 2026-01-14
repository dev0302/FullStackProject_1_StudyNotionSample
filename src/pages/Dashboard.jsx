// on top, navbar
// left -> siderbar

// Why Dashboard.jsx needs BOTH
// Dashboard depends on two things:
    // Is the user authenticated?
    // Is the profile data ready?

// So Dashboard logic becomes:
    // If auth is loading → show auth loader
    // If profile is loading → show profile loader
    // If both done → render dashboard

// This gives correct UI behavior.

import { useSelector } from "react-redux"
import Spinner from "../components/common/Spinner";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/core/DashboardPage/Sidebar";

function Dashboard() {

    const {loading : authLoading} = useSelector((state)=>state.auth);
    const {loading : profileLoading} = useSelector((state)=>state.auth);

    if (profileLoading || authLoading) {
        return (
            <div className="grid min-h-[calc(100vh-5.5rem)] place-items-center">
                <Spinner></Spinner>
            </div>
        )
    }

  return (
    <div className="relative flex min-h-[calc(100vh-5rem)] w-full overflow-y-hidden">

        <Sidebar></Sidebar>

        <div className="flex-1 h-[calc(100vh-4.9rem)] overflow-auto"> 

            <div className="h-full w-full">

                <Outlet></Outlet>

                {/* <Outlet /> is the empty space where different dashboard pages are rendered, while the Sidebar stays fixed. */}

                {/* <Outlet /> renders the matched child route inside the dashboard layout while keeping shared components like Sidebar persistent. */}

            </div>

        </div>

    </div>
  )
}

export default Dashboard