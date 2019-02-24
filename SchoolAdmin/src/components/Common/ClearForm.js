export default (self, clearitems) => {
  var index;
  var inputs = document.getElementsByTagName("input");
  var selects = document.getElementsByTagName("select");
  var textareas = document.getElementsByTagName("textareas");
  var itemList = [...inputs, ...selects, ...textareas];
  var objstr = {};
  for (index = 0; index < itemList.length; ++index) {
    if (itemList[index].name) {
      objstr[itemList[index].name] = "";
    }
  }

  // for (index = 0; index < clearitems.length; ++index) {
  //   objstr[clearitems[index].stateName] = clearitems[index].default;
  // }
  self.setState(objstr);
  self.setState({ isActive: true });
  console.log("Clear fields after save", objstr);
};
