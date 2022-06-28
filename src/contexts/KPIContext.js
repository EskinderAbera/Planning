import React, { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const APIContext = createContext();

export function APIContextProvider({ children }) {
  const [kpis, setKpis] = useState([]);
  const [ loading, setLoading ] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        `https://bsc-newapi.herokuapp.com/bsc/planning/kpi/`
      );
      setKpis(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const addKpi = (perspective, objective, kpi_name, kpi_weight, kpi_target, kpi_unit_measurement) => {
    setKpis([...kpis , { kpi_id:uuidv4(),perspective, objective, kpi_name, kpi_weight, kpi_target, kpi_unit_measurement}])
    }

  const updateKpi = (kpi_name, updatedKpi) => {
        setKpis(kpis.map((kpi) => kpi.kpi_name === kpi_name ? updatedKpi : kpi))
    }

  return (
    loading ? <h2>Loading.....</h2> :
    <APIContext.Provider
      value={{
        kpis,
        addKpi,
        updateKpi
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





// const sortedEmployees = employees.sort((a,b)=>(a.name < b.name ? -1 : 1));





// const deleteEmployee = (id) => {
//     setEmployees(employees.filter(employee => employee.id !== id))
// }

// const updateEmployee = (id, updatedEmployee) => {
//     setEmployees(employees.map((employee) => employee.id === id ? updatedEmployee : employee))
// }

    // return (
//         <EmployeeContext.Provider value={{kpis}}>
//             {props.children}
//         </EmployeeContext.Provider>
//     )
// }

// export default EmployeeContextProvider;


