import React, { useState, useEffect } from "react";
import AdminMenu from "../AdminMenu";
import "../../styles/QuestionList.css";

const QuestionList = () => {
    const [data, setData] = useState([]);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch('http://13.90.224.87:8099/api/Questions/GetAllAsync?pageIndex=1&pageSize=500', {
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

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const sortedData = data.slice().sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    });

    return (
        <>
            <AdminMenu />
            <div className="px-2">

                <div className="d-flex flex-row justify-content-between">
                    <h1>Manage Questions</h1>

                    <div className="mt-2">
                        <button className="btn btn-primary">
                            <div className="d-flex flex-row">
                                <span class="material-icons">
                                    add
                                </span>
                                <span>Add</span>
                            </div>
                        </button>
                    </div>

                </div>


                <hr></hr>
                <table className="table">
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('id')}>Technology</th>
                            <th onClick={() => handleSort('questionName')}>Question</th>
                            <th onClick={() => handleSort('marks')}>Experience Level</th>
                            <th onClick={() => handleSort('timeSlot')}>Active</th>
                            <th>Created On</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((question) => (
                            <tr key={question.id}>
                                <td style={{ 'width': '200px' }}>{question.technology}</td>
                                <td className="ellipsis-200" >{question.questionName}</td>
                                <td>{question.experienceLevel}</td>
                                <td>{question.active}</td>
                                <td>{question.createdOn}</td>
                                <td>
                                    <button className="btn btn-warning">
                                        <span class="material-icons">
                                            edit_square
                                        </span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};


export default QuestionList;