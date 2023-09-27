import {Container, ListGroup, ProgressBar, Row} from "react-bootstrap";
import './Skills.scss';
const Skills = () => {
    return (
        <Container>
            <Row className="pt-4">
                <ListGroup>
                    <ListGroup.Item>
                        <div className="textFloat">React</div> <ProgressBar className="progressBar mt-1" now={80} />
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className="textFloat">AngularJS</div> <ProgressBar className="progressBar mt-1" now={65} />
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className="textFloat">Javascript</div> <ProgressBar className="progressBar mt-1" now={85} />
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className="textFloat">HTML 5</div> <ProgressBar className="progressBar mt-1" now={80} />
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className="textFloat">CSS</div> <ProgressBar className="progressBar mt-1" now={75} />
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className="textFloat">PHP</div> <ProgressBar className="progressBar mt-1" now={60} />
                    </ListGroup.Item>
                </ListGroup>
            </Row>
        </Container>
    );
}

export default Skills;