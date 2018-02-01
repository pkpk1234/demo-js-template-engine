//@flow
class Token {
  value:string;
  type:string;

  constructor(value: string, type: string) {
    this.value = value;
    this.type = type;
  }

  toString():string {
    return this.value;
  }
}

export default Token;
