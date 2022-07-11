import React, { useContext, useState, createContext } from "react";
import { v4 as uuidv4 } from 'uuid';

const APIContext = createContext();

export function APIContextProvider({ children }) {
  const [kpis, setKpis] = useState([]);
  const [uniqueobjective, setUniqueObjective] = useState([])
  const [perspective, setPerspective] = useState();
  const [objective, setObjective] = useState();
  const [kpiName, setKpiName] = useState();
  const [selectedKpi, setSelectedKpi] = useState();
  const [editperspective, setEditPerspective] = useState()
  const [base, setBase] = useState("")
  const [kpiId, setKpiId] = useState('')

  const changeBase = (dept) => {
    setBase(dept)
  }

  const changeKPIs = (KPIs) => {
    const newkpis = KPIs.map((kpi, index) => { 
      if(kpi.kpi_unit_measurement === 'Percentage') {
        kpi.kpi_weight = (kpi.kpi_weight * 100)
        kpi.kpi_target = (kpi.kpi_target * 100)
      } else {
        kpi.kpi_weight = (kpi.kpi_weight * 100)
      }
    })
    setKpis(KPIs)
  }

  const changeKpiId = (kpi_id) => {
    setKpiId(kpi_id)
  }

  const changeUniqueKpiName = (uniquename) => {
    setUniqueObjective(uniquename)
  }

  const changeEditPerspective = (EditPerspectives) => {
    setEditPerspective(EditPerspectives)
  }

  const changeKpiName = (kpiName) =>{
    setKpiName(kpiName);
  }
  const changeSelectedKpi = (selectKpi) => {
    setSelectedKpi(selectKpi);
  }
  const changePerpective = (perpective) => {
    setPerspective(perpective);
  }
  const changeObjective = (objective) => {
    setObjective(objective);
  }
  const addKpi = (perspective, objective, kpi_name, kpi_weight, kpi_target, kpi_unit_measurement) => {
    setKpis([...kpis , { kpi_id:uuidv4(),perspective, objective, kpi_name, kpi_weight, kpi_target, kpi_unit_measurement}])
    }

  const updateKpi = (kpi_id, updatedKpi) => {
        setKpis(kpis.map((kpi) => kpi.kpi_id === kpi_id ? updatedKpi : kpi))
    }

  const deleteKpi = (kpi_id) => {
    setKpis(kpis.filter(kpi => kpi.kpi_id !== kpi_id))
  }

  return (
    <APIContext.Provider
      value={{
        kpis,
        perspective,
        objective,
        changeSelectedKpi,
        changePerpective,
        changeObjective,
        addKpi,
        updateKpi,
        deleteKpi,
        changeKpiName,
        kpiName,
        selectedKpi,
        changeUniqueKpiName,
        uniqueobjective,
        changeEditPerspective,
        editperspective,
        changeKPIs,
        changeBase,
        base,
        kpiId,
        changeKpiId
      }}
    >
      {children}
    </APIContext.Provider>

  );
}

export function useAPI() {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}