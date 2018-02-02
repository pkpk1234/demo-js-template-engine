//@flow

function quote(str:string) {
  let newStr = str.replace(/\"/g,'\"');
  return newStr;
}

class Token {
  value:string;
  type:string;

  constructor(value: string, type: string) {
    this.value = value;
    this.type = type;
  }

  toString():string {
    if(this.type === "text") {
      return '"'+quote(this.value)+'"';
    } else {
    return this.value;
    }
  }
}

export default Token;
