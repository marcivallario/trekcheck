import { Layout, Table } from 'antd';
import { Link } from 'react-router-dom';
import { CheckOutlined,} from '@ant-design/icons';

function ProjectList({ user, projects, onDelete }) {
    const { Header, Footer, Content } = Layout;

    function handleDelete(e) {
        let projectId = e.target.getAttribute("info");
        fetch(`/projects/${projectId}`, {
            method: 'DELETE'
            })
        .then(onDelete(projectId));
    }
   
    const columns = [
        {
            title: 'Job #',
            dataIndex: 'job_no',
            key: 'job_no',
        },
        {
            title: 'Job Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Client',
            dataIndex: 'client',
            key: 'client',
        },
        {
            title: 'Active?',
            dataIndex: 'active',
            key: 'active'
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
        }
    ];
    
    const data = projects.map((project, index) => {
        return {
            key: (index),
            job_no: project.job_no,
            name: project.job_name,
            client: project.client,
            active: (project.active) ? <CheckOutlined /> : <div></div>,
            action: <><Link to={`/projects/${project.id}`}>View</Link><p info={project.id} onClick={handleDelete}>Delete</p></>
        }
    })

    return (
         <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <div id="dashboard-header-content">
                        <p>March 11th, 2022 11:19 AM. Welcome, {user.first_name} {user.last_name}.</p>
                    </div>
                </Header>
                <Content>
                    <h1>Projects</h1>
                    <Table
                            columns={columns}
                            dataSource={data}
                            size="small"
                            pagination={{ pageSize: 25, hideOnSinglePage: true }}
                        />
                </Content>
                <Footer style={{ textAlign: 'center' }}>TrekCheck © 2022. All Rights Reserved.</Footer>
            </Layout>
    )
}

export default ProjectList;