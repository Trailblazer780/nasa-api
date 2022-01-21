import React from 'react';
import './SearchAsteroid.scss';
import { HomeProps } from '../tools/data.model';
import { Link, useParams } from 'react-router-dom';
import { Container, Table, Form, Button } from 'react-bootstrap';
import { getJSONData } from '../tools/Toolkit';

const SearchAsteroid = ({setLoading}:HomeProps) => {

    let neo_reference_id:string = "";

    const getID = () =>{
        return neo_reference_id;
    }

    const onResponse = (result:any) => {
        setData(result);
        console.log(result);
        setLoading(false);
    };

    const load = () => {
        setLoading(false);
    }

    const onError = () => console.log("*** Error has occured during AJAX data transmission");

    const reRender = () => {
        // setLoading(true);
        // getJSONData(, onResponse, onError);
    };

    // ---------------------------------------------- lifecycle hooks ----------------------------------------------
    // React.useEffect(() => {reRender();}, []);
    React.useEffect(() => {load();}, []);

    // -------------------------------------------------- State Setup --------------------------------------------------
    const [data, setData] = React.useState<any>();

    // -------------------------------------------------- Event Handlers --------------------------------------------------
    const handleAsteroidIdChange = (e: any) => {
        neo_reference_id = e;
        console.log(neo_reference_id);
    }


    return (
        <Container className="text-center">
            <h1 className="title">Search a near Earth asteroid!</h1>
            <Form>
                <Form.Group controlId="newTechForm.Name">
                    <Form.Label htmlFor="search">Enter the Neo Asteroid ID below:</Form.Label>
                    <div id="asteroidtext"><Form.Control type="text" id="search" className="text-center" placeholder="NEO Asteroid ID" onChange={(e:any) => handleAsteroidIdChange(e.target.value)}/></div>
                    <Form.Text muted>This will only work with the neo reference id of the asteroid</Form.Text>
                    <div><Link to={`/asteroid/${neo_reference_id}`}><Button id="btnOk" variant="secondary">Search</Button>{' '}</Link></div>
                </Form.Group>
            </Form>
        </Container>
    );
}

export default SearchAsteroid;