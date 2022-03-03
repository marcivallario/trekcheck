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

    console.log(formData)

    return (
         <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
                <div id="dashboard-header-content">
                    <p>March 11th, 2022 11:19 AM. Welcome, {user.first_name} {user.last_name}.</p>
                </div>
            </Header>
            <Content>
                <h1>Add New Project</h1>
                <form id="add-passenger-form" onSubmit={handleSubmit} >
                    <input placeholder="Job #" value={formData.job_no} name="job_no" onChange={handleChange}></input>
                    <input placeholder="Job Name" value={formData.job_name} name="job_name" onChange={handleChange}></input>
                    <input placeholder="Production Company" value={formData.production_co} name="production_co" onChange={handleChange}></input>
                    <input placeholder="Agency" value={formData.agency} name="agency" onChange={handleChange}></input>
                    <input placeholder="Client" value={formData.client} name="client" onChange={handleChange}></input>
                    <label htmlFor="active">Active?</label>
                    <input type="checkbox" id="active" name="active" checked={formData.active} onChange={handleCheckedChange}/>
                    <input type="submit" value="Add" />
                </form>
            </Content>
            <Footer style={{ textAlign: 'center' }}>TrekCheck © 2022. All Rights Reserved.</Footer>
        </Layout>
    )
}

export default ProjectAdd;