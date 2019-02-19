import React, { Component } from "react";

export default class Yoga extends Component {
    render() {
        console.log('this.props.yoga',this.props.yoga);
        const {
            image_url,
            title,
            source_url,
            publisher,
            yoga_id
        } = this.props.yoga;
        const { handleDetails } = this.props;
        return (
            <React.Fragment>
                <div className="col-10 mx-auto col-md-6 col-lg-4 my-3">
                    <div className="card">
                        <img
                            src={image_url}
                            className="img-card-top"
                            style={{ height: "14rem" }}
                            alt="yoga"
                        />
                        <div className="card-body text-capitalize">
                            <h6>{title}</h6>
                            <h6 className="text-warning text-slanted">
                    provided by {publisher}
                            </h6>
                        </div>
                        <div className="card-footer">
                            <button
                                type="button"
                                className="btn btn-primary text-capitalize"
                                onClick={() => handleDetails}
                            >
                    details
                            </button>
                            <a
                                href={source_url}
                                className="btn btn-success mx-2 text-capitalize"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                    yoga url
                            </a>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
