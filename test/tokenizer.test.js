import tokenizer from "../src/tokenizer";

test("Test Tokenizer", () => {
  let source = "aaa{{person.name}}bbb,ccc{{person.age}}ddd";
  let tokens = tokenizer.getTokens(source);
  expect(tokens.join("+")).toBe("\"aaa\"+(person.name)+\"bbb,ccc\"+(person.age)+\"ddd\"");
});

test("Token exception",() => {
  let source = "aaa{{person.namebbb";
  expect(() => {
    tokenizer.getTokens(source);
  }).toThrow();
});

test("Ony text tokens",()=>{
  let source = "aaa,bbb";
  let tokens = tokenizer.getTokens(source);
  expect(tokens.join("+")).toBe("\"aaa,bbb\"");
});

