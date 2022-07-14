import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const DetailForm = ({theEmployee}) => {
    return (
    // <div id="addKPI">
    //     <div className="form-group">
    //         <label>KPI Name</label>
    //         <h4>{theEmployee.kpi_name}</h4>
    //     </div><br/>
    //     <div className="form-group">
    //         <label>Perspective</label>
    //         <h4>{theEmployee.perspective}</h4>
    //     </div>
    //     <div className="form-group"><br/>
    //         <label>KPI Objective</label>
    //         <h4>{theEmployee.objective}</h4>
    //     </div>
    //     <div className="form-group"><br/>
    //         <label>KPI Weight</label>
    //         <h4>{theEmployee.kpi_weight}</h4>
    //     </div>
    //     <div className="form-group"><br/>
    //         <label>KPI Target</label>
    //         <h4>{theEmployee.kpi_target}</h4>
    //     </div>
    // </div>
    <ButtonToolbar className="mb-3" aria-label="Toolbar with Button groups">
        <ButtonGroup className="me-2" aria-label="First group">
          <Button variant="secondary">1</Button>{' '}
        </ButtonGroup>
        <InputGroup>
          <InputGroup.Text id="btnGroupAddon">@</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Input group example"
            aria-label="Input group example"
            aria-describedby="btnGroupAddon"
          />
        </InputGroup>
      </ButtonToolbar>
    )
}
export default DetailForm;