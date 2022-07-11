import React from 'react'
import { useAPI } from "../contexts/KPIContext";

function CustomDropdown(){
    const {objective,changeSelectedKpi, changeKpiName, kpis, changeKpiId } = useAPI();

    function addUnit(e) {
      changeKpiName(e.target.value)
      var c = e.target.value
      var d = kpis.filter((item, index) => item.kpi_name === c)
      changeSelectedKpi(d[0].kpi_unit_measurement)
      changeKpiId(d[0].kpi_id)
    }
  return <div className="form-group">
    <select id='KPI' className="form-control" onChange={(e)=>{addUnit(e)}}>
      <option defaultValue>Select</option>
    {kpis.filter((item, index) => item.objective === objective && item.kpi_weight =='0').
      map((item, index) => (
        <option key={index} value={item.kpi_name}>
          {item.kpi_name}
       </option> 
      ))}
  </select>
  </div>
}

const CustomListDropDown = () => {
    return (
      <div className="form-group">
        <label>Choose KPIs</label>
        <CustomDropdown />
      </div>
    )
}

export default CustomListDropDown