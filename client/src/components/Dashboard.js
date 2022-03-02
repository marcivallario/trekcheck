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
import { Link, useHistory } from 'react-router-dom';
import logo from '../assets/logo_white.png'
import "../styles/dashboard.css"

function Dashboard({ projects, trips, setUser }) {
    const { Header, Content, Footer, Sider } = Layout;
    const { SubMenu } = Menu;

    let history = useHistory();
    function handleLogout() {
        fetch('/logout', {
            method: 'DELETE'
        })
        .then(setUser(''))
        .then(history.push('/'))
    }
    
    let upcomingFlights = [];
    const today = new Date();
    let tripsWithFlights = trips.filter(trip => trip.flights.length > 0)
    tripsWithFlights.forEach(trip => {
        trip.flights.sort((a,b) => {
            const distancea = Math.abs(today - Date.parse(a.dep_time));
            const distanceb = Math.abs(today - Date.parse(b.dep_time));
            return distancea - distanceb;
        })
    })
    tripsWithFlights.sort((a,b) => {
        const distancea = Math.abs(today - Date.parse(a.flights[0].dep_time));
        const distanceb = Math.abs(today - Date.parse(b.flights[0].dep_time));
        return distancea - distanceb;
    })
    if (tripsWithFlights.length > 0) {
        upcomingFlights = tripsWithFlights.filter(trip => ((Date.parse(trip.flights[0].dep_time) - today)/ (60 * 60 * 1000)) <= 24)
    }

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" }
        return new Date(dateString).toLocaleTimeString(undefined, options)
    }

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
            dataIndex: 'view'
        },
    ];

    const data = trips.map((trip, index) => {
        return {
            key: (index +1),
            name: `${trip.passenger.legal_first_name} ${trip.passenger.legal_last_name}`,
            project: `#${trip.project.job_no}`,
            dates: `${trip.depart} - ${trip.return}`,
            flight: (trip.flights.length > 0) ? <CheckOutlined /> : <div></div>,
            view: <Link to={`/trips/${trip.id}`}>View</Link>
        }
    })

   
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
                        <Link to='/' exact>Dashboard</Link>
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined />} title="Passengers">
                        <Menu.Item key="2"><Link to='/passengers/add'>Add Passenger</Link></Menu.Item>
                        <Menu.Item key="3"><Link to='/passengers/' exact>View Profiles</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<IdcardOutlined />} title="Trips">
                        <Menu.Item key="4"><Link to='/trips/add'>Add Trip</Link></Menu.Item>
                        <Menu.Item key="5"><Link to='/trips'>View Trips</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" icon={<FolderOpenOutlined />} title="Projects">
                        <Menu.Item key="6"><Link to='/projects/add'>Add Project</Link></Menu.Item>
                        <Menu.Item key="7"><Link to='/projects'>View Projects</Link></Menu.Item>
                    </SubMenu>
                    <Menu.Item key="8" icon={<DesktopOutlined />}>
                        <a href="https://flightaware.com/" target='_blank'>Flight Aware</a>
                    </Menu.Item>
                    <Menu.Item key="9" icon={<GlobalOutlined />}>
                        <a href="https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories.html/" target='_blank'>US Travel Alerts</a>
                    </Menu.Item>
                    <Menu.Item key="10" icon={<LogoutOutlined />} onClick={handleLogout}>
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
                                {upcomingFlights.map(trip => {
                                    return (
                                        <div className="twentyfour-item" key={trip.id}>
                                            <Card>
                                                <p>{trip.passenger.legal_first_name} {trip.passenger.legal_last_name}</p>
                                                <p>{trip.flights[0].airline}</p>
                                                <p>Flight #{trip.flights[0].flight_no}</p>
                                                <p>Departs at {formatDate(trip.flights[0].dep_time)}</p>
                                                <p>Conf #: {trip.flights[0].confirmation}</p>
                                            </Card>
                                        </div>
                                    )
                                })}
                            </div>
                        </Card>
                        <Card className="small-dash-card" title="Projects" extra={<Link to='/projects'>View All</Link>} style={{ width: 300 }}>
                            <Table
                                columns={project_columns}
                                dataSource={project_data}
                                size="small"
                                pagination={{ pageSize: 5, hideOnSinglePage: true }}
                            />
                        </Card>
                    </div>
                    <div id="upcoming-travel" >
                        <Card title="Upcoming Travel" extra={<Link to='/trips'>View All</Link>} style={{ minHeight: 360 }}>
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