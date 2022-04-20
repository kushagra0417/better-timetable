import { useEffect, useState } from "react";
import Button from "shared/button";
import { FaPlus } from 'react-icons/fa';
import './styles.scss';
import profileImg from 'assets/profile.webp';
import AddNotice from "./addNotice";
import axios from "axios";
import date from 'date-and-time';
import { useUser } from 'util/auth/useUser';

function Notice({ key, notice }) {
    const time = new Date(notice.date);

    return (
        <div className="notice" key={key}>
            {/* <span className="pin" onClick={() => setPinned(!pinned)}>{pinned ? <AiFillPushpin /> : <AiOutlinePushpin />}</span> */}
            <div className="author">
                <img src={profileImg} alt="hi" />
                <div className="details">
                    <p className="name">{notice.staffName}</p>
                    <p className="time">{date.format(time, 'ddd, MMM DD YYYY')}</p>
                </div>
            </div>
            <div className="data">
                <p>{notice.body}</p>
            </div>
        </div>
    );
}


export default function Board() {
    const [addNoticeOpen, setAddNoticeOpen] = useState(false);
    const [notices, setNotices] = useState([]);
    const [reload, setReload] = useState(false);

    const { user } = useUser();

    useEffect(() => {
        axios.get('/notice/get').then((res) => {
            setNotices(res.data.result);
        }).catch(() => {
            alert("Error in fetching notices");
        })
    }, [reload]);

    return (
        <main>
            <div className='top'>
                <div className='meta'>
                    <h2>Notice Board</h2>
                </div>
                {user &&
                    <Button label="Create" icon={<FaPlus />} onClick={() => setAddNoticeOpen(true)} />
                }
            </div>
            <div className="board">
                <div className="notices">
                    {notices.map((notice, i) => (
                        <Notice key={i} notice={notice} />
                    ))}
                </div>
            </div>
            <AddNotice open={addNoticeOpen} setOpen={setAddNoticeOpen} setReload={setReload} />
        </main>
    )
}