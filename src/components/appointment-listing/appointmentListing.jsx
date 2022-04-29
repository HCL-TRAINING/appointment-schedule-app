import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { appointmentList } from "../../mock";
import { appointmentDetailsContext } from "../../modules/homepage/homepage"
import ConfirmationModal from "../delete-confirmation-modal/deleteConfirmationModal";


export default function AppointmentListing() {
    const appointmentContextData = React.useContext(appointmentDetailsContext);
    const [appointments, setAppointments] = useState(appointmentList);
    const [showModal, setShowModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState({});
    const [showEdit, setShowEdit] = useState(false);
    let navigate = useNavigate();



    useEffect(() => {
        console.log('context data', appointmentContextData);
        if (appointmentContextData) {
            appointmentContextData.updatedState ?
                updateAppointment(appointmentContextData) : addAppointment(appointmentContextData);
        }

        console.log('coo', appointments);
    }, [])

    useEffect(() => {
        if (showEdit) {
            navigate('/book', {
                state: selectedRow,
            })
        }
    }, [selectedRow]);

    const addAppointment = (appointment) => {
        setAppointments([
            ...appointments,
            appointment
        ]);
    }

    const updateAppointment = (appointment) => {
        const index = appointments.findIndex(
            ele => ele.id === appointment.id,
        );
        appointments[index] = appointment;
        setAppointments([...appointments]);
    }

    const showConfirmationModal = (value) => {
        setShowModal(value);
    }

    const submit = () => {
        showConfirmationModal(false);
        cancelAppointment(selectedRow);
    }

    const cancelAppointment = (appointment) => {
        console.log('called remove', appointment);
        const index = appointments.findIndex(ele => ele.id === appointment.id);
        if (index > -1) {
            appointments.splice(index, 1);
            setAppointments(appointments);
        }
    }

    const onEditClick = (appointment) => {
        console.log('view edit', appointment);
        setSelectedRow(appointment);
        setShowEdit(true);
    }


    const formatAMPM = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';

        hours %= 12;
        hours = hours || 12;
        minutes = minutes < 10 ? `0${minutes}` : minutes;

        const strTime = `${hours}:${minutes} ${ampm}`;

        return strTime;
    };

    const getAge = birthDate => Math.floor((+new Date() - new Date(birthDate).getTime()) / 3.15576e+10);

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>SL No.</th>
                        <th>Time</th>
                        <th>Date</th>
                        <th>Patient</th>
                        <th>Reason</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Phone Number</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        appointments.map((appointment, i) => {
                            return (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{formatAMPM(appointment.appointmentTime)}</td>
                                    <td>{appointment.appointmentTime.toISOString().slice(0, 10)}</td>
                                    <td>{appointment.patientName}</td>
                                    <td>{appointment.reason}</td>
                                    <td>{appointment.email}</td>
                                    <td>{getAge(appointment.dob)}</td>
                                    <td>{appointment.gender}</td>
                                    <td>{appointment.mobile}</td>
                                    <td>
                                        <div className="d-flex">
                                            <Button variant="primary"
                                                className="d-flex ms-auto me-3" size="sm" onClick={() => onEditClick(appointment)}>Edit</Button>
                                            <Button variant="danger"
                                                className="d-flex ms-auto me-3" size="sm" onClick={() => { showConfirmationModal(true); setSelectedRow(appointment); }}>Cancel</Button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }



                </tbody>
            </Table>
            <ConfirmationModal show={showModal}
                onHide={() => showConfirmationModal(false)}
                onSuccess={() => submit()}
            />
        </div>
    )
}