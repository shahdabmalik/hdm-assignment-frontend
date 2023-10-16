import { format } from "date-fns"
import EditButton from "../editButton/EditButton"
import DeleteButton from "../deleteButton/DeleteButton"


const TableRow = ({ lead, index }) => {

    const startDate = new Date(parseInt(lead?.startDate))
    const endDate = new Date(parseInt(lead?.endDate))
    const monthYear = format(startDate, 'MMM-yyy')
    const excludedDates = lead?.excludedDates?.map((d) => new Date(parseInt(d)))
    const timeDiff = endDate.getTime() - startDate.getTime()
    const numOfDays = (timeDiff / (1000 * 3600 * 24)) - lead?.excludedDates.length
    const leads = lead?.leads
    const ddr = Math.ceil(leads / numOfDays)
    const updatedAt = new Date(lead?.updatedAt)


    return (
        <tr className="h-12 border-b text-slate-600 font-medium text-center">
            <td className="border-r px-2 text-center">{index}</td>
            <td className="border-r px-2">{format(startDate, 'dd-MMM-yyyy')}</td>
            <td className="border-r px-2">{format(endDate, 'dd-MMM-yyyy')}</td>
            <td className="border-r px-2">{monthYear}</td>
            <td className=" px-2 border-r overflow-x-auto overflow-y-hidden flex h-12 w-[200px] xl:w-[300px] 2xl:w-[400px] items-center"><div className="flex flex-grow gap-1">{excludedDates.map((d) => <p className="w-[80px]" key={d} >{format(d, 'dd-MM-yy,')}</p>)}</div></td>
            <td className="border-r px-2">{numOfDays}</td>
            <td className="border-r px-2">{leads}</td>
            <td className="border-r px-2">{ddr}</td>
            <td className="border-r px-2">{format(updatedAt, 'HH:mm - dd MMM ')}</td>
            <td className="px-2 " > <div className="flex gap-2 items-center justify-center"><EditButton startDate={startDate} endDate={endDate} excludedDates={excludedDates} leads={leads} id={lead?._id} /> <DeleteButton id={lead?._id} /> </div></td>
        </tr>
    )
}

export default TableRow