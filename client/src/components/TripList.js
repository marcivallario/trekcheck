import { Layout, Table } from 'antd';
import { Link } from 'react-router-dom';
import { CheckOutlined,} from '@ant-design/icons';
import '../styles/passengerlist.css';

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
    
    const data = trips.map((trip, index) => {
        return {
            key: (index),
            name: `${trip.passenger.legal_first_name} ${trip.passenger.legal_last_name}`,
            date: `${trip.depart} — ${trip.return}`,
            job_no: `#${trip.project.job_no}`,
            itinerary: (trip.itinerary_sent) ? <CheckOutlined /> : <div></div>,
            action: <><Link to={`/trip/${trip.id}`}>View</Link><p info={trip.id} onClick={handleDelete}>Delete</p></>
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
                    <h1>Trips</h1>
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

export default PassengerList;