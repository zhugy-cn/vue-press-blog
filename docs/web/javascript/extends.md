# 原型继承

## 借助构造函数

```js
function Parent1() {
  this.name = "parent1";
}
Parent1.prototype.say = function() {}; // Child1的实例没法继承原型链上的属性方法

function Child1() {
  Parent1.call(this); // 改变 this 上下文,Parent1构造函数的this指向Child1构造函数的实例
  this.type = "child1";
}
let person = new Child1(); // {name: "parent1", type: "child1"}
person.say(); // 报错
```

- 注意：如果父类有参数，可以在 call 中传递参数，call 中的第二个参数开始就是函数中的参数。

- 原理：用 call 来改变 this 的指向，使 Parent1 构造函数的 this 指向 Child1 构造函数的实例

- 缺点：只实现部分继承，只能继承 Parent1**函数中**的属性和方法，Parent1**原型链上**的东西 Child1 没法继承。

## 借助原型链实现继承

```js
function Parent() {
  this.name = "parent";
  this.play = [1, 2, 3];
}
Parent.prototype.say = function() {};
function Child() {
  this.type = "child";
}
Child.prototype = new Parent(); // 重点
let s1 = new Child();
let s2 = new Child();
s1.play.push(4); // s2 也变成了 [1, 2, 3, 4]
// 缺点：本来只想改变 s1 ,但 s2 也跟着改变了，两个实例对象应该隔离无关
```

- 原理：当访问实例的属性方法时，本身没有的话会沿着实例的`__proto__`往上寻找，因为构造函数的 prototype 跟实例的`__proto__`指的同一块空间，所以改变 prototype 的话，实例的`__proto__`也会跟着改变，从而实现继承

- 缺点：如果原型链上有引用类型的值，那么某一实例改变了值其他实例也会跟着改变，因为指的同一个地址，实例的 constaructor 属性指向 Parent，子类的 constructor 属性是从父类原型上继承来的，所以指向 Parent

## 组合继承方式

```js
function Parent() {
  this.name = "parent";
  this.play = [1, 2, 3];
}
Parent.prototype.say = function() {};
function Child() {
  Parent.call(this);
  this.type = "child";
}
Child.prototype = new Parent();
let s1 = new Child();
let s2 = new Child();
s1.play.push(4); // 没有改原型链上的，改的是自己的，call执行时赋值，原型链上也有play
```

- 原理：把上面两种合为一种实现，这种方式是真正写面向对象继承最通用的方式。

- 缺点：父类的构造函数执行了两次，在 call 的时候执行了一次，在原型的时候 new Parent 的时候又执行了一次，并且后一次执行导致原型上出现了重复属性方法，实例的 constructor 属性指向 Parent

## 组合继承优化一

```js
function Parent() {
  this.name = "parent";
  this.play = [1, 2, 3];
}
Parent.prototype.say = function() {};
function Child() {
  Parent.call(this); // 已经拿到父类里的方法属性了，后面不需要再new，只需要把父类原型上的东西也继承过来
  this.type = "child";
}
Child.prototype = Parent.prototype; // 把父类原型上的东西也继承过来
Child.prototype.age = 33; // 父类的原型也添加了age属性，子类改变父类不应该改变
let s1 = new Child();
let s2 = new Child();
s1.play.push(4);
console.log(s1.constructor); // Parent
console.log(s2.constructor); // Parent
// 因为Child实现继承的时候把Parent原型里的constructor属性也继承过来了，
// 而Parent原型里的constructor属性指向的肯定是Parent,所以出现了混乱
// 实际应该指向Child
// 实例的构造函数都指向了Parent，无法确定实例的构造函数
```

- 缺点：

1. 如果给子类原型添加属性方法的话父类的原型也会跟着添加，不符合逻辑，子类不应该影响父类 2.实例的`constructor`属性应该指向`child`构造函数，这样才符合预期要求

## 组合继承优化二

```js
function Parent() {
  this.name = "parent";
  this.play = [1, 2, 3];
}
Parent.prototype.say = function() {};
function Child() {
  Parent.call(this);
  this.type = "child";
}
Child.prototype = Object.create(Parent.prototype); // 现在子类改变了父类不会改变
Child.prototype.constructor = Child; // 手动设置一个构造函数，这里如果第三项照这样改的话改的是父类的constructor，而不是子类的constructor
Child.prototype.age = 33; // 父类的原型也没有添加
let s1 = new Child();
let s2 = new Child();
s1.play.push(4);
console.log(s1.constructor); // Child
console.log(s2.constructor); // Child
```
