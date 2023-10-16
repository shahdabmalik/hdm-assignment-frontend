import { MdDelete } from 'react-icons/md'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { SET_LEAD, SET_TOTAL_PAGES } from '../../redux/features/leadSlice'

const backendUrl = import.meta.env.VITE_BACKEND_URL


const DeleteButton = ({ id }) => {

    const dispatch = useDispatch()

    // model dialogue
    const [isOpen, setIsOpen] = useState(false)
    function closeModal() {
        setIsOpen(false)
    }
    function openModal() {
        setIsOpen(true)
    }
    // delete handler
    const handleDelete = async () => {
        try {
            const response = await fetch(`${backendUrl}/api/leads/${id}`, {
                method: "DELETE"
            })
            if (response.ok) {
                const result = await response.json()
                dispatch(SET_LEAD(result))
                dispatch(SET_TOTAL_PAGES(Math.ceil(result.length / 10)))
                toast.success('Lead Deleted')
                closeModal()
            } else {
                const result = await response.json()
                toast.error(result.message)
            }
        } catch (error) {
            toast.error("Error Occured")
            console.log(error);
        }
    }

    return (
        <>
            <button onClick={openModal} type='button' className='hover:bg-red-500 bg-slate-100 text-slate-800 hover:text-white p-1 rounded-md ' ><MdDelete size={26} /></button>
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
                        <div className="fixed inset-0 bg-white backdrop-blur bg-opacity-75" />
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
                                <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-md bg-white p-5 align-middle shadow-xl transition-all">
                                    <div className='text-start' >
                                        <h3 className='text-2xl font-bold text-red-600 border-b pb-1' >Delete Lead</h3>
                                        <p className='mt-2 text-lg font-medium' >Are you sure, you want to delete?</p>
                                        <div className='flex gap-2 items-center mt-4 justify-end' >
                                            <button onClick={() => closeModal()} className='bg-slate-500 hover:bg-slate-600 text-white font-medium h-10 w-20 rounded' type='button' >Cancel</button>
                                            <button onClick={handleDelete} className='bg-red-500 hover:bg-red-600 text-white font-medium h-10 w-20 rounded' type='button' >Delete</button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default DeleteButton