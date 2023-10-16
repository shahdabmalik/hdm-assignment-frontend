import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import toast from 'react-hot-toast';
import { MdCancel } from "react-icons/md"
import { useDispatch } from 'react-redux';
import { SET_LEAD, SET_TOTAL_PAGES } from '../../redux/features/leadSlice';
import { BiSolidPencil } from 'react-icons/bi'

const backendUrl = import.meta.env.VITE_BACKEND_URL


const EditButton = (props) => {

    const dispatch = useDispatch()

    const [startDate, setStartDate] = useState(props.startDate)
    const [endDate, setEndDate] = useState(props.endDate)
    const [minEndDate, setMinEndDate] = useState(null)
    const [excludedDates, setExcludedDates] = useState(props.excludedDates)
    const [leads, setLeads] = useState(props.leads)

    // model functions
    let [isOpen, setIsOpen] = useState(false)
    function closeModal() {
        setIsOpen(false)
    }
    function openModal() {
        setIsOpen(true)
    }

    useEffect(() => {
        const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
        setMinEndDate(new Date(props.startDate?.getTime() + oneDay))
    }, [props.startDate])

    // start date handler
    function handleStartDateChange(date) {
        setStartDate(date)
        const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
        setMinEndDate(new Date(date?.getTime() + oneDay))
    }
    // excluded dates handler
    function handleExcludedDates(date) {
        if (excludedDates.includes(date.getTime())) {
            setExcludedDates(excludedDates.filter((d) => d !== date.getTime()))
        } else {
            setExcludedDates([...excludedDates, date.getTime()])
        }
    }
    // remove excluded dates handler
    function removeExcludedDate(date) {
        setExcludedDates(excludedDates.filter((d) => d !== date))
    }
    // submit handler
    async function handleSubmit(e) {
        e.preventDefault()
        const data = {
            startDate: startDate?.getTime(),
            endDate: endDate?.getTime(),
            excludedDates: excludedDates?.map((d) => new Date(d).getTime()),
            leads
        }
        try {
            const response = await fetch(`${backendUrl}/api/leads/${props?.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                const result = await response.json()
                closeModal()
                setStartDate(null)
                setEndDate(null)
                setMinEndDate(null)
                setExcludedDates([])
                setLeads('')
                dispatch(SET_LEAD(result))
                dispatch(SET_TOTAL_PAGES(Math.ceil(result.length / 10)))
                toast.success('Lead added')
            } else {
                const result = await response.json()
                toast.error(result?.message)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <button onClick={openModal} type="button" className=" text-sm p-1 bg-slate-100 hover:text-white hover:bg-green-600 rounded text-slate-800" ><BiSolidPencil size={26} /></button>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-white bg-opacity-75 backdrop-blur" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform rounded-md border bg-white p-5 text-left align-middle shadow-xl transition-all">
                                    <form onSubmit={handleSubmit} >
                                        <div className='flex justify-between items-center gap-5 border-b pb-1'>
                                            <h3 className='text-2xl font-bold text-slate-800 ' >Update Lead</h3>
                                            <MdCancel size={26} className='hover:text-red-500 cursor-pointer' onClick={closeModal} />
                                        </div>
                                        <div className='mt-5 text-slate-700 flex flex-col gap-2'>
                                            <div className='flex flex-col' >
                                                <label className='font-semibold mb-1' >Start Date</label>
                                                <ReactDatePicker
                                                    dateFormat="dd/MM/yyyy"
                                                    selected={startDate}
                                                    onChange={(date) => handleStartDateChange(date)}
                                                    isClearable
                                                    showIcon
                                                    className='border w-full rounded'
                                                    required={true}
                                                    preventOpenOnFocus
                                                />
                                            </div>
                                            <div className='flex flex-col' >
                                                <label className='font-semibold mb-1' >End Date</label>
                                                <ReactDatePicker
                                                    dateFormat="dd/MM/yyyy"
                                                    selected={endDate}
                                                    onChange={(date) => setEndDate(date)}
                                                    minDate={minEndDate}
                                                    isClearable
                                                    showIcon
                                                    disabled={!startDate ? true : false}
                                                    className='border w-full rounded'
                                                    required
                                                />
                                            </div>
                                            <div className='flex flex-col' >
                                                <label className='font-semibold mb-1' >Exclude Dates</label>
                                                <div className='flex gap-2 mb-2 flex-wrap' >{excludedDates?.map(d => <p key={d} data-date={d} onClick={() => removeExcludedDate(d)} className='text-sm font-semibold border px-2 py-1 rounded cursor-pointer text-white bg-red-600' >{new Date(d).toLocaleDateString()}</p>)}</div>
                                                <ReactDatePicker
                                                    dateFormat="dd/MM/yyyy"
                                                    onChange={(date) => handleExcludedDates(date)}
                                                    minDate={startDate}
                                                    maxDate={endDate}
                                                    highlightDates={excludedDates.map(d => new Date(d))}
                                                    showIcon
                                                    disabled={!startDate || !endDate ? true : false}
                                                    className='border w-full rounded '
                                                />
                                            </div>
                                            <div className='flex flex-col' >
                                                <label className='font-semibold mb-1' >Number of Leads</label>
                                                <input className='h-9 border px-2 rounded' type='number' value={leads} onChange={(e) => setLeads(e.target.value)} required />
                                            </div>
                                            <button type='submit' className='h-9 mt-3 bg-blue-500 hover:bg-blue-600 transition-all text-white font-semibold rounded' >Submit</button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default EditButton