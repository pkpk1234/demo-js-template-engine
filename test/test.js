import tokenizer from "../tokenizer";
import engine from "../engine";
test("Test Tokenizer", () => {
  let template = "aaa{{person.name}}bbb,ccc{{person.age}}ddd";
  let tokens = tokenizer.getTokens(template);
  expect(tokens.join("+")).toBe("\"aaa\"+person.name+\"bbb,ccc\"+person.age+\"ddd\"");
});

test("Test Engine", () => {
  let template = "aaa{{person.name}}bbb,ccc{{person.age}}ddd";
  var person = {"person":{"name":"ppk1984@github.com","age":17}};
  let temp = engine.compile(template);
  var str = temp.render(person);
  expect(str).toBe("aaappk1984@github.combbb,ccc17ddd");

  person = {"person":{"name":"xwjie@github.com","age":57}};
  str = temp.render(person);
  expect(str).toBe("aaaxwjie@github.combbb,ccc57ddd");
});