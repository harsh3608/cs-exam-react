import React, { useState, useEffect } from "react";
import AdminMenu from "../AdminMenu";
import { useParams } from "react-router";
import "../../styles/DetailedResult.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const DetailedResult = (props) => {
    const { examId, name, userId } = useParams();

    const [correctQuestions, setCorrect] = useState([]);
    const [wrongQuestions, setWrong] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [rightCount, setRightCount] = useState(0);
    const [wrongCount, setWrongCount] = useState(0);

    const [activeBadge, setActiveBadge] = useState('total'); // Initialize with 'total'

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();


    }, []);

    const fetchData = async () => {
        const token = localStorage.getItem('token');

        try {
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
                segregateData(json.response);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const segregateData = (responseData) => {
        const correctArr = responseData.filter(element => element.isCorrect);
        const wrongArr = responseData.filter(element => !element.isCorrect);

        setCorrect(correctArr);
        setWrong(wrongArr);
        setRightCount(correctArr.length);
        setWrongCount(wrongArr.length);
        setTotalCount(responseData.length);
    };

    const handleBadgeClick = (badge) => {
        setActiveBadge(badge);
    };

    const getActiveArray = () => {
        if (activeBadge === 'total') {
            return [...correctQuestions, ...wrongQuestions];
        } else if (activeBadge === 'correct') {
            return correctQuestions;
        } else if (activeBadge === 'wrong') {
            return wrongQuestions;
        }
    };

    return (
        <>
            <AdminMenu />
            {loading ? (
                <div style={{ marginTop: '20%', marginLeft: '45%' }}>
                    <div className="lds-facebook"><div></div><div></div><div></div></div>
                </div>
            ) : (
                <div className="container-1 border rounded-3 ">
                    <div className="row">
                        <div className="row">
                            <div className="col text-center p-2 mb-3 ">
                                <span className="fs-2">Candidate Result: {name}</span>
                            </div>
                        </div>

                        <div className="d-flex mt-2 mb-3 w-50 justify-content-between">
                            <div style={{ marginLeft: '10%' }}>
                                <span className={`badge btn rounded-pill ${activeBadge === 'total' ? 'bg-primary' : 'bg-secondary'}`} onClick={() => handleBadgeClick('total')}>
                                    Total Questions: {totalCount}
                                </span>
                            </div>
                            <div>
                                <span className={`badge btn rounded-pill ${activeBadge === 'correct' ? 'bg-success' : 'bg-secondary'}`} onClick={() => handleBadgeClick('correct')}>
                                    Correct: {rightCount}
                                </span>
                            </div>
                            <div>
                                <span className={`badge btn rounded-pill ${activeBadge === 'wrong' ? 'bg-danger' : 'bg-secondary'}`} onClick={() => handleBadgeClick('wrong')}>
                                    Wrong: {wrongCount}
                                </span>
                            </div>
                        </div>
                    </div>
                    <hr></hr>

                    <div>
                        {getActiveArray().map((question, index) => (
                            <div key={index}>
                                <div className="border rounded-2 m-3 ">
                                    <div className="bg-light d-flex justify-content-between m-2">
                                        <div>
                                            <span >
                                                {
                                                    question.isCorrect ?
                                                        (
                                                            <span className="mt-3 mx-2 material-icons text-success" style={{ scale: '1.2' }}>
                                                                check_circle
                                                            </span>
                                                        ) : (
                                                            <span className="mt-3 mx-2 material-icons text-danger" style={{ transform: 'rotate(45deg)', scale: '1.2' }}>
                                                                add_circle
                                                            </span>
                                                        )
                                                }

                                            </span>
                                        </div>
                                        <div className="m-2">
                                            <h4>{question.technology}</h4>
                                        </div>
                                        <div>
                                            <span className="badge bg-warning my-3 mx-4"  >Marks: {question.marks}</span>
                                        </div>
                                    </div>

                                    <div className=" m-3">
                                        <ReactQuill value={question.question} readOnly style={{ minHeight: '200px' }} />
                                    </div>

                                    <div className="d-flex">
                                        <div>
                                            <span className="badge bg-primary mx-5 my-3">Correct Answer: {question.correctAnswer}</span>
                                        </div>
                                        {
                                            question.userSelectedAnswer ?
                                                (

                                                    <span className={`badge mx-5 my-3 ${question.userSelectedAnswer === question.correctAnswer ? 'bg-success' : 'bg-danger'}`}>User Selected Answer: {question.userSelectedAnswer}</span>
                                                ) : (
                                                    <span className="wrong badge bg-danger mx-5 my-3">skipped</span>
                                                )

                                        }

                                    </div>
                                </div>



                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default DetailedResult;
