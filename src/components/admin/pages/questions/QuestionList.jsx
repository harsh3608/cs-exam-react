import React, { useState, useEffect } from "react";
import AdminMenu from "../AdminMenu";
import "../../styles/QuestionList.css";
import { FormatDate } from "../../../../util/Helpers";

const QuestionList = () => {
    const [data, setData] = useState([]);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        fetchData();
    }, [currentPage, rowsPerPage]);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`http://13.90.224.87:8099/api/Questions/GetAllAsync?pageIndex=1&pageSize=500`, {
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

    const lastIndex = currentPage * rowsPerPage;
    const firstIndex = lastIndex - rowsPerPage;
    const currentData = sortedData.slice(firstIndex, lastIndex);

    return (
        <>
            <AdminMenu />
            <div className="px-2">
                <div className="d-flex flex-row justify-content-between">
                    <h1>Manage Questions</h1>
                    <div className="mt-2">
                        <button className="btn btn-primary">
                            <div className="d-flex flex-row">
                                <span className="material-icons">
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
                            <th >
                                Technology
                                <button onClick={() => handleSort('technology')}>
                                    <span className="material-icons vertical-icon">
                                        {sortColumn === 'technology' ? (sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward') : 'sync_alt'}
                                    </span>
                                </button>

                            </th>
                            <th onClick={() => handleSort('questionName')}>Question</th>
                            <th onClick={() => handleSort('experienceLevel')}>Experience Level</th>
                            <th onClick={() => handleSort('active')}>Active</th>
                            <th onClick={() => handleSort('createdOn')}>Created On</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((question) => (
                            <tr key={question.id}>
                                <td style={{ width: '200px' }}>{question.technology}</td>
                                <td className="ellipsis-300">{question.questionName}</td>
                                <td>{question.experienceLevel}</td>
                                <td>{question.active}</td>
                                <td>{FormatDate(question.createdOn)}</td>
                                <td>
                                    <button className="btn btn-warning">
                                        <span className="material-icons">
                                            edit_square
                                        </span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>


                <div className="d-flex flex-row justify-content-around m-4">

                    <div className="entries-count">
                        <h5 className="mt-2">
                            Showing {Math.min(firstIndex + 1, sortedData.length)} to {Math.min(lastIndex, sortedData.length)} of {sortedData.length} entries
                        </h5>
                    </div>

                    <div className="pagination">
                        <button className="btn btn-link"
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1} >
                            <div className="d-flex">
                                <span class="material-icons">
                                    keyboard_double_arrow_left
                                </span>
                            </div>
                        </button>

                        &nbsp;&nbsp;

                        <h5 className="mt-2">Page {currentPage}</h5>

                        &nbsp;&nbsp;

                        <button
                            className="btn btn-link"
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={lastIndex >= sortedData.length}>
                            <div className="d-flex">
                                <span class="material-icons">
                                    keyboard_double_arrow_right
                                </span></div>
                        </button>

                    </div>

                    <div className="rows-per-page d-flex">
                        <h5 className="mt-2">Rows per page:</h5>
                        &nbsp;
                        <select
                            value={rowsPerPage}
                            onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </div>

                </div>

            </div>
        </>
    );
};

export default QuestionList;