import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import RescheduleCandidateExam from './RescheduleCandidateExam';

const AbsentCandidates = ({ candidates }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button className="btn btn-danger" style={{ scale: '0.8' }} onClick={handleShow}>
                <span className="material-icons">
                    view_list
                </span>
            </button>

            <Modal show={show} onHide={handleClose} centered className="present-modal">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h2>
                            Absent Candidates
                        </h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
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
                                            <RescheduleCandidateExam
                                                candidateExamId={candidate.candidateExamId} userId={candidate.id}
                                                fullname={candidate.fullname}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>





                </Modal.Body>
                <Modal.Footer className='mt-5'>
                    {/* <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button> */}
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AbsentCandidates;