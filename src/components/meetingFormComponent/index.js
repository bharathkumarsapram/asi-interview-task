import { useFormik } from "formik"
import * as Yup from 'yup';
import { resetEditMeeting, setMeeting, updateMeeting } from '../../store/meetingSlice';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
const MeetingForm = () => {
    const dispatch = useDispatch();
    const { currentMeeting, isEdit } = useSelector(state => state.meetings);

    const formik = useFormik({
        initialValues: {
            title: '',
            meetingDescription: '',
            startTime: '',
            endTime: '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Please enter title.'),
            meetingDescription: Yup.string().required('Please enter Description.'),
            startTime: Yup.string()
                .required('Start time is required'),
            endTime: Yup.string()
                .required('End time is required')
                .test(
                    'is-greater',
                    'End time must be after the start time',
                    function (value) {
                        const { startTime } = this.parent;
                        if (!startTime || !value) return true;
                        return new Date(`1970-01-01T${value}`) > new Date(`1970-01-01T${startTime}`);
                    }
                ),
        }),
        onSubmit: (values) => {
            if (isEdit) {
                dispatch(updateMeeting(values));
            } else {
                dispatch(setMeeting(values));
            }
            formik.resetForm();
            dispatch(resetEditMeeting());
        }
    })
    useEffect(() => {
        console.log(isEdit)
        if (isEdit && currentMeeting) {
            formik.setValues(currentMeeting);
        }
    }, [isEdit, currentMeeting]);

    return (<form onSubmit={formik.handleSubmit}>
        <div className="form-container">
            <div className="form-input-container">
                <label htmlFor="title">Meeting Title</label>
                <input id='title' name='title' type="text" value={formik?.values?.title} onChange={formik.handleChange} />
                <span>{formik?.errors?.title && formik?.touched?.title ? formik?.errors?.title : ''}</span>
            </div>
            <div className="form-input-container">
                <label htmlFor="meetingDescription">Meeting Description</label>
                <input id='meetingDescription' name='meetingDescription' type="text" value={formik?.values?.meetingDescription} onChange={formik.handleChange} />
                <span>{formik?.errors?.meetingDescription && formik?.touched?.meetingDescription ? formik?.errors?.meetingDescription : ''}</span>
            </div>
            <div className="form-input-container">
                <label htmlFor="startTime" >Start Time</label>
                <input id='startTime' name='startTime' type="time" value={formik?.values?.startTime} onChange={formik.handleChange} />
                <span>{formik?.errors?.startTime && formik?.touched?.startTime ? formik?.errors?.startTime : ''}</span>
            </div>
            <div className="form-input-container">
                <label htmlFor="endTime">Meeting Title</label>
                <input id='endTime' name='endTime' type="time" value={formik?.values?.endTime} onChange={formik.handleChange} />
                <span>{formik?.errors?.endTime && formik?.touched?.endTime ? formik?.errors?.endTime : ''}</span>
            </div>
            <div>
                <button className="btn" type="submit" title="Submit">{isEdit ? 'Update' : 'Submit'}</button>
            </div>
        </div>
    </form>)
}
export default MeetingForm;