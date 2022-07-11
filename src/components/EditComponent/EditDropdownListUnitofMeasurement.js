import React from 'react'
import { useAPI } from '../../contexts/KPIContext';

function CustomDropdown(){
  const {objective,changeSelectedKpi, changeKpiName, kpiName, selectedKpi} = useAPI();

return <div className="form-group">
  <select id='KPI' className="form-control" onChange={(e)=>{changeSelectedKpi(e.target.value)}}>
    <option value={selectedKpi}>
      {selectedKpi}
    </option>
    </select>
</div>
}

export default class CustomListDropDownUnitMeasurement extends React.Component {
  constructor() {
    super()
    this.state = {
      collection: [],
      value: '',
    }
  }
 
  render() {
    return (
      <div className="form-group">
        <label>Unit of Measurement</label>
        <CustomDropdown />
      </div>
    )
  }
}