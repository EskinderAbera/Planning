import React, {useState, useEffect} from 'react'
import { useAPI } from '../../contexts/KPIContext';
import "bootstrap/dist/css/bootstrap.min.css";

function CustomListDropDown() {
  const {changePerpective, changeObjective, changeSelectedKpi, changeKpiName, kpis, changeUniqueKpiName, perspective} = useAPI();
  const duplicateObjective = []

  function handleChange(e) {
    changePerpective(e.target.value); 
    kpis.filter((item, index) => item.perspective === e.target.value).map((item, index) => (
      duplicateObjective.push({ "id":item.kpi_id, "objective": item.objective })
    ))
    function removeDuplicateObjectFromArray(array, key) {
      var check = new Set();
      return array.filter(obj => !check.has(obj[key]) && check.add(obj[key]));
    }
    let uniqueObjective = removeDuplicateObjectFromArray(duplicateObjective, "objective")
    changeUniqueKpiName(uniqueObjective)    
    changeObjective("");
    changeSelectedKpi("");
    changeKpiName("");
  }
    return (
      
      <div className="form-group">
        <label>Choose Perspective</label>
      <select
      className="form-control"
      id="perpective"
      onChange={(e)=>{handleChange(e)}}
      value={perspective}
     
    >
      <option defaultValue>Select</option>
        <option value="Customer">
        Customer
        </option>
        <option value="Internal Business Process">
        Internal Business Process
        </option>
        <option value="Financial">
          Financial
        </option>
        <option value="Learning and Growth">
        Learning and Growth
        </option>
    </select>
    </div>
    
    )
  }
export default CustomListDropDown;