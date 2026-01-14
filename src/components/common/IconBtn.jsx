// "its onClick here, not onclick"

function IconBtn({ text, onClick, children, disabled, outline = false, customClasses, type }) {
  
    // children allows your component to accept dynamic JSX content, making IconBtn reusable for text-only, icon-only, or mixed-content buttons.
    
  return (
    <button
        disabled={disabled}
        onClick={onClick}
        className={`flex items-center ${
          outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"
        } cursor-pointer gap-x-2 rounded-md py-2 px-4 font-semibold text-richblack-900 ${customClasses}`}
        type={type}
    >

        {children ? (
          <>
            <span className={`${outline && "text-yellow-50"}`}> 
                {text}
            </span>
            {children}

          </>

        ) : (
          <span>{text}</span>
        )}
        
      </button>
  )
}

export default IconBtn

// 2️⃣ Why children is used in IconBtn

// Your component is designed to be flexible:

// Sometimes the button has only text

// Sometimes it has text + icon

// Sometimes icon first, text later

// Instead of hardcoding an icon prop, you use children.