import {Accordion, Container, Row} from "react-bootstrap";
import {useContext} from "react";
import {CvContext} from "../../Helpers/CvContext";
const Experience = () => {
    const { cv } = useContext(CvContext);
    const createExperienceList =() => {
        let experienceList = [];
        for (let i = 0; i < cv.experience.length; i++) {
            experienceList.push(
                <Accordion.Item eventKey={i} key={i}>
                    <Accordion.Header>{cv.experience[i].workName}</Accordion.Header>
                    <Accordion.Body>
                        <div>
                            <i className="bi-dot"> {cv.experience[i].year} </i>
                        </div>
                        <div className="pt-2">
                            <i className="bi-dot"> {cv.experience[i].typeOfWork} </i>
                        </div>
                        <div className="pt-2">
                            <i className="bi-dot"> Technológie: {cv.experience[i].technologies}</i>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            );
        }
        return experienceList;
    }

    return (
        <Container>
            <Row className="pt-4">
                <Accordion>
                    {createExperienceList()}
                </Accordion>
            </Row>
        </Container>
    );
}

export default Experience;