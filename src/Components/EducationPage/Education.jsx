import {Accordion, Container, Row} from "react-bootstrap";
import {useContext} from "react";
import {CvContext} from "../../helpers/cvContext";

const Education = () => {
    const { cv } = useContext(CvContext);

    const createEducationList =() => {
        let educationList = [];
        for (let i = 0; i < cv.education.length; i++) {
            educationList.push(
                <Accordion.Item eventKey={i} key={i}>
                    <Accordion.Header>{cv.education[i].schoolName}</Accordion.Header>
                    <Accordion.Body>
                        <div>
                            <i className="bi-dot"> {cv.education[i].typeOfStudy} </i>
                        </div>
                        <div className="pt-2">
                            <i className="bi-dot"> {cv.education[i].year} </i>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            );
        }
        return educationList;
    }

    return (
        <Container>
            <Row className="pt-4">
                <Accordion>
                    {createEducationList()}
                </Accordion>
            </Row>
        </Container>
    );
}

export default Education;