import React, { useEffect, useState } from "react"
import { AiOutlineDown } from "react-icons/ai"

export default function CourseAccordionBar({ section, isActive, handleActive }) {
  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(isActive?.includes(section._id))
  }, [isActive])

  return (
    <div className="overflow-hidden border border-solid border-richblack-600 bg-richblack-700 text-richblack-5 last:mb-0">
      <div>
        <div
          className={`flex cursor-pointer items-start justify-between bg-opacity-20 px-7 py-6 transition-[0.3s]`}
          onClick={() => handleActive(section._id)}
        >
          <div className="flex items-center gap-3 font-semibold">
            <i className={active ? "rotate-180" : "rotate-0"}><AiOutlineDown /></i>
            <p>{section?.sectionName}</p>
          </div>
          <div className="space-x-4">
            <span className="text-yellow-25">{`${section.subSection.length || 0} lectures`}</span>
          </div>
        </div>
      </div>
      
      {/* Subsections (Videos) */}
      <div className={`relative h-0 overflow-hidden bg-richblack-900 transition-[height] duration-[0.35s] ease-[ease]`}
           style={{ height: active ? "auto" : "0" }}>
        {section?.subSection?.map((sub, i) => (
          <div key={i} className="flex items-center gap-3 px-7 py-4 font-semibold">
            <span>📹</span>
            <p>{sub?.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}