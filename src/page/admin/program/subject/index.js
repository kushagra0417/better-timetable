import { useEffect, useState } from 'react';
import Button from 'shared/button';
import { FaPlus } from 'react-icons/fa';
import './styles.scss';
import AddSubject from './addSubject';
import axios from 'axios';
export default function SubjectList({ programId }) {
    const [openAddSubject, setOpenAddSubject] = useState(false);
    const [subjects, setSubjects] = useState([]);

    const [upd, setUpd] = useState(false)

    useEffect(() => {
        axios.get('/subject/get/?programId=' + programId).then(response => {
            setSubjects(response.data.subjects);
        })
    }, [programId, upd]);


    function deleteSubject(id) {
        if (window.confirm('Are you sure you want to delete??')) {
            axios.delete('subject/delete/?id=' + id).then(() => {
                alert('Subject deleted!!');
                setUpd(!upd);
            }).catch(() => {
                alert('Error faced while deleting subject!!')
            });
        }
    }
    return (
        <>
            <section className="right">
                <div className="section_header">
                    <h3 className="section_title">Subjects</h3>
                    <Button label="Add New Subject" icon={<FaPlus />} onClick={() => { setOpenAddSubject(true) }} />
                </div>
                <div className="subjects">
                    {subjects.length && subjects.map(subject => (
                        <div className="subject" key={subject._id}>
                            <div className="details">
                                <div>
                                    <p className="name">{subject.shortName}</p>
                                    <p className="desc">{subject.longName}</p>
                                </div>
                            </div>
                            <p className={`type ${subject.type === 0 ? 'core' : 'elective'}`} >{subject.type === 0 ? 'core' : 'elective'}</p>
                            <div className="show_on_hov">
                                <Button label="remove" onClick={() => { deleteSubject(subject._id) }} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <AddSubject open={openAddSubject} setOpen={setOpenAddSubject} programId={programId} />
        </>
    )
}