import {Container, Form, Row} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import './TestApp.scss'
const TestApp = () => {
    const [mouseCoordinatesDown, setMouseCoordinatesDown] = useState({x:0, y:0});
    const [mouseCoordinatesUp, setMouseCoordinatesUp] = useState({x:0, y:0});
    const [elements, setElements] = useState([]);
    const containerRef = useRef();

    const checkIfSelected = (x,y) =>{
        console.log(mouseCoordinatesDown.x);
        let startX = mouseCoordinatesDown.x > x ? x : mouseCoordinatesDown.x;
        let startY = mouseCoordinatesDown.y > y ? y : mouseCoordinatesDown.y;
        let endX = mouseCoordinatesDown.x < x ? x : mouseCoordinatesDown.x;
        let endY = mouseCoordinatesDown.y < y ? y : mouseCoordinatesDown.y;
        console.log(startX,endX);
        console.log(startY,endY);
        elements.forEach((element) => {
            if(element.offsetLeft >= startX && element.offsetTop >= startY && element.offsetLeft <= endX && element.offsetTop <= endY) {
                element.checked = true;
            }
        });
    }

    useEffect(()=>{
        let elements = [document.getElementById("inline-5"),document.getElementById("inline-1"), document.getElementById("inline-8")]
        setElements(elements)
        const mouseHandlerDown = (event) => {
            setMouseCoordinatesDown({
                x:event.clientX,
                y:event.clientY
            });
        }
        const mouseHandlerUp = (event) => {
            setMouseCoordinatesUp({
                x:event.clientX,
                y:event.clientY
            });
            checkIfSelected(event.clientX,event.clientY,mouseCoordinatesDown)
        }

        window.addEventListener('mousedown', mouseHandlerDown);
        window.addEventListener('mouseup', mouseHandlerUp);
        return(()=>{
            window.removeEventListener('mousedown', mouseHandlerDown);
            window.removeEventListener('mouseup', mouseHandlerUp);
        })
    }, [mouseCoordinatesDown])

    return (
        <Container>
            <Row className="pt-4">
                <div id="container" ref={containerRef} className="container">
                    <Form>
                        <div key={'inline'} className="mb-3">
                            <Form.Check
                                inline
                                name="group1"
                                type="checkbox"
                                id={`inline-1`}
                            />
                            <Form.Check
                                inline
                                name="group1"
                                type="checkbox"
                                id={`inline-2`}
                            />
                            <Form.Check
                                inline
                                name="group1"
                                type="checkbox"
                                id={`inline-3`}
                            />
                        </div>
                        <div key={'inline-main  '} className="mb-3">
                            <Form.Check
                                inline
                                name="group1"
                                type="checkbox"
                                id={`inline-4`}
                            />
                            <Form.Check
                                inline
                                name="group1"
                                type="checkbox"
                                id={`inline-5`}
                            />
                            <Form.Check
                                inline
                                name="group1"
                                type="checkbox"
                                id={`inline-6`}
                            />
                        </div>
                        <div key={'inline-main2  '} className="mb-3">
                            <Form.Check
                                inline
                                name="group1"
                                type="checkbox"
                                id={`inline-7`}
                            />
                            <Form.Check
                                inline
                                name="group1"
                                type="checkbox"
                                id={`inline-8`}
                            />
                            <Form.Check
                                inline
                                name="group1"
                                type="checkbox"
                                id={`inline-9`}
                            />
                        </div>
                    </Form>
                </div>
                <div>
                </div>
                <div>
                    On mouse down: x = {mouseCoordinatesDown.x}, y={mouseCoordinatesDown.y}
                </div>
                <div>
                    On mouse up: x = {mouseCoordinatesUp.x}, y={mouseCoordinatesUp.y}
                </div>
            </Row>
        </Container>
    );
}

export default TestApp;