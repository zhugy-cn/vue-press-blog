# 数据类型

## 分类

- 在“JavaScript”规范中，共定义了七种数据类型，分为“基本类型”和“引用类型”两大类

  - 基本类型（六种）：字符串（String）、数字（Number）、布尔（Boolean）、唯一（Symbol）、（未定义）Undefined、空（Null）。

  - 引用类型（一种）：对象（Object），对象又包含了 Object、Function、Array、Date、RegExp 等

## 基本包装类型

> 基本包装类型有 String、Number、Boolean

- 引用类型有方法和属性，但是基本类型是没有的，为了方便操作，给每一个包装类型提供了一个对应的包装对象

```js
var str = "hello"; //  string 基本类型，本身不具备方法和属性
var s1 = str.charAt(0); //  在执行到这一句的时候 后台会自动完成以下动作

// 1. 找到对应的包装对象，通过包装对象创建一个值相同的实例
// var str = new String('hello');
// 2. 调用这个实例的方法（通过原型继承调用包装对象的方法）
// var s2 = str.chaAt(0);
// 3. 销毁这个实例
// str = null;

console.log(s1); // h
console.log(str); // 还是hello不是null,注意这是一瞬间的动作,实际上我们没有改变字符串本身的值。就是做了下面的动作.这也是为什么每个字符串具有的方法并没有改变字符串本身的原因。
```

- 引用类型与基本包装类型的区别

  它们的对象生命周期不同：

  - 引用类型：使用 new 创建引用类型的实例，在执行流离开当前作用域之前都一直保存在内存中。

  - 基本包装类型：自动创建基本包装类型的对象，只执行一行代码的瞬间之后就会立即销毁。

  这意味着在运行时为基本包装类型值添加属性和方法是无效的，只有在包装对象的原型上添加。

```js
var str = "hello";

str.name = "jack"; // 添加之后马上销毁了，无效
console.log(str.name); // undefined

String.prototype.age = 24; // 在原型上添加
console.log(str.age); // 24
```

## 数据类型检测

```js
let s1 = 1;
let s2 = "";
let s3 = true;
let s4 = undefined;
let s5 = Symbol();
let s6 = function test() {};
let s7 = null;
let s8 = [];
let s9 = {};
let s10 = new Date();
let s11 = new RegExp();

// 使用 typeof 运算符只能检测出七种
console.log(typeof s1); // number
console.log(typeof s2); // string
console.log(typeof s3); // boolean
console.log(typeof s4); // undefined
console.log(typeof s5); // symbol
console.log(typeof s6); // function
console.log(typeof s7); // object
console.log(typeof s8); // object
console.log(typeof s9); // object
console.log(typeof s10); // object
console.log(typeof s11); // object

console.log("----------------------");

// 使用 Object.prototype.toString(),全部能检测出来

// Object.prototype.toString 最终会返回形式如 [object,class] 的字符串，class 指代的是其检测出的数据类型，这个是我们判断数据类型的关键。

// toString === window.toString === Object.prototype.toString

let judgeType = val =>
  toString
    .call(val)
    .slice(8, -1)
    .toLowerCase();
console.log(judgeType(s1)); // number
console.log(judgeType(s2)); // string
console.log(judgeType(s3)); // boolean
console.log(judgeType(s4)); // undefined
console.log(judgeType(s5)); // symbol
console.log(judgeType(s6)); // function
console.log(judgeType(s7)); // null
console.log(judgeType(s8)); // array
console.log(judgeType(s9)); // object
console.log(judgeType(s10)); // date
console.log(judgeType(s11)); // regexp

console.log(s3.toString()); // "true"  自己原型上的 toString 方法是转成字符串
```

- 为什么非要调用对象上的 toString 方法（Object.prototype.toString.call()）而不调用自己原型上的 toString（s3.toString() ） 方法呢？

因为自己原型上的 toString 方法重写了对象的 toString 方法，自己原型上的 toString 方法用处不一样
