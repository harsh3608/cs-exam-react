import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const RescheduleCandidateExam = ({candidateExamId, userId, fullname}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button className="btn btn-warning" style={{ scale: '0.8' }} onClick={handleShow}>
                <span className="material-icons">
                    edit_square
                </span>
            </button>

            <Modal show={show} onHide={handleClose} centered >
                <Modal.Header closeButton>
                    <Modal.Title>
                        
                            Reschedule Candidate Exam for <br/> {fullname}
                        
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        
                    </div>





                </Modal.Body>
                <Modal.Footer className='mt-5'>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Reschedule Exam
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
};

export default RescheduleCandidateExam;