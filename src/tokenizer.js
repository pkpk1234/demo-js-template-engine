//@flow
import Token from "./token";
const startToken = "{{";
const endToken = "}}";

/**
 * @author 李佳明 https://github.com/pkpk1234
 */
class Tokenizer {
    /**
     * 根据输入构造模板
     * @param {*} templateString 
     */
    getTokens(templateString: string): Array < Token > {
        var str = templateString;
        let tokens: Array < Token > = [];

        var index = str.indexOf(startToken);
        //如果没有包含{{，认为是普通字符串
        if (index == -1) {
            tokens.push(new Token(templateString, "text"));
            return tokens;
        }

        //遍历模板，构造token
        while ((index = str.indexOf(startToken)) != -1) {
            //获取{{之前的内容
            let textValue = str.slice(0, index);
            tokens.push(new Token(textValue, "text"));
            //将str设置为{{之后的内容
            str = str.slice(index);

            index = str.indexOf(endToken);
            //如果没有配对的}}，抛出异常
            if (index == -1) {
                throw new Error("template error");
            }
            //获取占位符
            let variable = str.slice(2, index);
            tokens.push(new Token(variable, "variable"));
            //将str设置为}}之后的内容
            str = str.slice(index + 2);
        }
        //如果最后一个}}之后还有值，则构造text类型的token
        if(str.length > 0) {
            tokens.push(new Token(str,"text"));
        }
        return tokens;
    }

}
export default new Tokenizer();