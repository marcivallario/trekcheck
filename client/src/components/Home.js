import { KeyOutlined, FolderOpenOutlined, ClockCircleOutlined } from '@ant-design/icons';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../styles/home.css'
import { Carousel } from 'react-responsive-carousel';


function Home() {
    return (
        <div id="home">
            <div id="banner">
                <div id="banner-content">
                    <h1>All your trips, <br/> at your fingertips.</h1>
                    <p>Their journies begin and end with you, so your peace of mind is our business.</p>
                    <a href="#about"><button id="learn-more">Our Methods</button></a>
                </div>
            </div>
            <div id="about">
                <div id="about-container">
                    <div id="about-text">
                        <h2>Project-driven travel, done right.</h2>
                        <p>When it comes to your projects, you want it done right the first time. You're balancing many plates, and you're looking for a stabilizer. TrekCheck makes tracking employee travel easy. Add projects, passengers, and trips to your dashbard to create harmony in in a seemless interface. No more messy spreadsheets and tedious data plugging.</p>
                    </div>
                    <div id="icons-container">
                        <div className="icon-content">
                            <div className="icon-img-container">
                                <KeyOutlined style={{ fontSize: '80px', color: '#9499a4' }}/>
                            </div>
                            <div className="icon-content">
                                <p>Secure</p>
                            </div>
                        </div>
                        <div className="icon-content">
                            <div className="icon-img-container">
                                <FolderOpenOutlined style={{ fontSize: '80px', color: '#9499a4' }}/>
                            </div>
                            <div className="icon-content">
                                <p>Organized</p>
                            </div>
                        </div>
                        <div className="icon-content">
                            <div className="icon-img-container">
                                <ClockCircleOutlined style={{ fontSize: '80px', color: '#9499a4' }}/>
                            </div>
                            <div className="icon-content">
                                <p>Fast</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="testimonials">
                <Carousel
                    showArrows={true}
                    infiniteLoop={true}
                    showThumbs={false}
                    showStatus={false}
                    autoPlay={true}
                    interval={3100}
                >
                    <div>
                        <div className="myCarousel">
                            <h3>Gabrielle Holland</h3>
                            <h4>Head of Logistics, Altourism Travel</h4>
                            <p>
                            TrekCheck took all the headache away from roganizing travel for my teams. I know where everyone is suppose to be and when. I can't recommend them enough! 
                            </p>
                        </div>
                    </div>

                    <div>
                        <div className="myCarousel">
                            <h3>Daniel Keystone</h3>
                            <h4>Travel Agent, Miriam Experiences</h4>
                            <p>
                            When I first started out in travel, I had massive spreadsheets and an overworked brain trying to keep up with it all. Now, I just track it all from the dashboard. Love it! 
                            </p>
                        </div>
                    </div>

                    <div>
                        <div className="myCarousel">
                            <h3>Tim Sorel</h3>
                            <h4>Production Coordinator, NewFound Film</h4>
                            <p>
                            Tracking travel for film gigs has always been a fulltime job on top of my other tasks. Now I've been able to free up brain space so that everything comes together smoothly. Can't live without it!
                            </p>
                        </div>
                    </div>
                </Carousel>
            </div>
            <div id="footer">
                <div id="footer-content">
                    <p>TrekCheck Enterprises: made &#38; maintained from Florida</p>
                    <p>info@trekcheck.travel<span className="bullet">&#8226;</span>1.800.555.4465<span className="bullet">&#8226;</span>M-F: 8am - 6pm</p>
                    <p>Copyright &copy; 2022 TrekCheck Enterprises. All Rights Reserved.</p>
                </div>
                <div id="addl-info">
                    <a href="https://travel.state.gov/content/travel/en/traveladvisories/ea/requirements-for-air-travelers-to-the-us.html"><p>US COVID Restrictions</p></a>
                    <a href="https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories.html/"><p>US Travel Alerts</p></a>
                </div>
            </div>
        </div>
    )
}

export default Home;