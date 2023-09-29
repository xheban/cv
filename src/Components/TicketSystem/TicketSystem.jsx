import {Col, Container, Form, Row} from "react-bootstrap";
import React from 'react'
const TicketSystem = () => {
    let seats = 0;


    const prepareNumbering = (j) =>{
        let numbers = [];
        for (let l = 0; l <= j; l++) {
            if(l===0){
                numbers.push(
                    <div className="d-inline-block pe-4" style={{width: '84px'}} key={`inline-${0}-${0}`}></div>
                )
            }else {
                numbers.push(
                    <div className="form-check form-check-inline form-check-reverse"
                         style={{width: '24px'}}
                         key={`inline-${0}-${l}`}
                    >
                        {l}
                    </div>
                )
            }

        }
        return numbers;
    }
    const prepareSeatsInRow = (k,j) => {
        let seatsInRowList = [];
        for (let l = 0; l <= j; l++) {
            if(l===0){
                seatsInRowList.push(
                    <div className="d-inline-block pe-4" style={{width: '75px'}} key={`inline-${k}-${l}`}> Rad  {k} </div>
                )
            }else {
                seatsInRowList.push(
                    <Form.Check
                            key={`inline-${k}-${l}`}
                            inline
                            reverse
                            label=""
                            name="group1"
                            type="checkbox"
                            id={`inline-${k}-${l}`}
                    />
                )
            }

        }
        return seatsInRowList;
    }

    const prepareRows = (i,j) => {
        let seatsList = [];
        for (let k = 0; k <= i; k++) {
            if (k === 0) {
                seatsList.push(
                    <div key={`inline-${k}`} className="mb-2">
                        {prepareNumbering(j)}
                    </div>
                )
            } else{
                seatsList.push(
                    <div key={`inline-${k}`} className="mb-2">
                        {prepareSeatsInRow(k, j)}
                    </div>
                )
            }
        }
        return seatsList;
    };



    return (
        <Container>
            <Row className="pt-4">
                <Col xs={10}>
                    <Form>
                        {prepareRows(10,20)}
                    </Form>
                </Col>
                <Col xs={2}>
                    Kupene listky:
                </Col>

            </Row>
            Počet vybraných miest: {seats}
        </Container>
    );
}

export default TicketSystem;