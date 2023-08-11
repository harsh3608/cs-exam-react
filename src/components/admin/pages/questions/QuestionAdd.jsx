import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const QuestionAdd = () => {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
        <>
            <button className="btn btn-primary" onClick={handleShow}>
                <div className="d-flex flex-row">
                    <span className="material-icons">
                        add
                    </span>
                    <span>Add</span>
                </div>
            </button>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Add your form or content for adding a question here */}
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
}

export default QuestionAdd;