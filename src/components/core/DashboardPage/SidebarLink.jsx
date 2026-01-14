import * as Icons from "react-icons/vsc"
import { useSelector } from "react-redux";
import { matchPath, NavLink, useLocation } from "react-router-dom";

function SidebarLink({ link }) {
  const Icon = Icons[link.icon];
  const location = useLocation();
  const { totalItems } = useSelector((state) => state.cart);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  }

  return (
    <NavLink
      to={link.path}
      className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 md:px-8
        ${matchRoute(link.path) 
          ? "bg-richblack-700 text-yellow-50" 
          : "bg-opacity-0 text-richblack-300"}
        hover:bg-richblack-700 hover:text-richblack-5`}
    >
      {/* Active Indicator */}
      <span
        className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 transition-all duration-300 ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0"
        }`}
      ></span>

      <div className="flex items-center justify-center md:justify-start gap-x-2">
        {/* Icon: Always visible */}
        <Icon className="text-xl md:text-lg" />

        {/* Name: Hidden on mobile (below 768px), visible on medium screens up */}
        <span className="hidden md:block">{link.name}</span>

        {/* Wishlist Badge: Re-positioned for icon-only view */}
        {link.name === "Wishlist" && totalItems > 0 && (
          <span className="absolute right-1 top-1 md:relative md:right-0 md:top-0 flex h-4 w-4 items-center justify-center">
            <span
              key={totalItems}
              className="absolute inline-flex h-full w-full rounded-full bg-yellow-100 opacity-75"
              style={{ animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) 2' }}
            ></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-100 text-richblack-900 text-[9px] font-bold items-center justify-center shadow-[0_0_10px_rgba(255,214,10,0.5)]">
              {totalItems}
            </span>
          </span>
        )}
      </div>
    </NavLink>
  )
}

export default SidebarLink;