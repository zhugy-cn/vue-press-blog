# 函数节流

> 在规定的时间内，无论该函数调用了多少次都只会执行一次

- 使用场景：适用于函数被频繁调用的场景
  1. window.onresize() 事件
  2. mousemove 事件
  3. touchmove 事件
  4. 上传进度等等
  5. 秒杀活动，频繁点击

## 定时器实现
```js
function throttle(fn,wait){
  let timer;
  return function(){
    if(!timer){
      timer = setTimeout(()=>{
        timer = null;
        fn.apply(this, arguments)
      }, wait)
    }
  }
}
```
- 缺点：第一次事件的执行也需要等待 `wait` 秒，不是立即执行
- 优点：如果停止函数调用时的时间不满足条件，当到达时间后，还是会执行一次。
  例如：当`wait`设为 1s ，在 1.5s 时虽然停止了事件触发，但当到达 2s 时还是会执行一次



## 时间戳实现
```js
function throttle(fn, wait) {
  let previous = 0;
  return function () {
    let now = +new Date()
    if (now - previous >= wait) {
      previous = now;
      fn.apply(this, arguments)
    }
  }
}
```
- 缺点：最后一次没有达到触发条件时，不触发最后一次
- 优点：第一次不需要等待`wait`秒，而是立即触发

## 结合
> - 综合了两者的优势，函数第一次调用能立刻执行，停止调用的时候还能再执行一次！

```js
```


