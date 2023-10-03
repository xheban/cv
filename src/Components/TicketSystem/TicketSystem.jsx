import {Col, Container, Form, Row} from "react-bootstrap";
import React, {useState} from 'react'
import './TicketSystem.scss'

const TicketSystem = () => {

    const [rowsMax, setRowsMax] = useState(10);
    const [seatsMax, setSeatsMax] = useState(20);
    const [listOfSelectedSeats, setListOfSelectedSeats] = useState([]);

    const filterSelectedSeats = (row,seatNumber) =>{
        setListOfSelectedSeats(
            listOfSelectedSeats.filter(a =>
                a.row !== row || a.seatNumber !== seatNumber
            )
        )
    }

    const handleChange = (e) =>{
        const seat = e.target.id.split('-');
        if(e.target.checked){
            setListOfSelectedSeats([...listOfSelectedSeats, {row: seat[0], seatNumber: seat[1]}]);
        }else{
            filterSelectedSeats(seat[0], seat[1]);
        }
    };

    const prepareNumbering = (j) =>{
        let numbers = [];
        for (let l = 0; l <= j; l++) {
            if(l===0){
                numbers.push(
                    <div className="d-inline-block pe-4" style={{width: '84px'}} key={`${0}-${0}`}></div>
                )
            }else {
                numbers.push(
                    <div className="form-check form-check-inline form-check-reverse"
                         style={{width: '24px'}}
                         key={`${0}-${l}`}
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
                    <div className="d-inline-block pe-4" style={{width: '75px'}} key={`${k}-${l}`}> Rad  {k} </div>
                )
            }else {
                seatsInRowList.push(
                    <Form.Check
                            key={`${k}-${l}`}
                            inline
                            reverse
                            label=""
                            name="group1"
                            type="checkbox"
                            id={`${k}-${l}`}
                            onChange={e => handleChange(e)}
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
                    <div key={`${k}`} className="mb-2">
                        {prepareNumbering(j)}
                    </div>
                )
            } else{
                seatsList.push(
                    <div key={`${k}`} className="mb-2">
                        {prepareSeatsInRow(k, j)}
                    </div>
                )
            }
        }
        return seatsList;
    };

    const handleDeleteSeat = (row,seatNumber) =>{
        filterSelectedSeats(row,seatNumber);
        document.getElementById(row+'-'+seatNumber).checked = false;
    }

    const prepareBoughtTickets = () =>{
        let boughtTicketsList = [];
        for(let i = 0; i < listOfSelectedSeats.length; i++){
            let row = listOfSelectedSeats[i].row;
            let seatNumber = listOfSelectedSeats[i].seatNumber;
            boughtTicketsList.push(
                <div key={`${row}-${seatNumber}`} className="mb-1">
                    Rad: {row}, Sedadlo: {seatNumber}
                    <div
                        className="d-inline link ps-2"
                        onClick={()=>handleDeleteSeat(row,seatNumber)}
                    >
                        ( Zrušiť )
                    </div>
                </div>
            )
        }
        return boughtTicketsList;
    }

    return (
        <Container>
            <Row className="pt-4">
                <Col xs={9}>
                    <Form>
                        {prepareRows(rowsMax,seatsMax)}
                    </Form>
                    <div style={{fontWeight: 'bold'}}> Počet vybraných miest: {listOfSelectedSeats.length} </div>
                </Col>
                <Col xs={3}>
                    <div style={{fontWeight: 'bold'}}> Kúpene listky: </div>
                    {prepareBoughtTickets()}
                </Col>
            </Row>
        </Container>
    );
}

export default TicketSystem;