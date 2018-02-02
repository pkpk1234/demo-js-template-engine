//@flow
/**
 * 将双引号进行转义
 * @param {*} str 
 */
function quote(str: string) {
  let newStr = str.replace(/\"/g, '"');
  return newStr;
}
/**
 * @author 李佳明 https://github.com/pkpk1234
 */
class Token {
  value: string;
  type: string;

  constructor(value: string, type: string) {
    this.value = value;
    this.type = type;
  }
  /**
   * 输出Token的值
   * 如果是text类型，将值包含在双引号中，并将值中的双引号进行转义
   * 如果是variable类型，将值包含在小括号中
   */
  toString(): string {
    if (this.type === "text") {
      return '"' + quote(this.value) + '"';
    } else {
      return "("+this.value+")";
    }
  }
}

export default Token;
