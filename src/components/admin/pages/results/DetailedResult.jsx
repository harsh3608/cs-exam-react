import React, { useState, useEffect } from "react";
import AdminMenu from "../AdminMenu";
import { useParams } from "react-router";
import "../../styles/DetailedResult.css";

const DetailedResult = (props) => {
    const { examId } = useParams();
    const { name } = useParams();
    const { userId } = useParams();
    const totalCount = 0;
    const rightCount = 0;
    const wrongCount = 0;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            fetchData();
            setLoading(false);
        }, 3000);
    },);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`http://13.90.224.87:8099/api/CandidateExam/CandidateResultDetails?candidateExamId=${examId}&userId=${userId}`, {
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
    };

    return (
        <>
            <AdminMenu />

            <div className="container border rounded-3 m-3">
                <div className="row">
                    <div className="row">
                        <div className="col text-center p-2 mb-3 ">
                            <span className="fs-2">Candidate Result: {name}</span>
                        </div>
                    </div>

                    <div className="d-flex mt-2 mb-3 w-50 justify-content-between">
                        <div style={{marginLeft:'10%'}}>
                            <span className="badge btn rounded-pill bg-primary ">
                                Total Questions:{totalCount}
                            </span>
                        </div>
                        <div >
                            <span className="badge btn rounded-pill bg-success " >
                                Correct:{rightCount}
                            </span>
                        </div>
                        <div >
                            <span className="badge btn rounded-pill bg-danger  " >
                                Wrong:{wrongCount}
                            </span >
                        </div>


                    </div >
                </div>
                <hr></hr>

            </div >


        </>
    );
};

export default DetailedResult;