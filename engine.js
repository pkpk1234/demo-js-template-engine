//@flow
import tokenizer from "./tokenizer";

class Engine {
    compile(template: string): Function {
        let tokens = tokenizer.getTokens(template);
        return {
            "render": new Function("data", " with(data) {return "+tokens.join(' + ')+" };")
        };
    };
}

export default new Engine();