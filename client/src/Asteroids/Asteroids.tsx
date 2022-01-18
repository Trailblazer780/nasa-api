import React from 'react';
import './Asteroids.scss';
import { Container, Table } from 'react-bootstrap';
import { HomeProps, AsteroidTodayData, AsteroidToday, Asteroid, CloseApproach, CloseApproachData } from '../tools/data.model';
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
        getJSONData(NEOW_SCRIPT, onResponse, onError);
    };
    
    // ---------------------------------------------- lifecycle hooks ----------------------------------------------
    React.useEffect(() => {reRender();}, []);

    // -------------------------------------------------- State Setup --------------------------------------------------
    const [data, setData] = React.useState<AsteroidTodayData>();
    const [asteroidToday, setAsteroidToday] = React.useState<AsteroidToday[]>([]);

    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let fullDay = year + "-" + month + "-" + day;
    let data2;
    if(data !== undefined) {
        data2 = data.near_earth_objects['2022-01-18'];
    };


    // let data2 = data.near_earth_objects['2022-01-17'];
    // ---------------------------------- render to the DOM
    return(
        (data === undefined || asteroidToday === undefined || data2 === undefined) ?
            <div className="content">
                <div>Sorry no Near Earth Asteroid Data right now.</div>
            </div>
        :
        <Container className="text-center">
            <h1 className="title">Asteroids Near Earth Today: {data.element_count}</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Asteroid ID</th>
                        <th>Asteroid Name</th>
                        <th>Asteroid Velocity</th>
                        <th>Asteroid Size</th>
                        <th>Asteroid Distance</th>
                    </tr>
                </thead>
                <tbody>
                    {data2.map((asteroid:Asteroid) => {return <tr><td>{asteroid.id}</td><td>{asteroid.name}</td>{asteroid.close_approach_data.map((closeApproach:any) => {return <td>{closeApproach.relative_velocity.kilometers_per_hour}</td>})}</tr>})}
                    {/* {data2.map((asteroid:Asteroid) => {return <tr><td>{asteroid.name}</td></tr>})} */}
                    <td>Velocity</td>
                    <td>size</td>
                    <td>Distance</td>
                </tbody>
            </Table>

            <div>
                (asteroid count: {data.near_earth_objects['2022-01-18'].length})
                {data2.map((asteroid:Asteroid) => {
                    return <div className="asteroid">
                        <div className="asteroid-name">{asteroid.name} {asteroid.estimated_diameter.kilometers.estimated_diameter_max}</div>
                        {asteroid.close_approach_data.map((closeApproach:any) => {
                            return <div>{closeApproach.close_approach_date} {closeApproach.miss_distance.kilometers}</div>
                        })}
                        </div>
                })}
            </div>

            
        </Container>
    );
}

export default Asteroids;