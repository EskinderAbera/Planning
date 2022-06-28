import { Button } from "react-bootstrap"
import { useState, useRef } from 'react';
import axios from "axios";
import { useAPI } from "../contexts/KPIContext";
import { url } from "./Constants";
import { EnhanceFinancialSoundness, EnhanceMarketShare, IncreaseProfitability,
         IncreaseCustomerSatisfaction, IncreaseCustomerAcquisition,
         ImproveCustomerRetention, EnhanceProcessEfficiency, ImproveRisk, ImproveMarketing,
         EnhanceHumanCapital, EnhanceOrganizationalCapital, EnhanceInformationSystem, EnhanceFinancialResourcesMobilization } from "../kpis/kpis";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddForm = () =>{

    const {updateKpi} = useAPI();
    const kpi_unit_measurement = useRef();

    const [newKPI, setNewKPI] = useState({
        perspective:"", objective:"", kpi_name:"", kpi_weight:"", kpi_target:""
    });

    const onInputChange = (e) => {
        setNewKPI({...newKPI,[e.target.name]: e.target.value})
    }


    const getMeasurement = (e) => {
        onInputChange(e)
        if(e.target.value === "Gross Profit" || e.target.value === "Incremental Deposit") {
            kpi_unit_measurement.current = "ETB"
        } else if(e.target.value === "Foreign Currency Mobilization") {
            kpi_unit_measurement.current = "USD"
        } else if (e.target.value === "New customer acquisition" || e.target.value === "Dropout ratio" || e.target.value === "Non-compliance to SOP" || e.target.value === "Non-compliance to SLA" || e.target.value === "New products"){
            kpi_unit_measurement.current = "Number"
        } else {
            kpi_unit_measurement.current = "Percentage"
        }
    }

    const getKpi = (e) => {
        onInputChange(e);      
        if (document.getElementById("objectives").value === "Increase Profitability") {
            document.getElementById("kpi").innerHTML = IncreaseProfitability();
        } else if(document.getElementById("objectives").value === "Enhance Financial Soundness") {
            document.getElementById("kpi").innerHTML = EnhanceFinancialSoundness();
        } else if(document.getElementById("objectives").value === "Enhance Market Share") {
            document.getElementById("kpi").innerHTML = EnhanceMarketShare();
        } else if(document.getElementById("objectives").value === "Enhance Financial Resources Mobilization") {
            document.getElementById("kpi").innerHTML = EnhanceFinancialResourcesMobilization();
        } else if(document.getElementById("objectives").value === "Increase Customer Satisfaction") {
            document.getElementById("kpi").innerHTML = IncreaseCustomerSatisfaction();
        } else if(document.getElementById("objectives").value === "Improve customer retention") {
            document.getElementById("kpi").innerHTML = ImproveCustomerRetention();
        } else if(document.getElementById("objectives").value === "Increase Customer Acquisition (customer base)") {
            document.getElementById("kpi").innerHTML = IncreaseCustomerAcquisition ();
        } else if(document.getElementById("objectives").value === "Enhance process efficiency and effectiveness") {
            document.getElementById("kpi").innerHTML =EnhanceProcessEfficiency ();
        } else if(document.getElementById("objectives").value === "Improve marketing of the bank") {
            document.getElementById("kpi").innerHTML = ImproveMarketing ();
        } else if(document.getElementById("objectives").value === "Improve risk and internal control management") {
            document.getElementById("kpi").innerHTML = ImproveRisk ();
        } else if(document.getElementById("objectives").value === "Enhance Organizational Capital") {
            document.getElementById("kpi").innerHTML = EnhanceOrganizationalCapital ();
        }else if(document.getElementById("objectives").value === "Enhance Information System Capital") {
            document.getElementById("kpi").innerHTML = EnhanceInformationSystem ();
        } else if (document.getElementById("kpi").value === "Enhance Human Capital"){
            document.getElementById("kpi").innerHTML = EnhanceHumanCapital ();
        }
        else {
            return null;
        }
    }

    const getObjective = (e) => {
        onInputChange(e);
        document.getElementById('kpi').innerHTML = 
        "<label>KPI Name</label>"+
        "<select id = 'search'>"+
            "<option>-----</option>"+
        "</select>";
        if (document.getElementById('persearch').value === "----"){
            document.getElementById('objectives').innerHTML = 
            "<label>OBJECTIVES</label>"+
            "<select id = 'search'>"+
            "<option>-----</option>"+
            "</select>";
        }
        if (document.getElementById('persearch').value === "Financial"){
            document.getElementById('objectives').innerHTML = 
			"<label>OBJECTIVES</label>"+
            "<select id = 'search'>"+
                "<option>-----</option>"+
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
            "<option>-----</option>"+
               " <option value='Increase Customer Satisfaction'>Increase Customer Satisfaction</option>"+
                "<option value='Improve customer retention'>Improve customer retention</option>"+
                "<option value='Increase Customer Acquisition (customer base)'>Increase Customer Acquisition (customer base)</option>"+
            "</select>";
        }
        if (document.getElementById('persearch').value === "Internal Business Process"){
            document.getElementById('objectives').innerHTML = 
			"<label>OBJECTIVES</label>"+
            "<select id = 'search'>"+
            "<option>-----</option>"+
               " <option value='Enhance process efficiency and effectiveness'>Enhance process efficiency and effectiveness</option>"+
                "<option value='Improve marketing of the bank'>Improve marketing of the bank</option>"+
                "<option value='Improve risk and internal control management'>Improve risk and internal control management</option>"+
            "</select>";
        }
        if (document.getElementById('persearch').value === "Learning and Growth"){
            document.getElementById('objectives').innerHTML = 
			"<label>OBJECTIVES</label>"+
            "<select id = 'search'>"+
            "<option>-----</option>"+
               " <option value='Enhance Organizational Capital'>Enhance Organizational Capital</option>"+
                "<option value='Enhance Information System Capital'>Enhance Information System Capital</option>"+
                "<option value='Enhance Human Capital'>Enhance Human Capital</option>"+
            "</select>";
        }
    }

    const { perspective, objective, kpi_name, kpi_weight, kpi_target } = newKPI;
    const  updatedKpi  = {perspective, objective, kpi_name, kpi_weight, kpi_target, kpi_unit_measurement}


    const handleError = (error) => {
        <div>
        {toast.warning(error.response.data["Error"])};
        <ToastContainer />
      </div>
    }

    const handleSuccess = (data) => {
        <div>
            {toast.info("You have added KPI Successfully!")};
            <ToastContainer />
        </div>
    }

    const saveKPI = async () => {   
        var datas = {
            'perspective': newKPI.perspective,
            'objective': newKPI.objective,
            'kpi_name': newKPI.kpi_name,
            'kpi_weight': newKPI.kpi_weight,
            'kpi_target': newKPI.kpi_target,
            'kpi_unit_measurement': kpi_unit_measurement.current
        }
        axios
        .post(`${url}/edit/kpi/${kpi_name}/`, datas)
        .then((response) => {
            if (response.status === 200) {
                handleSuccess(response.data);
                {
                    const kpi_id = response.data['kpi_id']
                    const kpi_unit_measurement = response.data['kpi_unit_measurement']
                    const updatedKpi = {kpi_id, perspective, objective, kpi_name, kpi_weight, kpi_target, kpi_unit_measurement}
                    updateKpi(kpi_name, updatedKpi)
                }
            }
            })
        .catch((error) => {
            handleError(error);
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
                        <select name="perspective"  id="persearch" value={newKPI.perspective} onChange={(e) => getObjective(e)}>
                            <option value="----">----</option>
                            <option value="Financial">Financial</option>
                            <option value="Customer">Customer</option>
                            <option value="Internal Business Process">Internal Business Process</option>
                            <option value="Learning and Growth">Learning and Growth</option>
                        </select>
					</div>
                    <div className="form-group">
							<label>OBJECTIVES</label><br/>
							<select name="objective" id = 'objectives' value={newKPI.objective} onChange = { (e) => getKpi(e)}>
                                <option>-----</option>
							</select>
						</div>
						<div className="form-group">
							<label>KPI NAME</label><br/>
                            <select name="kpi_name" id="kpi" value={newKPI.kpi_name} onChange={(e) =>getMeasurement(e) }>
                                <option>----</option>
                            </select>
						</div>
						<div className="form-group">
							<label>KPI WEIGHT</label>
							<input id="weight" 
                                   required
                                   type="text" 
                                   className="form-control"
                                   name="kpi_weight"
                                   value={kpi_weight}
                                   onChange = {(e) => onInputChange(e)}
                            />
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
							<label>{kpi_unit_measurement.current}</label> <br/>
						</div>
                        <div className="form-group" style={{textAlign: "right"}}>
                            <Button variant="success" type="submit" block= "true">
                                Add New KPI
                            </Button>
						</div>
				</form>
			</div>
     )
}

export default AddForm;