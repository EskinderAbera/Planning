import React from 'react'
import { useAPI } from "../contexts/KPIContext";

function CustomDropdown(){
   
    const {changeObjective, uniqueobjective} = useAPI();
    
  return <div className="form-group">

    <select
      className="form-control"
      id="objective"
      onChange={(e)=>{changeObjective(e.target.value)}}
    >
      
      <option defaultValue>Select</option>
      {uniqueobjective.
      map((item, index) => (
        <option key = {item.id} value={item.objective}>
          {item.objective}
        </option>
      ))}
      
    </select>
  </div>
}

const CustomListDropDown = () => {
    return (
      <div className="form-group">
        <label>Choose Objective</label>
        <CustomDropdown />
      </div>
    )
}

export default CustomListDropDown;