import { useSelector } from "react-redux";
import IconBtn from "../../common/IconBtn";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { PiUserCircle } from "react-icons/pi";
import { TbGenderBigender } from "react-icons/tb";
import { MdEmail, MdPhone, MdCalendarToday } from "react-icons/md";
import { FaUserTag } from "react-icons/fa";
import { formatDate } from "../../../utils/formatDate";

function MyProfile() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);

  const { firstName, lastName, email, image, additionalDetails } = user || {};
  const { about, gender, dob, phoneNumber, createdAt } = additionalDetails || {};

  const fields = [firstName, lastName, email, image, about, gender, dob, phoneNumber];
  const filledFields = fields.filter(field => field !== null && field !== undefined && field !== "").length;
  const completionPercentage = Math.round((filledFields / fields.length) * 100);

  const profileData = [
    {
      label: "Full Name",
      value: `${firstName} ${lastName}`,
      icon: <PiUserCircle className="w-5 h-5" />,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      label: "Email",
      value: email,
      icon: <MdEmail className="w-5 h-5" />,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
    },
    {
      label: "Account Type",
      value: user?.accountType,
      icon: <FaUserTag className="w-5 h-5" />,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
    },
    {
      label: "Gender",
      value: gender,
      icon: <TbGenderBigender className="w-5 h-5" />,
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
      borderColor: "border-pink-500/20",
    },
    {
      label: "Date of Birth",
      value: dob,
      icon: <MdCalendarToday className="w-5 h-5" />,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
    },
    {
      label: "Phone Number",
      value: phoneNumber,
      icon: <MdPhone className="w-5 h-5" />,
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20",
    },
  ];

  const accountTypeColors = {
    Student: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    Instructor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Admin: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  };

  return (
    <div className="min-h-[calc(100vh-5.5rem)] w-full bg-richblack-900 text-richblack-5 antialiased p-4 sm:p-6 lg:p-10">
      <div className="mx-auto max-w-6xl flex flex-col gap-y-6 sm:gap-y-10">
        
        {/* Header Section: Stack on mobile, row on small screens up */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-richblack-5">My Profile</h1>
            <p className="text-richblack-200 text-sm sm:text-base">Manage your personal information and account details</p>
          </div>
          <IconBtn
            text="Edit Profile"
            onClick={() => navigate("/dashboard/settings")}
            customClasses="bg-yellow-50 text-richblack-900 px-5 py-2.5 rounded-xl font-bold hover:bg-yellow-100 transform active:scale-95 transition-all flex items-center gap-2 w-full sm:w-auto justify-center text-sm sm:text-base"
          >
            <FiEdit size={18} />
          </IconBtn>
        </div>

        {/* Main Content Grid: 1 col on mobile/tablet, 3 cols on large desktops */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Left Column - Profile Identity Card */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl sm:rounded-[28px] border border-richblack-700 bg-richblack-800 p-6 sm:p-8 transition-all hover:border-richblack-600 group">
              <div className="flex flex-col items-center text-center">
                
                <div className="relative mb-4 sm:mb-6">
                  <img
                    src={image || `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`}
                    alt={`profile-${firstName}`}
                    className="aspect-square w-24 sm:w-32 rounded-full object-cover border-4 border-richblack-700 group-hover:border-richblack-600 transition-colors shadow-xl"
                  />
                  <div className="absolute -bottom-1 right-1 sm:-bottom-2 sm:right-2">
                    <span className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold border shadow-sm ${accountTypeColors[user?.accountType] || "bg-richblack-700 text-richblack-50 border-richblack-600"}`}>
                      {user?.accountType || "User"}
                    </span>
                  </div>
                </div>
                
                <h2 className="text-xl sm:text-2xl font-bold text-richblack-5 mb-1">
                  {firstName} {lastName}
                </h2>
                <p className="text-richblack-300 text-xs sm:text-sm mb-6 font-medium break-all">{email}</p>
                
                <div className="w-full h-px bg-richblack-700 mb-6"></div>

                <div className="w-full space-y-4 sm:space-y-5">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-richblack-400">Member Since</span>
                    <span className="text-richblack-5 font-semibold">
                      {createdAt ? formatDate(createdAt).split(" | ")[0] : "Jan 2024"}
                    </span>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-richblack-400">Profile Completion</span>
                      <span className="text-yellow-50 font-bold">{completionPercentage}%</span>
                    </div>
                    <div className="h-2 w-full bg-richblack-900 rounded-full overflow-hidden border border-richblack-700">
                      <div 
                        style={{ width: `${completionPercentage}%` }}
                        className="h-full bg-gradient-to-r from-yellow-100 to-yellow-50 rounded-full transition-all duration-1000"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            
            {/* About Section */}
            <div className="rounded-2xl sm:rounded-[28px] border border-richblack-700 bg-richblack-800 p-6 sm:p-8 hover:border-richblack-600 transition-all">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-richblack-5">About Me</h3>
                <button onClick={() => navigate("/dashboard/settings")} className="text-richblack-200 hover:text-richblack-5 text-xs sm:text-sm font-medium flex items-center gap-2 transition-all">
                  <FiEdit size={14} /> <span>Edit</span>
                </button>
              </div>
              <div className="p-4 sm:p-6 rounded-2xl bg-richblack-900 border border-richblack-700">
                <p className={`${about ? "text-richblack-5" : "text-richblack-400 italic"} text-sm sm:text-md leading-relaxed`}>
                  {about || "No bio added yet."}
                </p>
              </div>
            </div>

            {/* Personal Details Grid: 1 col on mobile, 2 cols on tablets and up */}
            <div className="rounded-2xl sm:rounded-[28px] border border-richblack-700 bg-richblack-800 p-6 sm:p-8 hover:border-richblack-600 transition-all">
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-bold text-richblack-5">Personal Details</h3>
                <button onClick={() => navigate("/dashboard/settings")} className="text-richblack-200 hover:text-richblack-5 text-xs sm:text-sm font-medium flex items-center gap-2 transition-all">
                  <FiEdit size={14} /> <span>Edit Details</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {profileData.map((item, index) => (
                  <div key={index} className="p-4 sm:p-5 rounded-2xl border border-richblack-700 bg-richblack-900 group">
                    <div className="flex items-center gap-3 mb-2 sm:mb-3">
                      <div className={`p-1.5 sm:p-2 rounded-xl ${item.bgColor} ${item.borderColor} border`}>
                        <div className={item.color}>{item.icon}</div>
                      </div>
                      <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-richblack-200">{item.label}</p>
                    </div>
                    <p className="text-base sm:text-lg font-medium text-richblack-5 truncate">
                      {item.value || <span className="text-richblack-400 italic text-sm">Not set</span>}
                    </p>
                  </div>
                ))}
              </div>

              {/* Responsive Additional Info Boxes */}
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-richblack-700">
                <h4 className="text-base sm:text-lg font-bold text-richblack-5 mb-4">Account Status</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="p-4 rounded-xl bg-richblack-900 border border-richblack-700 flex justify-between items-center sm:block">
                    <p className="text-richblack-200 text-xs sm:text-sm">Status</p>
                    <p className="text-emerald-500 font-medium text-sm sm:text-base">Active</p>
                  </div>
                  <div className="p-4 rounded-xl bg-richblack-900 border border-richblack-700 flex justify-between items-center sm:block">
                    <p className="text-richblack-200 text-xs sm:text-sm">Email Verified</p>
                    <p className="text-emerald-500 font-medium text-sm sm:text-base">Verified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;