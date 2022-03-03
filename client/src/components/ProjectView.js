import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Layout } from 'antd';

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

    if (!toggleEdit && project.id) {
        return (
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <div id="dashboard-header-content">
                        <p>March 11th, 2022 11:19 AM. Welcome, {user.first_name} {user.last_name}.</p>
                    </div>
                </Header>
                <Content>
                    <h1>Project: #{project.job_no} {project.client} "{project.job_name}"</h1>
                    <p>Production Company: {project.production_co}</p>
                    <p>Agency: {project.agency}</p>
                    <p>Client: {project.client}</p>
                    <label htmlFor="active">Active: </label>
                    <input type="checkbox" id="active" name="active" checked={project.active} disabled/>
                    <button onClick={toggleEditForm}>Edit</button>
                </Content>
                <Footer style={{ textAlign: 'center' }}>TrekCheck © 2022. All Rights Reserved.</Footer>
            </Layout>
        )
    } else if (toggleEdit && project.id) {
        return (
            <Layout className="site-layout" onSubmit={handleUpdate}>
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <div id="dashboard-header-content">
                        <p>March 11th, 2022 11:19 AM. Welcome, {user.first_name} {user.last_name}.</p>
                    </div>
                </Header>
                <Content>
                    <h1>Edit Project</h1>
                    <form id="edit-project" >
                        <input value={formData.job_no} name="job_no" onChange={handleChange}></input>
                        <input value={formData.job_name} name="job_name" onChange={handleChange}></input>
                        <input value={formData.production_co} name="production_co" onChange={handleChange}></input>
                        <input value={formData.agency} name="agency" onChange={handleChange}></input>
                        <input value={formData.client} name="client" onChange={handleChange}></input>
                        <label htmlFor="active">Active?</label>
                        <input type="checkbox" id="active" name="active" checked={formData.active} onChange={handleCheckedChange}/>
                        <input type="submit" value="Save Changes" />
                    </form>
                </Content>
                <Footer style={{ textAlign: 'center' }}>TrekCheck © 2022. All Rights Reserved.</Footer>
            </Layout>
        )
    } else {
        return(<div></div>)
    }
}

export default ProjectView;