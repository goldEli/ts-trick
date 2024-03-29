/**
 * 模式匹配做提取
 *
 */

type p = Promise<number>;

type GetValue<T> = T extends Promise<infer value> ? value : never;

type value = GetValue<Promise<string>>;

/**
 * 数组类型
 * first
 *
 * any 接受和赋值 任意值
 * unknown 接受 任意值
 * never 不能被接受和赋值
 */

type arr = [1, 2, 3];

type GetFirst<T extends unknown[]> = T extends [infer First, ...unknown[]]
  ? First
  : never;

type first = GetFirst<arr>;

// 字符串
type StartWidth<
  Str extends string,
  Prefix extends string
> = Str extends `${Prefix}${string}` ? true : false;

type b = StartWidth<"dxdong", "dx">;

// 替换字符串
type ReplaceStr<
  Str extends string,
  From extends string,
  To extends string
> = Str extends `${infer start}${From}${infer end}`
  ? `${start}${To}${end}`
  : "never";

type s = ReplaceStr<"abccc", "bc", "kk">;

type GetParams<T extends Function> = T extends (...args: infer Args) => unknown
  ? Args
  : never;

const func = (a: number, b: number) => a + b;
type params = GetParams<typeof func>;

/**
 * 提取
 */

type GetReturnType<T extends Function> = T extends (...args: any[]) => infer Ret
  ? Ret
  : never;

type Ret = GetReturnType<typeof func>;

/**
 * 重新构造做变换
 */
const o = { a: 1, b: 1 }; // {A:1,B:1}

type UppercaseKey<obj extends Record<string, any>> = {
  [Key in keyof obj as Uppercase<Key & string>]: obj[Key];
};

type Result = UppercaseKey<typeof o>;

/**
 * 递归
 */

// 长度不确定的字符串转为联合类型
type StringToUnion<T extends string> = T extends `${infer First}${infer Last}`
  ? First | StringToUnion<Last>
  : never;
type Hello = StringToUnion<"hello">;

// 数组长度做计数

/**
 * 联合类型可简化
 */
type Union = "a" | "b" | "c";

type UppercaseA<Item extends string> = Item extends "a"
  ? Uppercase<Item>
  : Item;

type result = UppercaseA<Union>;

/**
 * 联合类型提取
 */

type MyExtract<T, U> = U extends T ? U : never;
type u = "a" | "b" | "c" | "d";
type extractRes = MyExtract<u, "a" | "b">;

/**
 * 函数重载
 */
type Func = (a: number, b: number) => number;
declare const func1: Func;

/**
 * 扩展索引
 * DeepRecord
 */

type Obj1 = {
  a: number;
  b: number;
  c: {
    d: number;
    f: {
      k: number;
    };
  };
} & Record<string, any>;

type DeepRecord<T extends Record<string, any>> = {
  [Key in keyof T]: T[Key] extends Record<string, any>
    ? DeepRecord<T[Key]> & Record<string, any>
    : T[Key];
} & Record<string, any>;

const obj2: DeepRecord<Obj1> = {
  a: 1,
  b: 2,
  m: 1,
  c: {
    d: 1,
    f: {
      k: 1,
      c: 2,
    },
  },
};

/**
 * 对象值互相影响
 */

type Test =
  | {
      aaa: "desc" | "asc";
      bbb: false;
      ccc: false;
    }
  | {
      aaa: false;
      bbb: "desc" | "asc";
      ccc: false;
    }
  | {
      aaa: false;
      bbb: false;
      ccc: "desc" | "asc";
    };

type GenerateType<Keys extends string> = {
  [Key in Keys]: {
    [Key1 in Key]: "desc" | "asc";
  } & {
    [Key2 in Exclude<Keys, Key>]: false;
  };
}[Keys];

type res = GenerateType<"aaa" | "bbb" | "ccc">;

const test: res = {
  aaa: false,
  bbb: false,
  ccc: "asc",
};
