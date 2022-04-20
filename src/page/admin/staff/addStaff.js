import Modal from 'react-modal';
import './styles.scss';

export default function AddStaff({ open, setOpen }) {
    return (
        <Modal
            isOpen={open}
            onAfterOpen={() => { }}
            onRequestClose={() => setOpen(false)}
            style={{
                overlay: {
                    background: '#ffffff14'
                },
                content: {
                    padding: 0
                }
            }}
            contentLabel="Example Modal"
        >
            {/* <button onClick={() => setOpen(false)}>close</button> */}
            <div className='add_staff'>
                <h3>Add Staff</h3>
            </div>
        </Modal>
    )
}