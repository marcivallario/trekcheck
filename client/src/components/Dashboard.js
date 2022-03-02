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
import { useState } from 'react';
// import { NavLink } from 'react-router-dom';
import logo from '../assets/logo_white.png'
import "../styles/dashboard.css"

function Dashboard({ projects, trips }) {
    const { Header, Content, Footer, Sider } = Layout;
    const { SubMenu } = Menu;
    
    let upcomingFlights = [];
    const today = new Date();
    console.log(today);
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
        console.log(dateString)
        const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" }
        return new Date(dateString).toLocaleTimeString(undefined, options)
    }

    // let test;
    // if (tripsWithFlights.length > 0) {
    //     test = (today - Date.parse(tripsWithFlights[0].flights[0].dep_time))/ (60 * 60 * 1000);
    // }

    // test = tripsWithFlights.filter((today - Date.parse(tripsWithFlights[0].flights[0].dep_time))/ (60 * 60 * 1000))
  

    console.log('Trips with Flights (sorted in order): ', tripsWithFlights)
    console.log('Upcoming Trips: ', upcomingFlights)

//     arr.sort(function(a, b) {
//     var distancea = Math.abs(diffdate - a);
//     var distanceb = Math.abs(diffdate - b);
//     return distancea - distanceb; // sort a before b when the distance is smaller
// });

    // const then = new Date('2022-01-24T09:30:20');
    // const now = new Date();

    // const msBetweenDates = Math.abs(then.getTime() - now.getTime());

    // // 👇️ convert ms to hours                  min  sec   ms
    // const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);

    // console.log(hoursBetweenDates);

    // if (hoursBetweenDates < 24) {
    // console.log('date is within 24 hours');
    // } else {
    // console.log('date is NOT within 24 hours');
    // }



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

    const data = trips.map((trip, index) => {
        return {
            key: (index +1),
            name: `${trip.passenger.legal_first_name} ${trip.passenger.legal_last_name}`,
            project: `#${trip.project.job_no}`,
            dates: `${trip.depart} - ${trip.return}`,
            flight: (trip.flights.length > 0) ? <CheckOutlined /> : <div></div>,
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