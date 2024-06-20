class ControllerResultModel {
  constructor(type, message, data) {
    this.type = type;
    this.message = message;
    this.data = data;
  }

  static result(type, message, data) {
    return new ControllerResultModel(type, message, data);
  }
}

const ControllerResult = ControllerResultModel.result;
export default ControllerResult;
