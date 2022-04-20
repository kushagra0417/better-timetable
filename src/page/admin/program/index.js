import { useParams, Link, useRouteMatch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Button from 'shared/button';
import { FaPlus } from 'react-icons/fa';
// import { BsPeopleFill } from 'react-icons/bs';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { MdClass } from 'react-icons/md';
import './styles.scss';
import SubjectList from './subject';
import AddBatch from './addBatch';
import axios from 'axios';

function Batch({ batch }) {
    let { url } = useRouteMatch();

    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('batch/getBatchDetails/?batchId=' + batch._id).then(res => {
            setData(res.data);
        }).catch(() => { });
    }, [batch._id]);

    if (data) {
        return (
            <Link to={`${url}/${batch._id}`}>
                <div className='batch'>
                    <h3>{batch.shortName}</h3>
                    <div className='stats'>
                        <div className="stat"><MdClass /> <p><b>{data.totalSubjects}</b> subjects</p></div>
                        <div className="stat"><FaChalkboardTeacher /> <p><b>{data.totalTeachers}</b> teachers</p></div>
                    </div>
                </div>
            </Link>
        );
    }
    return null;
}
export default function Program() {
    let { program } = useParams();


    const [openAddBatch, setOpenAddBatch] = useState(false);

    const [batches, setBatches] = useState([]);
    const [programDetails, setProgramDetails] = useState();

    useEffect(() => {
        if (program) {
            axios.get('/batch/get?programId=' + program).then(response => {
                setBatches(response?.data?.batches);
            });

            axios.get('/program/getById?id=' + program).then(response => {
                setProgramDetails(response.data.program)
            })
        }
    }, [program])

    return (
        <main>
            <div className='top'>
                {programDetails &&
                    <div className='meta'>
                        <h2>{programDetails.shortName}</h2>
                        <p>{programDetails.longName}</p>
                    </div>
                }
                <div className="actions">
                    <Button label="Add New Batch" icon={<FaPlus />} onClick={() => setOpenAddBatch(true)} />
                </div>
            </div>
            <div className='program-dashboard'>
                <div className='program'>
                    <div className='program-details'>
                        {/* <div className='stats'>
                            <div className="stat"><BsPeopleFill /> <p><b>{3}</b> semesters</p></div>
                            <div className="stat"><MdClass /> <p><b>{12}</b> classes</p></div>
                            <div className="stat"><FaChalkboardTeacher /> <p><b>{21}</b> teachers</p></div>
                        </div> */}
                    </div>
                    <div className='batches'>
                        {batches && batches.map(batch => (
                            <Batch batch={batch} />
                        ))}
                    </div>
                </div>
                <div className='courses'>
                    <SubjectList programId={program} />
                </div>
            </div>
            <AddBatch open={openAddBatch} setOpen={setOpenAddBatch} programId={program} />
        </main>
    )
} 