import {useState, useEffect} from 'react';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import EditForm from './EditForm'

const KPI = ({kpi}) => {
    const [show, setShow] = useState(false)

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    useEffect(() => {
        handleClose()
    }, [kpi])

    return (
    <>
        <td>{kpi.perspective}</td>
        <td>{kpi.objective}</td>
        <td>{kpi.kpi_name}</td>
        <td>{kpi.kpi_weight}</td>
        <td>{kpi.kpi_target}</td>
        <td>{kpi.kpi_unit_measurement}</td>
        <td>
            <OverlayTrigger
                overlay={
                    <Tooltip id={`tooltip-top`}>
                        Edit
                    </Tooltip>
                }>
                <button onClick={handleShow}  className="btn text-warning btn-act" data-toggle="modal"><i className="material-icons">&#xE254;</i></button>
                </OverlayTrigger>
            <OverlayTrigger
                overlay={
                    <Tooltip id={`tooltip-top`}>
                        Delete
                    </Tooltip>
                }>
                <button className="btn  btn-act" style={{color:"black"}} data-toggle="modal"><i className="material-icons">&#xE872;</i></button>
            </OverlayTrigger>
        </td>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header>
            <Modal.Title>
                Edit KPI
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <EditForm theEmployee={kpi} />
        </Modal.Body>
        <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close Button
                </Button>
        </Modal.Footer>
    </Modal>
    </>
     
    )
}
export default KPI;
