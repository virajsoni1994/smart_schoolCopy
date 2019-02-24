import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAllDivision,
  divisionInsertUpdate,
  divisionDelete
} from "../actions";
import Form from "react-validation/build/form";
import Button from "react-validation/build/button";
import Input from "react-validation/build/input";
import { AgGridReact } from "ag-grid-react";
import "ag-grid/dist/styles/ag-grid.css";
import "ag-grid/dist/styles/ag-theme-balham.css";
import GridActions from "./Common/GridActions";

class DivisionMaster extends Component {
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
        { headerName: "Division", field: "Division" },
        // {headerName: "Active", field: "Active"},
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
      division: "",
      isActive: true,
      showGridDelete: true,
      showGridEdit: true,
      rowClassRules: {
        inActive: function(params) {
          console.log("rcr " + params.data.IsActive);
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
      division: data.Division,
      isActive: data.IsActive,
      nodeId
    });
  };
  agGridDelete = (row, nodeId) => {
    const divMaster = {
      Id: row.Id,
      UpdatedBy: 1
    };
    this.props.divisionDelete(divMaster, nodeId);
  };
  showform = () => {
    this.setState({ showForm: true });
  };
  hideform = () => {
    this.setState({ showForm: false });
  };
  componentWillMount() {
    this.props.getAllDivision();
  }
  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const divisionData = {
      Id: this.state.id || 0,
      Division: this.state.division,
      IsActive: this.state.isActive ? 1 : 0,
      IsDelete: 0,
      CreatedBy: 1,
      UpdatedBy: 0
    };
    console.log(divisionData);
    this.props.divisionInsertUpdate(divisionData, this.state.nodeId);
    //  let stdData = [...this.props.divisionMaster]
    //  stdData.push(divisionData);
    //  // setting back the state will trigger a rerender and will show the changes on screen
    //  this.setState({stdData})
  };

  render() {
    console.log(this.props.divisionMaster);
    return (
      <div className="row">
        <div className="col-lg-12">
          <section className="panel">
            {/* <header className="panel-heading">Division Master</header> */}
            <div className="panel-body">
              <Form onSubmit={this.handleSubmit.bind(this)}>
                <div className="position-center">
                  <div className="form-group">
                    <label htmlFor="">Division</label>
                    <Input
                      type="text"
                      className="form-control col-md-6"
                      id="division"
                      value={this.state.division || ""}
                      name="division"
                      onChange={this.onInputChange}
                      label="division"
                    />
                  </div>
                  <div className="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        name="isActive"
                        onChange={this.onInputChange}
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
                  rowData={this.props.divisionMaster}
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

function mapStateToProps({ divisionMaster, update }) {
  return { update, divisionMaster };
}

export default connect(
  mapStateToProps,
  { getAllDivision, divisionInsertUpdate, divisionDelete }
)(DivisionMaster);
