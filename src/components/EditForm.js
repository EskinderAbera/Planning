import { Button } from "react-bootstrap"
import { useAPI } from "../contexts/KPIContext";
import { useState } from 'react';
import axios from "axios";
import { url } from "./Constants";

const EditForm = ({theEmployee}) => {
    const kpi_id = theEmployee.kpi_id
    const [perspective, setPerspective] = useState(theEmployee.perspective);
    const [objective, setObjective] = useState(theEmployee.objective);
    const [kpi_name, setKpi_name] = useState(theEmployee.kpi_name);
    const [kpi_weight, setKpi_weight] = useState(theEmployee.kpi_weight);
    const [kpi_target, setKpi_target] = useState(theEmployee.kpi_target);
    const [kpi_unit_measurement, setKpi_unit_measurement] = useState(theEmployee.kpi_unit_measurement);

    const { updateKpi } = useAPI();
    const updatedKpi = {kpi_id, perspective, objective, kpi_name, kpi_weight, kpi_target, kpi_unit_measurement};


    const editKPI = async () => {     
        var datas = {
            'perspective': perspective,
            'objective': objective,
            'kpi_name': kpi_name,
            'kpi_weight': kpi_weight,
            'kpi_target': kpi_target,
            'kpi_unit_measurement': kpi_unit_measurement
        }
        axios
        .post(`${url}/edit/kpi/${kpi_name}/`, datas)
        .then((response) => {
            if (response.status == 200) {
                updateKpi(kpi_id, updatedKpi)
            }
        })
        .catch((error) => {
            alert(error.response.data['Error']);
          });
    } 

    const handleSubmit = (e) => {
        e.preventDefault();
        editKPI();
    }

    const getObjective = (e) => {
        setPerspective(e.target.value)
        if (document.getElementById('persearch').value === "Financial"){
            document.getElementById('objectives').innerHTML = 
			"<label>OBJECTIVES</label>"+
            "<select id = 'search'>"+
               "<option value='Increase Profitability'>Increase Profitability</option>"+
                "<option value='Enhance Financial Soundness'>Enhance Financial Soundness</option>"+
                "<option value='Enhance Market Share'>Enhance Market Share</option>"+
                "<option value='Enhance Financial Resources Mobilization'>Enhance Financial Resources Mobilization</option>"+
            "</select>";
        }
        if (document.getElementById('persearch').value === "Customer"){
            document.getElementById('objectives').innerHTML = 
			"<label>OBJECTIVES</label>"+
            "<select id = 'search'>"+
               " <option value='Increase Customer Satisfaction'>Increase Customer Satisfaction</option>"+
                "<option value='Improve customer retention'>Improve customer retention</option>"+
                "<option value='Increase Customer Acquisition (customer base)'>Increase Customer Acquisition (customer base)</option>"+
            "</select>";
        }
        if (document.getElementById('persearch').value === "Internal Business Process"){
            document.getElementById('objectives').innerHTML = 
			"<label>OBJECTIVES</label>"+
            "<select id = 'search'>"+
               " <option value='Enhance process efficiency and effectiveness'>Enhance process efficiency and effectiveness</option>"+
                "<option value='Improve marketing of the bank'>Improve marketing of the bank</option>"+
                "<option value='Improve risk and internal control management'>Improve risk and internal control management</option>"+
            "</select>";
        }
        if (document.getElementById('persearch').value === "Learning and Growth"){
            document.getElementById('objectives').innerHTML = 
			"<label>OBJECTIVES</label>"+
            "<select id = 'search'>"+
               " <option value='Enhance Organizational'>Enhance Organizational</option>"+
                "<option value='Enhance Information System Capital'>Enhance Information System Capital</option>"+
                "<option value='Enhance Human Capital'>Enhance Human Capital</option>"+
            "</select>";
        }
    }

    return (
        <div id="addKPI">
				<form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>PERSPECTIVE</label><br/>
                        <select  id="persearch"  value={perspective} onChange={(e) => getObjective(e)}>
                            <option value="Financial">Financial</option>
                            <option value="Customer">Customer</option>
                            <option value="Internal Business Process">Internal Business Process</option>
                            <option value="Learning and Growth">Learning and Growth</option>
                        </select>
					</div>
                    <div className="form-group">
                        <label>Objective</label> <br/>
                        <select id="objectives" value={objective} onChange={(e) => setObjective(e.target.value)}>
                        <option value='Increase Profitability'>Increase Profitability</option>
                        <option value='Enhance financial soundness'>Enhance Financial Soundness</option>
                        <option value='Enhance Market Share'>Enhance Market Share</option>
                        <option value='Enhance Financial Resources Mobilization'>Enhance Financial Resources Mobilization</option>
                        <option value='Increase Customer Satisfaction'>Increase Customer Satisfaction</option>
                        <option value='Improve customer retention'>Improve customer retention</option>
                        <option value='Increase Customer Acquisition (customer base)'>Increase Customer Acquisition (customer base)</option>
                        <option value='Enhance process efficiency and effectiveness'>Enhance process efficiency and effectiveness</option>
                        <option value='Improve marketing of the bank'>Improve marketing of the bank</option>
                        <option value='Improve risk and internal control management'>Improve risk and internal control management</option>
                        <option value='Enhance Organizational'>Enhance Organizational</option>
                        <option value='Enhance Information System Capital'>Enhance Information System Capital</option>
                        <option value='Enhance Human Capital'>Enhance Human Capital</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>KPI NAME</label>
                        <input id="kpi" 
                                required
                                type="text" 
                                className="form-control" 
                                name="kpi_name" 
                                value={kpi_name} 
                                onChange = { (e) => setKpi_name(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label>KPI WEIGHT</label>
                        <input id="weight" 
                                required
                                type="text" 
                                className="form-control"
                                name="kpi_weight"
                                value={kpi_weight}
                                onChange = { (e) => setKpi_weight(e.target.value)} />
                    </div>
                    <div className="form-group">
							<label>TARGET</label>
							<input id="target" 
                                   type="text" 
                                   className="form-control" 
                                   required 
                                   value={kpi_target}
                                   onChange = {(e) => setKpi_target(e.target.value)}
                            />
						</div>
                    <div className="form-group">
							<label>UNIT OF MEASUREMENT</label> <br/>
							<select value={kpi_unit_measurement} onChange={(e) => setKpi_unit_measurement(e.target.value)}>
                                <option value="Percentage">Percentage</option>
                                <option value="USD">USD</option>
                                <option value="ETB">ETB</option>
                                <option value="Numbers">Numbers</option>
                                <option value="Level">Level</option>
                            </select>
						</div>
                    <div className="form-group" style={{textAlign: "right"}}>
                        <Button variant="success" type="submit" block="true">
                            Edit KPI
                        </Button>
                    </div>
						
				</form>
			</div>
    )

}
export default EditForm;