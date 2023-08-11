// import React, { useEffect, useState } from 'react';
// import AdminMenu from "../AdminMenu";
// import "../../styles/QuestionAdd.css";
// import BootstrapSwitchButton from 'bootstrap-switch-button-react';
// import { CKEditor } from 'ckeditor4-react';



// const QuestionAdd = () => {
//     const [technologies, setTechnologies] = useState([]);

//     useEffect(() => {
//         fetchTechnologies();
//     }, []);

//     const fetchTechnologies = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             const techResponse = await fetch(`http://13.90.224.87:8099/api/TechnologyStack/GetAllAsync`, {
//                 method: "GET",
//                 headers: {
//                     Accept: "application/json",
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             const techsJson = await techResponse.json();
//             const fetchedTechnologies = techsJson.response;
//             setTechnologies(fetchedTechnologies);
//         } catch (error) {
//             console.error('Error fetching techstack:', error);
//         }
//     }

//     return (
//         <>
//             <AdminMenu />
//             <div className="container border mt-4 p-3">
//                 <div>
//                     <h2>Add Question</h2>
//                 </div>
//                 <hr></hr>
//                 <div className="row my-3">
//                     <div className="col">
//                         <div>
//                             <label>Technology</label>
//                             <select className='form-control' name="technology" id="technology">
//                                 <option value="">Select a technology</option>
//                                 {technologies.map(tech => (
//                                     <option key={tech.id} value={tech.id}>{tech.technologyName}</option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>
//                     <div className="col">
//                         <div>
//                             <label>Experience Level</label>
//                             <select className='form-control' name="technology" id="technology">
//                                 <option value="">Select an experience level</option>
//                                 <option value="1">Beginner</option>
//                                 <option value="2">Intermediate</option>
//                                 <option value="3">Experienced</option>

//                             </select>
//                         </div>
//                     </div>
//                     <div className="col">
//                         <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//                             <label >Active Status</label>
//                             <div style={{ scale: 0.6 }}>
//                                 <BootstrapSwitchButton
//                                     onlabel='✓'
//                                     offlabel='✘'
//                                     checked={true}
//                                     onstyle="primary"
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="row my-3">
//                     <div className="col">
//                     <CKEditor style={{'width':'match-parent', 'minHeight': '300px'}} initData="<p>This is an example CKEditor 4 WYSIWYG editor instance.</p>" />

//                     </div>
//                 </div>

//                 <div className="row my-3"></div>
//                 <div className="row my-3"></div>
//             </div>
//         </>
//     );
// }

// export default QuestionAdd;


import React, { useEffect, useState } from 'react';
import AdminMenu from "../AdminMenu";
import "../../styles/QuestionAdd.css";
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import { CKEditor } from 'ckeditor4-react';

const QuestionAdd = () => {
    const [technologies, setTechnologies] = useState([]);
    const [inputRows, setInputRows] = useState([{ input: '', select: '', switch: true }]);

    useEffect(() => {
        fetchTechnologies();
    }, []);

    const fetchTechnologies = async () => {
        try {
            const token = localStorage.getItem('token');
            const techResponse = await fetch(`http://13.90.224.87:8099/api/TechnologyStack/GetAllAsync`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const techsJson = await techResponse.json();
            const fetchedTechnologies = techsJson.response;
            setTechnologies(fetchedTechnologies);
        } catch (error) {
            console.error('Error fetching techstack:', error);
        }
    }

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newInputRows = [...inputRows];
        newInputRows[index][name] = value;
        setInputRows(newInputRows);
    };

    const handleSwitchChange = (index) => {
        const newInputRows = [...inputRows];
        newInputRows[index].switch = !newInputRows[index].switch;
        setInputRows(newInputRows);
    };

    const handleAddRow = () => {
        setInputRows([...inputRows, { input: '', select: '', switch: true }]);
    };

    const handleDeleteRow = (index) => {
        const newInputRows = [...inputRows];
        newInputRows.splice(index, 1);
        setInputRows(newInputRows);
    };

    return (
        <>
            <AdminMenu />
            <div className="container border rounded-4 mt-4 p-3">
                <div>
                    <h2>Add Question</h2>
                </div>
                <hr />

                <div className="row my-3">
                    <div className="col">
                        <div>
                            <label>Technology</label>
                            <select className='form-control' name="technology" id="technology">
                                <option value="">Select a technology</option>
                                {technologies.map(tech => (
                                    <option key={tech.id} value={tech.id}>{tech.technologyName}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col">
                        <div>
                            <label>Experience Level</label>
                            <select className='form-control' name="technology" id="technology">
                                <option value="">Select an experience level</option>
                                <option value="1">Beginner</option>
                                <option value="2">Intermediate</option>
                                <option value="3">Experienced</option>
                            </select>
                        </div>
                    </div>
                    <div className="col">
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <label >Active Status</label>
                            <div style={{ scale: 0.6 }}>
                                <BootstrapSwitchButton
                                    onlabel='✓'
                                    offlabel='✘'
                                    checked={true}
                                    onstyle="primary"
                                />
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row my-3">
                    <div className="col">
                        <CKEditor style={{ width: 'match-parent', minHeight: '300px' }} initData="<p></p>" />
                    </div>
                </div>

                <div className="row my-3">
                    <div className="col">
                        <button className="btn btn-success" onClick={handleAddRow}>
                            <div className="d-flex">
                                <span>Add Option</span>
                                <span class="material-icons">
                                    add
                                </span>
                            </div>

                        </button>
                    </div>
                </div>

                <div className="row">
                    {inputRows.map((row, index) => (
                        <div>
                            <span>option: {index + 1}</span>
                            <div className="row my-3" key={index}>

                                <div className="col">
                                    <label>Question Option Name</label>
                                    <input
                                        type="text"
                                        name="input"
                                        value={row.input}
                                        onChange={(e) => handleInputChange(index, e)}
                                        className="form-control"
                                        placeholder="Input"
                                    />
                                </div>
                                <div className="col">
                                    <label>Question Option Label</label>
                                    <select
                                        name="select"
                                        value={row.select}
                                        onChange={(e) => handleInputChange(index, e)}
                                        className="form-control"
                                    >
                                        <option value="">Select option label</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                        <option value="D">D</option>

                                    </select>
                                </div>
                                <div className="col">
                                    <label>Correct Option</label>
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                        <BootstrapSwitchButton
                                            onlabel='✓'
                                            offlabel='✘'
                                            checked={row.switch}
                                            onstyle="primary"
                                            onChange={() => handleSwitchChange(index)}
                                        />
                                    </div>
                                </div>
                                <div className="col mt-1">
                                    <button className="btn btn-danger" style={{ scale: '0.8' }} onClick={() => handleDeleteRow(index)}>
                                        <span class="material-icons">
                                            delete_outline
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

                <div class="row my-5">
                    <div class="col-6 offset-3">
                        <div class="d-grid">
                            <button type="submit" class="btn btn-primary">Add Question</button>
                    </div>
                </div>
            </div>


        </div >
        </>
    );
}

export default QuestionAdd;

