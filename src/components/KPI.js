import {useState, useEffect} from 'react';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import EditForm from './EditForm'
import DetailForm from './DetailForm';
import { useAPI } from "../contexts/KPIContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const KPI = ({kpi}) => {
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [showModal, setShowModal] = useState(false)
    const showDetail = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const {deleteKpi} = useAPI();

    const handleDelete = (kpi_id) => {
        {deleteKpi(kpi_id)}
        <div>
            {toast.info("You have deleted KPI Successfully!")};
            <ToastContainer />
        </div>
}

    useEffect(() => {
        handleClose()
    }, [kpi])

    return (
    <>
        <td>{kpi.perspective}</td>
        <td>{kpi.objective}</td>
        <td>{kpi.kpi_name}</td>
        <td>{kpi.kpi_weight}</td>
        <td>{parseInt(kpi.kpi_target)}</td>
        <td>{kpi.kpi_unit_measurement}</td>
        <td>
            <div style={{display:"flex", flexDirection:"row" }}>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                        Detail
                        </Tooltip>
                    }>
                    <button onClick={showDetail} className="btn  btn-act row" data-toggle="modal"><i className="material-symbols-outlined">visibility</i></button>
                </OverlayTrigger>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Edit
                        </Tooltip>
                    }>
                    <button onClick={handleShow}  className="btn text-warning btn-act row" data-toggle="modal"><i className="material-icons">&#xE254;</i></button>
                </OverlayTrigger>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Delete
                        </Tooltip>
                    }>
                    <button onClick={() => handleDelete(kpi.kpi_id)} className="btn  btn-act row" style={{color:"black"}} data-toggle="modal"><i className="material-icons">&#xE872;</i></button>
                </OverlayTrigger>
            </div>
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

    <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header>
            <Modal.Title>
                KPI
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <DetailForm theEmployee={kpi} />
        </Modal.Body>
        <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close Button
                </Button>
        </Modal.Footer>
    </Modal>
    </>
     
    )
}
export default KPI;
