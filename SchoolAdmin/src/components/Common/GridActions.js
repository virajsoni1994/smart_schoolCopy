import React, { Component } from "react";



class GridActions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: this.props.context.componentParent.state.showGridEdit,
      delete: this.props.context.componentParent.state.showGridDelete,
      custom1: this.props.context.componentParent.state.showGridCustom1,
      custom1Lbl: this.props.context.componentParent.state.showGridCustom1Lbl,
      custom2: this.props.context.componentParent.state.showGridCustom2,
      custom2Lbl: this.props.context.componentParent.state.showGridCustom1Lb2
    };
  }

  handleDelete = () => {
    if (this.props.context.componentParent.agGridDelete) {
      const confirmDelete = window.confirm("Are you sure want to delete?");
      if (confirmDelete) {
        this.props.context.componentParent.agGridDelete(
          this.props.data,
          this.props.node.id
        );
      }
    }
  };
  handleEdit = () => {
    if (this.props.context.componentParent.agGridEdit) {
      console.log("in edit");
      this.props.context.componentParent.agGridEdit(
        this.props.data,
        this.props.node.id
      );
    }
  };
  handleCustom1 = () => {
    if (this.props.context.componentParent.agGridCustom1) {
      this.props.context.componentParent.agGridCustom1(
        this.props.data,
        this.props.node.id
      );
    }
  };

  handleCustom2 = () => {
    if (this.props.context.componentParent.agGridCustom2) {
      this.props.context.componentParent.agGridCustom2(this.props.data);
    }
  };

  render() {
    return (
      <span>
        {this.state.delete && (
          <button
            onClick={this.handleDelete}
            type="button"
            className="btn btn-danger btn-sm"
            style={{
                margin: "0 auto",
                textAlign: "center"                
              }}
          >
            &#9587;
          </button>
        )}
        &nbsp;
        {this.state.edit && (
          <button
            onClick={this.handleEdit}
            type="button"
            className="btn btn-success btn-sm"
          >
            &#9998;
          </button>
        )}
        &nbsp;
        {this.state.custom1 && (
          <button
            onClick={this.handleCustom1}
            type="button"
            className="btn btn-primary btn-sm"
          >
            {this.state.custom1Lbl ? this.state.custom1Lbl : "	\u2630"}
          </button>
        )}
        &nbsp;
        {this.state.custom2 && (
          <button
            onClick={this.handleCustom2}
            type="button"
            className="btn btn-primary btn-sm"
          >
            {this.state.custom2Lbl ? this.state.custom2Lbl : "..."}
          </button>
        )}
      </span>
    );
  }
}

export default GridActions;
