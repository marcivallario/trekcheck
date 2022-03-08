import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Layout } from 'antd';
import '../styles/projectview.css'

function ProjectView({ user, projects}) {
    const params = useParams();
    const [toggleEdit, setToggleEdit] = useState(false);
    const [ project, setProject ] = useState({})
    const [ formData, setFormData ] = useState({
        user_id: user.id,
        job_no: '',
        job_name: '',
        production_co: '',
        agency: '',
        client: '',
        active: false
    })
    const { Header, Footer, Content } = Layout;

    useEffect(() => {
        if (user.id && params.projectId) {
            fetch(`/projects/${params.projectId}`)
            .then(res => res.json())
            .then(data => setProject(data))
        }
    }, [])

    useEffect(() => {
        setFormData({
        user_id: user.id,
        job_no: project.job_no,
        job_name: project.job_name,
        production_co: project.production_co,
        agency: project.agency,
        client: project.client,
        active: project.active
    })
    }, [project, user.id])

    function toggleEditForm() {
        setToggleEdit(!toggleEdit);
    }

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;
        setFormData({...formData, [key]: value})
    }

    function handleCheckedChange(e) {
        const key = e.target.name;
        const value = e.target.checked;
        setFormData({...formData, [key]: value})
    }

    function handleUpdate() {
        fetch(`/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(res => {
            if (res.ok) {
                res.json().then(updatedProject => {
                    setToggleEdit(!toggleEdit)
                    setProject(updatedProject);
                })
            } else {
                res.json()
                .then(response => console.log(response))
            }
        })
    }
    
    const today = new Date();
     const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" }
        return new Date(dateString).toLocaleTimeString(undefined, options)
    }

    if (!toggleEdit && project.id) {
        return (
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <div id="dashboard-header-content">
                        <p>{formatDate(today)}</p>
                        <p>Welcome, {user.first_name} {user.last_name}.</p>
                    </div>
                </Header>
                <Content>
                    <div id="project-view">
                        <h1>Project: #{project.job_no} {project.client} "{project.job_name}"</h1>
                        <div id="project-view-details">
                            <p className="project-view-label">Production Company: </p>
                            <p>{project.production_co}</p>
                            <p className="project-view-label">Agency: </p>
                            <p>{project.agency}</p>
                            <p className="project-view-label">Client: </p>
                            <p>{project.client}</p>
                            <label className="project-view-label" htmlFor="active">Active: </label>
                            <input type="checkbox" id="active" name="active" checked={project.active} disabled/>
                        </div>
                        <button className="project-edit" onClick={toggleEditForm}>Edit</button>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>TrekCheck © 2022. All Rights Reserved.</Footer>
            </Layout>
        )
    } else if (toggleEdit && project.id) {
        return (
            <Layout className="site-layout" onSubmit={handleUpdate}>
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <div id="dashboard-header-content">
                        <p>{formatDate(today)}</p>
                        <p>Welcome, {user.first_name} {user.last_name}.</p>
                    </div>
                </Header>
                <Content>
                    <div id="project-edit">
                        <h1>Edit Project</h1>
                        <form id="edit-project-form" >
                            <label className="edit-label" htmlFor="job_no">Job #:</label>
                            <input value={formData.job_no} name="job_no" onChange={handleChange}></input>

                            <label className="edit-label" htmlFor="job_name">Job Name:</label>
                            <input value={formData.job_name} name="job_name" onChange={handleChange}></input>

                            <label className="edit-label" htmlFor="production_co">Production Company:</label>
                            <input value={formData.production_co} name="production_co" onChange={handleChange}></input>

                            <label className="edit-label" htmlFor="agency">Agency:</label>
                            <input value={formData.agency} name="agency" onChange={handleChange}></input>

                            <label className="edit-label" htmlFor="client">Client:</label>
                            <input value={formData.client} name="client" onChange={handleChange}></input>

                            <label className="edit-label" htmlFor="active">Active?</label>
                            <input type="checkbox" id="active" name="active" checked={formData.active} onChange={handleCheckedChange}/>

                            <input className="project-edit" type="submit" value="Save Changes" />
                        </form>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>TrekCheck © 2022. All Rights Reserved.</Footer>
            </Layout>
        )
    } else {
        return(<div></div>)
    }
}

export default ProjectView;