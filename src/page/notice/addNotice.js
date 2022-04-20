import Modal from 'shared/modal';
import { useState } from 'react';
import Button from 'shared/button';
import TextArea from 'shared/textarea';
import axios from "axios";


export default function AddNotice({ open, setOpen, setReload }) {
    const [content, setContent] = useState("");


    async function submit() {
        axios.post('/notice/add', {
            body: content,
        }).then(() => {
            alert("Notice added to the Database");
            setOpen(false);
            setReload(r => !r)
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
            <TextArea rows={16} title='content' name="content" value={content} onChange={setContent} styles={{ margin: '12px 0' }} />
            <Button label='Confirm' size='medium' onClick={submit} styles={{
                marginTop: '24px'
            }} />
        </Modal>
    )

}