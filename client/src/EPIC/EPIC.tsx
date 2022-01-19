import React from 'react';
import './EPIC.scss';
import {Link, useParams, useHistory } from 'react-router-dom';
import { Container, Table } from 'react-bootstrap';
import { HomeProps, EpicData, EpicImage, Image} from '../tools/data.model';
import { getJSONData } from "./../tools/Toolkit";
import { faBiohazard, faImages } from '@fortawesome/free-solid-svg-icons';

const API_KEY:string = "YebcvNe2gk1kOzI5NxfnX0hhfwSVg4BV7mY9sFrE";
const EPIC_DATA:string = "https://api.nasa.gov/EPIC/api/natural/all?api_key="+API_KEY;
const EPIC_MOST_RECENT:string = "https://api.nasa.gov/EPIC/api/natural?api_key="+API_KEY;
const EPIC_IMAGE:string = "https://epic.gsfc.nasa.gov/archive/natural/";

let loaded:number = 0;

const EPIC = ({setLoading}:HomeProps) => {

    let history = useHistory();
    let dateForUrl:string = "";
    // ---------------------------------------------- event handlers ----------------------------------------------
    const onResponse = (result:any) => {
        setData(result);
        console.log(result);
        setLoading(false);
        buildurl();
    };

    const onError = () => console.log("*** Error has occured during AJAX data transmission");

    const reRender = () => {
        setLoading(true);
        getJSONData(EPIC_MOST_RECENT, onResponse, onError);
    };
    
    // ---------------------------------------------- lifecycle hooks ----------------------------------------------
    React.useEffect(() => {reRender();}, []);

    // -------------------------------------------------- State Setup --------------------------------------------------
    const [data, setData] = React.useState<EpicImage[]>([]);
    const [url, setUrl] = React.useState<string>("");
    // const [asteroidToday, setAsteroidToday] = React.useState<AsteroidToday[]>([]);
    // if(data !== undefined) {
    //     console.log(data.length);
    // }


    const buildurl = () => {
        let array = [];
        // add all dates to an array
        for(let i = 0; i < data.length; i++){
            array.push(data[i].date);
        }
        let split = array[0].split(" ");
        console.log(split);
        let split2 = split[0].split("-");
        console.log(split2);
        dateForUrl = split2[0] + "/" + split2[1] + "/" + split2[2] + "/";
        setUrl(dateForUrl);
        console.log(dateForUrl);
        return dateForUrl;
    }   

    // const imagesLoaded = () => {
    //     loaded++;
    //     if (loaded === data.length) {
    //         console.log("All images loaded");
    //         setLoading(false);
    //     } else {
    //         loaded++;
    //     }
    // }

    // ---------------------------------- render to the DOM
    return(
        (data === undefined) ?
            <div className="content">
                <div>Sorry no EPIC Data right now.</div>
            </div>
        :
        <Container className="text-center">
            <h1 className="title">Most Recent EPIC Photos</h1>
            <h2>there are {data.length} images</h2>
            <h2>{url}</h2>
            <h3>{data.map((images:EpicImage, n:number) =>{ return <div>{images.image}<img height={100} width={100} src={EPIC_IMAGE+url+"png/"+images.image+".png"}/></div> })}</h3>
        </Container>
    );
}

export default EPIC;