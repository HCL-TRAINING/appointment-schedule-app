import React, { useEffect } from "react";
import { useState } from "react";
import { Form, Button, Toast } from "react-bootstrap";
import DateTimePicker from 'react-datetime-picker';
import './scheduleAppointment.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from "react-router-dom";
import useInput from "../../custom-hooks/useInput";

export default function ScheduleAppointment(props) {
    const [datePicker, setDatePicker] = useState({
        appointmentTime: new Date(),
        dob: new Date(),
    });
    const { state } = useLocation();
    let stateObj = {};
    stateObj = state;
    const [checkStateExist, setCheckStateExist] = useState(!!stateObj);
    const reason = useInput(checkStateExist ? stateObj.reason : '');
    const patientName = useInput(checkStateExist ? stateObj.patientName : '');
    const email = useInput(checkStateExist ? stateObj.email : '');
    const gender = useInput(checkStateExist ? stateObj.gender : '');
    const mobile = useInput(checkStateExist ? stateObj.mobile : '');
    const [selectedDOB, setDob] = useState(checkStateExist ? new Date(stateObj.dob) : new Date());
    const [selectedTime, setTime] = useState(checkStateExist ? new Date(stateObj.appointmentTime) : new Date());
    const [validated, setValidated] = useState(false);
    const [showToaster, setToaster] = useState(true);
    const toggleShow = () => setToaster(!showToaster);

    console.log('stateeee', state);
    let navigate = useNavigate();


    const routeChange = (values) => {
        console.log('form values', values)
        navigate('/home', { state: values });
    }

    const handleSubmit = (e) => {
        console.log('ddf', e.currentTarget.checkValidity());
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            setValidated(true);
            return;
        }

        // toggleShow();

        routeChange({
            ...datePicker,
            reason: reason.value,
            patientName: patientName.value,
            email: email.value,
            gender: gender.value,
            mobile: mobile.value,
            updatedState: !!checkStateExist,
            id: checkStateExist ? stateObj.id : Date.now().toString(36) + Math.random().toString(36).substring(2),
        });
        e.preventDefault();
    }

    const handleDateValueChanges = (event, key) => {
        setDatePicker((values) => ({
            ...values,
            [key]: event,
        }));

        //  console.log('form value', formValues);
    }

    useEffect(() => {
        console.log('st che', checkStateExist);
        if (checkStateExist) {
            // patientName.value = 'ddd'
            setDatePicker({
                appointmentTime: new Date(stateObj.appointmentTime),
                dob: new Date(stateObj.dob),
            });
        }
    }, [checkStateExist])

    return (
        <div className="details">
            <div className="header d-flex align-items-center mt-3">
                <h3 className="w-100">{checkStateExist ? 'Update Appointment' : 'Book Appointment'}</h3>
            </div>

            <Form className="w-50 m-auto" onSubmit={e => handleSubmit(e)} noValidate validated={validated}>
                <Form.Group className="mb-4" id="formReason" controlId="validationCustom01">
                    <Form.Label className="d-flex">Reason For Visit</Form.Label>
                    <Form.Select aria-label="Default select example" required
                        placeholder="Select" {...reason} >
                        {/* <option>Select Reason</option> */}
                        <option value="Yearly Check-up">Yearly Check-up</option>
                        <option value="Cold Fever">Cold Fever</option>
                        <option value="Dental">Dental</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid reason.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" id="formTime" controlId="validationCustom02">
                    <Form.Label className="d-flex">Select Date and Time</Form.Label>
                    <DatePicker required
                        selected={selectedTime}
                        onChange={(time) => { setTime(time); handleDateValueChanges(time, 'appointmentTime') }}
                        dateFormat="MMMM d, yyyy h:mm aa" showTimeSelect
                        placeholderText={'Select Date & Time'} />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid date and time.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" id="formPatientName" controlId="validationCustom03">
                    <Form.Label className="d-flex">Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Patient Name" required
                        {...patientName}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid name.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" id="formEmail" controlId="validationCustom04">
                    <Form.Label className="d-flex">Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email Id" {...email} required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid email id.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" id="formDOB" controlId="validationCustom05">
                    <Form.Label className="d-flex">Date Of Birth</Form.Label>
                    <DatePicker
                        dateFormat="dd/MM/yyyy"
                        selected={selectedDOB} required
                        onChange={(date) => { setDob(date); handleDateValueChanges(date, 'dob') }}
                        placeholderText={'Select DOB(DD/MM/YYYY)'} />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid date.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" id="formGender" controlId="validationCustom06">
                    <Form.Label className="d-flex">Gender</Form.Label>
                    <Form.Select aria-label="Default select exampÍle" required
                        {...gender}
                        placeholder="Select" >
                        <option>Select Gender</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="Other">Other</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid gender.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" id="formPhone" controlId="validationCustom07">
                    <Form.Label className="d-flex">Phone Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter Phone Number" {...mobile} required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid phone number.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4 d-flex">
                    <Form.Check
                        required
                        label="Agree to terms and conditions"
                        feedback="You must agree before submitting."
                        feedbackType="invalid"
                    />
                </Form.Group>
                <Button as="input" type="submit" className="mb-4" value="Submit" />
            </Form>
        </div>
    )
}