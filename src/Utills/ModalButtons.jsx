import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';


export default function ModalButtons({ closeModal, click, loading }) {
    return (
        <div>
            <Box sx={{ '& > button': { m: 1 }, display: 'flex', justifyContent: 'space-between' }}>
                <LoadingButton
                    size="small"
                    onClick={click}
                    endIcon={<SendIcon />}
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                    color='primary'
                >
                    Хадгалах
                </LoadingButton>
                <LoadingButton
                    size="small"
                    onClick={closeModal}
                    endIcon={<CloseIcon />}
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                    color='error'
                >
                    Буцах
                </LoadingButton>
            </Box>
        </div>
    );
}
