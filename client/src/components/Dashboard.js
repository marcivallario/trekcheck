import { 
    Layout, 
    Menu, 
    Card, 
    Table,
    Switch
} from 'antd';
import {
  DesktopOutlined,
  GlobalOutlined,
  LogoutOutlined,
  IdcardOutlined,
  UserOutlined,
  FolderOpenOutlined,
  HomeOutlined,
  CheckOutlined
} from '@ant-design/icons';
// import { NavLink } from 'react-router-dom';
import logo from '../assets/logo_white.png'
import "../styles/dashboard.css"

function Dashboard({ projects }) {
    const { Header, Content, Footer, Sider } = Layout;
    const { SubMenu } = Menu;

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Project',
            dataIndex: 'project',
            key: 'project',
        },
        {
            title: 'Dates',
            dataIndex: 'dates',
            key: 'dates',
        },
        {
            title: 'Flight?',
            key: 'flight',
            dataIndex: 'flight',
        },
        {
            title: 'View',
            key: 'view',
            render: () => <a>View</a>
        },
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            project: 3,
            dates: 'March 12 - 14, 2022',
            flight: <CheckOutlined />
        },
       {
            key: '2',
            name: 'Jane Doe',
            project: 2,
            dates: 'March 11 - 13, 2022',
            flight: {},
        },
        {
            key: '3',
            name: 'Jack Smith',
            project: 3,
            dates: 'March 11 - 14, 2022',
            flight: <CheckOutlined />
        },
    ];

   
    const project_columns = [
        {
            title: 'Active',
            dataIndex: 'active',
            key: 'active',
        },
        {
            title: 'Job Number',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: 'Client',
            dataIndex: 'client',
            key: 'client',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        }
    ];

    let activeProjects = projects.filter(project => project.active === true)
    const project_data = activeProjects.map((project, index) => {
        return {
            key: (index + 1),
            active: <Switch defaultChecked />,
            number: `#${project.job_no}`,
            client: project.client,
            name: `"${project.job_name}"`
        }
    })

    return (
      <div id="dashboard">
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible>
                <div className="logo">
                    <img src={logo} alt="logo"/> 
                </div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                        Dashboard
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined />} title="Passengers">
                        <Menu.Item key="2">Add Passenger</Menu.Item>
                        <Menu.Item key="3">View Profiles</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<IdcardOutlined />} title="Trips">
                        <Menu.Item key="4">Add Trip</Menu.Item>
                        <Menu.Item key="5">View Trips</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" icon={<FolderOpenOutlined />} title="Projects">
                        <Menu.Item key="6">Add Project</Menu.Item>
                        <Menu.Item key="7">View Projects</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="8" icon={<DesktopOutlined />}>
                    Flight Aware
                    </Menu.Item>
                    <Menu.Item key="9" icon={<GlobalOutlined />}>
                        US Travel Alerts
                    </Menu.Item>
                    <Menu.Item key="10" icon={<LogoutOutlined />}>
                    Logout
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <div id="dashboard-header-content">
                        <p>March 11th, 2022 11:19 AM. Welcome, User.</p>
                    </div>
                </Header>
                <Content style={{ margin: '16px 16px' }}>
                    <div id="home-small-card-row">
                        <Card className="small-dash-card" title="Flights Within 24 Hours" style={{ width: 300 }}>
                            <div id="twentyfour-grid">
                                <div className="twentyfour-item">
                                    <Card>
                                        <p>John Brown</p>
                                        <p>American Airlines</p>
                                        <p>Flight #DL443</p>
                                        <p>Departs at 4:43am</p>
                                        <p>Conf #: 43JKD4</p>
                                    </Card>
                                </div>
                                <div className="twentyfour-item">
                                    <Card>
                                        <p>John Brown</p>
                                        <p>American Airlines</p>
                                        <p>Flight #DL443</p>
                                        <p>Departs at 4:43am</p>
                                        <p>Conf #: 43JKD4</p>
                                    </Card>
                                </div>
                                <div className="twentyfour-item">
                                    <Card>
                                        <p>John Brown</p>
                                        <p>American Airlines</p>
                                        <p>Flight #DL443</p>
                                        <p>Departs at 4:43am</p>
                                        <p>Conf #: 43JKD4</p>
                                    </Card>
                                </div>
                            </div>
                        </Card>
                        <Card className="small-dash-card" title="Projects" extra={<a href="#">View All</a>} style={{ width: 300 }}>
                            <Table
                                columns={project_columns}
                                dataSource={project_data}
                                size="small"
                                pagination={{ pageSize: 5, hideOnSinglePage: true }}
                            />
                        </Card>
                    </div>
                    <div id="upcoming-travel" >
                        <Card title="Upcoming Travel" extra={<a href="#">View All</a>} style={{ minHeight: 360 }}>
                            <Table 
                                columns={columns} 
                                dataSource={data} 
                                size="small"
                                pagination={{ pageSize: 10, hideOnSinglePage: true }}
                            />
                        </Card>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>TrekCheck © 2022. All Rights Reserved.</Footer>
            </Layout>
        </Layout>
      </div>
    );
  }

export default Dashboard;