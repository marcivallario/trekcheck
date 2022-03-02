import { Layout, Table} from 'antd';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import '../styles/passengerlist.css';

function PassengerList({ user, passengers }) {
    const { Header, Footer, Content } = Layout;
    console.log('Passengers: ', passengers)
    console.log('User:', user)
   
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Position',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
        },
        {
            title: 'Cell',
            dataIndex: 'cell',
            key: 'cell',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'View',
            dataIndex: 'view',
            key: 'view',
        }
    ];
    
    const data = passengers.map((passenger, index) => {
        return {
            key: (index),
            name: `${passenger.legal_first_name} ${passenger.legal_last_name}`,
            position: passenger.position,
            department: passenger.department,
            cell: passenger.cell,
            email: passenger.email,
            view: <><Link to={`/passengers/${passenger.id}`}>View</Link><DeleteIcon /></>
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
                    <Table
                            columns={columns}
                            dataSource={data}
                            size="small"
                            pagination={{ pageSize: 5, hideOnSinglePage: true }}
                        />
                </Content>
                <Footer style={{ textAlign: 'center' }}>TrekCheck © 2022. All Rights Reserved.</Footer>
            </Layout>
    )
}

export default PassengerList;