import { useState, useEffect } from 'react';
// import Button from 'shared/button';
import './styles.scss';
// import { FaShare } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { BsCheck, BsCalendarEvent } from 'react-icons/bs';
import { VscListSelection } from 'react-icons/vsc';
import date from 'date-and-time';
import Table from 'shared/table';
import axios from 'axios';
import Select from 'shared/select';

// import convertTime from 'convert-time';
// import randomColor from 'randomcolor';
// import schedule from './merged.json'





function Top({ selectedElectives, setOpenElectiveSelector, setSchedule, setElectiveSubjects }) {
    const pattern = date.compile('dddd, DDD MMMM');

    const [programmes, setProgrammes] = useState(null);
    const [batches, setBatches] = useState(null);
    const [divisions, setDivisions] = useState(null);

    const [selectedProgram, setSelectedProgram] = useState(null)
    useEffect(() => {
        setBatches(null);
        setDivisions(null);
        axios.get('/program/get/').then(res => {
            setProgrammes(res.data.programmes.map(prog => ({ value: prog._id, label: prog.shortName })));
        })
    }, []);

    const [selectedBatch, setSelectedBatch] = useState(null);
    useEffect(() => {
        setBatches(null);
        setSelectedBatch(null)
        if (selectedProgram) {
            axios.get('batch/get/?programId=' + selectedProgram.value).then(res => {
                setBatches(res.data.batches.map(batch => ({ value: batch._id, label: batch.shortName })))
            })
        }
    }, [selectedProgram]);

    const [selectedDivision, setSelectedDivision] = useState(null);
    useEffect(() => {
        setDivisions(null);
        setSelectedDivision(null);
        if (selectedBatch) {
            axios.get('batch/division/?batchId=' + selectedBatch.value).then(res => {
                setDivisions(res.data.divisions.map((d, i) => ({ value: d, label: 'Div ' + d })))
            });
        }
    }, [selectedBatch]);

    const [fullSchedule, setFullSchedule] = useState([]);
    useEffect(() => {
        setFullSchedule([]);
        setSchedule([]);
        if (selectedBatch && selectedDivision) {
            axios.get('lecture/get/?batchId=' + selectedBatch.value + '&division=' + selectedDivision.value).then(res => {
                setFullSchedule(res.data.result.filter(d => d !== null));
                setSchedule(res.data.result.filter(lec => lec?.type === 0));
            }).catch(e => {
                console.log(e)
            });
        }
    }, [selectedBatch, selectedDivision, setSchedule]);


    useEffect(() => {
        setSchedule(fullSchedule.filter(sch => selectedElectives[sch.subjectId] === true || sch.type === 0));
    }, [selectedElectives, setSchedule, fullSchedule]);

    useEffect(() => {
        if (selectedBatch) {
            axios.get('subject/getElectives/?batchId=' + selectedBatch.value).then((res) => {
                setElectiveSubjects(res.data.result);
            }).catch((e) => {
                alert(e);
            });
        }
    }, [selectedBatch, setElectiveSubjects]);

    return (
        <div className='top'>
            <div className='left'>
                <div className='meta'>
                    <p>{date.format(new Date(), pattern)} <div><BsCalendarEvent /></div></p>
                    <div className='chooser'>
                        <Select value={selectedProgram} onChange={(e) => setSelectedProgram(e)} options={programmes} />
                        <Select options={batches} value={selectedBatch} onChange={(e) => setSelectedBatch(e)} styles={{ margin: '0 6px' }} />
                        <Select options={divisions} value={selectedDivision} onChange={(e) => setSelectedDivision(e)} />
                        <h3>
                            <div className='select_elective' onClick={() => { setOpenElectiveSelector(true) }}>
                                <VscListSelection />
                            </div>
                        </h3>
                    </div>
                </div>
            </div>
            {/* <div> */}
            {/* <div className='select_on_mobile'>
            <Button styles={{ marginBottom: '4px' }} onClick={() => { setOpenElectiveSelector(true) }} icon={<VscListSelection />} />
                </div> */}
            {/*<Button label="Share" icon={<FaShare />} />}
            {/* </div> */}
        </div >
    )
}



export default function TimeTable() {
    const [openElectiveSelector, setOpenElectiveSelector] = useState(false);

    // let batchId = '6252efea1dba31dc25108b1e';
    // let division = 'A';
    // useEffect(() => {
    //     axios.get('lecture/get/?batchId=' + batchId + '&division=' + division, {
    //     }).then(res => {
    //         console.log(res.data)
    //     })
    // }, [batchId, division]);

    const [schedule, setSchedule] = useState(null);
    const [electiveSubjects, setElectiveSubjects] = useState(null);
    const [selectedElectives, setSelectedElectives] = useState({});

    function toggleElective(id) {
        if (selectedElectives[id] === true) {
            setSelectedElectives(el => ({ ...el, [id]: false }))
        } else {
            setSelectedElectives(el => ({ ...el, [id]: true }));
        }
    }


    return (
        <main>
            <Top selectedElectives={selectedElectives} setOpenElectiveSelector={setOpenElectiveSelector} setElectiveSubjects={setElectiveSubjects} schedule={schedule} setSchedule={setSchedule} />
            <Table schedule={schedule?.length > 0 ? schedule : []} />

            {openElectiveSelector &&
                <div className='drawer'>
                    <div className='overlay' />
                    <div className='content'>
                        <div className='header'>
                            <h3>Select Electives</h3>
                            <div className='close' onClick={() => { setOpenElectiveSelector(false) }}><MdClose /></div>

                        </div>
                        {electiveSubjects &&
                            <div className='subjectList'>
                                {electiveSubjects.map(sub => {
                                    if (sub) {
                                        return (
                                            <div className={selectedElectives[sub.subjectId] === true ? 'checked' : ''} onClick={() => { toggleElective(sub.subjectId) }}><label>{sub.longName}</label><span className='checked'><BsCheck /></span></div>
                                        )
                                    }
                                    return null;
                                }
                                    // <div className='checked'><label>Machine Learning Grp - 1</label><span><BsCheck /></span></div>
                                )}
                            </div>
                        }
                    </div>
                </div>}
        </main>
    )
}