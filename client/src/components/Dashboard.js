import PassengerAdd from './PassengerAdd';
import AccountOverview from './AccountOverview';
import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  GlobalOutlined,
  LogoutOutlined,
  IdcardOutlined,
  UserOutlined,
  FolderOpenOutlined,
  HomeOutlined
} from '@ant-design/icons';
import { Route, Switch, Link, useHistory } from 'react-router-dom';
import logo from '../assets/logo_white.png'
import "../styles/dashboard.css"

function Dashboard({ projects, trips, setUser, passengers }) {
    const { Content, Sider } = Layout;
    const { SubMenu } = Menu;

    let history = useHistory();
    function handleLogout() {
        fetch('/logout', {
            method: 'DELETE'
        })
        .then(setUser(''))
        .then(history.push('/'))
    }

    return (
      <div id="dashboard">
        <Switch>
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
                            <a href="https://flightaware.com/" target='_blank' rel="noreferrer">Flight Aware</a>
                        </Menu.Item>
                        <Menu.Item key="9" icon={<GlobalOutlined />}>
                            <a href="https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories.html/" target='_blank' rel="noreferrer">US Travel Alerts</a>
                        </Menu.Item>
                        <Menu.Item key="10" icon={<LogoutOutlined />} onClick={handleLogout}>
                        Logout
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Content>
                    <Route path="/passengers/add">
                        <PassengerAdd passengers={passengers}/>
                    </Route>
                    <Route exact path="/">
                        <AccountOverview trips={trips} projects={projects}/>
                    </Route>
                </Content>
            </Layout>
        </Switch>
      </div>
    );
  }

export default Dashboard;