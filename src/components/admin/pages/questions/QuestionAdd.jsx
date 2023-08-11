import React, { useEffect, useState } from 'react';
import AdminMenu from "../AdminMenu";
import "../../styles/QuestionAdd.css";
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import { CKEditor } from 'ckeditor4-react';



const QuestionAdd = () => {
    const [technologies, setTechnologies] = useState([]);

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

    return (
        <>
            <AdminMenu />
            <div className="container border mt-4 p-3">
                <div>
                    <h2>Add Question</h2>
                </div>
                <hr></hr>
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
                    <CKEditor style={{'width':'match-parent', 'minHeight': '300px'}} initData="<p>This is an example CKEditor 4 WYSIWYG editor instance.</p>" />

                    </div>
                </div>

                <div className="row my-3"></div>
                <div className="row my-3"></div>
            </div>
        </>
    );
}

export default QuestionAdd;
