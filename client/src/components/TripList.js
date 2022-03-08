import { Layout, Table } from 'antd';
import { Link } from 'react-router-dom';
import { CheckOutlined,} from '@ant-design/icons';
import '../styles/triplist.css';

function PassengerList({ user, trips, onDelete }) {
    const { Header, Footer, Content } = Layout;

    function handleDelete(e) {
        let tripId = e.target.getAttribute("info");
        fetch(`/trips/${tripId}`, {
            method: 'DELETE'
            })
        .then(onDelete(tripId));
    }
   
    const columns = [
        {
            title: 'Job #',
            dataIndex: 'job_no',
            key: 'job_no',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Itinerary sent?',
            dataIndex: 'itinerary',
            key: 'itinerary'
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
        }
    ];

    const formatDateOnly = (dateString) => {
        let d = new Date(dateString)
        return (d.getMonth()+1)+'/'+d.getDate()+'/'+ d.getFullYear();
    }

    
    const data = trips.map((trip, index) => {
        return {
            key: (index),
            name: `${trip.passenger.legal_first_name} ${trip.passenger.legal_last_name}`,
            date: `${formatDateOnly(trip.depart)} — ${formatDateOnly(trip.return)}`,
            job_no: `#${trip.project.job_no}`,
            itinerary: (trip.itinerary_sent) ? <CheckOutlined /> : <div></div>,
            action: <><Link to={`/trip/${trip.id}`}>View</Link><button className="trip-delete" info={trip.id} onClick={handleDelete}>Delete</button></>
        }
    })

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
                    <div id="trip-list">
                        <h1>Trips</h1>
                        <Table
                                columns={columns}
                                dataSource={data}
                                size="small"
                                pagination={{ pageSize: 25, hideOnSinglePage: true }}
                            />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>TrekCheck © 2022. All Rights Reserved.</Footer>
            </Layout>
    )
}

export default PassengerList;