import React, { useState, useEffect } from "react";
import AdminMenu from "../AdminMenu";
import { useParams } from "react-router";
import "../../styles/DetailedResult.css";

const DetailedResult = (props) => {
    const { examId } = useParams();
    const { name } = useParams();
    const { userId } = useParams();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            fetchData();
            setLoading(false);
        }, 3000);
    }, );

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
                <h2>Candidate Result: {name}</h2>

            </div>


        </>
    );
};

export default DetailedResult;