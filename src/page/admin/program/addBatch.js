import Modal from 'shared/modal';
import TextField from 'shared/textfield';
import { useState } from 'react';
import Button from 'shared/button';
import axios from "axios";
import Select from 'shared/select';

const divisionList = [
    { value: 1, label: 'A' },
    { value: 2, label: 'B' },
    { value: 3, label: 'C' },
    { value: 4, label: 'D' },
    { value: 5, label: 'E' },
    { value: 6, label: 'F' },
];

export default function AddBatch({ open, setOpen, programId }) {
    const [shortName, setShortName] = useState("");
    const [longName, setLongName] = useState("");
    const [division, setDivision] = useState(null);


    async function submit() {
        axios.post('/batch/add', {
            shortName,
            longName,
            divisions: division.map(d => d.label),
            programId
        }).then((res) => {
            alert("Batch Added to the Database id is=" + res.data.id)
            setOpen(false);
        }).catch(e => {
            alert(e.response.data.err);
            setOpen(false);
        })
    }

    return (
        <Modal
            open={open}
            setOpen={setOpen}
            header='Add Batch'
        >
            <TextField title='short name' type='text' name="short_name" value={shortName} onChange={setShortName} />
            <TextField title='long name' type='text' name="long_name" value={longName} onChange={setLongName} styles={{ margin: '12px 0' }} />
            <Select multiple title='divisions' options={divisionList} value={division} onChange={(e) => setDivision(e)} />
            <Button label='Confirm' size='medium' onClick={submit} styles={{
                marginTop: '24px'
            }} />
        </Modal>
    )

}