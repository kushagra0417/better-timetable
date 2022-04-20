import { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { BsPeopleFill } from 'react-icons/bs';
// import { FaChalkboardTeacher } from 'react-icons/fa';
import { MdClass } from 'react-icons/md';
import axios from "axios";

export default function Programmes() {
    let { url } = useRouteMatch();

    const [programs, setPrograms] = useState([]);

    useEffect(() => {
        axios.get('/program/getDetails').then(response => setPrograms(response?.data?.result));
    }, []);

    if (programs) {
        return (
            <div className="programmes">
                {programs.length && (programs).map(prog => (
                    <Link to={`${url}/${prog.id}`}>
                        <div className="program" key={prog._id}>
                            <h3>{prog.shortName}</h3>
                            <p className="desc">{prog.longName}</p>
                            <div className="stats">
                                <div className="stat"><BsPeopleFill /> <p><b>{prog.batchCount}</b> batches</p></div>
                                {/* <div className="stat"><FaChalkboardTeacher /><p><b>{0}</b> teachers allocated</p></div> */}
                                <div className="stat"><MdClass /> <p><b>{prog.subjectCount}</b> subjects</p></div>
                            </div>
                        </div>
                    </Link>
                )
                )}
            </div>
        )
    }
    return null;
}