import { NavLink } from "react-router-dom";

function CTAButton({children, active, linkto}) {
  return (
    <NavLink to={linkto}>
        <button className={`text-[15px] px-6 py-3 text-center rounded-md font-bold ${active ? "bg-yellow-50 text-black" : "bg-richblack-800 drop-shadow-[1.5px_1.5px_rgba(255,255,255,0.25)] text-white"} hover:scale-95 transition-all duration-200 `}>
            {children}
        </button> 
    </NavLink>
  )
}

export default CTAButton;