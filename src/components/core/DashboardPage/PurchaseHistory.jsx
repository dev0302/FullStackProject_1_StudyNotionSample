import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserPurchaseHistory } from '../../../services/operations/profileAPI'

export default function PurchaseHistory() {
    const { token } = useSelector((state) => state.auth)
    const [history, setHistory] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchHistory = async () => {
            setLoading(true)
            try {
                const res = await getUserPurchaseHistory(token)
                if (res) {
                    setHistory(res)
                }
            } catch (error) {
                console.log("Could not fetch purchase history", error)
            }
            setLoading(false)
        }
        fetchHistory()
    }, [token])

    // Helper to format Date: "14 Jan 2026"
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' }
        return new Date(dateString).toLocaleDateString('en-US', options)
    }

    return (
        <div className="mx-auto w-11/12 max-w-[1000px] py-6 sm:py-10">
            <h1 className="mb-6 sm:mb-8 text-2xl sm:text-3xl font-medium text-richblack-5">Purchase History</h1>

            {loading ? (
                <div className="grid h-[50vh] place-items-center">
                    <div className="w-12 h-12 border-4 border-richblack-700 border-t-yellow-50 rounded-full animate-spin"></div>
                </div>
            ) : history && history.length > 0 ? (
                <div className="flex flex-col gap-y-4">
                    
                    {/* 🖥️ Desktop Table View (Hidden on Mobile) */}
                    <div className="hidden md:block overflow-hidden rounded-2xl border border-richblack-700 bg-richblack-800 shadow-lg">
                        <table className="w-full text-left">
                            <thead className="bg-richblack-700 text-sm font-semibold uppercase tracking-wider text-richblack-200">
                                <tr>
                                    <th className="px-6 py-4">Course(s)</th>
                                    <th className="px-6 py-4">Purchase Date</th>
                                    <th className="px-6 py-4">Amount</th>
                                    <th className="px-6 py-4 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-richblack-700 text-richblack-5">
                                {history.map((payment) => (
                                    <tr key={payment._id} className="transition-all duration-200 hover:bg-richblack-900/40">
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col gap-1">
                                                {payment.courses?.map((course, i) => (
                                                    <span key={i} className="text-sm font-medium">
                                                        {course?.courseName || "Deleted Course"}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-sm text-richblack-300">
                                            {formatDate(payment.createdAt)}
                                        </td>
                                        <td className="px-6 py-5 font-bold text-yellow-50">
                                            ₹ {payment.amount}
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <span className="rounded-full bg-caribbeangreen-900/30 px-3 py-1 text-xs font-bold text-caribbeangreen-200 border border-caribbeangreen-700">
                                                Successful
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* 📱 Mobile Card View (Hidden on Desktop) */}
                    <div className="flex flex-col gap-4 md:hidden">
                        {history.map((payment) => (
                            <div key={payment._id} className="rounded-xl border border-richblack-700 bg-richblack-800 p-5 flex flex-col gap-3 shadow-md">
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-col gap-1 max-w-[70%]">
                                        <p className="text-xs text-richblack-400 uppercase tracking-wider font-bold">Course(s)</p>
                                        {payment.courses?.map((course, i) => (
                                            <p key={i} className="text-sm font-semibold text-richblack-5">
                                                {course?.courseName || "Deleted Course"}
                                            </p>
                                        ))}
                                    </div>
                                    <span className="rounded-full bg-caribbeangreen-900/30 px-2 py-0.5 text-[10px] font-bold text-caribbeangreen-200 border border-caribbeangreen-700">
                                        Success
                                    </span>
                                </div>
                                
                                <div className="h-[1px] w-full bg-richblack-700 my-1"></div>
                                
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-[10px] text-richblack-400 uppercase font-bold">Date</p>
                                        <p className="text-xs text-richblack-5">{formatDate(payment.createdAt)}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-richblack-400 uppercase font-bold">Amount</p>
                                        <p className="text-base font-bold text-yellow-50">₹ {payment.amount}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-richblack-700 bg-richblack-800 p-10 sm:p-16 text-center">
                    <p className="text-lg sm:text-xl font-medium text-richblack-300">You haven't purchased any courses yet.</p>
                </div>
            )}
        </div>
    )
}