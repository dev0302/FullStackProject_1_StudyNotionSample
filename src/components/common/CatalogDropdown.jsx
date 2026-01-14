import React from "react";
import { NavLink } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";

const CatalogDropdown = ({ subLinks }) => {
  return (
    <div className="relative">
      {/* Hover Wrapper — handles both button + dropdown */}
      <div className="group inline-block">
        {/* Catalog Button */}
        <div className="flex gap-1 items-center cursor-pointer text-richblack-25 hover:text-yellow-50 transition">
          <p>Catalog</p>
          <FaAngleDown className="transition-transform duration-200 group-hover:rotate-180" />
        </div>

        {/* Dropdown Box */}
        <div
          className="absolute left-0 mt-2 hidden w-56 rounded-md bg-richblack-900 shadow-lg ring-1 ring-richblack-700 group-hover:block z-50"
          // Add padding top to create an invisible hover zone
          style={{ paddingTop: '10px', marginTop: '0' }}
        >
          {/* Invisible hover zone above the actual dropdown */}
          <div 
            className="absolute left-0 w-full h-4 -top-4 opacity-0"
            onMouseEnter={(e) => e.stopPropagation()}
          />
          
          {/* Actual dropdown content */}
          <ul className="py-2 text-sm text-richblack-100">
            {subLinks && subLinks.length > 0 ? (
              subLinks.map((category, index) => (
                <li key={index}>
                  <NavLink
                    to={`/catalog/${category.name
                      ?.toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="block px-4 py-2 hover:bg-richblack-800 rounded-md transition"
                  >
                    {category.name}
                  </NavLink>
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-richblack-400">
                Loading categories...
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CatalogDropdown;