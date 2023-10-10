const {Operator, AircraftOPerator} = require("../db/Operator");
class OperatorService {
  getOperators = async () => {
    return await AircraftOPerator.find();
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
    return await AircraftOPerator.findOne(filter);
  };
  updateOperator = async (filter, data) => {
    const operator = await Operator.findOneAndUpdate(filter, data);
    return operator;
  };
  deleteOperator = async (id) => {
    return await Operator.findOneAndDelete(id);
  };
  createOperator = async (operator) => {
    return await AircraftOPerator.create(operator);
  };
}
module.exports = new OperatorService();
