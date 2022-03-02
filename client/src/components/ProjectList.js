import { Layout } from 'antd';

function ProjectList() {
    const { Header, Footer, Content } = Layout;
    return (
         <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <div id="dashboard-header-content">
                        <p>March 11th, 2022 11:19 AM. Welcome, User.</p>
                    </div>
                </Header>
                <Content>
                    <p>Testing ProjectList</p>
                </Content>
                <Footer style={{ textAlign: 'center' }}>TrekCheck © 2022. All Rights Reserved.</Footer>
            </Layout>
    )
}

export default ProjectList;