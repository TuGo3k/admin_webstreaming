import React from "react"
import { IoIosClose } from "react-icons/io";


const ModalHeader = ({title , closeModal}) =>{
    return(
        <div className="flex w-full justify-between">
            <h2 className="text-xl semibold">{title}</h2>
            <button onClick={closeModal}>
                <IoIosClose size={25} />
            </button>
        </div>
    )
}

export default ModalHeader;