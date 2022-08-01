import { Button } from "react-bootstrap"
import { useAPI } from "../contexts/KPIContext";
import { useState, useEffect } from 'react';
import axios from "axios";
import { url, baseUrl } from "./Constants";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomListDropDown from '../components/EditComponent/EditDropdownListPerpective';
import CustomListDropDownObj from '../components/EditComponent/EditDropdownListObjective';
import CustomListDropDownKPi from '../components/EditComponent/EditDropdownListKPIs';
import CustomListDropDownUnitMeasurement from '../components/EditComponent/EditDropdownListUnitofMeasurement'


const EditForm = ({theEmployee}) => {
    const { selectedKpi, perspective, objective, kpiName, updateKpi, 
            changeKpiName, changeSelectedKpi, changePerpective, changeObjective, 
            kpis, changeUniqueKpiName, base, department} = useAPI();
            
    const kpi_id = theEmployee.kpi_id
    const kpi_name = kpiName
    const kpi_unit_measurement = selectedKpi

    useEffect(() => {
        const duplicateObjective = []
        changePerpective(theEmployee.perspective)
        changeKpiName(theEmployee.kpi_name)
        changeObjective(theEmployee.objective)
        changeSelectedKpi(theEmployee.kpi_unit_measurement)

        function handleChange() {
            kpis.filter((item, index) => item.perspective === theEmployee.perspective).map((item, index) => (
              duplicateObjective.push({ "id":item.kpi_id, "objective": item.objective })
            ))
            function removeDuplicateObjectFromArray(array, key) {
              var check = new Set();
              return array.filter(obj => !check.has(obj[key]) && check.add(obj[key]));
            }
            let uniqueObjective = removeDuplicateObjectFromArray(duplicateObjective, "objective")
            changeUniqueKpiName(uniqueObjective)    
          }
        handleChange()
    }, []);

    const [kpi_weight, setKPIWeight] = useState(theEmployee.kpi_weight);
    const [kpi_target, setKPITarget] = useState(theEmployee.kpi_target);

    const updatedKpi = {kpi_id, kpi_name, perspective, objective, kpi_weight, kpi_target, kpi_unit_measurement }

    const handleError = (error) => {
        <div>
            {toast.warning(error.response.data["Error"])};
            <ToastContainer />
        </div>
    }

    const handleSuccess = (data) => {
        <div>
            {toast.info("You have edited KPI Successfully!")};
            <ToastContainer />
        </div>
    }

    const editKPI = async () => {     
        var datas = {
            'perspective': perspective,
            'objective': objective,
            'kpi_name': kpiName,
            'kpi_weight': kpi_weight,
            'kpi_target': kpi_target,
            'kpi_unit_measurement': selectedKpi
        }

        if(department === 'Director'){
            axios
            .post(`${url}/director/edit/kpi/${kpiName}/`, datas)
            .then((response) => {
                if (response.status == 200) {
                    handleSuccess(response.data)
                    updateKpi(kpi_id, updatedKpi)
                }
            })
            .catch((error) => {
                handleError(error.response.data['Error']);
              });
              
        } else {
            axios
            .post(`${url}/${base}/edit/kpi/${kpiName}/`, datas)
            .then((response) => {
                if (response.status == 200) {
                    handleSuccess(response.data)
                    updateKpi(kpi_id, updatedKpi)
                }
            })
            .catch((error) => {
                handleError(error.response.data['Error']);
            });
        }
    } 

    const handleSubmit = (e) => {
        e.preventDefault();
        editKPI();
    }

    return (
        <div id="addKPI">
            <form onSubmit={handleSubmit}>
                <CustomListDropDown />
                <CustomListDropDownObj />
                <CustomListDropDownKPi />
                <CustomListDropDownUnitMeasurement />
                <div className="form-group">
                    <label>KPI WEIGHT</label>
                    <input
                        id="weight"
                        required
                        type="text"
                        className="form-control"
                        name="kpi_weight"
                        value={kpi_weight}
                        onChange={(e) => setKPIWeight(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>TARGET</label>
                    <input
                        id="target"
                        type="text"
                        className="form-control"
                        name="kpi_target"
                        required
                        value={kpi_target}
                        onChange={(e) => setKPITarget(e.target.value)}
                    />
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