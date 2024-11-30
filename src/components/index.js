import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMeeting, setEditMeeting } from '../store/meetingSlice';

const NewList = () => {
    const Meetings = useSelector(state => state.meetings);
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteMeeting(id));
    };

    const handleEdit = (meetingData) => {
        dispatch(setEditMeeting(meetingData));
    };

    return (<div className='todo-list-container'>
        <h1 className='title'>Todo List :</h1>
        {Meetings?.meetings?.map((data) => {
            return (<div className="todo" key={data?.id}>
                <div className="todo-content">
                    <span className="todo-title">{data?.title}</span>
                    <span className="time">
                        {data?.startTime} - {data?.endTime}
                    </span>
                </div>
                <div className="todo-actions">
                    <button className="edit-btn" onClick={() => handleEdit(data)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(data.id)}>Delete</button>
                </div>
            </div>)

        })}
    </div>)
}
export default React.memo(NewList);