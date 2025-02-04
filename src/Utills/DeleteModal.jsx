import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import ModalButtons from './ModalButtons';
import { TbTrashFilled } from "react-icons/tb";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const DeleteModal =() =>{
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <div>
            <Button onClick={handleOpen}>
                <TbTrashFilled size={30} color='red' />
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white border-2 border-black shadow-xl p-8 flex flex-col gap-4">
                    <p className='text-2xl font-semibold'>Та устгах үйлдэл хийх үү ?</p>
                    <ModalButtons closeModal={handleClose} />
                </Box>
            </Modal>
        </div>
    );
}
export default DeleteModal;