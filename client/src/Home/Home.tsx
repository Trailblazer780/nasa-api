import React from 'react';
import './Home.scss';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container } from 'react-bootstrap';
import { HomeProps, APODData } from '../tools/data.model';
import { getJSONData } from "./../tools/Toolkit";
import { resourceLimits } from 'worker_threads';

const API_KEY:string = "YebcvNe2gk1kOzI5NxfnX0hhfwSVg4BV7mY9sFrE";
const APOD_SCRIPT:string = "https://api.nasa.gov/planetary/apod?api_key=" + API_KEY;

const Home = ({setLoading}:HomeProps) => {


    // ---------------------------------------------- event handlers ----------------------------------------------
    const onResponse = (result:APODData) => {
        // if(result.code === 500){
        //     setData(undefined);

        // } else {
        //     setData(result);    
        // }
        setData(result);
        // console.log(result);
        // setLoading(false);
    };

    const onError = () => console.log("*** Error has occured during AJAX data transmission");

    const reRender = () => {
        getJSONData(APOD_SCRIPT, onResponse, onError);
    };
    
    // ---------------------------------------------- lifecycle hooks ----------------------------------------------
    React.useEffect(() => {reRender();}, []);

    // -------------------------------------------------- State Setup --------------------------------------------------
    const [data, setData] = React.useState<APODData>();

      
    // ---------------------------------- render to the DOM
    return(
        (data === undefined) ?
            <div className="content">
                <div>Sorry no APOD</div>
            </div>
        :
        <Container className="text-center">
            <h1 className="title" style={{padding: '10px'}}>Astronomy Picture of the Day</h1>
            <h3 className="title">Todays date is: {data.date}</h3>
            <div>
                <div className="picture-title">{data.title}</div>
                {data.media_type === "image" ? <a href={data.hdurl} target="_blank"><img className="APOD" src={data.url} onLoad={() => setLoading(false)}/></a> : <iframe className="APOD" width="853" height="505" src="https://www.youtube.com/embed/NS71ppsk7n0?rel=0" onLoad={() => setLoading(false)}> </iframe>}
                {/* <a href={data.hdurl} target="_blank"><img className="APOD" src={data.url} onLoad={() => setLoading(false)}/></a> */}
                <p>Click the photo to see the full resolution picture</p>
                <div className="picture-explanation">Photo Explanation:</div>
                <div className="picture-explanation-text">{data.explanation}</div>
            </div>
            <div></div>
        </Container>
    );
}

export default Home;