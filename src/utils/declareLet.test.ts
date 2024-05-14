import { declareLet } from "@/utils/declareLet";

test("declare let", () => {
  expect(
    declareLet(() => {
      return 1;
    }),
  ).toBe(1);
});

test("declare let with string", () => {
  expect(
    declareLet(() => {
      return "hello";
    }),
  ).toBe("hello");
});

test("declare let with object", () => {
  expect(
    declareLet(() => {
      return { age: 30, name: "John" };
    }),
  ).toEqual({ age: 30, name: "John" });
});

const declareLetWithConditional = (flag: boolean | undefined) => {
  return declareLet(() => {
    let a: number | string = 0;
    if (flag === undefined) return a;
    if (flag) {
      a = "hello";
    } else {
      a = 1;
    }
    return a;
  });
};

test("declare let with conditional:undefined", () =>
  expect(declareLetWithConditional(undefined)).toBe(0));

test("declare let with conditional:true", () => {
  expect(declareLetWithConditional(true)).toBe("hello");
});

test("declare let with conditional:false", () => {
  expect(declareLetWithConditional(false)).toBe(1);
});
