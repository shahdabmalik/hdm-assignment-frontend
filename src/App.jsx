import { Toaster } from "react-hot-toast"
import AddNewButton from "./components/addNewButton/AddNewButton"
import Table from "./components/table/Table"
import Pagination from "./components/pagination/Pagination"
import { useSelector } from "react-redux"


function App() {

  const { totalPages } = useSelector(state => state.lead)

  return <div className="max-w-screen-2xl min-h-screen overflow-hidden mx-auto shadow-2xl p-2 sm:p-5 xl:px-10 xl:py-5" >
    <Toaster />
    <div className="flex items-center justify-between" >
      <h3 className="text-2xl font-bold text-slate-700" >HUNT DIGITAL</h3>
      <AddNewButton />
    </div>
    <div className="mt-5 overflow-auto h-[540px] overflow-y-hidden border" >
      <Table />
    </div>
    {totalPages > 1 && <Pagination />}


  </div>
}

export default App
