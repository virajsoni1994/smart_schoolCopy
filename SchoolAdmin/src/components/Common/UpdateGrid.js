import ClearForm from "./ClearForm";
import Notification from "./Notification";

export default function(self, obj, clearitems, reloadData) {
  if (reloadData && self.props.update.data) {
    self.componentWillMount.call(self);
  }
  if (self.props.update.data && self.props.update.action === "add") {
    self.props[obj].push(self.props.update.data);
    self.gridApi.updateRowData({ add: [self.props.update.data] });
    // alert(self.props.update.page);
    self.props.clearUpdate();
    Notification("success", "Success", "Item saved successfully");
    ClearForm(self, clearitems);
  } else if (self.props.update.data && self.props.update.action === "edit") {
    self.props[obj][self.props.update.nodeId] = self.props.update.data;
    self.gridApi.setRowData(self.props[obj]);
    self.props.clearUpdate();
    Notification("success", "Success", "Item updated successfully");
    ClearForm(self, clearitems);
  } else if (self.props.update.data && self.props.update.action === "delete") {
    self.props[obj].splice(self.props.update.nodeId, 1);
    self.gridApi.setRowData(self.props[obj]);
    Notification("warning", "Deleted", "Item Deleted successfully");
    self.props.clearUpdate();
  }
}
