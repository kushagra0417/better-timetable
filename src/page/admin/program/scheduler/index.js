import Button from "shared/button";
import { HiOutlineRefresh } from 'react-icons/hi';
import { FaPlus } from 'react-icons/fa';
import Table from "shared/table";
import { useEffect, useState } from "react";
import AddLecture from "./addLecture";
import { useParams } from 'react-router-dom';
import Select from "shared/select";
import axios from 'axios';


export default function Scheduler() {
    const [openAddClass, setOpenAddClass] = useState(false);
    const { program, batch } = useParams();

    const [divisions, setDivisions] = useState(null);
    const [selectedDivision, setSelectedDivision] = useState(null);
    const [batchName, setBatchName] = useState(null);

    useEffect(() => {
        axios.get('batch/division/?batchId=' + batch).then(res => {
            setDivisions(res.data.divisions.map(d => ({ value: d, label: 'Div ' + d })))
        }).catch(e => {
            console.log(e);
        });

        axios.get('batch/getBatchDetails/?batchId=' + batch).then(res => {
            setBatchName(res.data.name);
        }).catch(e => {
            console.log(e);
        });
    }, [batch]);

    const [schedule, setSchedule] = useState(null);

    const [upd, setUpd] = useState(false);

    useEffect(() => {
        if (batch && selectedDivision) {
            axios.get('lecture/get/?batchId=' + batch + '&division=' + selectedDivision.value, {
            }).then(res => {
                setSchedule(res.data.result)
            }).catch(e => {
                console.log(e)
            })
        }
    }, [batch, selectedDivision, upd]);

    return (
        <main>
            <div className='top'>
                <div className='meta'>
                    <p>Scheduler</p>
                    <div className="line">
                        <h2>{batchName || 'loading..'}</h2>
                        <Select styles={{ width: '100px', marginLeft: '12px' }} options={divisions} value={selectedDivision} onChange={(e) => setSelectedDivision(e)} />
                    </div>
                </div>
                <Button label="Add Lecture" onClick={() => setOpenAddClass(true)} icon={<FaPlus />} />
                <Button label="Update" icon={<HiOutlineRefresh />} />
            </div>
            <div className="scheduler">
                <AddLecture open={openAddClass} setOpen={setOpenAddClass} programId={program} batchId={batch} setUpd={setUpd} />
                <Table schedule={schedule?.length > 0 ? schedule : []} admin={true} setUpd={setUpd} />
            </div>
        </main>
    )
}