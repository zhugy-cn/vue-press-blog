# Call 和 Apply 模拟实现

## 前置知识

### 类数组转数组

1. 解构赋值：按照一定的模式，从数组中提取值，对变量进行赋值
2. Array.from：从一个类似数组或可迭代对象中创建一个新的，浅拷贝的数组实例。
3. Array.prototype.slice.call：将数组中一部分元素浅复制存入新的数组对象，并且返回这个数组对象

```js
function bar() {
  var args = [...arguments];
  var args = Array.from(arguments);
  var args = Array.prototype.slice.call(arguments);

  args.push(1);

  console.log(args);
}
bar("1", "a", "b");
```

### 是不是一个数组

1. Array.isArray
2. Object.prototype.toString.call(arr) === '[object Array]'

- 代码示例

```js
let arr = {
  __proto__: Array.prototype
};

let b1 = arr instanceof Array; // true
let b2 = arr.constructor === Array; // true
let b3 = Array.prototype.isPrototypeOf(arr); // true
let b4 = Object.getPrototypeOf(arr) === Array.prototype; // true

// 只有这两种能精准判断
let b5 = Object.prototype.toString.call(arr) === "[object Array]"; // false
let b6 = Array.isArray(arr); // false

console.log(b1); // true
console.log(b2); // true
console.log(b3); // true
console.log(b4); // true
console.log(b5); // false
console.log(b6); // false
```

## Call 基本概念

> 使用一个指定的 `this` 值和单独给出的一个或多个参数来调用一个函数。

- 代码示例

```js
var value = 10;
var foo = {
  value: 1
};

function bar() {
  console.log(this.value);
}

bar.call(foo); // 1
```

- 从代码中可以看出两点
  1.  call 改变了 this 的指向，指向了 foo
  2.  bar 函数执行了

## 模拟实现第一步

- 当调用 call 的时候，把 foo 对象改造成如下就可以实现这两个效果：

```js
var value = 10;
var foo = {
  value: 1,
  bar: function() {
    console.log(this.value);
  }
};

foo.bar(); // 1
```

- 根据上面的代码，将模拟的步骤可分为 3 步：
  1. 将函数设为对象的属性
  2. 执行该函数
  3. 删除该函数

```js
// 第一步
foo.fn = bar;
// 第二步
foo.fn();
// 第三步
delete foo.fn;
```

- 第一版模拟实现

```js
// 第一版代码实现
Function.prototype.myCall = function(context) {
  // context 就是 foo
  context.fn = this; // foo.fn = bar
  context.fn(); // foo.fn()
  delete context.fn; // delete foo.fn
};

var value = 10;
var foo = {
  value: 1
};

function bar() {
  console.log(this.value);
}

bar.myCall(foo); // 1 成功打印
```

## 模拟实现第二步

- 第一版需要优化的地方：

  1. 函数 `bar` 不能接收参数

- 完善：

  1. 从 `arguments` 中获取参数
  2. 取出第二个到最后一个参数放到数组中，因为第一个参数是 this，所以从第二个参数开始取

- 代码实现

```js
// 第二版代码实现
Function.prototype.myCall = function(context) {
  let args = [...arguments].slice(1);
  context.fn = this;
  context.fn(...args);
  delete context.fn;
};

var value = 10;
var foo = {
  value: 1
};

function bar(name, age) {
  console.log(this.value);
  console.log(name); // 张三
  console.log(age); // 24
}
bar.myCall(foo, "张三", 24);
```

## 模拟实现第三步

- 第二版需要优化的地方：
  1. this 参数可以传 null 或者 undefined，此时 this 指向 window
  2. this 参数可以传基本类型数据，原生的 call 会自动用 Object() 转换
  3. 函数可以有返回值
  4. 可能 context 本身有 fn 这个属性，那么就会被覆盖掉

```js
// 第三版代码实现

Function.prototype.myCall = function(context) {
  // context == undefined 也就相当于 context == undefined || context == null
  context = context == undefined ? window : Object(context);
  let args = [...arguments].slice(1);
  let fn = Symbol(); // 防止重复被覆盖
  context[fn] = this;
  let result = context[fn](...args);
  delete context[fn];
  return result;
};

var value = 10;
var foo = {
  value: 1
};

function bar(a, b) {
  console.log(this.value); // 1   当传 null 和 undefined 时这里的值为 10
  console.log(a); // 10
  console.log(b); // 20
  return a + b;
}

bar.myCall(null); // 这里的 this 指向 window
bar.myCall(undefined); // 这里的 this 指向 window
bar.myCall(0);
bar.myCall("");
bar.myCall(true);
// 测试返回值
let sum = bar.myCall(foo, 10, 20);
console.log(sum); // 30
```

## Apply 模拟实现

:::warning 注意
该方法的语法和作用与 `call()` 方法类似，只有一个区别，就是 `call()` 方法接受的是一个参数列表，而 `apply()` 方法接受的是一个包含多个参数的数组。
:::

- 例子

```js
var func = function(arg1, arg2) {
  ...
};
func.call(this, arg1, arg2); // 使用 call，参数列表
func.apply(this, [arg1, arg2]); // 使用 apply，参数数组
```

- apply 代码实现

```js
Function.prototype.myApply = function(context, arr) {
  // context == undefined 也就相当于 context == undefined || context == null
  context = context == undefined ? window : Object(context);
  let fn = Symbol(); // 防止重复被覆盖
  context[fn] = this;
  let result;
  if (arr != undefined) {
    // 如果传入的是基本类型则抛异常
    if (arr instanceof Object || arr == undefined) {
      // 判断是不是一个数组
      if (Array.isArray(arr)) {
        result = context[fn](...arr);
      } else {
        result = context[fn]();
      }
    } else {
      throw "不能传入基本类型数据";
    }
  } else {
    result = context[fn]();
  }
  delete context[fn];
  return result;
};

var value = 10;
var foo = {
  value: 1
};

function bar(a, b) {
  console.log(this.value); // 1
  console.log(a); // 10
  console.log(b); // 20
  return a + b;
}
bar.myApply(foo, null);
bar.myApply(foo, undefined);
bar.myApply(foo, []);
bar.myApply(foo, function() {});
bar.myApply(foo, {});

// 当传入 基本数据类型时 会报错
bar.myApply(foo, "");
bar.myApply(foo, 0);
bar.myApply(foo, false);

// 测试返回值
let sum = bar.myApply(foo, [10, 20]);
console.log(sum);
```

#### 参考

- [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
- [JavaScript 深入之 call 和 apply 的模拟实现](https://github.com/mqyqingfeng/Blog/issues/11)
- [深度解析 call 和 apply 原理、使用场景及实现](https://juejin.im/post/5c060585e51d45480061b05f#heading-12)
- [模拟 call 和 apply 的实现](https://juejin.im/post/5d0ef9a86fb9a07ee27b1f11)
