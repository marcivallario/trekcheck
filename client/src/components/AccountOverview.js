import { 
    Layout, 
    Card, 
    Table
} from 'antd';
import { CheckOutlined,} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import '../styles/accountoverview.css'

function AccountOverview({ trips, projects, user, onUpdate }) {
    const { Header, Footer, Content } = Layout;

    let upcomingFlights = [];
    const today = new Date();
    if (trips.length > 0 ) {
        let tripsWithFlights = trips.filter(trip => trip.flights.length > 0)
        if (tripsWithFlights.length > 0) {
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
                upcomingFlights = tripsWithFlights.filter(trip => {
                    let differenceMs = (Date.parse(trip.flights[0].dep_time) - today) / (60 * 60 * 1000)
                    return differenceMs <= 24 && differenceMs > 0
                })
            }
        }
    }

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" }
        return new Date(dateString).toLocaleTimeString(undefined, options)
    }

    const formatDateOnly = (dateString) => {
        let d = new Date(dateString)
        return (d.getMonth()+1)+'/'+d.getDate()+'/'+ d.getFullYear();
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

    let data;
    if (trips.length > 0) {
        let sortedTrips = trips.sort((a,b) => {
                const depa = Date.parse(a.depart);
                const depb = Date.parse(b.depart);
                return depa - depb;
            })
        
        data = sortedTrips.map((trip, index) => {
            return {
                key: (index +1),
                name: `${trip.passenger.legal_first_name} ${trip.passenger.legal_last_name}`,
                project: `#${trip.project.job_no}`,
                dates: `${formatDateOnly(trip.depart)} - ${formatDateOnly(trip.return)}`,
                flight: (trip.flights.length > 0) ? <CheckOutlined /> : <div></div>,
                view: <Link to={`/trip/${trip.id}`}>View</Link>
            }
        })
    } 
    

   
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
    
    let project_data;
    if (projects.length > 0) {
        let activeProjects = projects.filter(project => project.active === true)
        project_data = activeProjects.map((project, index) => {
        return {
            key: (index + 1),
            active: <input type="checkbox" info={project.id} checked={project.active} onChange={handleActiveChange}/>,
            number: `#${project.job_no}`,
            client: project.client,
            name: `"${project.job_name}"`
        }
    })
    }

    function handleActiveChange(e) {
        const projectId = parseInt(e.target.getAttribute("info"));
        fetch(`/projects/${projectId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                active: e.target.checked
            }),
            })
        .then((r) => r.json())
        .then(onUpdate);
    }
    

    return (
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
                <div id="dashboard-header-content">
                    <p>{formatDate(today)}</p>
                    <p>Welcome, {user.first_name} {user.last_name}.</p>
                </div>
            </Header>
            <Content style={{ margin: '16px 16px' }}>
                <div id="home-small-card-row">
                    <Card className="small-dash-card" title="Flights Within 24 Hours" style={{ width: 300 }}>
                        <div id="twentyfour-grid">
                            {upcomingFlights.map(trip => {
                                return (
                                    <div className="twentyfour-item" key={trip.id}>
                                        <Card title={`${trip.passenger.legal_first_name} ${trip.passenger.legal_last_name}`}>
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
    )
}

export default AccountOverview;