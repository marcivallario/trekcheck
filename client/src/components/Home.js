import { KeyOutlined, FolderOpenOutlined, ClockCircleOutlined } from '@ant-design/icons';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../styles/home.css'
import { Carousel } from 'react-responsive-carousel';
import { NavLink } from "react-router-dom";


function Home() {
    return (
        <div id="home">
            <div id="banner">
                <div id="header">
                    <h1>All your trips, <br/> at your fingertips.</h1>
                    <p>Their journies begin and end with you, so your peace of mind is our business.</p>
                    <a href="#about"><button id="learn-more">Our Methods</button></a>
                </div>
            </div>
            <div id="about">
                <div id="about-container">
                    <div id="about-text">
                        <h2>Project-driven travel, done right.</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus proin nibh nisl condimentum id venenatis. Enim praesent elementum facilisis leo vel fringilla est ullamcorper. Netus et malesuada fames ac. Non arcu risus quis varius quam quisque id diam vel. Pretium nibh ipsum consequat nisl vel pretium. In hac habitasse platea dictumst quisque sagittis. Sed lectus vestibulum mattis ullamcorper velit. Turpis cursus in hac habitasse platea dictumst quisque sagittis. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Viverra justo nec ultrices dui.</p>
                    </div>
                    <div id="icons-container">
                        <div id="secure">
                            <div className="icon-img-container">
                                <KeyOutlined />
                            </div>
                            <div className="icon-content">
                                <h5>Secure</h5>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                        </div>
                        <div id="organized">
                            <div className="icon-img-container">
                                <FolderOpenOutlined />
                            </div>
                            <div className="icon-content">
                                <h5>Organized</h5>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                        </div>
                        <div id="fast">
                            <div className="icon-img-container">
                                <ClockCircleOutlined />
                            </div>
                            <div className="icon-content">
                                <h5>Fast</h5>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
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
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus proin nibh nisl condimentum id venenatis. 
                            </p>
                        </div>
                    </div>

                    <div>
                        <div className="myCarousel">
                            <h3>Daniel Keystone</h3>
                            <h4>Travel Agent, Miriam Experiences</h4>
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus proin nibh nisl condimentum id venenatis. 
                            </p>
                        </div>
                    </div>

                    <div>
                        <div className="myCarousel">
                            <h3>Tim Sorel</h3>
                            <h4>Production Coordinator, NewFound Film</h4>
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus proin nibh nisl condimentum id venenatis. 
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