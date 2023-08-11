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
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        setTimeout(() => {
            fetchData();
            setLoading(false);
        }, 3000);
    }, [currentPage, rowsPerPage, searchText]);

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

    const compareValues = (a, b) => {
        // ... (same as before)
    };

    const sortedData = data.slice().sort(compareValues);

    const filteredData = sortedData.filter(question =>
        question.technology.toLowerCase().includes(searchText.toLowerCase()) ||
        question.questionName.toLowerCase().includes(searchText.toLowerCase()) ||
        question.experienceLevel.toLowerCase().includes(searchText.toLowerCase()) ||
        question.active.toString().toLowerCase().includes(searchText.toLowerCase()) ||
        FormatDate(question.createdOn).toLowerCase().includes(searchText.toLowerCase())
    );

    const lastIndex = currentPage * rowsPerPage;
    const firstIndex = lastIndex - rowsPerPage;

    const currentData = filteredData.slice(firstIndex, lastIndex);
    const totalFilteredEntries = filteredData.length;

    return (
        <>
            <AdminMenu />
            {loading ? (
                <div style={{ 'marginTop': '20%', 'marginLeft': '45%' }}>
                    {/* <div className="spinner-border text-info" style={{'scale':'2.0'}}></div> */}

                    <div className="lds-facebook"><div></div><div></div><div></div></div>

                </div>
            ) : (
                <div className="px-2">
                    <div className="d-flex flex-row justify-content-between">
                        <h1>Manage Questions</h1>

                        <div className="d-flex">
                            <div className="search-box mx-5">
                                <input
                                    className="form-control mt-3 "
                                    type="text"
                                    placeholder= "Global Search"
                                    value={searchText}
                                    onChange={(e) => {
                                        setSearchText(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    style={{'scale':'1.2'}}
                                />
                                <span className="icon-container">
                                    <span class="material-icons">
                                        search
                                    </span>
                                </span>
                            </div>

                            <div className="mt-3">
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
                    </div>
                    <hr></hr>
                    <table className="table">
                        <thead>
                            <tr>
                                <th >
                                    Technology
                                    &nbsp;
                                    <button className="btn btn-light" onClick={() => handleSort('technology')}>
                                        <span className="material-icons vertical-icon">
                                            {sortColumn === 'technology' ? (sortDirection === 'asc' ? 'keyboard_double_arrow_up' : 'keyboard_double_arrow_down') : 'filter_list'}
                                        </span>
                                    </button>

                                </th>
                                <th>
                                    Question
                                    &nbsp;
                                    <button className="btn btn-light" onClick={() => handleSort('questionName')}>
                                        <span className="material-icons vertical-icon">
                                            {sortColumn === 'questionName' ? (sortDirection === 'asc' ? 'keyboard_double_arrow_up' : 'keyboard_double_arrow_down') : 'filter_list'}
                                        </span>
                                    </button>
                                </th>
                                <th>
                                    Experience Level
                                    &nbsp;
                                    <button className="btn btn-light" onClick={() => handleSort('experienceLevel')}>
                                        <span className="material-icons vertical-icon">
                                            {sortColumn === 'experienceLevel' ? (sortDirection === 'asc' ? 'keyboard_double_arrow_up' : 'keyboard_double_arrow_down') : 'filter_list'}
                                        </span>
                                    </button>
                                </th>
                                <th>
                                    Active
                                    &nbsp;
                                    <button className="btn btn-light" onClick={() => handleSort('active')}>
                                        <span className="material-icons vertical-icon">
                                            {sortColumn === 'active' ? (sortDirection === 'asc' ? 'keyboard_double_arrow_up' : 'keyboard_double_arrow_down') : 'filter_list'}
                                        </span>
                                    </button>
                                </th>
                                <th>
                                    Created On
                                    &nbsp;
                                    <button className="btn btn-light" onClick={() => handleSort('createdOn')}>
                                        <span className="material-icons vertical-icon">
                                            {sortColumn === 'createdOn' ? (sortDirection === 'asc' ? 'keyboard_double_arrow_up' : 'keyboard_double_arrow_down') : 'filter_list'}
                                        </span>
                                    </button>
                                </th>
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
                                Showing {Math.min(firstIndex + 1, totalFilteredEntries)} to {Math.min(lastIndex, totalFilteredEntries)} of {totalFilteredEntries} entries
                            </h5>
                        </div>

                        <div className="pagination">
                            <button className="btn btn-link"
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1} >
                                <div className="d-flex">
                                    <span className="material-icons">
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
                                    <span className="material-icons">
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
            )}

        </>
    );
};

export default QuestionList;
