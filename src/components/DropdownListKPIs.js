import React, {useState, useEffect} from 'react'
import { useAPI } from "../contexts/KPIContext";

function CustomDropdown(props){
    const {objective,changeSelectedKpi, changeKpiName, kpis, changeKpiId } = useAPI();
    const [kpiName, setKpiName] = useState("")
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

export default class CustomListDropDown extends React.Component {
  constructor() {
    super()
    this.state = {
      collection: [],
      value: '',
    }
  }
  componentDidMount() {
    // fetch('https://bsc-newapi.herokuapp.com/bsc/kpi/')
    fetch('http://127.0.0.1:8000/bsc/kpi/')
      .then((response) => response.json())
      .then((res) => {
        this.setState({ collection: res })})
  }
  onChange = (event) => {
    this.setState({ value: event.target.value })
    
   
  }
  render() {
    return (
      <div className="form-group">
        <label>Choose KPIs</label>
        
        <CustomDropdown
          name={this.state.perspective}
          options={this.state.collection}
        />
      </div>
    )
  }
}