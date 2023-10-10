const {Operator, AircraftOPerator} = require("../db/Operator");
class OperatorService {
  getOperators = async () => {
    return await AircraftOPerator.find();
  };
  // getOpeartorsSearchFilter = async (filter) => {
  //   const key = Object.key(filter);
  //   const value = filter[key];
  //   const reg = {
  //     [key]: new RegExp(value, "i"),
  //   };
  //   return await Operator.find(reg);
  // };
  getOpeartorsSearchFilter = async (filter) => {
    const key = Object.keys(filter)[0]; // Get the first (and presumably only) key
    const value = filter[key];
    const reg = {
      [key]: new RegExp(value, "i"),
    };
  
    try {
      const operators = await Operator.find(reg);
      return operators;
    } catch (error) {
      throw new Error("Error searching for operators: " + error.message);
    }
  };

  getOperator = async (_id) => {
    return await AircraftOPerator.findOne(_id);
  };
  updateOperator = async (_id, data) => {
    const operator = await AircraftOPerator.findOneAndUpdate(_id, data, {new:true});
  return operator
  };

  deleteOperator = async (_id) => {
    return await AircraftOPerator.findOneAndDelete(_id);

  };
  createOperator = async (operator) => {
    return await AircraftOPerator.create(operator);
  };
}
module.exports = new OperatorService();
