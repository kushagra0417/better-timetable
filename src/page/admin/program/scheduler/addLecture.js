import Modal from 'react-modal';
import { MdClose } from 'react-icons/md';
import './addLecture.scss';
import TextField from 'shared/textfield';
import Select from 'shared/select';
import Radio from 'shared/radio';
import { useEffect, useState } from 'react';
import Button from 'shared/button';
import axios from 'axios';


function SelectSubject({ subjectList, subject, setSubject }) {
    const options = subjectList.map(subject => ({ value: subject._id, label: subject.longName }));

    return (
        <Select title='subject' options={options} value={subject} onChange={(e) => {
            setSubject(e);
        }}
        />
    )
}

function SelectFaculty({ staffList, staff, setStaff }) {
    const options = staffList.map(staff => ({ value: staff.id, label: staff.name }));

    return (
        <Select title='faculty' options={options} value={staff} onChange={(e) => setStaff(e)} />
    )
}

function SelectDivision({ divisionList, division, setDivision }) {
    return (
        <Select creatable title='division' options={divisionList} value={division} onChange={(e) => setDivision(e)} />
    )
}

function SelectDays({ days, setDays }) {
    const options = [
        { value: 1, label: 'mon' },
        { value: 2, label: 'tues' },
        { value: 3, label: 'wed' },
        { value: 4, label: 'thurs' },
        { value: 5, label: 'fri' },
        { value: 6, label: 'sat' },
        { value: 7, label: 'sun' },
    ];

    return (
        <Select styles={{ gridColumn: '1 / 3' }} multiple title='days' options={options} value={days} onChange={(e) => setDays(e)} />
    )
}


export default function AddLecture({ open, setOpen, programId, batchId, setUpd }) {
    const [staffList, setStaffList] = useState([]);
    const [subjectList, setSubjectList] = useState([]);
    const [divisionList, setDivisionList] = useState([]);
    useEffect(() => {
        if (programId && batchId) {
            axios.get('/staff/list').then(response => {
                setStaffList(response.data.staffs);
            });

            axios.get('/subject/get/?programId=' + programId).then(response => {
                setSubjectList(response.data.subjects);
            });

            setDivisionList([
                { value: 1, label: 'A' },
                { value: 2, label: 'B' }
            ]);

        }
    }, [programId, batchId]);

    const [scheduleType, setScheduleType] = useState(0);
    const [staff, setStaff] = useState(null);
    const [subject, setSubject] = useState(null);
    const [days, setDays] = useState(null);
    const [date, setDate] = useState(null);
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const [division, setDivision] = useState(null);
    const [group, setGroup] = useState(null);
    const [dataVerified, setDataVerified] = useState(false);
    useEffect(() => {

        if (scheduleType > 1) {
            setDataVerified(false);
        }

        setDataVerified(true);
    }, [scheduleType, staff, subject, days, date])


    function handleSubmit(e) {
        e.preventDefault();

        const payload = {
            staffId: staff.value,
            subjectId: subject.value,
            batchId: batchId,
            division: division?.label,
            day: days.map(day => day.value),
            date: date,
            group: group,
            time: {
                from: from,
                to: to,
            }
        };
        axios.post('lecture/add', payload).then(res => {
            alert("class added in the database")
            setOpen(false);
            setUpd(u => !u)
        }).catch(e => {
            alert(e.response.data.err);
        })

    }
    return (
        <>
            <Modal
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
                contentLabel="Example Modal"
            >
                <div className='header'>
                    <h3>Add Lecture</h3>
                    <div className='close' onClick={() => { setOpen(false) }}><MdClose /></div>
                </div>
                <div className='form'>
                    <SelectSubject subjectList={subjectList} subject={subject} setSubject={setSubject} />
                    <SelectFaculty staffList={staffList} staff={staff} setStaff={setStaff} />
                    {/* <Radio title='subject type'
                        options={[{ value: '1', label: 'core' }, { value: '2', label: 'elective' }]}
                        name="subject-type" defaultSelected={0} onChange={(e) => { console.log(e) }}
                    /> */}
                    <Radio title='schedule type'
                        options={[{ value: '1', label: 'weekly' }, { value: '2', label: 'once' }]}
                        name="schedule-type" defaultSelected={scheduleType} onChange={(e) => { setScheduleType(e) }}
                    />
                    {scheduleType === 0 ?
                        <SelectDays days={days} setDays={setDays} />
                        :
                        <TextField title="date" type='date' styles={{ gridColumn: '1 / 3' }} value={date} onChange={setDate} />
                    }
                    <TextField title="time from" type='number' value={from} onChange={setFrom} />
                    <TextField title="time to" type='number' value={to} onChange={setTo} />
                    <SelectDivision divisionList={divisionList} division={division} setDivision={setDivision} />
                    <TextField title="group" type='number' value={group} onChange={setGroup} />
                    <div></div>
                    <Button onClick={handleSubmit} disabled={!dataVerified} label='Add Class' size='medium' styles={{ background: 'var(--dark)', color: 'var(--white)' }} />
                </div>

            </Modal>
        </>
    )
}