import engine from "../src/engine";

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
