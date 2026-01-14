import { NavLink, useNavigate } from "react-router-dom"
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import { useSelector } from "react-redux"
import { AiOutlineMenu, AiOutlineShoppingCart, AiOutlineSearch, AiOutlineClose } from "react-icons/ai"
import { VscSettingsGear, VscChevronDown } from "react-icons/vsc"; 
import { useEffect, useState } from "react"
import { apiConnector } from "../../services/apiconnector"
import { categories } from "../../services/api"
import ProfileDropDown from "../core/HomePage/ProfileDropDown"
import CatalogDropdown from "./CatalogDropdown"
import { ACCOUNT_TYPE } from "../../utils/constants"

function Navbar() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [open, setOpen] = useState(false); 
  const [isCatalogOpen, setIsCatalogOpen] = useState(false); 

  useEffect(() => {
    const fetchCategorySublinks = async () => {
      try {
        const result = await apiConnector("GET", categories.CATEGORIES_API);
        setSubLinks(result.data.data)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
    }
    fetchCategorySublinks();
  }, []);

  return (
    <div className="flex h-16 sm:h-20 items-center justify-center bg-richblack-900 border-b border-richblack-800 transition-all duration-300 relative z-[1000]">
      <div className="w-11/12 flex justify-between items-center max-w-maxContent">
        
        {/* LOGO - Scaled for mobile */}
        <NavLink to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0">
          <img src={logo} alt="Logo" className="h-7 sm:h-9 w-auto object-contain" />
        </NavLink>

        {/* DESKTOP NAV (Hidden on Mobile) */}
        <nav className="hidden lg:flex items-center bg-[#161D29] border border-richblack-700 rounded-full px-2 py-1.5 shadow-2xl">
          <div className={`relative flex items-center gap-2 px-4 py-1 border-r border-richblack-700 mr-2 transition-all duration-500 ease-in-out ${isFocused ? "bg-white/[0.03]" : "bg-transparent"}`}>
            <AiOutlineSearch className={`${isFocused ? "text-white" : "text-richblack-200"}`} />
            <input 
              type="text" 
              placeholder={isFocused ? "this feature is under construction..." : "Search..."}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="bg-transparent border-none focus:ring-0 focus:outline-none text-sm text-richblack-5 w-40"
            />
          </div>
          <ul className="flex gap-x-4 pr-4">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? <CatalogDropdown subLinks={subLinks} /> : (
                  <NavLink to={link?.path} className={({isActive}) => `text-sm font-medium px-3 py-1 rounded-full ${isActive ? "text-white bg-richblack-700" : "text-richblack-200"}`}>{link.title}</NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* RIGHT SIDE ACTIONS */}
        <div className="flex items-center gap-x-2 sm:gap-x-3">
          
          {/* Create Button: Instructor Only, Hidden on small mobile */}
          {token && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <button 
              onClick={() => navigate("/dashboard/add-course")} 
              className="hidden md:block bg-richblack-50 text-richblack-900 px-4 sm:px-5 py-2 rounded-full font-bold text-xs sm:text-sm hover:scale-95 transition-all"
            >
              Create
            </button>
          )}

          {/* ICON CLUSTER - Tightened for real phone screens */}
          <div className="flex items-center gap-x-0.5 sm:gap-x-1.5 bg-richblack-800/50 p-1 sm:p-1.5 rounded-full border border-richblack-700 shrink-0">
            
            {/* 🛒 Cart */}
            {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
              <NavLink to="/dashboard/wishlist" className="p-1.5 sm:p-2 text-richblack-200 hover:text-white hover:bg-richblack-700 rounded-full transition-all relative shrink-0">
                <AiOutlineShoppingCart className="text-lg sm:text-xl" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 grid h-4 w-4 place-items-center rounded-full bg-pink-200 text-[10px] text-richblack-900 font-bold">
                    {totalItems}
                  </span>
                )}
              </NavLink>
            )}

            {/* ⚙️ Settings - Forced visibility with shrink-0 */}
            {token && (
              <NavLink to="/dashboard/settings" className="p-1.5 sm:p-2 text-richblack-200 hover:text-white hover:bg-richblack-700 rounded-full transition-all shrink-0">
                <VscSettingsGear className="text-lg sm:text-xl" />
              </NavLink>
            )}

            {/* 👤 Profile / Auth Buttons */}
            {token === null ? (
              <div className="hidden md:flex items-center gap-x-2 ml-1">
                <NavLink to="/login" className="text-sm font-medium text-richblack-100 px-2 sm:px-4">Log in</NavLink>
                <NavLink to="/signup" className="bg-richblack-700 text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium">Sign up</NavLink>
              </div>
            ) : (
              <div className="pl-0.5 sm:pl-1 shrink-0">
                <ProfileDropDown />
              </div>
            )}
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button 
            className="lg:hidden p-1 sm:p-2 text-richblack-200 hover:text-white transition-colors shrink-0" 
            onClick={() => setOpen(true)}
          >
            <AiOutlineMenu className="text-2xl sm:text-[28px]" />
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER OVERLAY */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden z-[2000]" 
          onClick={() => setOpen(false)}
        />
      )}

      {/* MOBILE DRAWER CONTENT */}
      <div className={`fixed top-0 right-0 h-full w-[280px] z-[3000] p-6 flex flex-col transition-transform duration-500 ease-in-out lg:hidden
        bg-richblack-900 border-l border-white/10 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]
        ${open ? "translate-x-0" : "translate-x-full"}`}>
        
        <div className="flex items-center justify-between mb-8">
          <img src={logo} alt="Logo" className="h-6 w-auto object-contain" />
          <button onClick={() => setOpen(false)} className="text-richblack-200 text-2xl hover:text-pink-200">
            <AiOutlineClose />
          </button>
        </div>

        <div className="flex flex-col gap-y-1">
          {/* Mobile Search - Added here to clear space from main navbar */}
          <div className="flex items-center gap-2 px-4 py-2 bg-richblack-800 rounded-lg mb-4 border border-richblack-700">
             <AiOutlineSearch className="text-richblack-200" />
             <input type="text" placeholder="Search..." className="bg-transparent text-sm text-richblack-5 focus:outline-none w-full" />
          </div>

          {NavbarLinks.map((link, index) => (
            <div key={index} className="w-full">
              {link.title === "Catalog" ? (
                <div className="flex flex-col">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setIsCatalogOpen(!isCatalogOpen); }}
                    className="flex w-full items-center justify-between py-3 text-lg text-richblack-200"
                  >
                    <p>{link.title}</p>
                    <VscChevronDown className={`transition-transform duration-300 ${isCatalogOpen ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`flex flex-col gap-y-2 overflow-hidden transition-all duration-300 px-4 bg-richblack-800/50 rounded-lg ${isCatalogOpen ? "max-h-[500px] py-3 my-2" : "max-h-0"}`}>
                    {subLinks?.map((subLink, i) => (
                      <NavLink key={i} to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`} onClick={() => setOpen(false)} className="text-base text-richblack-300 py-1.5">{subLink.name}</NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink to={link?.path} onClick={() => setOpen(false)} className="block py-3 text-lg text-richblack-200 border-b border-white/5">{link.title}</NavLink>
              )}
            </div>
          ))}
          
          {token && (
            <NavLink to="/dashboard/settings" onClick={() => setOpen(false)} className="text-lg text-richblack-200 py-3 flex items-center gap-2 border-b border-white/5">
              <VscSettingsGear /> Settings
            </NavLink>
          )}
        </div>

        {token === null && (
           <div className="flex flex-col gap-y-3 mt-auto">
              <NavLink to="/login" onClick={() => setOpen(false)} className="text-center bg-richblack-800 text-white py-3 rounded-lg border border-white/10">Log in</NavLink>
              <NavLink to="/signup" onClick={() => setOpen(false)} className="text-center bg-yellow-50 text-black py-3 rounded-lg font-bold">Sign up</NavLink>
           </div>
        )}
      </div>
    </div>
  )
}

export default Navbar;