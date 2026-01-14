import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../common/Spinner";
import { sidebarLinks } from "../../../data/dashboard-links";
import ConfirmationModal from "../../common/ConfirmationModal";
import { useState } from "react";
import { VscSignOut } from "react-icons/vsc";
import SidebarLink from "./SidebarLink";
import { logout } from "../../../services/operations/authAPI";
import { useNavigate } from "react-router-dom";

function Sidebar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading: authLoading } = useSelector((state) => state.auth);
    const { user, loading: profileLoading } = useSelector((state) => state.profile);
    
    const [confirmationModal, setConfirmationModal] = useState(null);

    if (profileLoading || authLoading) {
        return (
            <div className="grid h-[calc(100vh-5.5rem)] min-w-[60px] md:min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800 transition-all duration-300">
                <Spinner />
            </div>
        )
    }

    return (
        <div className="flex h-[calc(100vh-5.5rem)] min-w-[60px] md:min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10 transition-all duration-300">
            
            {/* Top Links Section */}
            <div className="flex flex-col">
                {sidebarLinks.map((link) => {
                    if (link.type && user?.accountType !== link.type) return null;
                    return (
                        <SidebarLink link={link} key={link.id} />
                    )
                })}
            </div>

            {/* Horizontal Line */}
            <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />

            {/* Bottom Section (Settings & Logout) */}
            <div className="flex flex-col">
                <SidebarLink 
                    link={{ name: "Settings", icon: "VscSettingsGear", path: "/dashboard/settings" }} 
                />

                <button
                    onClick={() => setConfirmationModal({
                        text1: "Are you sure?",
                        text2: "You will be logged out of your account.",
                        btn1Text: "Logout",
                        btn2Text: "Cancel",
                        btn1Handler: () => dispatch(logout(navigate)),
                        btn2Handler: () => setConfirmationModal(null),
                    })}
                    className="px-4 md:px-8 py-2 text-sm font-medium text-richblack-300 transition-all duration-300 hover:bg-richblack-700 hover:text-richblack-5"
                >
                    <div className="flex items-center justify-center md:justify-start gap-x-2">
                        <VscSignOut className="text-xl md:text-lg" />
                        <span className="hidden md:block">Logout</span>
                    </div>
                </button>
            </div>

            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    )
}

export default Sidebar;