import React from 'react';
import './Asteroids.scss';
import {Link, useParams } from 'react-router-dom';
import { Container, Table } from 'react-bootstrap';
import { HomeProps, AsteroidTodayData, Asteroid, CloseApproach} from '../tools/data.model';
import { getJSONData } from "./../tools/Toolkit";


const API_KEY:string = "YebcvNe2gk1kOzI5NxfnX0hhfwSVg4BV7mY9sFrE";
const NEOW_SCRIPT:string = "http://www.neowsapp.com/rest/v1/feed/today";
const APOD_SCRIPT:string = "https://api.nasa.gov/planetary/apod?api_key=" + API_KEY;

const Asteroids = ({setLoading}:HomeProps) => {

    // ---------------------------------------------- event handlers ----------------------------------------------
    const onResponse = (result:AsteroidTodayData) => {
        setData(result);
        console.log(result);
        setLoading(false);
    };

    const onError = () => console.log("*** Error has occured during AJAX data transmission");

    const reRender = () => {
        setLoading(true);
        getJSONData(NEOW_SCRIPT, onResponse, onError);
    };

    const getDate = () => {
        var isoDateString = new Date().toISOString();
        let split = isoDateString.split("T");
        let fullDay:string = split[0];
        return fullDay;
    }
    
    // ---------------------------------------------- lifecycle hooks ----------------------------------------------
    React.useEffect(() => {reRender();}, []);

    // -------------------------------------------------- State Setup --------------------------------------------------
    const [data, setData] = React.useState<AsteroidTodayData>();

    let data2;
    if(data !== undefined) {
        data2 = data.near_earth_objects[getDate()];
    }
    
    // ---------------------------------- render to the DOM
    return(
        (data === undefined  || data2 === undefined) ?
            <div className="content">
                <div>Sorry no Near Earth Asteroid Data right now.</div>
            </div>
        :
        <>
        <Container id="desktopasteroid" className="text-center">
            <h1 className="title">Asteroids Near Earth Right Now: {data.element_count}</h1>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Asteroid ID</th>
                        <th>Asteroid Name</th>
                        <th>Asteroid Velocity (Km/h)</th>
                        <th>Asteroid Diameter (km)</th>
                        <th>Asteroid Distance (km)</th>
                        <th>Potentially Hazardous</th>
                    </tr>
                </thead>
                <tbody>
                    {data2.map((asteroid:Asteroid, x:number) => {return <tr key={x}><td><Link to={`asteroid/`+asteroid.id}>{asteroid.id}</Link></td>
                    <td>{asteroid.name}</td>
                    {asteroid.close_approach_data.map((closeApproach:CloseApproach, y:number) => {let velocity = parseFloat(closeApproach.relative_velocity.kilometers_per_hour).toFixed(2); return <td key={y}>{velocity}</td>})}
                    <td>{asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)}</td>
                    {asteroid.close_approach_data.map((closeApproach:any, z:number) => {let distance = parseFloat(closeApproach.miss_distance.kilometers).toFixed(2); return <td key={z}>{distance}</td>})}
                    {asteroid.is_potentially_hazardous_asteroid ? <td style={{color: "red"}}>Yes</td> : <td style={{color: "green"}}>No</td>}</tr>})}
                </tbody>
            </Table>
        </Container>
        <Container id="mobileasteroid" className="text-center">
            <h1 className="title">Asteroids Near Earth Right Now: {data.element_count}</h1>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Asteroid ID</th>
                        <th>Asteroid Name</th>
                        <th>Asteroid Velocity (Km/h)</th>
                        <th>Asteroid Distance (km)</th>
                        {/* <th>Potentially Hazardous</th> */}
                    </tr>
                </thead>
                <tbody>
                    {data2.map((asteroid:Asteroid, x:number) => {return <tr key={x}><td><Link to={`asteroid/`+asteroid.id}>{asteroid.id}</Link></td>
                    <td>{asteroid.name}</td>
                    {asteroid.close_approach_data.map((closeApproach:CloseApproach, y:number) => {let velocity = parseFloat(closeApproach.relative_velocity.kilometers_per_hour).toFixed(2); return <td key={y}>{velocity}</td>})}
                    {/* <td>{asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)}</td> */}
                    {asteroid.close_approach_data.map((closeApproach:any, z:number) => {/*let distance = parseFloat(closeApproach.miss_distance.kilometers).toFixed(2); return <td key={z}>{distance}</td>})}*/})}
                    {asteroid.is_potentially_hazardous_asteroid ? <td style={{color: "red"}}>Yes</td> : <td style={{color: "green"}}>No</td>}</tr>})}
                </tbody>
            </Table>
        </Container></>
    );
}

export default Asteroids;