import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAllStandard,
  standardInsertUpdate,
  standardDelete,
  clearUpdate
} from "../actions";
import Form from "react-validation/build/form";
import Button from "react-validation/build/button";
import Input from "react-validation/build/input";
import { AgGridReact } from "ag-grid-react";
import "ag-grid/dist/styles/ag-grid.css";
import "ag-grid/dist/styles/ag-theme-balham.css";
import GridActions from "./Common/GridActions";
import UpdateGrid from "./Common/UpdateGrid";

class StandardMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        {
          headerName: "SrNo",
          width: 80,
          valueGetter: "parseInt(node.id)+1",
          cellRenderer: function(params) {
            return params.value;
          }
        },
        { headerName: "Standard", field: "Standard" },
        // {headerName: "Active", field: "IsActive"},
        // valueGetter: function(params)
        // {
        //   if(params.data.IsActive===1)
        //     {
        //       return true;
        //     }
        //   else
        //     {
        //       return false;
        //     }
        // }
        // },
        {
          headerName: "Actions",
          cellRendererFramework: GridActions,
          field: "Id",
          colId: "params",
          suppressFilter: true,
          enableSorting: false
        }
      ],
      context: { componentParent: this },
      stdData: [],
      standard: "",
      isActive: true,
      showGridDelete: true,
      showGridEdit: true,
      rowClassRules: {
        inActive: function(params) {
          return !params.data.IsActive;
        }
      }
    };
  }
  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  };
  agGridEdit = (data, nodeId) => {
    console.log("in agGridEdit");
    this.setState({ showForm: true });
    this.setState({
      id: data.Id,
      standard: data.Standard,
      isActive: this.displayCheckbox(data),
      nodeId
    });
  };
  //To display the state of the checkbox in edit mode
  displayCheckbox(data) {
    if (data.IsActive === 1) {
      console.log("yesss 1");
      return (document.getElementById("isActive").checked = true);
    } else {
      return (document.getElementById("isActive").checked = false);
    }
  }
  agGridDelete = (row, nodeId) => {
    const standardMaster = {
      Id: row.Id,
      UpdatedBy: 1
    };
    this.props.standardDelete(standardMaster, nodeId);
  };
  showform = () => {
    this.setState({ showForm: true });
  };
  hideform = () => {
    this.setState({ showForm: false });
  };
  componentWillMount() {
    this.props.getAllStandard();
  }
  componentDidUpdate() {
    UpdateGrid(this, "standardMaster");
  }
  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSwitchToggle = e => {
    this.setState({ [e.target.name]: !this.state[e.target.name] });
  };
  handleSubmit = event => {
    event.preventDefault();
    const standardData = {
      Id: this.state.id || 0,
      Standard: this.state.standard,
      IsActive: this.state.isActive ? 1 : 0,
      IsDelete: 0,
      CreatedBy: 1,
      UpdatedBy: 0
    };
    console.log(standardData);
    this.props.standardInsertUpdate(standardData, this.state.nodeId);
  };

  render() {
    console.log(this.props.standardMaster);
    return (
      <div className="row">
        <div className="col-lg-12">
          <section className="panel">
            {/* <header className="panel-heading">Standard Master</header> */}
            <div className="panel-body">
              <Form onSubmit={this.handleSubmit.bind(this)}>
                <div className="position-center">
                  <div className="form-group">
                    <label htmlFor="">Standard</label>
                    <Input
                      type="text"
                      className="form-control col-md-6"
                      id="standard"
                      value={this.state.standard || ""}
                      name="standard"
                      onChange={this.onInputChange}
                      label="Standard"
                    />
                  </div>
                  <div className="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        name="isActive"
                        id="isActive"
                        defaultChecked="false"
                        onChange={this.onSwitchToggle}
                      />
                      Is Active?
                    </label>
                  </div>
                  <Button type="submit" className="btn btn-success btn-md">
                    Save
                  </Button>
                </div>
              </Form>
            </div>
          </section>
        </div>
        <div className="col-lg-12">
          <section className="panel">
            <div className="panel-body">
              <div
                className="ag-theme-balham"
                style={{
                  height: "200px"
                  // width: '600px'
                }}
              >
                <AgGridReact
                  context={this.state.context}
                  columnDefs={this.state.columnDefs}
                  rowData={this.props.standardMaster}
                  onGridReady={this.onGridReady}
                  floatingFilter={true}
                  rowClassRules={this.state.rowClassRules}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ standardMaster, update }) {
  return { update, standardMaster };
}

export default connect(
  mapStateToProps,
  { getAllStandard, standardInsertUpdate, standardDelete, clearUpdate }
)(StandardMaster);
