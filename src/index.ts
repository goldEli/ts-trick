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

// 提取

type GetReturnType<T extends Function> = T extends (...args: any[]) => infer Ret
  ? Ret
  : never;

type Ret = GetReturnType<typeof func>;

// 重新构造做变换
const o = { a: 1, b: 1 }; // {A:1,B:1}

type UppercaseKey<obj extends Record<string, any>> = {
  [Key in keyof obj as Uppercase<Key & string>]: obj[Key]
};


type Result = UppercaseKey<typeof o>