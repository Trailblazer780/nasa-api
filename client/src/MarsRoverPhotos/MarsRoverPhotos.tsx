import React from 'react';
import { HomeProps } from '../tools/data.model';
import { Link, useParams } from 'react-router-dom';
import { Container, Table } from 'react-bootstrap';
import { getJSONData } from '../tools/Toolkit';

const MarsRoverPhotos = ({setLoading}:HomeProps) => {

    const onResponse = (result:any) => {
        setData(result);
        console.log(result);
        setLoading(false);
    };

    const onError = () => console.log("*** Error has occured during AJAX data transmission");

    const reRender = () => {
        setLoading(true);
        // getJSONData(, onResponse, onError);
    };

    // ---------------------------------------------- lifecycle hooks ----------------------------------------------
    React.useEffect(() => {reRender();}, []);

    // -------------------------------------------------- State Setup --------------------------------------------------
    const [data, setData] = React.useState<any>();

    return (
        <Container className="text-center">
            <h1 className="title">Mars Rover Photos</h1>
        </Container>
    );
}

export default MarsRoverPhotos;