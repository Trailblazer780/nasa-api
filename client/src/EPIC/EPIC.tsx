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
    let data2:EpicImage[] = []
    let pictureFrom:string = "";
    // ---------------------------------------------- event handlers ----------------------------------------------
    const onResponse = (result:any) => {
        setData(result);
        data2 = result;
        // console.log(result);
        // setLoading(false);
        // buildurl();
    };

    const onError = () => {
        console.log("*** Error has occured during AJAX data transmission");
    }

    const reRender = () => {
        setLoading(true);
        getJSONData(EPIC_MOST_RECENT, onResponse, onError);
    };

    
    // -------------------------------------------------- State Setup --------------------------------------------------
    const [data, setData] = React.useState<EpicImage[]>([]);
    const [url, setUrl] = React.useState<string>();
    const [pictureFrom2, setPictureFrom2] = React.useState<string>();

    // ---------------------------------------------- lifecycle hooks ----------------------------------------------
    React.useEffect(() => {reRender();}, []);
    React.useEffect(() => {return () => {buildurl();}}, [data]);
    React.useEffect(() => {return () => {getPictureFrom();}}, [data]);


    const buildurl = () => {
        let array = [];
        // console.log(data2);
        // add all dates to an array
        for(let i = 0; i < data2.length; i++){
            array.push(data2[i].date);
        }
        let split = array[0].split(" ");
        // console.log(split);
        let split2 = split[0].split("-");
        // console.log(split2);
        dateForUrl = split2[0] + "/" + split2[1] + "/" + split2[2] + "/";
        setUrl(dateForUrl);
        // console.log(dateForUrl);
        return dateForUrl;
    }

    const getPictureFrom = () => {
        if(data2.length > 0){
            pictureFrom = data2[0].caption;
            // console.log(pictureFrom);
            setPictureFrom2(pictureFrom);
        }
    }

    const imagesLoaded = () => {
        if (loaded === data2.length) {
            // console.log("All images loaded");
            setLoading(false);
        } else {
            loaded++;
        }
    }

    // ---------------------------------- render to the DOM
    return(
        (data === undefined) ?
            <div className="content">
                <div>Sorry no EPIC Data right now.</div>
            </div>
        :
        <Container className="text-center">
            <h1 className="title">Most Recent EPIC Photos</h1>
            <h3>These images were taken by Nasa's EPIC camera onboard the NOAA DSCOVR spacecraft</h3>
            <h3>{data.map((images:EpicImage, n:number) =>{ return <div key={n}><img className="epic" onLoad={() => imagesLoaded()} height={500} width={500} src={EPIC_IMAGE+url+"png/"+images.image+".png"}/></div> })}</h3>
        </Container>

    );
}

export default EPIC;