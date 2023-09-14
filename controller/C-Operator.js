const Auth = require("../db/Auth");
const bcrypt = require("bcrypt");
const Operator = require("../db/Operator");
exports.Signup = async (res, res, next) => {
  await Operator.findOne({where: {Email: req.body.email}}).then(
    (operatoremail) => {
      if (operatoremail) {
        res.status(409).json({Error: "Email  exist Use new Email"});
      } else {
        bcrypt.genSalt(
          math.floor(math.random() * (15 - 10)) + 10,
          function (err, salt) {
            if (err) {
            } else {
              bcrypt.hash(req.body.password, salt, function (err, hash) {
                //Store hash in your password DB.
                if (err) {
                  res.status(502).json({Error: "Message" + err});
                } else {
                  const newOperator = Operator.build({
                    Id: uuidv4(),
                    company_name: body.company_name,
                    email_address: body.email_address,
                    contact_number: body.contact_number,
                    Operator_person: body.Operator_person,
                  });
                  const accessToken = jwt.sign(
                    {Id: Operator.Email},
                    "rightpassword",
                    {
                      expiresIn: "1d",
                    }
                  );
                  newOperator.Access_Token = accessToken;
                  newOperator.save().then((result) => {
                    res.status(200).json({data: results});
                  });
                }
              });
            }
          }
        );
      }
    }
  );
};
exports.login = (req, res, next) => {
  const {email, password} = req.body;
  Operator.findOne({where: {Email: email}})
    .then((operator) => {
      if (operator) {
        res.status(409).json({Message: "Email doesnt Exist"});
      }
      bcrypt.compare(password, operator.password, (err, result) => {
        if (!result) {
          return res.status(401).json({message: "Authecation is Failed"});
        }
        if (result) {
          const accessToken = jwt.sign(
            {Id: operator.Id, email: operator.email},
            "rightpassword",
            {
              expiresIn: "1d",
            }
          );
          operator.Access_Token = accessToken;
          operator.save().then((result) => {
            res.status(200).json({
              message: "Authcation succes",
              Status: 200,
              APICODE: "Operator",
              data: result,
            });
          });
        }
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: error,
      });
    });
};

exports.AddAircrafts = async (req, res, next) => {
  await Operator.findOne({where: {Email: req.body.email}}).then(
    (OperatorEmail) => {
      if (!OperatorEmail) {
        res.status(409).json({Error: "Operator dones not  exist!"});
      } else {
        const NewOperator = Operator.build({
          Operator_person: body.Operator_person,
          Aircraft_type: body.Aircraft_type,
          location: body.location,
          charges_per_hour: body.charges_per_hour,
          date: body.date,
        });
        NewOperator.save().then((result) => {
          res.status(200).json({data: results}).then(
            
          )
        });
      }
    
  );
};

exports.EditOperator=async(req,res,next)=>{
    await Operator.findOne({where:{Email:req.body.email}})
}