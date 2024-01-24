import { useState } from 'react';
import './App.css';
import { Button, Card, Col, Modal, Row } from 'react-bootstrap';
import { FaArrowDown, FaPlus } from "react-icons/fa";

interface Schema {
    [key: string]: string;
}

interface SegmentData {
    schema: Schema[];
}

function App() {
    const [show, setShow] = useState(false);
    const [segment, setSegment] = useState('');
    const [segmentNames, setSegmentNames] = useState<string[]>(['']);
    const [fieldCounter, setFieldCounter] = useState(0);
    const [formattedData, setFormattedData] = useState<SegmentData | null>(null);

    //modal close
    const handleClose = () => {
        setShow(false)
        setSegmentNames([''])
        setSegment('')
    };

    //modal show
    const handleShow = () => {
        setShow(true);
        setFormattedData(null)
    }

    //add segment
    const handleAddSegment = () => {
        if (fieldCounter < 6) {
            setSegmentNames([...segmentNames, '']);
            setFieldCounter((prevCounter) => prevCounter + 1);
        }
    };

    //input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSegment(e.target.value);
    };

    //add schema fields
    const handleSegmentNameChange = (index: number, value: string) => {
        const newSegmentNames = [...segmentNames];
        newSegmentNames[index] = value;
        setSegmentNames(newSegmentNames);
    };

    //input label value set
    const getLabelForIndex = (index: number) => {
        if (index === 0) {
            return 'First Name';
        } else if (index === 1) {
            return 'Last Name';
        } else if (index === 2) {
            return 'Gender';
        } else if (index === 3) {
            return 'Age';
        } else if (index === 4) {
            return 'Account Name';
        } else if (index === 5) {
            return 'City';
        } else if (index === 6) {
            return 'State';
        }
    };

    //json output
    const formatSegmentData = () => {
        const schema = segmentNames.map((name, index) => {
            return { [String(getLabelForIndex(index))]: name };
        });

        return {
            segment_name: segment,
            schema: schema,
        };
    };

    const handleSaveSegment = () => {
        const formattedData = formatSegmentData();
        setFormattedData(formattedData);
        handleClose();
    };

    return (
        <div className='App-header'>
            {/* Pop-up */}
            <h3 style={{ color: 'black' }}>CUSTOMER LABS</h3>
            <p style={{ fontSize: '14px' }}>Click the button to get the Form &nbsp;<FaArrowDown /></p>
            <Button onClick={handleShow} className='buttonName mt-1'> Save Segment</Button>
            {formattedData && (
                <Card className='mt-3 mb-5' style={{ border: 'none', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px' }}>
                    <Card.Body>
                        <h4 style={{ color: 'black' }} className='mt-3'>Output:</h4>
                        <pre className='finalOutput'>{JSON.stringify(formattedData, null, 2)}</pre>
                    </Card.Body>
                </Card>
            )}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Saving Segment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Popup content */}
                    <Row>
                        <Col sm={12} md={12} lg={12}>
                            <div className="label-float">
                                <input
                                    type="text"
                                    placeholder=""
                                    value={segment}
                                    onChange={handleInputChange}
                                />
                                <label>Enter the Name of the Segment</label>
                            </div>
                        </Col>
                        <p className='mt-3'> To Save the segment, you need to add the schemas to build your query.</p>
                        <p className='addSegmentHeading' onClick={handleAddSegment}><FaPlus />&nbsp;Add Segment</p>
                        {segmentNames.map((segmentName, index) => (
                            <Col sm={12} md={12} lg={12} key={index}>
                                <div className="label-float">
                                    {getLabelForIndex(index) === 'Gender' ?
                                        <select
                                            value={segmentName}
                                            onChange={(e) => handleSegmentNameChange(index, e.target.value)}   >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                        : getLabelForIndex(index) === 'Age' ?
                                            <>
                                                <input
                                                    type="number"
                                                    placeholder=" "
                                                    value={segmentName}
                                                    onChange={(e) => handleSegmentNameChange(index, e.target.value)}
                                                />
                                                <label>{getLabelForIndex(index)}</label>
                                            </>
                                            :
                                            <> <input
                                                type="text"
                                                placeholder=" "
                                                value={segmentName}
                                                onChange={(e) => handleSegmentNameChange(index, e.target.value)}
                                            />
                                                <label>{getLabelForIndex(index)}</label>
                                            </>
                                    }
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='buttonName' onClick={handleClose}> Close</Button>
                    <Button className='buttonName' onClick={handleSaveSegment}> Save the Segment</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default App;
