import React from "react";
import CountUp from 'react-countup';

function Cards({ countryData: { confirmed, recovered, deaths, date } }) {

    return (
        <div className="container mb-5">
            <div className="row d-flex justify-content-around">

                <div className="card text-bg-warning col-md-3 mb-3">
                    <div className="card-header ">Infected</div>
                    <div className="card-body">
                        <h5 className="card-title">
                            <CountUp start={0} end={confirmed} duration={0.7} separator=",">
                            </CountUp>
                        </h5>
                        <p className="card-text">
                            {new Date(date).toDateString()}
                        </p>
                    </div>
                </div>
                <div className="card text-bg-success col-md-3 mb-3">
                    <div className="card-header">Recovered</div>
                    <div className="card-body">
                        <h5 className="card-title">
                            <CountUp start={0} end={recovered} duration={0.7} separator=",">
                            </CountUp></h5>
                        <p className="card-text">
                            {new Date(date).toDateString()}
                        </p>
                    </div>
                </div>

                <div className="card text-bg-danger col-md-3 ">
                    <div className="card-header">Deaths</div>
                    <div className="card-body">
                        <h5 className="card-title">
                            <CountUp start={0} end={deaths} duration={0.7} separator=",">
                            </CountUp></h5>
                        <p className="card-text">
                            {new Date(date).toDateString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cards;
