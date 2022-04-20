import MainModal from "react-modal";
import { MdClose } from 'react-icons/md';
import './styles.scss';

export default function Modal({ open, setOpen, header, children }) {
    return (
        <MainModal
            isOpen={open}
            onRequestClose={() => setOpen(false)}
            style={{
                overlay: {
                    background: 'rgb(16, 17, 19, 0.85)',
                    zIndex: 1002
                },
                content: {
                    opacity: 1,
                    top: '80px',
                    width: '600px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    height: '500px',
                    background: 'var(--background)',
                    border: 'none',
                }
            }}
            contentLabel="Modal"
        >
            <div className='header'>
                <h3>{header}</h3>
                <div className='close' onClick={() => { setOpen(false) }}><MdClose /></div>
            </div>
            <div className='modal_body'>
                {children}
            </div>
        </MainModal>
    )
}