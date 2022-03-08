import { Layout } from 'antd';
import { useState } from 'react';

function ProjectAdd({ user, onAdd }) {
    const { Header, Footer, Content } = Layout;
    const [ formData, setFormData ] = useState({
        user_id: user.id,
        job_no: '',
        job_name: '',
        production_co: '',
        agency: '',
        client: '',
        active: false
    })

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

    function handleSubmit(e) {
        e.preventDefault();
        fetch('/projects', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
            })
            .then(resp => resp.json())
            .then(newProject => {
                onAdd(newProject)
        })
    }
    const today = new Date();

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" }
        return new Date(dateString).toLocaleTimeString(undefined, options)
    }

    return (
         <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
                <div id="dashboard-header-content">
                    <p>{formatDate(today)}</p>
                    <p>Welcome, {user.first_name} {user.last_name}.</p>
                </div>
            </Header>
            <Content>
                <div id="project-add">
                    <h1>Add New Project</h1>
                    <form id="add-passenger-form" onSubmit={handleSubmit} >
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
}

export default ProjectAdd;