import {Container, ListGroup, ProgressBar, Row} from "react-bootstrap";
import './Skills.scss';
import {useContext} from "react";
import {CvContext} from "../../helpers/cvContext";
const Skills = () => {
    const { cv } = useContext(CvContext);
    const createSkillsList =() => {
        let skillsList = [];
        for (let i = 0; i < cv.skills.length; i++) {
            skillsList.push(
                <ListGroup.Item key={i}>
                    <div className="textFloat">{cv.skills[i].name}</div> <ProgressBar className="progressBar mt-1" now={cv.skills[i].skillLevel} />
                </ListGroup.Item>
            );
        }
        return skillsList;
    }

    return (
        <Container>
            <Row className="pt-4">
                <ListGroup>
                    {createSkillsList()}
                </ListGroup>
            </Row>
        </Container>
    );
}

export default Skills;