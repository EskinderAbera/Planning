import { Button } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useAPI } from "../contexts/KPIContext";
import { url, baseUrl } from "./Constants";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomListDropDown from "./DropdownListPerpective";
import CustomListDropDownObj from "./DropdownListObjective";
import CustomListDropDownKPi from "./DropdownListKPIs";
import CustomListDropDownunit from "./DropdownListUnitofMeasurement";

const AddForm = () => {
  const { selectedKpi, perspective, objective, kpiName, updateKpi, changePerpective, changeKpiName, changeObjective, changeSelectedKpi, base, kpiId} = useAPI();

  const [kpi_weight, setKPIWeight] = useState(0);
  const [kpi_target, setKPITarget] = useState(0);
  const kpi_ids = useRef('')
  const kpi_names = useRef('')
  const kpi_unit_measurements = useRef('')
  kpi_unit_measurements.current = selectedKpi
  kpi_ids.current = kpiId
  kpi_names.current = kpiName
  const kpi_id = kpi_ids.current
  const kpi_name = kpi_names.current
  const kpi_unit_measurement = kpi_unit_measurements.current

  useEffect(() => {
    changePerpective("")
    changeKpiName("")
    changeObjective("")
    changeSelectedKpi("")
  }, []);

  const handleError = (error) => {
    <div>
      {toast.warning(error.response.data["Error"])};
      <ToastContainer />
    </div>;
  };

  const updatedKpi = {kpi_id, kpi_name, perspective, objective, kpi_weight, kpi_target, kpi_unit_measurement }

  const handleSuccess = (data) => {
    <div>
      {toast.info("You have added KPI Successfully!")};
      <ToastContainer />
    </div>;
  };

  const saveKPI = async () => {
    var datas = {
      "perspective": perspective,
      "objective": objective,
      "kpi_name": kpiName,
      "kpi_weight": kpi_weight,
      "kpi_target": kpi_target,
      "kpi_unit_measurement": selectedKpi,
    };

    axios
      .post(`${url}/${base}/add/kpi/`, datas)
      .then((response) => {
        if (response.status === 200) {
          handleSuccess(response.data);
          updateKpi(kpiId, updatedKpi)
        }
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveKPI();
  };

  return (
    <div id="addKPI">
      <form onSubmit={handleSubmit}>
        <CustomListDropDown />
         <CustomListDropDownObj />
         <CustomListDropDownKPi />
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
        <CustomListDropDownunit />
        <div className="form-group" style={{ textAlign: "right" }}>
          <Button variant="success" type="submit" block="true">
            Add New KPI
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
