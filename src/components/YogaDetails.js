import React, { Component } from "react";
import { yoga } from "../tempDetails";
// import axios from './axios';
// import {yoga} from './tempDetails';
export default class YogaDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            yoga:yoga
        };
    }
    // async componentDidMount() {
    //     const id = this.state.id;
    //     const url ='/data.json.id=${id}';
    // //     try {
    //         const data =await fetch(url);
    //         const jsonData = await data.json();
    //         this.setState((state, props)=>{return
    //     {yoga:jsonData.yoga};
    // }
    //     ()={}
    // );
    //     }.catch(error){
    //         console.log('error',error);
    //     }
    // }
    ////////////////////////////////
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         yoga:yoga,
    //         url: `https://www.food2fork.com/api/get?key=2f759d2a707a81452dd9b3f2a41ae7c7&rId=${this.props.id}`,
    //         tempId:`/data.json.id=${this.props.id}`
    //     };
    // }
    //
    componentDidMount() {

        if(this.tempId === yoga.id){
            fetch("/data.json")
                .then(r => r.json())
                .then(data => {
                    console.log('data',data);
                    this.setState(data.yoga.id);
                });
        }
        console.log('data.yoga',yoga.id,this.tempId);
        console.log("this.state ",this.state);
    }

    //     render() {
    //         console.log('temp_idm',this.state.tempId);
    //         console.log("hhhh",this.state.yoga);
    //
    //         return(
    //             <React.Fragment>
    //                 <p>Data: {JSON.stringify(this.state)}</p>
    //
    //                 {this.state.yoga.map(item => {
    //                     if (this.state.tempId === item.id) {
    //                         console.log('true');
    //                         console.log('item', item);
    //                         console.log('this.state.tempId',this.state.tempId);
    //                         console.log('item.id',item.id);
    //                         return (
    //                             <div>hello
    //                                 <div>item.steps, item.image_url</div>
    //                             </div>
    //                         );
    //                     }
    //                 })}
    //
    //             </React.Fragment>
    //         );
    //     }
    // }
    /////////////////////
    render(){
        console.log('this.props.id check',this.props.id);
        const {
            image_url,
            publisher,
            publisher_url,
            source_url,
            title,
            steps
        } = this.state.yoga;
        const {handleIndex}=this.props;
        return(

            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-10 mx-auto col-md-6 my-3">
                            <button
                                type="button"
                                className="btn btn-warning mb-5 text-capitalize"
                                onClick={()=>handleIndex(1)}
                            >
              back to yoga list
                            </button>
                            <img src={image_url} className="d-block w-100" alt="yoga" />
                        </div>
                        {/* details */}
                        <div className="col-10 mx-auto col-md-6 my-3">
                            <h6 className="text-uppercase">{title}</h6>
                            <h6 className="text-warning text-capitalize text-slanted">
                  provided by {publisher}
                            </h6>
                            <a
                                href={publisher_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary mt-2 text-capitalize"
                            >
                  publisher webpage
                            </a>
                            <a
                                href={source_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-success mt-2 mx-3 text-capitalize"
                            >
                  yoga url
                            </a>
                            <ul className="list-group mt-4">
                                <h2 className="mt-3 mb-4">Steps</h2>

                            </ul>
                        </div>
                    </div>
                </div>
            </React.Fragment>

        );
    }

}
//////////////////////////
// {steps.map((item, index) => {
//     console.log('item in details new', item);
//     console.log('index in details:', index);
//     // return (
//     //     <li key={index} className="list-group-item text-slanted">
//     //         {item}
//     //     </li>
//     // );
// })}
