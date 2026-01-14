import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import IconBtn from "../../../common/IconBtn";
import { useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { updateDisplayPicture } from "../../../../services/operations/settingsAPI";

// idea : to also delete current image then update new one to prevent unneccessary storage being taken.
// another idea : to maintain record of all earlier uploaded pics.

function ChangeProfilePicture() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { token } = useSelector((state) => state.auth)
    const {user} = useSelector((state)=>state.profile);
    // console.log(user);
    const { firstName, lastName, contact, email, image, additionalDetails } = user || {};

    const {about} = additionalDetails || {};
    // console.log(user?.additionalDetails);

    // for loading
    const [loading, setLoading] = useState(false);
    // for image file
    const [imageFile, setImageFile] = useState(null);
    // for image preview
    const [imagePreview, setImagePreview] = useState(null);

    const[selectText, setSelectText] = useState("Select");

    // useRef is a React hook that lets you store a value that does NOT cause re-render when it changes.
    const fileInputRef = useRef(null);

    const handleSelectClick = () => {
        fileInputRef.current.click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]

        if (file) {
            setImageFile(file)
            previewFile(file)
            setSelectText(file.name)
        }
    }

    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onloadend = () => {
            setImagePreview(reader.result)
        }
    }

    const handleUploadClick = async () => {
        console.log("insdie handleuploadlcick");
        
        if (!imageFile) return toast.error("Please select an image to upload")

        try {
            setLoading(true)

            const formData = new FormData()
            formData.append("displayPicture", imageFile) //imp

            dispatch(updateDisplayPicture(token, formData))
            
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }



  return (
    <div className="rounded-[28px] border border-white/5 bg-richblack-800/40 p-6 sm:p-8 sm:px-12 transition-all hover:border-white/10">
      <div className="flex flex-col sm:flex-row items-center gap-x-6 gap-y-4">
        <div className="relative group">
          <img
            src={imagePreview || image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[70px] sm:w-[80px] rounded-full object-cover border-2 border-richblack-700 transition-all group-hover:border-white/20 shadow-lg"
          />
        </div>

        <div className="flex flex-col gap-y-3 items-center sm:items-start text-center sm:text-left">
          <p className="text-lg font-semibold text-white">Change Profile Picture</p>
          <div className="flex flex-row gap-x-3 sm:gap-x-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/jpeg, image/gif"
            />
            
            <button
              onClick={handleSelectClick}
              disabled={loading}
              className="cursor-pointer rounded-xl bg-richblack-700 py-2 px-4 sm:px-6 text-sm sm:text-base font-semibold text-richblack-50 hover:bg-richblack-600 transition-all active:scale-95 disabled:opacity-50"
            >
              {selectText.length > 12 ? `${selectText.slice(0, 12)}...` : selectText}
            </button>

            <IconBtn
              text={loading ? "Uploading..." : "Upload"}
              onClick={handleUploadClick}
              disabled={loading}
              customClasses="text-sm sm:text-base px-4 sm:px-6"
            >
              {!loading && <IoCloudUploadOutline className="text-lg" />}
            </IconBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeProfilePicture;