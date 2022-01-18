import React from 'react';
import './AsteroidData.scss';
import { Container, Table } from 'react-bootstrap';
import {Link, useParams } from 'react-router-dom';
import { HomeProps, AsteroidTodayData, Asteroid, CloseApproach} from '../tools/data.model';
import { getJSONData } from "../tools/Toolkit";

const API_KEY:string = "YebcvNe2gk1kOzI5NxfnX0hhfwSVg4BV7mY9sFrE";

const AsteroidData = ({setLoading}:HomeProps) => {

    let { id } = useParams<{ id: string }>(); 
    let ASTEROID_DATA:string = "https://api.nasa.gov/neo/rest/v1/neo/"+id+"?api_key=" + API_KEY;

    // ---------------------------------------------- event handlers ----------------------------------------------
    const onResponse = (result:Asteroid) => {
        setData(result);
        console.log(result);
        setLoading(false);
    };

    const onError = () => console.log("*** Error has occured during AJAX data transmission");

    const reRender = () => {
        setLoading(true);
        getJSONData(ASTEROID_DATA, onResponse, onError);
    };
    
    // ---------------------------------------------- lifecycle hooks ----------------------------------------------
    React.useEffect(() => {reRender();}, []);

    // -------------------------------------------------- State Setup --------------------------------------------------
    const [data, setData] = React.useState<Asteroid>();
    // const [asteroidToday, setAsteroidToday] = React.useState<AsteroidToday[]>([]);

    // let data2;
    // if(data !== undefined) {
    //     data2 = data.near_earth_objects;
    // }

    // ---------------------------------- render to the DOM
    return(
        (data === undefined) ?
            <div className="content">
                <div>Sorry no Near Earth Asteroid Data right now.</div>
            </div>
        :
        <Container className="text-center">
            <h1 className="title">{data.name}</h1>
            <h3>Data About Asteroid:</h3>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Data Type</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                {/* <tr><td></td><td></td></tr> */}
                    <tr><td>Date First Observed [YYYY-MM-DD]</td><td>{data.orbital_data.first_observation_date}</td></tr>
                    <tr><td>Most Recent Observation [YYYY-MM-DD]</td><td>{data.orbital_data.last_observation_date}</td></tr>
                    <tr><td>Orbit ID</td><td>{data.orbital_data.orbit_id}</td></tr>
                    <tr><td>Potential Hazard</td><td>{data.is_potentially_hazardous_asteroid ? "Yes" : "No"}</td></tr>
                    <tr><td>Absolute Magnitude</td><td>{data.absolute_magnitude_h}</td></tr>
                    <tr><td>Orbit Class</td><td>{data.orbital_data.orbit_class.orbit_class_type}</td></tr>
                    <tr><td>Estimated Diameter Maximum (km)</td><td>{data.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)}</td></tr>
                    <tr><td>Estimated Diameter Minimum (km)</td><td>{data.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)}</td></tr>
                    <tr><td>Estimated Diameter Maximum (ft)</td><td>{data.estimated_diameter.feet.estimated_diameter_max.toFixed(2)}</td></tr>
                    <tr><td>Estimated Diameter Minimum (ft)</td><td>{data.estimated_diameter.feet.estimated_diameter_min.toFixed(2)}</td></tr>
                </tbody>
            </Table>

            <h1 className="title">Close Approach Data:</h1>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Velocity (Km/h)</th>
                        <th>Miss Distance (Km)</th>
                        <th>Orbiting Body</th>
                    </tr>
                </thead>
                <tbody>
                {/* <tr><td></td><td></td></tr> */}
                    {data.close_approach_data.map((closeApproach:CloseApproach) => {
                        return <tr><td>{closeApproach.close_approach_date_full}</td>
                        <td>{parseFloat(closeApproach.relative_velocity.kilometers_per_hour).toFixed(2)}</td>
                        <td>{parseFloat(closeApproach.miss_distance.kilometers).toFixed(2)}</td>
                        <td>{closeApproach.orbiting_body}</td></tr>
                    })}
                    
                </tbody>
            </Table>
        </Container>
    );
}

export default AsteroidData;