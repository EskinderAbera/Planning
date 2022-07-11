import React from 'react'
import { useAPI } from "../contexts/KPIContext";

function CustomDropdown(){
  const { changeSelectedKpi, selectedKpi} = useAPI();

return <div className="form-group">
  <select id='KPI' className="form-control" onChange={(e)=>{changeSelectedKpi(e.target.value)}}>
   
    <option value={selectedKpi}>
      {selectedKpi}
    </option>
    </select>
</div>
}

const CustomListDropDown = () => {
 
  return (
    <div className="form-group">
      <label>Unit of Measurement</label>
      <CustomDropdown />
    </div>
  )
}
export default CustomListDropDown;