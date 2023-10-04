import {Col, Container, Form, Row} from "react-bootstrap";
import React,{ useEffect, useState} from 'react'
import './TicketSystem.scss'
import {useSearchParams} from "react-router-dom";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import $ from "jquery"


const TicketSystem = () => {

    //TODO drag select
    const [rowsOrder, setRowsOrder] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [rowsMax, setRowsMax] = useState(10);
    const [seatsMax, setSeatsMax] = useState(20);
    const [listOfSelectedSeats, setListOfSelectedSeats] = useState([]);

    useEffect( ()=>{
        if((searchParams.get('rows'))){
            setRowsMax(parseInt(searchParams.get('rows')));
        }
        if((searchParams.get('seats'))){
            setSeatsMax(parseInt(searchParams.get('seats')));
        }
        let rowsOrderList = [];
        for(let i = 1; i<= rowsMax; i++){
            rowsOrderList.push(
                {
                    id: i,
                    name: "Rad " + i
                }
            )
        }
        setRowsOrder(rowsOrderList);
    }, [rowsMax, searchParams])

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(rowsOrder);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setRowsOrder(items);
    };

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
                    <div className="d-inline-block" style={{width: '74px'}} key={`${0}-${0}`}></div>
                )
            }else {
                numbers.push(
                    <div className="d-inline-block me-2"
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

    const prepareSeatsInRow = (k,j,snapshot, maxVisibleSeats) => {
        let seatsInRowList = [];
        for (let l = 1; l <= j; l++) {
            let visibility = 'visible'
            if(maxVisibleSeats){
                if(maxVisibleSeats < l && snapshot.isDragging){
                    visibility = 'hidden';
                }

            }
            seatsInRowList.push(
                <Form.Check
                        className="checkBoxPadding widget"
                        key={`${k}-${l}`}
                        inline
                        reverse
                        label=""
                        name="group1"
                        type="checkbox"
                        id={`${k}-${l}`}
                        style={{visibility: visibility}}
                        onChange={e => handleChange(e)}
                />
            )

        }
        return seatsInRowList;
    }

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
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="tasks">
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    <div className="formStyle" id="checkArea">
                                        <div className="pb-2">
                                            {prepareNumbering(seatsMax)}
                                        </div>
                                        {rowsOrder.map((row, index) => (
                                            <Draggable
                                                key={row.id}
                                                draggableId={row.id.toString()}
                                                index={index}
                                            >
                                                {(provided,snapshot) => {
                                                    let maxVisibleSeats = Math.ceil(($("#checkArea").width() -74) / 32);
                                                    return (
                                                        <div
                                                            {...provided.draggableProps}
                                                            ref={provided.innerRef}
                                                        >
                                                            <div className="pb-2">
                                                                <div
                                                                    {...provided.dragHandleProps}
                                                                    className="d-inline-block" style={{width: '64px'}}>
                                                                    {row.name}
                                                                </div>
                                                                {prepareSeatsInRow(row.id, seatsMax, snapshot, maxVisibleSeats)}
                                                            </div>
                                                        </div>
                                                    )
                                                }}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <div style={{fontWeight: 'bold'}}> Počet vybraných miest: {listOfSelectedSeats.length} </div>
                </Col>
                <Col xs={3}>
                    <div style={{fontWeight: 'bold'}} id="test"> Kúpene listky: </div>
                    {prepareBoughtTickets()}
                </Col>
            </Row>
        </Container>
    );
}

export default TicketSystem;