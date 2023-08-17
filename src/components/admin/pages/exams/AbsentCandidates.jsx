import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const AbsentCandidates = ({ candidates }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    console.log(candidates);

    return (
        <>
            <button className="btn btn-danger" style={{ scale: '0.8' }} onClick={handleShow}>
                <span className="material-icons">
                    view_list
                </span>
            </button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h2>
                            Absent Candidates
                        </h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {/* Use the candidates array to render present candidates */}
                        {candidates.map((candidate, index) => (
                            <span key={index}>{candidate.name} </span>
                        ))}
                    </div>





                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AbsentCandidates;