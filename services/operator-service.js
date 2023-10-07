const Operator = require("../db/Operator");

class OperatorService {
  getOperators = async (filter = null) => {
    return await Operator.find(filter);
  };
  getOpeartorsSearchFilter = async (filter) => {
    const key = Object.key(filter);
    const value = filter[key];
    const reg = {
      [key]: new RegExp(value, "i"),
    };
    return await Operator.find(reg);
  };

  getOperator = async (filter) => {
    return await Operator.findOne(filter);
  };
  updateOperator = async (filter, data) => {
    const operator = await Operator.findOneAndUpdate(filter, data);
    return operator;
  };
  deleteOperator = async (filter) => {
    return await Operator.deleteOne(filter);
  };
  createOperator = async (operator) => {
    return await Operator.create(operator);
  };
}
module.exports = new OperatorService();