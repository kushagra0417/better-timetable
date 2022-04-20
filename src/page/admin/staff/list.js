import { useEffect, useState } from 'react';
import profileImg from 'assets/profile.webp';
import Button from 'shared/button';
import { FaPlus } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import './styles.scss';
import axios from 'axios';

export default function StaffList({ showAddNew = true }) {
    const history = useHistory();
    const [staffList, setStaffList] = useState([]);
    const [upd, setUpd] = useState(false);
    useEffect(() => {
        (async () => {
            const response = await axios.get('./staff/list');
            if (response.data) {
                setStaffList(response.data.staffs);
            }
        })();

    }, [upd]);

    function deleteStaff(id) {
        if (window.confirm('Are you sure you want to delete??')) {
            axios.delete('staff/delete/?id=' + id).then(() => {
                alert('Staff deleted!!');
                setUpd(!upd);
            }).catch(() => {
                alert('Error faced while deleting staff!!')
            });
        }
    }

    return (
        <>
            <section className="right">
                <div className="section_header">
                    <h3 className="section_title">Staffs</h3>
                    {showAddNew &&
                        <Button label="Add New Staff" icon={<FaPlus />} onClick={() => history.push('/dashboard/staff')} />
                    }
                </div>
                <div className="staffs">
                    {staffList && staffList.map(staff => (
                        <div className="staff" key={staff.email}>
                            <div className="details">
                                <img src={profileImg} alt="name" />
                                <div>
                                    <p className="name">{staff.name}</p>
                                    <p className="email">{staff.email}</p>
                                </div>
                            </div>
                            <p className={`role ${staff.role === 0 ? 'admin' : staff.role === 1 ? 'professor' : staff.role === 2 ? 'visiting' : 'viewer'}`} >{staff.role === 0 ? 'admin' : staff.role === 1 ? 'professor' : staff.role === 2 ? 'visiting' : 'viewer'}</p>
                            {/* <p className="class_count">24 classes</p> */}
                            <div className="show_on_hov">
                                <Button label="delete" onClick={() => { deleteStaff(staff.id) }} />
                            </div>
                            {/* <div>remove</div> */}
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}