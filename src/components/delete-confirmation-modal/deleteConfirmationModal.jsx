import React from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";

export default function ConfirmationModal({show, onHide, onSuccess}) {
    return (
        <Modal
        show={show}
        onHide={onHide}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Confirmation Modal
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Are you sure want to delete ?
                </p>
            </Modal.Body>
            <Modal.Footer>
                <div className="d-flex w-100">
                    <Button variant="danger" className="w-50" onClick={onHide}>No</Button>
                    <Button className="w-50 ms-3" onClick={onSuccess}>Yes</Button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}