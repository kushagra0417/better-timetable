import { useState } from "react";
import Button from "shared/button";
import TextField from "shared/textfield";
import { FaPlus } from 'react-icons/fa';
import Programmes from "./programmes";
import './styles.scss';
import StaffList from "./staff/list";
import Modal from "shared/modal";
import axios from "axios";


export default function Main() {
    const [openAddProgram, setOpenAddProgram] = useState(false);

    return (
        <main>
            <div className='top'>
                <div className='meta'>
                    {/* <p>Wednesday, 24 June</p> */}
                    <h2>Admin Dashboard</h2>
                </div>
                <div className="actions">
                    <Button label="Add New Program" icon={<FaPlus />} onClick={() => setOpenAddProgram(true)} />
                </div>
            </div>
            <div className="admin-dashboard">
                <Programmes />
                <StaffList />
            </div>
            <AddNewProgram open={openAddProgram} setOpen={setOpenAddProgram} />
        </main>
    );
}


function AddNewProgram({ open, setOpen }) {

    const [shortName, setShortName] = useState('');
    const [longName, setLongName] = useState('');

    async function submit() {
        const payload = {
            shortName,
            longName,
        };
        const response = await axios.post('/program/add', payload).then((res) => {
            alert("Program Added to the course")
            setOpen(false)
        }).catch(e => {
            alert(e.response.data.err)
            setOpen(false)
        })
        console.log(response);
    }

    return (
        <Modal header="Add new Program" open={open} setOpen={setOpen}>
            <TextField title='short name' type='text' name="short_name" value={shortName} onChange={setShortName} />
            <TextField title='long name' type='text' name="long_name" value={longName} onChange={setLongName} styles={{ margin: '12px 0' }} />
            <Button label='Confirm' size='medium' onClick={submit} styles={{
                marginTop: '24px'
            }} />
        </Modal>
    )
}