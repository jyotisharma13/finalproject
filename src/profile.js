import React from 'react';
import {ProfilePic} from './profilePic';
export function Profile(props){
// default
    console.log('props in profile',props);
    return(

        <div id="profile_container">
            <div id="pro_bio_comp">
                <div id="pro_photo" onClick={props.showUploader}>

                    <ProfilePic
                        id={props.id}
                        pro_pic_Url={props.pro_pic_Url}
                        showUploader={props.showUploader}
                    />
                </div>
                <div id="profileInfo">
                    <h3>{props.first} {props.last}</h3>
                </div>
            </div>
        </div>
    );
}
