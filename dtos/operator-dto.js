class OperatorDto {
  company_name;
  email_address;
  contact_number;
  Aircraft_type;
  Tail_sign;
  password;
  charges_per_hour;
  speed;

  constructor(operator) {
    this.company_name = operator.company_name;
    this.email_address = operator.email_address;
    this.contact_number = operator.contact_number;
    this.Aircraft_type = operator.Aircraft_type;
    this.Tail_sign = operator.Tail_sign;
    this.password = operator.password;
    this.charges_per_hour = operator.charges_per_hour;
    this.speed = operator.speed;
  }
}

module.exports = OperatorDto;
