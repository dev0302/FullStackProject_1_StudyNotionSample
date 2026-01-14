import { useSelector } from "react-redux";
import ChangeProfilePicture from "./SettingsPage/ChangeProfilePicture"
import ProfileInformation from "./SettingsPage/ProfileInformation";
import UpdatePassword from "./SettingsPage/UpdatePassword";
import DeleteAccount from "./SettingsPage/DeleteAccount";

function Settings() {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading, user } = useSelector((state) => state.profile);

  if (authLoading || profileLoading || !user) {
    return (
      <div className="flex h-[calc(100vh-10rem)] w-full items-center justify-center">
        {/* Using the smooth theme spinner logic */}
        <div className="w-12 h-12 border-4 border-richblack-700 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    /* ✅ Added responsive padding and background consistency */
    <div className="flex min-h-screen w-full justify-center bg-[#000814] pb-20 px-4 sm:px-6 lg:px-10">
      <div className="w-full max-w-[1000px] my-10 flex flex-col gap-y-10">
        
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter text-white text-center sm:text-left">
          Edit Profile
        </h1>

        {/* ✅ Grouping settings sections with consistent spacing */}
        <div className="flex flex-col gap-y-10">
          <ChangeProfilePicture />
          <ProfileInformation />
          <UpdatePassword />
          <DeleteAccount />
        </div>
      </div>
    </div>
  );
}

export default Settings