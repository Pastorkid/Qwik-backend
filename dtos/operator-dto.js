class OperatorDto {

  Aircraft_type;
  Tail_sign;
  password;
  charges_per_hour;
  speed;

  constructor(operator) {
    this.contact_number = operator.contact_number;
    this.Aircraft_type = operator.Aircraft_type;
    this.Tail_sign = operator.Tail_sign;
    this.charges_per_hour = operator.charges_per_hour;
    this.speed = operator.speed;
  }
}

module.exports = OperatorDto;
