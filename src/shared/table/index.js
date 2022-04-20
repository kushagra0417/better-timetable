import React, { useEffect, useRef, useState } from 'react';
import date from 'date-and-time';
import ordinal from 'date-and-time/plugin/ordinal';
import './styles.scss';
import randomColor from 'randomcolor';
import axios from 'axios';

date.plugin(ordinal);
const times = ["00"];
for (let t = 30, ti = true; t <= 2400; t += 30, ti = !ti) {
    let str = t.toString()
    for (let i = str.length; i < 4; i++) {
        str = "0" + str
    }
    times.push(str);
    if (ti) {
        t += 40;
    }
}

function getColCount(time) {
    let ti = true, i = 1, t = 0;
    while (t < time) {
        ti = !ti
        t += 30;
        if (ti) {
            t += 40;
        }
        i++;
    }
    return i;
}

function convertTime(time) {
    if (time.length < 4) {
        return time;
    }
    let h = parseInt(time.substr(0, 2));
    let m = parseInt(time.substr(2, 4));

    return `${h < 13 ? h : h - 12}${m === 0 ? '' : ':' + m
        }${h < 13 ? 'am' : 'pm'}`
}

const dist = 42;

function getPosition() {
    const now = date.format(new Date(), 'HH:mm').split(':')
    const h = now[0];
    const m = now[1];
    let pos = h * 2 * dist;
    pos += m * (dist / 30);
    return pos;
}

export default function Table({ schedule, admin = false, setUpd = () => { } }) {
    const [currentTime, setCurrentTime] = useState(getPosition);

    const table = useRef();
    useEffect(() => {
        table.current.scrollTo(getPosition() - 200, 0);
        setInterval(() => {
            setCurrentTime(getPosition());
        }, 60 * 1000);
    }, []);

    function deleteLecture(id) {
        if (window.confirm('Are you sure you want to delete??')) {
            axios.delete('lecture/delete/?id=' + id).then(() => {
                alert('Lecture deleted!!');
                setUpd(u => !u);
            }).catch(() => {
                alert('Error faced while deleting lecture!!')
            });
        }
    }

    return (
        <div className='timetable' >
            <div className='days'>
                <div className='day'>mon</div>
                <div className='day'>tue</div>
                <div className='day'>wed</div>
                <div className='day'>thur</div>
                <div className='day'>fri</div>
                <div className='day'>sat</div>
                <div className='day'>sun</div>
            </div>
            <div className='table' ref={table}>
                <div className='currentTime' style={{ marginLeft: `${currentTime}px` }} />
                <div className='timestamps'>
                    {times.map((t) =>
                        <div className='timestamp'><p>
                            {convertTime(t)}
                        </p></div>
                    )}
                </div>
                <div className='cells'>
                    {[...Array(24 * 2 * 7)].map(() =>
                        <div className='cell'></div>
                    )}
                </div>
                <div className='classes'>
                    {/* temp */}
                    {/* <div className='class class1'>Machine Learning Grp 1</div>
                    <div className='class class2'>Blockchain Grp 1</div>
                    <div className='class class3'>Server Side Web Technology</div>
                    <div className='class class4'>IOT Grp 1</div> */}

                    {schedule.map(lecture => {
                        if (lecture.day.length > 1) {
                            return lecture.day.map(d => (
                                <div className='class'
                                    style={{
                                        gridRow: d,
                                        background: randomColor({
                                            seed: lecture.id,
                                            luminosity: 'dark'
                                        }),
                                        boxShadow: `0px 4px 9px ${randomColor({
                                            seed: lecture.id,
                                            luminosity: 'dark',
                                            format: 'hex'
                                        })}99`,
                                        gridColumnStart: getColCount(lecture.time.from),
                                        gridColumnEnd: getColCount(lecture.time.to)
                                    }}>
                                    <div className='on_hover'>
                                        <p>{lecture.longName}</p>
                                        <p>from {lecture.time.from} to {lecture.time.to}</p>
                                        <p>by <b>{lecture.name} </b>
                                            {admin &&
                                                <u style={{ color: 'red', cursor: 'pointer' }} onClick={() => { deleteLecture(lecture.id) }}>delete</u>
                                            }</p>
                                    </div>
                                    <p>{lecture.longName}</p></div>
                            )
                            );
                        } else {
                            console.log(lecture)
                            return (
                                <div className='class'
                                    style={{
                                        gridRow: lecture.day[0],
                                        background: randomColor({
                                            seed: lecture.longName,
                                            luminosity: 'dark'
                                        }),
                                        boxShadow: `0px 4px 9px ${randomColor({
                                            seed: lecture.longName,
                                            luminosity: 'dark',
                                            format: 'hex'
                                        })}99`,
                                        gridColumnStart: getColCount(lecture.time.from),
                                        gridColumnEnd: getColCount(lecture.time.to)
                                    }}>
                                    <div className='on_hover'>
                                        <p>{lecture.longName}</p>
                                        <p>from {lecture.time.from} to {lecture.time.to}</p>
                                        <p>by <b>{lecture.name} </b>
                                            {admin &&
                                                <u style={{ color: 'red', cursor: 'pointer' }} onClick={() => { deleteLecture(lecture.id) }}>delete</u>
                                            }</p>
                                    </div>
                                    <p>{lecture.longName}</p></div>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    )
}