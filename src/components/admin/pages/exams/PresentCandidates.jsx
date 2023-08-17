import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../../styles/ExamList.css";

const PresentCandidates = ({ candidates }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button className="btn btn-primary" style={{ scale: '0.8' }} onClick={handleShow}>
                <span className="material-icons">
                    view_list
                </span>
            </button>

            <Modal show={show} onHide={handleClose} centered className="present-modal">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h2>
                            Present Candidates
                        </h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                    <table className="table mb-5">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {candidates.map((candidate, index) => (
                                <tr key={index} >
                                    <td className='p-2 m-2'>{candidate.fullname}</td>
                                    <td >
                                        <span className='badge rounded-pill bg-success' style={{ scale: '1' }}>
                                            {candidate.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>







                </Modal.Body>
                <Modal.Footer className='mt-5'>
                    
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}

export default PresentCandidates;