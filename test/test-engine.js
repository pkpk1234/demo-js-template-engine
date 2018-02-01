import engine from "../engine";
import winston from "winston";


test("Test Engine", () => {
    let template = "aaa{{person.name}}bbb,ccc{{person.age}}ddd";
    let person = {"name":"ppk1984@github.com","age":17};
    let temp = engine.compile(template);
    let str = temp.render(person);
    logger.info(str);
    //expect().toBe();
  });