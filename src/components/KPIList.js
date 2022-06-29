import React, { useState, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap';
import AddForm from "./AddForm";
import KPI from "./KPI"
import Pagination from './Pagination';
import { useAPI } from "../contexts/KPIContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { injectStyle } from "react-toastify/dist/inject-style";

if (typeof window !== "undefined") {
    injectStyle();
  }

const KPIList = () => {
    const { kpis } = useAPI();
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(6)

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredKpis, setFilteredKpis] = useState(kpis);

    useEffect(() => {
        handleClose();
    }, [kpis])

    useEffect(() => {
        const newkpis = kpis.filter(kpi =>
          kpi.kpi_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
        );
        setFilteredKpis(newkpis);
        return (
            handleClose()
        )
      }, [searchTerm, kpis]);

    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = filteredKpis.slice(indexOfFirstEmployee, indexOfLastEmployee);
    const totalPagesNum = Math.ceil(filteredKpis.length / employeesPerPage);

    return (
        <>
        <div className="row g-3 align-items-center"> 
            <div className="col-auto">
                <input type="text" 
                        className="form-control" 
                        placeholder="Search...." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
        <div className="mb-5">
        </div>
        <div className="table-title">
				<div className="row">
					<div className="col-sm-6">
						<h2>Manage <b>KPIs</b></h2>
					</div>
					<div className="col-sm-6">
                		<Button onClick={handleShow} id='btn' data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New KPI</span></Button>					
            		</div>
				</div>
        </div>
          <ToastContainer />
        <table className="table table-striped table-hover">
        <thead>
            <tr>
                <th>Perspective</th>
                <th>Objective</th>
                <th>KPI Name</th>
                <th>KPI Weight</th>
                <th>KPI Target</th>
                <th>KPI Unit of Measurement</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {
                filteredKpis.length === kpis.length ? currentEmployees.map(kpi => (
                    <tr key={kpi.kpi_id} >
                        <KPI kpi={kpi} />
                    </tr>
                )) :
                filteredKpis.map(kpi => (
                    <tr key={kpi.kpi_id} >
                        <KPI kpi={kpi} />
                    </tr>
                ))
            }
        </tbody>
        </table>
        <Pagination pages = {totalPagesNum}
                setCurrentPage={setCurrentPage}
                currentEmployees ={currentEmployees}
                kpis = {filteredKpis} />

		<Modal show={show} onHide={handleClose}>
        <Modal.Header>
            <Modal.Title>
                Add KPI
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <AddForm />
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
export default KPIList;