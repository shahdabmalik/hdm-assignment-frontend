import { GrFormNext, GrFormPrevious } from "react-icons/gr"
import { useDispatch, useSelector } from "react-redux"
import { SET_PAGE } from "../../redux/features/leadSlice"

const Pagination = () => {

    const dispatch = useDispatch()
    const { page, totalPages } = useSelector(state => state.lead)

    const handleNext = () => {
        if (page === totalPages) return
        dispatch(SET_PAGE(page + 1))
    }
    const handlePrev = () => {
        if (page <= 1) return
        dispatch(SET_PAGE(page - 1))

    }

    return (
        <div className="w-full flex justify-center mt-4" >
            <div className="flex gap-5 items-center" >
                <button disabled={page <= 1 ? true : false} onClick={handlePrev} type="button" className={" bg-slate-100 rounded-md" + (page <= 1 ? " cursor-not-allowed  " : " hover:bg-blue-300 ")} ><GrFormPrevious size={40} /></button>
                <p className="text-xl font-semibold text-slate-600p">{page} / {totalPages}</p>
                <button disabled={page === totalPages ? true : false} onClick={handleNext} type="button" className={"bg-slate-100 rounded-md" +(page === totalPages ? " cursor-not-allowed " : " hover:bg-blue-300 ")} ><GrFormNext size={40} /></button>
            </div>
        </div>
    )
}

export default Pagination