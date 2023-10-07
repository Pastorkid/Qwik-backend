const Mongoose = require("mongoose");

const OperatorSchema = new Mongoose.Schema({
  company_name: {
    type: String,
    required: true,
  },
  email_address: {
    type: String,
    required: true,
  },
  contact_number: {
    type: Number,
  },
  Aircraft_type: {
    type: String,
    enum: ["Challenger 605", "Learjet", "B200", "C90"],
  },
  Tail_sign: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  charges_per_hour: {
    type: Number,
  },
  speed: {
    type: Number,
  },
  date: {type: Date, default: Date.now},
});
// const OperatorSchema = new Mongoose.Schema({
//   id: {
//     Id: {
//       type: Number,
//       unique: true,
//     },
//     company_name: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     email_address: {
//       type: String,
//       required: true,
//     },
//     contact_number: {
//       type: Number,

//       unique: true,
//     },
//     Aircraft_type: {
//       type: String,

//       enum: ["Challenger 605", "Learjet", "B200", "C90"],
//     },
//     Tail_sign: {
//       type: String,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     location: {
//       type: String,

//       unique: true,
//     },
//     charges_per_hour: {
//       type: Number,

//       unique: true,
//     },
//     speed: {
//       type: Number,

//       unique: true,
//     },
//     date: {type: Date, default: Date.now},
//   },
// });

// const OperatorsSchema = {
//   id: {
//     Id: {
//       type: Number,
//       unique: true,
//     }},
//     emailAddress: {emailAddress: {required: true, type: String}},
//     company_Name: {
//       company_name: {
//         type: String,
//         required: true,
//         unique: true,
//       },
//     },
//     contact_Number: {
//       contact_number: {
//         type: Number,

//         unique: true,
//       },
//     },
//     Aircraft_Type: {
//       Aircraft_type: {
//         type: String,

//         enum: ["Challenger 605", "Learjet", "B200", "C90"],
//       },
//     },
//     Tail_Sign: {
//       Tail_sign: {
//         type: String,
//       },
//     },
//     password: {
//       password: {
//         type: String,
//         required: true,
//       },
//     },
//     Location: {
//       location: {
//         type: String,

//         unique: true,
//       },
//     },
//     charges_Per_Hour: {
//       charges_per_hour: {
//         type: Number,

//         unique: true,
//       },
//     },
//     SPeed: {
//       speed: {
//         type: Number,

//         unique: true,
//       },
//     },
//     Date: {date: {type: Date, default: Date.now}},
//   },
// };

module.exports = Mongoose.model("Operator", OperatorSchema);
