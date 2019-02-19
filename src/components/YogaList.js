import React, { Component } from "react";
import Yoga from "./Yoga";
import YogaSearch from "./YogaSearch";

export default class yogaList extends Component {
    render() {
        const {
            yogas,
            handleDetails,
            value,
            handleSubmit,
            handleChange,
            error
        } = this.props;
        console.log('yogas in yogalist',yogas);
        return (
            <React.Fragment>
                <YogaSearch
                    value={value}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
                <div className="container my-5">
                    {/* title */}
                    <div className="row">
                        <div className="col-10 mx-auto col-md-6 text-center text-uppercase mb-3">
                            <h1 className="text-slanted">Popular yoga positions</h1>
                        </div>
                    </div>
                    {/* end of title */}
                    <div className="row">
                        {error ? (
                            <h1 className="text-danger text-center">{error}</h1>
                        ) : (
                            yogas.map(yoga => {
                                return (
                                    <Yoga
                                        key={yoga.yoga_id}
                                        yoga={yoga}
                                        handleDetails={()=>handleDetails(0,yoga.yoga_id)}
                                        // handleDetails={handleDetails}
                                    />
                                );
                            })
                        )}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
