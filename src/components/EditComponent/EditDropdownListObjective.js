import React from 'react'
import { useAPI } from '../../contexts/KPIContext';

function CustomDropdown(){
  function handleObjective(e) {
    changeObjective(e.target.value)
  }
  const {objective,changeObjective, uniqueobjective} = useAPI();

return <div className="form-group">

  <select
    className="form-control"
    id="objective"
    onChange={(e)=>{handleObjective(e)}} 
    value={objective}
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

const CustomListDropDownObj = () => {
  return (
    <div className="form-group">
      <label>Choose Objective</label>
      <CustomDropdown />
    </div>
  )

}
export default CustomListDropDownObj;