import React, { useEffect, useState } from "react";
import { useAPI } from "../contexts/KPIContext";
import styles from './LandingPage.module.css';
import shape from './img/shape.png'
import hailes from '../resources/images/hailes_cleanup.jpg'
import loader from '../resources/images/loader.gif'
import coop from '../resources/images/coop.png'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl, url } from "./Constants";

const LandingPage = () => {
    let navigate = useNavigate();
    const { changeKPIs, changeBase} = useAPI();
    const [loading, setLoading] = useState(false)
    
    const handleChange = (e) => {
        const bases = e.target.value
        changeBase(e.target.value)
        setLoading(true)
        axios
        .get(`${url}/${bases}/kpi/`)
        .then((response) => {
            if (response.status == 200) {
                changeKPIs(response.data)
                navigate(`/kpi`);
            }
        })
        .catch((error) => {
            alert(error.response.data['Error']);
          });
    }
    return (
       
    <main className={styles.main}>
        {loading ? <div className={styles.loader}>
            <img src={loader} className = {styles.loading}/>
        </div> :
      <div className={{...styles.bigwrapper, ...styles.light}}>
        <img src={shape} alt="" className={styles.shape} />

        <header>
          <div className={styles.container}>
            <div className={styles.log}>
              <img src={coop} alt="Logo" />
            </div>
          </div>
        </header>

        <div className={styles.showcasearea}>
          <div className={styles.container}>
            <div className={styles.left}>
              <div className={styles.bigtitle}>
                <h1>Planning DashBoard</h1>
                <h1>Start Exploring now.</h1>
              </div>
              <p className={styles.text}>
                "To be the leading private bank in 2025"
              </p>
              <div className={styles.cta}>
                <div className="form-group selects">
                    <select id='KPI' className="form-control form-control-sm" onChange={(e)=>handleChange(e)}>
                        <option>Select....</option>
                        <option value="bsc">corporate</option>
                        <option value="operation">Banking Operation Process</option>
                        <option value="corporate">Corporate Banking Operation</option>
                        <option value="cooperative">Cooperative Banking Operation</option>
                        <option value="credit">Credit Appraisal Process</option>
                        <option value="finance">Finance and Facility Process</option>
                        <option value="hc">HC and Projects Management</option>
                        <option value="internal">Internal Audit Process</option>
                        <option value="ifb">IFB Process</option>
                        <option value="is">IS Process</option>
                        <option value="legal">Legal Services</option>
                        <option value="bod">BOD Secretary</option>
                        <option value="risk">Risk and Compliance</option>
                        <option value="strategy">Strategy and Marketing</option>
                        <option value="tech">Tech and Digital Process</option>
                    </select>
                </div>
                </div>
            </div>

            <div className={styles.right}>
              <img src={hailes} alt="Person-Image" className={styles.person} />
            </div>
          </div>
        </div>
      </div>
}
    </main>
    
    )
}
export default LandingPage