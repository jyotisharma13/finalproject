import React, { Component } from "react";
import { yogas } from "./tempList";
import {yoga} from './tempDetails';
import YogaList from "./components/YogaList";
import YogaDetails from "./components/YogaDetails";
import axios from './axios';
import {Uploader} from './uploader';
import {Profile} from './profile';
import {Header} from "./header";
import {BrowserRouter, Route} from 'react-router-dom';


export default class App extends Component {
    constructor(){
        super();
        this.state = {
            yogas: yogas,
            url: `https://www.food2fork.com/api/search?key=2f759d2a707a81452dd9b3f2a41ae7c7`,
            // temp_id:`${this.props.id}`,
            base_url: `https://www.food2fork.com/api/search?key=${
                process.env.REACT_APP_API_KEY
            }`,
            details_id: 35382,
            pageIndex: 1,
            search: "",
            query: "&q=",
            error: "",
            uploaderIsVisible:false
        };

        this.showUploader = this.showUploader.bind(this);
        this.changePictureUrl=this.changePictureUrl.bind(this);
        this.HideUploader = this.HideUploader.bind(this);

    }
    //componentDidMount is the react equivalent of mounted in VALUES
    //a Lifecycle method
    componentDidMount() {
        axios.get('/user').then(results => {
            console.log("componentDidMount() results:",results);
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

    async getyogas() {
        // console.log('this.state.yoga in app', this.state.url);
        // console.log('this.state.id',this.state.temp_id);
        try {
            const data = await fetch(this.state);
            const jsonData = await data.json();
            console.log("app file jsondata",jsonData);
            if (jsonData.yogas.length === 0) {
                this.setState(() => {
                    return { error: "sorry, but your search did not return any results" };
                });
            } else {
                this.setState(() => {
                    return { yogas: jsonData.yogas, error: "" };
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    // componentDidMount() {
    //     this.getyogas();
    // }

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
    }

    handleChange(e) {
        console.log('hello from handleChange');
        this.setState({
            search: e.target.value
        });
    }
    handleSubmit(e)  {
        e.preventDefault();
        console.log('hello from the handlesubmit');
        const { base_url, query, search } = this.state;
        this.setState(
            () => {
                return { url: `${base_url}${query}${search}`, search: "" };
            },
            () => {
                this.getyogas();
            }
        );
    }
    render(){
        return(
            <div>

                <BrowserRouter>
                    <div>
                        <img id="logo_img1" src="/logo.png" />

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
                                        <Profile
                                            id={this.state.id}
                                            first ={this.state.first}
                                            last={this.state.last}
                                            pro_pic_Url={this.state.pro_pic_Url}
                                            ShowUploader = {this.ShowUploader}

                                        />
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

                    </div>
                </BrowserRouter>
            </div>
        );
    }

}
// <YogaList yogas={this.state.yogas}/><YogaDetails id ={this.state.details_id}/>
// {this.displayPage(this.state.pageIndex)}
