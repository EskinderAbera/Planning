import { Button } from "react-bootstrap"
import { useState } from 'react';
import axios from "axios";
import { useAPI } from "../contexts/KPIContext";
import { url } from "./Constants";

const AddForm = () =>{

    const {addKpi} = useAPI();

    const [newKPI, setNewKPI] = useState({
        perspective:"Financial", objective:"Increase Profitability", kpi_name:"", kpi_weight:"", kpi_target:"", kpi_unit_measurement:"Percentage"
    });

    const onInputChange = (e) => {
        setNewKPI({...newKPI,[e.target.name]: e.target.value})
    }

    const getObjective = (e) => {
        onInputChange(e);
        if (document.getElementById('persearch').value === "Financial"){
            document.getElementById('objectives').innerHTML = 
			"<label>OBJECTIVES</label>"+
            "<select id = 'search'>"+
               " <option value='Increase Profitability'>Increase Profitability</option>"+
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

    const { perspective, objective, kpi_unit_measurement, kpi_name, kpi_weight, kpi_target } = newKPI;

    const saveKPI = async () => {     
        var datas = {
            'perspective': newKPI.perspective,
            'objective': newKPI.objective,
            'kpi_name': newKPI.kpi_name,
            'kpi_weight': newKPI.kpi_weight,
            'kpi_target': newKPI.kpi_target,
            'kpi_unit_measurement': newKPI.kpi_unit_measurement
        }
        axios
        .post(`${url}/add/kpi/`, datas)
        .then((response) => {
            if (response.status == 201) {
                addKpi(newKPI.perspective, newKPI.objective, newKPI.kpi_name, newKPI.kpi_weight, newKPI.kpi_target, newKPI.kpi_unit_measurement)
            }
        })
        .catch((error) => {
            alert(error.response.data['Error']);
          });
    } 

    const handleSubmit = (e) => {
        e.preventDefault();
        saveKPI();
    }

     return (

        <div id="addKPI">
				<form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>PERSPECTIVE</label><br/>
                        <select name="perspective"  id="persearch" onChange={(e) => getObjective(e)}>
                            <option value="Financial">Financial</option>
                            <option value="Customer">Customer</option>
                            <option value="Internal Business Process">Internal Business Process</option>
                            <option value="Learning and Growth">Learning and Growth</option>
                        </select>
					</div>
                    <div className="form-group">
							<label>OBJECTIVES</label><br/>
							<select name="objective" id = 'objectives' onChange = { (e) => onInputChange(e)}>
								<option value='Increase Profitability'>Increase Profitability</option>
								<option value='Enhance Financial Soundness'>Enhance Financial Soundness</option>
								<option value='Enhance Market Share'>Enhance Market Share</option>
								<option value='Enhance Financial Resources Mobilization'>Enhance Financial Resources Mobilization</option>
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
                                   onChange = { (e) => onInputChange(e)}/>
						</div>
						<div className="form-group">
							<label>KPI WEIGHT</label>
							<input id="weight" 
                                   required
                                   type="text" 
                                   className="form-control"
                                   name="kpi_weight"
                                   value={kpi_weight}
                                   onChange = { (e) => onInputChange(e)} />
						</div>
                        <div className="form-group">
							<label>TARGET</label>
							<input id="target"
                                   type="text" 
                                   className="form-control"
                                   name="kpi_target"
                                   required 
                                   value={kpi_target}
                                   onChange = {(e) => onInputChange(e)}
                            />
						</div>
                        <div className="form-group">
							<label>UNIT OF MEASUREMENT</label> <br/>
                            <select name="kpi_unit_measurement" id="measurement" value={kpi_unit_measurement} onChange={(e) => onInputChange(e)}>
                                <option value='Percentage' name="kpi_unit_measurement" >Percentage</option>
                                <option value='ETB' name="kpi_unit_measurement">ETB</option>
                                <option value='USD' name="kpi_unit_measurement">USD</option>
                                <option value='Numbers' name="kpi_unit_measurement">Numbers</option>
                                <option value='Level' name="kpi_unit_measurement">Level</option>
                            </select>
						</div>
                        <div className="form-group" style={{textAlign: "right"}}>
                            <Button variant="success" type="submit" block>
                                Add New KPI
                            </Button>
						</div>
				</form>
			</div>
     )
}

export default AddForm;