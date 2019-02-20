import React from 'react';
import {ProfilePic} from './profilePic';
// import {SearchUsers} from './searchusers';
import { Link } from 'react-router-dom';

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

                <a>{props.first} { props.last}</a>
                <Link to="/discover" id="discover">DISCOVER</Link>


                <a href="/logout" id="logoutLink">LOGOUT</a>
                

            </div>
        </header>
    );
}

// <Link to="/online" id="onlinelink"><img src ="/online.jpg"/></Link>
// <Link to="/friends" id="friendslink"><img src="/friends.jpg" /></Link>
// <Link to="/" id="profileLink"><p>{props.first} { props.last}</p></Link>
// <Link to="/chat" id="chatlink"><p>CHAT</p></Link>
