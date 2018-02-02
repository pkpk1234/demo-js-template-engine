# 自己动手写一个乞丐版模板引擎

---

最近学习了下es6和[flow][1]，为了练习下语法，所以写了一个最简单版的模板引擎。按照使用{{}}语法插入占位符，然后进行模板渲染。

思路如下：

 1. 读取编写好的模板
 2. 根据{{}}生产token数组，非占位符token类型为text，占位符类型为variable。
 3. 使用token数组生成渲染函数。
 4. 渲染函数根据传入的参数，返回对占位符取值之后的字符串。

## 搭建开发环境
安装编译器：npm install --save-dev babel-preset-env babel-cli babel-preset-flow
新建.babelrc，输入如下内容：
```JavaScript
{ "presets": ["env","flow"] }
```

安装单元测试库jest：npm install --save-dev  jest babel-jest babel-core regenerator-runtime
修改package.json，添加如下内容：
```JavaScript
"jest": {
    "transform": {
      "^.+\\.jsx?$": "babel-jest"
    },
    "roots": [
      "test"
    ]
  }
```
安装flow:npm install --save-dev flow-bin
初始化flow：执行flow init
修改 .flowconfig，排除/node_modules/，如下：
```JavaScript
[ignore]
.*/node_modules/.*
[include]

[libs]

[options]

```

## 编写代码
### Token类
Token分为两大类，一类是没有占位符的普通text，一类是有占位符的variable类。
text类型的Token返回token值时，需要将值包含在双引号中，并且需要将值中的双引号进行转义，表示这是一个字符串。
variable类型的Token返回token时，需要将值包含在括号中，以避免因为运算优先级，导致占位符取值不正确。
```JavaScript
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
```
### Tokenizer
Tokenizer解析输入的字符串，使用{{之前的内容构造text类型的Token，使用占位符构造variable类型的Token，使用}}之后的内容构造text类型的Token。
如果{{}}没配对，则抛出异常。

```JavaScript
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
```
### Engine
Engine根据Token数组构造渲染函数，主要使用了with绑定作用域，使用new Function绕过strict检查。
```JavaScript
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
    compile(template: string): Function {
        let tokens = tokenizer.getTokens(template);
        let functionBody = tokens.join(' + ');
        return {
            "render": new Function("context", " with(context) {return "+functionBody+" };")
        };
    };
}

export default new Engine();
```
### 单元测试
```JavaScript
mport engine from "../src/engine";

test("Test Engine", () => {
  let source = "aaa{{person.name}}bbb,ccc{{person.age}}ddd";
  var person = { person: { name: "ppk1984@github.com", age: 17 } };
  let template = engine.compile(source);
  var str = template.render(person);
  expect(str).toBe("aaappk1984@github.combbb,ccc17ddd");
  //使用相同的模板渲染其他值
  person = { person: { name: "xwjie@github.com", age: 57 } };
  str = template.render(person);
  expect(str).toBe("aaaxwjie@github.combbb,ccc57ddd");
});

test("Test compute express", () => {
  let source = "number a = {{a}},number b = {{b}},a+b={{a+b}}";
  let template = engine.compile(source);
  let context = { a: 1, b: 2 };
  var result = template.render(context);
  expect(result).toBe("number a = 1,number b = 2,a+b=3");
});

test("Test if express", () => {
  let source = "number a = {{a}},number b = {{b}},a>b : {{a>b}}";
  let template = engine.compile(source);
  let context = { a: 1, b: 2 };
  var result = template.render(context);
  expect(result).toBe("number a = 1,number b = 2,a>b : false");
});

```
Jest可以生成覆盖率报告，JS这种动态语言，最好保证100%覆盖率。



  [1]: https://flow.org/en/
