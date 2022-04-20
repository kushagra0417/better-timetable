import Modal from 'shared/modal';
import TextField from 'shared/textfield';
import { useState } from 'react';
import Radio from 'shared/radio';
import Button from 'shared/button';
import axios from 'axios';

export default function AddSubject({ open, setOpen, programId }) {
    const [shortName, setShortName] = useState("");
    const [longName, setLongName] = useState("");
    const [subjectType, setSubjectType] = useState(0);


    function submit() {
        const payload = {
            shortName,
            longName,
            subjectType,
            programId
        }
        console.log(payload)
        // REVIEW:
        axios.post('subject/add', payload).then((res) => {
            alert("Subject added in the database")
            setOpen(false)
        }).catch(e => {
            alert(e.response.data.err)
            setOpen(false)
     })

       
    }

    return (
        <Modal
            open={open}
            setOpen={setOpen}
            header="Add Subject">
            <TextField title='short name' type='text' name="short_name" value={shortName} onChange={setShortName} />
            <TextField title='long name' type='text' name="long_name" value={longName} onChange={setLongName} styles={{ margin: '12px 0' }} />
            <Radio title='subject type'
                options={[{ value: '1', label: 'core' }, { value: '2', label: 'elective' }]}
                name="subject-type" defaultSelected={subjectType} onChange={(e) => { setSubjectType(e) }}
            />
            <Button label='Confirm' size='medium' onClick={submit} styles={{
                marginTop: '24px'
            }} />
        </Modal>
    )

}