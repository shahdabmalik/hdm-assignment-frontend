import { useEffect } from "react"
import toast from "react-hot-toast"
import TableRow from "../tableRow/TableRow"
import { useDispatch, useSelector } from "react-redux"
import { SET_LEAD, SET_TOTAL_PAGES } from "../../redux/features/leadSlice"
const backendUrl = import.meta.env.VITE_BACKEND_URL


const Table = () => {

    const dispatch = useDispatch()
    
    const { leads, page } = useSelector(state => state.lead)
    const itemsPerPage = 10

    const startIndex = (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const pageData = leads.slice(startIndex, endIndex)

    useEffect(() => {
        async function getLeads() {
            try {
                const response = await fetch(`${backendUrl}/api/leads`)
                if (!response.ok) {
                    const result = await response.json()
                    return toast.error(result?.message)
                }
                const result = await response.json()
                dispatch(SET_LEAD(result))
                dispatch(SET_TOTAL_PAGES(Math.ceil(result.length / itemsPerPage)))
            } catch (error) {
                console.log(error);
            }
        }
        getLeads()
    }, [dispatch])

    return (
        <table className="border w-full border-collapse" >
            <thead>
                <tr className="h-12 bg-slate-50 border-b-2" >
                    <th className="border-r text-center px-2 text-slate-700 min-w-[32px]">ID</th>
                    <th className="border-r text-center px-2 text-slate-700 min-w-[128px]">Start Date</th>
                    <th className="border-r text-center px-2 text-slate-700 min-w-[128px] ">End Date</th>
                    <th className="border-r text-center px-2 text-slate-700 min-w-[110px]">Month Year</th>
                    <th className="border-r text-start px-2 text-slate-700 w-[200px] xl:w-[300px] 2xl:w-[w-400px] ">Excluded Dates</th>
                    <th className="border-r text-center px-2 text-slate-700 min-w-[60px]">Days</th>
                    <th className="border-r text-center px-2 text-slate-700 min-w-[72px]">Leads</th>
                    <th className="border-r text-center px-2 text-slate-700 min-w-[60px]">DRR</th>
                    <th className="border-r text-center px-2 text-slate-700 min-w-[128px]">Last Updated</th>
                    <th className="border-r text-center px-2 text-slate-700 min-w-[82px]">Actions</th>
                </tr>
            </thead>
            <tbody>
                {pageData?.map((lead, index) => <TableRow key={lead._id} lead={lead} index={index + 1} />)}
            </tbody>
        </table>
    )
}

export default Table