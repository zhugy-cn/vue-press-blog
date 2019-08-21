# Promise

## 一、是什么

1. 主要用于异步计算
2. 可以将异步操作队列化，按照期望的顺序执行，返回符合预期的结果
3. 可以在对象之间传递和操作 Promise，帮助我们处理队列

## 二、示例

```js
new Promise(
  // 执行器
  function(resolve, reject) {
    resolve(); // 数据处理完成

    reject(); // 数据处理出错
  }
).then(
  function A() {
    // 成功，下一步
  },
  function B() {
    // 失败，做相应处理
  }
);
```

- Promise 是一个代理对象，它和原先要进行的操作并无关系，通过引入一个回调，避免更多的回调
- Promise 有三个状态:
  - pending [待定] 初始状态 实例化
  - fulfilled [实现] 操作成功 调用 resolve
  - rejected [被否决] 操作失败 调用 reject

- Promise 状态发生改变，就会触发.then()里的响应函数处理后续步骤
- Promise 状态一经改变，不会再变

## 三、.then()

- .then()接受两个函数作为参数，分别代表 fulfilled 和 rejected
- .then()返回一个新的 Promise 实例，所以它可以链式调用
- 当前面的 Promise 状态改变时，.then()根据其最终状态，选择特定的状态响应函数执行
- 状态响应函数可以返回新的 Promise 或其他值
- 如果返回新的 Promise，那么下一级.then()会在新的 Promise 状态改变后执行
- 如果返回的时其他的任何值，则会立刻执行下一级.then()

## 四、.then()里有.then()的情况

- 因为.then()返回的还是 Promise 实例
- 会等里面的.then()执行完，再执行外面的
- 对于我们来说，此时最好将其展开，会更好读

## 五、Promise.all()

- 它接受一个数组作为参数
- 数组里可以是 Promise 对象，也可以是别的值，只有 Promise 会等待状态改变
- 当所有子 Promise 都完成，该 Promise 完成，返回值是全部值的数组
- 有任何一个失败，改 Promise 失败，返回值是第一个失败的子 Promise 的结果
