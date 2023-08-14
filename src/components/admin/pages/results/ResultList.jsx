import React, { useState, useEffect } from "react";
import AdminMenu from "../AdminMenu";
import "../../styles/ResultList.css";
import { FormatDate } from "../../../../util/Helpers";

const ResultList = () => {
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

            const response = await fetch(`http://13.90.224.87:8099/api/CandidateExam/CandidateResultList?pageIndex=1&pageSize=500`, {
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
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];

        if (typeof aValue === 'string' || aValue instanceof String) {
            return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        } else if (typeof aValue === 'number') {
            return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        } else if (aValue instanceof Date) {
            return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        } else {
            return 0; // Default case: no sorting
        }

    };

    const clearFilter = () => {
        setSortColumn(null);
        setSortDirection('asc');
        setSearchText('');
        setCurrentPage(1);
    }

    const sortedData = data.slice().sort(compareValues);

    const filteredData = sortedData.filter(result =>
        FormatDate(result.examDate).toLowerCase().includes(searchText.toLowerCase()) ||
        result.fullname.toLowerCase().includes(searchText.toLowerCase()) ||
        String(result.obtainedScore) === (searchText.toLowerCase()) ||
        String(result.totalScore) === (searchText.toLowerCase())

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
                        <h1>Exam Results</h1>

                        <div className="d-flex">

                            <div className="input-group mb-3 mt-3 mx-5" style={{ 'scale': '1.1' }}>
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">
                                        <span className="material-icons">
                                            search
                                        </span>
                                    </span>
                                </div>
                                <input type="text"
                                    className="form-control"
                                    placeholder="Global Search"
                                    value={searchText}
                                    onChange={(e) => {
                                        setSearchText(e.target.value);
                                        setCurrentPage(1);
                                    }} />
                            </div>

                            <div className="mt-3">
                                <button className="btn btn-outline-primary" onClick={clearFilter}>
                                    <div className="d-flex">
                                        <span className="material-icons">
                                            filter_list_off
                                        </span>
                                        <span>
                                            Clear
                                        </span>
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
                                    Exam Date
                                    &nbsp;
                                    <button className="btn btn-light" onClick={() => handleSort('examDate')}>
                                        <span className="material-icons vertical-icon">
                                            {sortColumn === 'examDate' ? (sortDirection === 'asc' ? 'keyboard_double_arrow_up' : 'keyboard_double_arrow_down') : 'filter_list'}
                                        </span>
                                    </button>

                                </th>
                                <th>
                                    Candidate's Name
                                    &nbsp;
                                    <button className="btn btn-light" onClick={() => handleSort('fullname')}>
                                        <span className="material-icons vertical-icon">
                                            {sortColumn === 'fullname' ? (sortDirection === 'asc' ? 'keyboard_double_arrow_up' : 'keyboard_double_arrow_down') : 'filter_list'}
                                        </span>
                                    </button>
                                </th>
                                <th>
                                    Obtained marks
                                    &nbsp;
                                    <button className="btn btn-light" onClick={() => handleSort('obtainedScore')}>
                                        <span className="material-icons vertical-icon">
                                            {sortColumn === 'obtainedScore' ? (sortDirection === 'asc' ? 'keyboard_double_arrow_up' : 'keyboard_double_arrow_down') : 'filter_list'}
                                        </span>
                                    </button>
                                </th>
                                <th>
                                    Total Marks
                                    &nbsp;
                                    <button className="btn btn-light" onClick={() => handleSort('totalScore')}>
                                        <span className="material-icons vertical-icon">
                                            {sortColumn === 'totalScore' ? (sortDirection === 'asc' ? 'keyboard_double_arrow_up' : 'keyboard_double_arrow_down') : 'filter_list'}
                                        </span>
                                    </button>
                                </th>

                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((result) => (
                                <tr key={result.id}>
                                    <td style={{ width: '200px' }}>{FormatDate(result.examDate)}</td>
                                    <td className="ellipsis-300">
                                        {result.fullname}
                                    </td>
                                    <td>
                                        {result.obtainedScore}
                                    </td>
                                    <td>{result.totalScore}</td>
                                    <td>
                                        <button className="btn btn-warning" style={{ scale: '0.8' }}>
                                            <span className="material-icons">
                                                visibility
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
            )
            }
        </>
    );
};


export default ResultList;