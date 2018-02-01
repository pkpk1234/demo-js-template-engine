import tokenizer from "../tokenizer";
import engine from "../engine";
test("Test Tokenizer", () => {
  let template = "aaa{{person.name}}bbb,ccc{{person.age}}ddd";
  let tokens = tokenizer.getTokens(template);
  expect(tokens.join("+")).toBe("aaa+person.name+bbb,ccc+person.age");
});

test("Test Engine", () => {
  let template = "aaa{{person.name}}bbb,ccc{{person.age}}ddd";
  let person = {"name":"ppk1984@github.com","age":17};
  let temp = engine.compile(template);
  let str = temp.render(person);
  console.log(str);
  //expect().toBe();
});