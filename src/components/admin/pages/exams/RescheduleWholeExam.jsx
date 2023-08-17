import React, { useState, useEffect } from "react";
import "../../styles/ExamList.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router";
import toastr from 'toastr';
import { isAuthorized } from "../../../../util/TokenAuthUtil";

const RescheduleWholeExam = ({ examId }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            fetchData();

        }, 3000);
        // }, [currentPage, rowsPerPage, searchText]);
    },);

    const navigate = useNavigate();
    const logOut = () => {
        localStorage.clear();
        toastr.success("logged out successfully.");
        navigate("/");
    }

    const fetchData = async () => {
        if (isAuthorized()) {
            try {
                const token = localStorage.getItem('token');

                const response = await fetch(`http://13.90.224.87:8099/api/TechnologyStack/GetAllAsync`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const json = await response.json();

                if (json.isSuccess) {
                    setData(json.response);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        } else {
            logOut();
        }


    };




    return (
        <>
            <button className="btn btn-warning" style={{ scale: '0.8' }} onClick={handleShow}>
                <span className="material-icons">
                    edit_square
                </span>
            </button>

            <Modal show={show} onHide={handleClose} centered className="candy-modal">
                <Modal.Header closeButton>
                    <Modal.Title>
                        Reschedule  Exam
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className="row">
                            <div className="col">
                                <label>Technology</label>
                                <div className="techs">
                                    {
                                        data.map((technology, index) => (
                                            <div key={index} className="m-2" style={{ scale: '1.2' }}>
                                                <Form.Check
                                                    type="switch"
                                                    id="custom-switch"
                                                    label={technology.technologyName}
                                                />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="row my-3">
                            <div className="col">
                                <label>Exam Date</label>
                                <div className="m-2 w-75">
                                    <input type="date" className="form-control"></input>
                                </div>

                            </div>
                        </div>

                        <div className="row">
                            <div className="col"></div>
                        </div>
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

export default RescheduleWholeExam;