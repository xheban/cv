import {Button, Col, Container, Form, Row} from "react-bootstrap";
import React, {useCallback, useEffect, useState} from 'react'
import './TicketSystem.scss'
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import $ from "jquery"
import {useForm} from "react-hook-form";



const TicketSystem = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        if(data.Rows !== rowsMax && data.Rows !== '' ){
            onChangeRows(data.Rows);
        }
        if(data.Seats !== seatsMax && data.Seats !== ''){
            onChangeSeats(data.Seats);
        }
    }

    const [mouseCoordinatesDown, setMouseCoordinatesDown] = useState({x:0, y:0, scroll: 0});
    const [rowsOrder, setRowsOrder] = useState([]);
    const [rowsMax, setRowsMax] = useState('10');
    const [seatsMax, setSeatsMax] = useState('20');
    const [listOfSelectedSeats, setListOfSelectedSeats] = useState([]);

    useEffect( ()=>{
        if(localStorage.getItem('Rows') !== null){
            setRowsMax(localStorage.getItem('Rows'))
        }
        if(localStorage.getItem('Seats') !== null){
            setSeatsMax(localStorage.getItem('Seats'))
        }
        if(localStorage.getItem('RowsOrder') !== null){
            setRowsOrder(JSON.parse(localStorage.getItem('RowsOrder')));
        }else{
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
        }
    }, [rowsMax])

    const onChangeSeats =(seats) =>{
        setSeatsMax(seats);
        localStorage.setItem('Seats', seats);
        if(parseInt(seats) < parseInt(seatsMax)) {
            let newSeats = listOfSelectedSeats.filter(list => {
                return parseInt(list.seatNumber) <= parseInt(seats);
            })
            setListOfSelectedSeats(newSeats)
        }

    }
    const onChangeRows =(rows) =>{
        let newRowsOrder;
        if(parseInt(rows) > parseInt(rowsMax)){
            newRowsOrder = structuredClone(rowsOrder);
            for(let i = rowsOrder.length; i < parseInt(rows); i++){
                newRowsOrder[i] = {id: i+1, name: `Rad ${i+1}` };
            }
        }else{
            newRowsOrder = structuredClone(rowsOrder).filter(row => {
                return parseInt(row.id) <= parseInt(rows);
            })
            let newSeats = listOfSelectedSeats.filter(list => {
                return parseInt(list.row) <= parseInt(rows);
            })
            setListOfSelectedSeats(newSeats)
        }
        localStorage.setItem('RowsOrder',JSON.stringify(structuredClone(newRowsOrder)));
        localStorage.setItem('Rows', rows);
        setRowsOrder(newRowsOrder);
        setRowsMax(rows);
    }

    const checkIfSelected = useCallback((x,y,scroll) =>{
        if(mouseCoordinatesDown.x !== x && mouseCoordinatesDown.y !== y){
            let elements = [];
            for(let i = 1; i <= rowsMax; i++){
                for(let j = 1; j <= seatsMax; j++){
                    elements.push(document.getElementById(i+'-'+j))
                }
            }
            let startX = 0;
            let endX = 0;

            if(mouseCoordinatesDown.x > x){
                startX = x + scroll;
                endX = mouseCoordinatesDown.x + mouseCoordinatesDown.scroll;
            }else{
                startX = mouseCoordinatesDown.x + mouseCoordinatesDown.scroll;
                endX = x + scroll;
            }
            
            let startY = mouseCoordinatesDown.y > y ? y : mouseCoordinatesDown.y;
            let endY = mouseCoordinatesDown.y < y ? y : mouseCoordinatesDown.y;

            elements.forEach((element) => {
                if(element.offsetLeft+8 >= startX && element.offsetTop+8 >= startY && element.offsetLeft+8 <= endX && element.offsetTop+8 <= endY) {
                    if(!element.checked){
                        element.checked = true;
                        let seat = element.id.split('-');
                        setListOfSelectedSeats(prevState => [...prevState, {row: seat[0], seatNumber: seat[1]}]);
                    }
                }
            });
        }
    },[mouseCoordinatesDown, rowsMax, seatsMax])

    const mouseHandlerDown =(event) => {
        setMouseCoordinatesDown({
            x:event.clientX,
            y:event.clientY,
            scroll: $("#checkArea").get(0).scrollLeft
        });
    }

    const mouseHandlerUp = useCallback ((event) => {
        checkIfSelected(event.clientX, event.clientY, $("#checkArea").get(0).scrollLeft);
    },[checkIfSelected])

    useEffect(()=>{
        window.addEventListener('mousedown', mouseHandlerDown);
        window.addEventListener('mouseup', mouseHandlerUp);
        return(()=>{
            window.removeEventListener('mousedown', mouseHandlerDown);
            window.removeEventListener('mouseup', mouseHandlerUp);
        })
    }, [mouseHandlerUp])

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(rowsOrder);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setRowsOrder(items);
        localStorage.setItem('RowsOrder',JSON.stringify(items));
    };

    const filterSelectedSeats = (row,seatNumber) =>{
        let newSeats = listOfSelectedSeats.filter(a =>
            a.row !== row || a.seatNumber !== seatNumber
        )
        setListOfSelectedSeats(newSeats)
    }

    const handleChange = (e) =>{
        const seat = e.target.id.split('-');
        if(e.target.checked){
            let newSeats = structuredClone(listOfSelectedSeats);
            newSeats[listOfSelectedSeats.length] = {row: seat[0], seatNumber: seat[1]};
            setListOfSelectedSeats(newSeats);
        }else{
            filterSelectedSeats(seat[0], seat[1]);
        }
    };

    const prepareNumbering = (j) =>{
        let numbers = [];
        for (let l = 0; l <= j; l++) {
            if(l===0){
                numbers.push(
                    <div className="d-inline-block disable-text-selection" style={{width: '84px'}} key={`${0}-${0}`}></div>
                )
            }else {
                numbers.push(
                    <div className="d-inline-block me-2 disable-text-selection"
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
                <div key={`${row}-${seatNumber}`} className="mb-1 disable-text-selection">
                    Rad: {row}, Sedadlo: {seatNumber}
                    <div
                        className="d-inline link ps-2"
                        onClick={()=>handleDeleteSeat(row,seatNumber)}
                    >
                        <div className="text-nowrap d-inline-block">( Zrušiť )</div>
                    </div>
                </div>
            )
        }
        return boughtTicketsList;
    }

    return (
        <Container>
            <Row className="pt-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Col md={2} sm={3} xs={6} className="d-inline-block me-4">
                        <Form.Group className="mb-3" controlId="formRows">
                            <Form.Label className="disable-text-selection">Počet radov</Form.Label>
                            <Form.Control type="number" {...register("Rows", { min: 1, max: 99 })}/>
                        </Form.Group>
                    </Col>
                    <Col md={2} sm={3} xs={6} className="d-inline-block me-4">
                        <Form.Group className="mb-3" controlId="formSeats">
                            <Form.Label className="disable-text-selection">Počet radov</Form.Label>
                            <Form.Control type="number" {...register("Seats", { min: 1, max: 99 })}/>
                        </Form.Group>
                    </Col>
                    <Button variant="primary" type="submit">
                        Zmeň
                    </Button>
                </form>
                {/*<Form>*/}
                {/*    <Col md={2} sm={3} xs={6} className="d-inline-block me-4">*/}
                {/*        <Form.Group className="mb-3" controlId="formRows">*/}
                {/*            <Form.Label className="disable-text-selection">Počet radov</Form.Label>*/}
                {/*            <Form.Control type="number" value={rowsMax} onChange={onChangeRows}/>*/}
                {/*        </Form.Group>*/}
                {/*    </Col>*/}
                {/*    <Col md={2} sm={3} xs={6} className="d-inline-block me-4">*/}
                {/*       <Form.Group className="mb-3" controlId="formSeats">*/}
                {/*           <Form.Label className="disable-text-selection">Počet sedadiel</Form.Label>*/}
                {/*           <Form.Control type="number" value={seatsMax} onChange={onChangeSeats}/>*/}
                {/*       </Form.Group>*/}
                {/*    </Col>*/}
                {/*</Form>*/}
            </Row>
            <Row className="pt-4">
                <Col md={9} sm={12}>
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
                                                    let maxVisibleSeats = Math.ceil(($("#checkArea").width() -84) / 32);
                                                    return (
                                                        <div
                                                            {...provided.draggableProps}
                                                            ref={provided.innerRef}
                                                        >
                                                            <div className="pb-2">
                                                                <div
                                                                    className="d-inline-block disable-text-selection" style={{width: '74px'}}>
                                                                    <i className="bi-grip-vertical"  {...provided.dragHandleProps}> </i>{row.name}
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
                    <div style={{fontWeight: 'bold'}} className="disable-text-selection pb-1"> Počet vybraných miest: {listOfSelectedSeats.length} </div>
                </Col>
                <Col md={3} sm={12} style={{height:  `${$("#checkArea").height()}px`}} className="boughtTicketsStyle">
                    <div style={{fontWeight: 'bold'}} id="test" className="disable-text-selection"> Kúpene listky: </div>
                    {prepareBoughtTickets()}
                </Col>
            </Row>
        </Container>
    );
}

export default TicketSystem;