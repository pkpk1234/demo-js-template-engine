//@flow
import tokenizer from "./tokenizer";

/**
 * @author 李佳明 https://github.com/pkpk1234
 */
class Engine {
    /**
     * 使用输入的模板构造渲染函数
     * @param {*} template 
     */
    compile(template: string): Object {
        let tokens = tokenizer.getTokens(template);
        let functionBody = tokens.join(' + ');
        return {
            "render": new Function("context", " with(context) {return "+functionBody+" };")
        };
    };
}

export default new Engine();