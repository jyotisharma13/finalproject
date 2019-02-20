import React, { Component } from "react";
import { yogas } from "./tempList";
// import {yoga} from './tempDetails';
import YogaList from "./components/YogaList";
import YogaDetails from "./components/YogaDetails";
import axios from './axios';
import {Uploader} from './uploader';
// import {Profile} from './profile';
import {Header} from "./header";
import Discover from './discover';
import {BrowserRouter, Route} from 'react-router-dom';


export default class App extends Component {
    constructor(){
        super();
        this.state = {
            yogas: yogas,
            // temptitle:'plank-pose',
            details_id: 35387,
            pageIndex: 1,
            search: "",
            query: "&q=",
            error: "",
            uploaderIsVisible:false
        };

        this.showUploader = this.showUploader.bind(this);
        this.changePictureUrl=this.changePictureUrl.bind(this);
        this.HideUploader = this.HideUploader.bind(this);
        this.displayPage=this.displayPage.bind(this);
        this.handleIndex=this.handleIndex.bind(this);
        this.handleDetails=this.handleDetails.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.filterOnSearch=this.filterOnSearch.bind(this);
    }
    //componentDidMount is the react equivalent of mounted in VALUES
    //a Lifecycle method
    componentDidMount() {

        return axios.get('/user').then(results => {
            // console.log("componentDidMount() results:", results);
            this.setState({
                id:results.data.rows[0].id,
                first: results.data.rows[0].first,
                last: results.data.rows[0].last,
                pro_pic_Url: results.data.rows[0].url

            });

        }).catch(err => {
            console.log('error in mount app: ', err);
        });
    }

    showUploader() {
        this.setState({
            uploaderIsVisible: true
        });
    }
    HideUploader() {
        this.setState({
            uploaderIsVisible: false
        });
    }
    changePictureUrl(url) {
        this.setState({
            pro_pic_Url: url,
            uploaderIsVisible: false
        });
    }
    filterOnSearch(){
        // console.log('hello from filterOnSearch', this.state.search.yogas.length);

        this.setState({
            yogas:yogas.filter(yogaMove=>yogaMove.title.includes(this.state.search))
        });
    }
    
    displayPage(index) {
        switch (index) {
                        default:
                        case 1:
                            return (
                                <YogaList
                                    yogas={this.state.yogas}
                                    handleDetails={this.handleDetails}
                                    value={this.state.search}
                                    handleChange={this.handleChange}
                                    handleSubmit={this.handleSubmit}
                                    error={this.state.error}
                                />
                            );
                        case 0:
                            return (
                                <YogaDetails
                                    id={this.state.details_id}
                                    handleIndex={this.handleIndex}
                                />
                            );
        }
    }

    handleIndex(index) {
        console.log('index in handleIndex', index);
        this.setState({
            pageIndex: index
        });
    }
    handleDetails(index, id)  {
        console.log('index in handleDetails in app', index);
        console.log('id in handleDetails in app',id);
        this.setState({
            pageIndex: index,
            details_id: id
        });
        console.log('pageIndex',this.pageIndex);
    }

    handleChange(e) {
        console.log('hello from handleChange');
        this.setState({
            search: e.target.value
        });
        this.filterOnSearch();
        console.log('search in handlechange', this.state.search);
    }
    handleSubmit(e)  {
        e.preventDefault();
        console.log('hello handleSubmit');
        this.filterOnSearch();
    }
    render(){
        return(
            <div id="app">

                <BrowserRouter>
                    <div>
                        <Header
                            first={this.state.first}
                            last={this.state.last}
                            pro_pic_Url={this.state.pro_pic_Url}
                            showUploader={this.showUploader}
                        />
                        <React.Fragment>
                            <React.Fragment> {this.displayPage(this.state.pageIndex)}</React.Fragment>
                        </React.Fragment>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <div className="app_container">
                                    <div className="app_comp2">

                                        {this.state.uploaderIsVisible && <Uploader
                                            first={this.state.first}
                                            last={this.state.last}
                                            pro_pic_Url={this.state.pro_pic_Url}
                                            HideUploader={this.HideUploader}
                                            changePictureUrl={this.changePictureUrl}
                                        />}

                                    </div>
                                </div>

                            )}
                        />
                        <Route
                            path="/discover"
                            render={() => (
                                <Discover />
                            )}

                        />

                    </div>
                </BrowserRouter>
            </div>
        );
    }

}
// <YogaList yogas={this.state.yogas}/><YogaDetails id ={this.state.details_id}/>
// {this.displayPage(this.state.pageIndex)}
