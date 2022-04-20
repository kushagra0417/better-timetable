import { useEffect, useState } from "react";
import { useParams,useHistory } from 'react-router-dom';
import Button from "shared/button";
import StaffList from "./list";
import TextField from "shared/textfield";
import '../styles.scss';
import './styles.scss';
import Radio from "shared/radio";
import { validate } from 'email-validator';
import axios from "axios";

function AddStaff() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [email2, setEmail2] = useState('');
    const [role, setRole] = useState(3);
    const [noticePermission, setNoticePermission] = useState(2);
const history=useHistory()
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        setDisabled(!name || !email || !email2 || email !== email2 || !validate(email));
    }, [email, email2, name]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('./staff/add', {
                name, email, role, noticePermission
            });
            alert(response.data.id + "data added in the database")
            history.push("/dashboard")
        } catch (e) {
            alert(e.response.status + " - " + e.response.data)
        }
    }
    return (
        <main>
            <div className='top'>
                <div className='meta'>
                    <h2>Add Staffs</h2>
                </div>
            </div>
            <div className="admin-dashboard">
                <div className="add_staff">
                    <TextField title="Enter staff's Name" name="name" type='text' onChange={setName} />
                    <TextField title="Enter staff's email ID" name="email" type='email' styles={{ marginTop: '18px' }} onChange={setEmail} />
                    <TextField title="Re-enter staff's email ID" name="email2" type='email' styles={{ margin: '18px 0' }} onChange={setEmail2} />
                    <Radio name="role" title="Select staff's role" options={[
                        { label: 'admin', value: '1' },
                        { label: 'professor', value: '2' },
                        { label: 'visiting', value: '3' },
                        { label: 'viewer', value: '4' },
                    ]} defaultSelected={3} onChange={setRole} />
                    <Radio name="notice-permission" title="Select notice publishing permission" options={[
                        { label: 'can send on behalf of admin', value: '1' },
                        { label: 'can send notice', value: '2' },
                        { label: 'can not send', value: '3' },
                    ]} defaultSelected={1} styles={{ marginTop: "18px" }} onChange={setNoticePermission} />
                    <br />
                    <Button size="medium" styles={{ marginTop: "24px" }} label="Add Staff" disabled={disabled} onClick={handleSubmit} />
                </div>
                <StaffList showAddNew={false} />
            </div>
        </main>
    )
}

function ManageStaff({ staffId }) {
    return (
        <main>
            <div className='top'>
                <div className='meta'>
                    <h2>Manage Staffs ({staffId})</h2>
                </div>
            </div>
            <div className="admin-dashboard">
                <div className="add_staff">
                    <TextField title="Enter staff's Name" name="name" type='text' />
                    <TextField title="Enter staff's email ID" name="email" type='email' styles={{ margin: '18px 0' }} />
                    <Radio name="role" title="Choose the staff's role" options={[
                        { label: 'admin', value: '1' },
                        { label: 'teacher', value: '1' },
                        { label: 'viewer', value: '1' },
                    ]} defaultSelected={2} />
                    <br />
                    <Button size="medium" styles={{ marginTop: "24px" }} label="Add Staff" />
                </div>
                <StaffList showAddNew={false} />
            </div>
        </main>
    )
}

export default function Staff() {
    let { staffId } = useParams();
    return (staffId ? <ManageStaff staffId={staffId} /> : <AddStaff />)
}