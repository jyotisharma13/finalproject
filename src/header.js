import React from 'react';
import {ProfilePic} from './profilePic';
// import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Dropdown from './dropdown';
export function Header(props) {
    return (
        <header>
            <div className="header-content">
                <img id="logo_img1" src="/logo.png" />
                <ProfilePic
                    first={props.first}
                    last={props.last}
                    pro_pic_Url={props.pro_pic_Url}
                    showUploader={props.showUploader}
                />

                <Link to="/" className="text-capitalize">{props.first} { props.last}</Link>
                <Link to="/HealthProblems" id="about">HEALTH PROBLEMS</Link>
                <Link to="/team" id="team">HEALTH TIPS</Link>
                <a href="/fav">FAVOURITE</a>
                <Dropdown />
                <a href="/logout" id="logoutLink">LOGOUT</a>


            </div>
        </header>
    );
}

// <Link to="/online" id="onlinelink"><img src ="/online.jpg"/></Link>
// <Link to="/friends" id="friendslink"><img src="/friends.jpg" /></Link>
// <Link to="/" id="profileLink"><p>{props.first} { props.last}</p></Link>
// <Link to="/chat" id="chatlink"><p>CHAT</p></Link>
// <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
//   <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//   <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
//   <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
//   <NavDropdown.Divider />
//   <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
// </NavDropdown>
