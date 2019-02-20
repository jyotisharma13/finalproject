import React, { Component } from "react";
import { yoga } from "../tempDetails";
// import axios from './axios';
// import {yoga} from './tempDetails';
export default class YogaDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            yoga:yoga,
            tempId:`${this.props.id}`,

        };
    }

    componentDidMount() {

        if(this.tempId === yoga.id){
            fetch("/data.json")
                .then(r => r.json())
                .then(data => {
                    console.log('data fetch: ',data);
                    const tempData= data.filter(yoga => yoga.id===this.props.id);
                    console.log('tempData in filter',tempData);
                    // console.log('yoga.id', yoga.id);
                    console.log('this.props.id in filter', this.props.id);
                    this.setState(
                        {
                            yoga:tempData[0]
                        }
                    );
                });
        }
        // console.log(',this.state.yoga[1].id',this.state.yoga[1].id);
        // console.log("this.state.yoga",this.state.yoga);

    }

    /////////////////////
    render(){
        if(!this.state.yoga){
            return null;
        }
        let testData = this.state.yoga;
        console.log('testData',testData);
        console.log('this.state.yoga',this.state.yoga);
        console.log('this.props.id check',this.props.id);
        const {
            image_url,
            publisher,
            publisher_url,
            source_url,
            title,
            steps
        } = this.state.yoga;

        const { handleIndex }=this.props;
        if(!steps){
            return <h1>loading ....</h1>;
        }
        if(steps){
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
                                    {steps.map((item, index) => {
                                        console.log('item in details new', item);
                                        console.log('index in details:', index);
                                        return (
                                            <li key={index} className="list-group-item text-slanted">
                                                {item}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </React.Fragment>

            );
        }

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
