import { useDispatch, useSelector } from "react-redux"
import ConfirmationModal from "../../../common/ConfirmationModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../../../../services/operations/settingsAPI";
import { FiTrash2 } from "react-icons/fi";

function DeleteAccount() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [confirmationModal, setConfirmationModal] = useState(null);
    const { token } = useSelector((state) => state.auth);

    const handleDeleteAccount = () => {
        setConfirmationModal({
            text1: "Delete Account?",
            text2: "This action is permanent and cannot be undone. All your data will be permanently deleted.",
            btn1Text: "Delete Account",
            btn2Text: "Cancel",
            btn1Handler: () => dispatch(deleteAccount(token, navigate)),
            btn2Handler: () => setConfirmationModal(null),
        });
    };

    return (
        <>
            {/* ✅ Responsive Layout: Column on mobile, Row on medium screens */}
            <div className="my-10 flex flex-col sm:flex-row gap-6 rounded-[28px] border border-[#450a0a]/30 bg-[#450a0a]/10 p-6 sm:p-8 sm:px-12 transition-all hover:border-[#450a0a]/60">
                
                {/* Icon Container with soft glow */}
                {/* ✅ Added centering for mobile view */}
                <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-2xl bg-[#7f1d1d]/20 border border-[#7f1d1d]/40 mx-auto sm:mx-0">
                    <FiTrash2 className="text-2xl text-[#f87171]" />
                </div>

                <div className="flex flex-col gap-y-3 flex-1 items-center sm:items-start text-center sm:text-left">
                    <h2 className="text-xl font-bold text-white tracking-tight">
                        Delete Account
                    </h2>

                    <div className="w-full lg:w-4/5 text-[#fca5a5]/80 text-sm leading-relaxed">
                        <p className="font-medium text-[#fca5a5] mb-1">Would you like to delete your account?</p>
                        <p>
                            This account may contain Paid Courses. Deleting your account is
                            permanent and will remove all the content associated with it. This action
                            cannot be recovered once initiated.
                        </p>
                    </div>

                    {/* ✅ Mobile-friendly button width */}
                    <button
                        type="button"
                        className="w-full sm:w-fit cursor-pointer rounded-xl bg-[#7f1d1d] hover:bg-[#991b1b] py-3 px-6 font-bold text-white transition-all duration-200 active:scale-95 mt-2 border border-white/5"
                        onClick={handleDeleteAccount}
                    >
                        I want to delete my account.
                    </button>
                </div>
            </div>

            {/* Modal should be rendered outside the main flow if possible, or here */}
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </>
    )
}

export default DeleteAccount