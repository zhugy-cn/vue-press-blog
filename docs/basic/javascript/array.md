# 数组
## 基本概念
  >数组方法分为**原型方法**跟**构造方法**，其中原型方法又分为**修改器方法**、**访问方法**、**迭代方法**
  
  ### **原型方法**
  >`Array.prototype`上的方法

  - **修改器方法**：会改变数组自身的值
  ::: tip 9 个方法
  `pop`、`push`、`shift`、`unshift`、`reverse`、`sort`、`splice`、`fill(ES6)`、`copyWithin(ES6)`、
  ::: 
  
  - **访问方法**：不会改变数组自身的值，只会返回一个新数组或者返回一个其它的期望值
  ::: tip 9 个方法
  `concat`、`join`、`slice`、`toString`、`toLocaleString`、`indexOf`、`laseIndexOf`、`includes(ES7)`、`toSource`、
  ::: 

  - **迭代方法**
  ::: tip 13 个方法
  `forEach`、`every`、`some`、`filter`、`map`、`reduce`、`reduceRight`、`entries(ES6)`、`find(ES6)`、`findIndex(ES6)`、`keys(ES6)`、`values(ES6)`、`Symbol.iterator(ES6)`。
  ::: 
  
### **构造函数方法**
>`Array`构造函数的方法，实例无法访问
::: tip 3 个方法
  `Array.from`、`Array.isArray`、`Array.of`
::: 

<br />

## 修改器方法
  ### [**pop**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)
  > 从数组中删除最后一个元素，并返回该元素的值。当数组为空时返回undefined
  ``` js
  let colors = ['red','yellow','blue','green'] 
  let item = colors.pop()
  console.log(item)		// green
  console.log(colors)		// ["red", "yellow", "blue"]
  ```
  
  ### [**push**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
  > 将一个或多个元素添加到数组的末尾，并返回该数组的新长度。
  ``` js
  let colors = ['red','yellow','blue'] 
  let length = colors.push('black','white')
  console.log(length)		// 5
  console.log(colors)		// ["red", "yellow", "blue", "black", "white"]
  ```


  ### [**shift**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)
  > 删除数组中的**第一个**元素，并返回该元素的值
  ``` js
  let colors = ['red','yellow','blue'] 
  let item = colors.shift()
  console.log(item)			// red
  console.log(colors)		// ["yellow", "blue"]
  ```

  ### [**unshift**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)
  > 将一个或多个元素添加到数组的开头，并返回该数组的新长度。
  ``` js
  let colors = ['red','yellow','blue'] 
  let length = colors.unshift('black','white')
  console.log(length)		// 5
  console.log(colors)		// ["black", "white", "red", "yellow", "blue"]
  ```

  ### [**reverse**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)
  > 将数组中元素的位置颠倒，并返回该数组。
  ``` js
  let colors1 = ['red','yellow','blue'] 
  let colors2 = colors1.reverse('black','white')
  console.log(colors1)		// ["blue", "yellow", "red"]
  console.log(colors2)		// ["blue", "yellow", "red"]
  ```

  ### [**sort**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
  > 用**原地算法**对数组的元素进行排序，并返回数组。默认排序顺序是根据字符串**Unicode**码点。
  ``` js
  let colors1 = ['red', 'yellow', 'blue'] 
  let colors2 = colors1.sort()
  console.log(length)		// ["blue", "red", "yellow"]
  console.log(colors)		// ["blue", "red", "yellow"]

  let number1 = [1, 30, 4, 21, 100000];
  let number2 = number1.sort()
  console.log(number1)  // [1, 100000, 21, 30, 4]
  console.log(number2)  // [1, 100000, 21, 30, 4]

  let array1 = [1, 30, 4, 21, 100000];
  let array2 = array1.sort((a,b)=>a-b)  // 这里根据函数的返回值（[1, 100000, 21, 30, 4]）来排序
  console.log(array1)   // [1, 4, 20, 21, 30, 100000]
  console.log(array2)   // [1, 4, 20, 21, 30, 100000]
  ```
  ::: tip 语法：arr.sort([compareFunction])
  如果指明了`compareFunction`，**数组将按照调用该函数的返回值来排序**
  - 若 `compareFunction(a, b) < 0`，那么a 将排到 b 前面
  - 若 `compareFunction(a, b) = 0`，那么a 和 b 相对位置不变
  - 若 `compareFunction(a, b) > 0`，那么a , b 将调换位置
  :::
  

  ### [**splice**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
  > 通过删除或替换现有元素或者原地添加新的元素来修改数组，**并以数组形式返回被修改的内容**。
  ``` js
  // 删除（包含开始索引）
  let colors1 = [1, 2, 3, 4]
  let colors2 = colors1.splice(2, 2)
  console.log(colors1)	// [1, 2]
  console.log(colors2)	// [3, 4]

  // 替换（从开始索引依次插入）
  let array1 = [1, 2, 3]
  let array2 = array1.splice(1, 1, 'black', 'white')
  console.log(array1)	// [1, "black", "white", 3]
  console.log(array2)	// [2]

  // 插入（从开始索引前一位依次插入）
  let array3 = [1, 2, 3]
  let array4 = array3.splice(2, 0, 'black', 'white')
  console.log(array3)	// [1, 2, "black", "white", 3]
  console.log(array4)	// []

  // 传入负数则从末尾开始
  let array5 = [1, 2, 3]
  let array6 = array5.splice(-2, 1, 'black', 'white')
  console.log(array5)	// [1, "black", "white", 3]
  console.log(array6)	// [2]
  ```
  ::: tip 语法：array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
  如果指明了`compareFunction`，**数组将按照调用该函数的返回值来排序**
  - **start​**：修改的开始位置（从0计数）
  - **deleteCount**：整数，表示要移除的数组元素的个数。
  - **item1, item2, ...**：要添加进数组的元素，从start 位置开始。如果不指定，则`splice() `将只删除数组元素。
  :::


  ### [**fill(ES6)**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)
  > 用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。
  ``` js
  let arr1 = [1, 2, 3, 4]
  let arr2 = arr1.fill(0)
  console.log(arr1)   // [0, 0, 0, 0]
  console.log(arr2)   // [0, 0, 0, 0]

  // 把索引 1 到 3 之间的数据全部替换成 10 
  let arr3 = [1, 2, 3, 4]
  let arr4 = arr3.fill(10, 1, 3)
  console.log(arr3)   // [1, 10, 10, 4]
  console.log(arr4)   // [1, 10, 10, 4]
  ```

  ### [**copyWithin(ES6)**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin)
  > 浅复制数组的一部分到同一数组中的另一个位置
  ``` js
               //  'c', 'd',
  let arr1 = ['a', 'b', 'c', 'd', 'e']
  let arr2 = arr1.copyWithin(1, 2, 4)   // 索引 2 到 4 之前的值
  console.log(arr1 === arr2);   // true
  console.log(arr1);  // ["a", "c", "d", "d", "e"]
  console.log(arr2);  // ["a", "c", "d", "d", "e"]

           // 'c', 'd', 'e'
  let arr3 = ['a', 'b', 'c', 'd', 'e']
  let arr4 = arr3.copyWithin(0, 2)      // 索引 2 到末尾的值
  console.log(arr3);  // ["c", "d", "e", "d", "e"]
  console.log(arr4);  // ["c", "d", "e", "d", "e"]
  ```
  
<br />

## 访问方法
  ### [**concat**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
  > 返回一个由当前数组和其它若干个数组或者若干个非数组值组合而成的新数组。
  ``` js
  let array1 = ['a', 'b', 'c'];
  let array2 = ['d', 'e', 'f'];
  let array3 = array1.concat(array2)
  console.log(array3);  // ["a", "b", "c", "d", "e", "f"]
  ```

  ### [**join**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/join)
  > 将数组中的所有元素连接成一个字符串。
  ``` js
  let array = ['We', 'are', 'Chinese'];
  console.log(array.join(''));  // "WeareChinese"
  console.log(array.join());    // "We,are,Chinese"
  console.log(array.join('+')); // "We+are+Chinese"
  ```

  ### [**slice**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
  > 将数组中一部分元素浅复制存入新的数组对象，并且返回这个数组对象。不包含`end`
  ``` js
  let array = [1, 2, 3, 4, 5, 6];
  let array1 = array.slice(1, 2)
  let array2 = array.slice(2, 5)
  let array3 = array.slice()
  console.log(array1);  // [2]
  console.log(array2);  // [3, 4, 5]
  console.log(array3);  // [1, 2, 3, 4, 5, 6]
  ```

  ### [**toString**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toString)
  > 返回一个字符串，表示指定的数组及其元素。当数组直接和字符串作连接操作时，将会自动调用其`toString()`方法。
  ``` js
  let colors1 = ['red', 'yellow', 'blue']
  let colors2 = colors1.toString()
  let colors3 = colors1 + 'black'
  console.log(colors2);   // red,yellow,blue
  console.log(colors3);   // red,yellow,blueblack
  ```

  ### [**toLocaleString**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString)
  > 返回一个字符串表示数组中的元素,
  ``` js
  var array = [{ name: 'zz' }, 123, "abc", new Date()];
  var str = array.toLocaleString();
  console.log(str);   // [object Object],123,abc,2019/6/17 下午9:58:53
  ```
  ::: tip 数组中的元素将使用各自的 toLocaleString 方法转成字符串
  - **Object**：`Object.prototype.toLocaleString()`
  - **Number**：`Number.prototype.toLocaleString()`
  - **Date**：`Date.prototype.toLocaleString()`
  :::
  
  

  ### [**indexOf**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
  > 返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。
  ``` js
  let colors = ['red', 'yellow', 'blue', 'black', 'white', '123']
  let num1 = colors.indexOf('black')
  let num2 = colors.indexOf('yellow')
  let num3 = colors.indexOf('green')
  let num4 = colors.indexOf(123)
  console.log(num1);  // 3
  console.log(num2);  // 1
  console.log(num3);  // -1
  console.log(num4);  // -1 使用的是严格相等
  ```
  
  ### [**lastIndexOf**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf)
  > 查找元素在数组中最后一次出现时的索引，如果没有，则返回-1。从数组的后面向前查找
  ``` js
  let colors = [1, 2, 1, 1, 3, 2, 4]
  let num1 = colors.lastIndexOf(1)
  let num2 = colors.lastIndexOf(2)
  let num3 = colors.lastIndexOf(5)
  console.log(num1);  // 3
  console.log(num2);  // 5
  console.log(num3);  // -1
  ```

  ### [**includes(ES7)**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
  > 判断一个数组是否包含一个指定的值，如果包含则返回 true，否则返回false。
  ``` js
  let colors = ['red', 'yellow', 'blue', '1']
  let bool1 = colors.includes('blue')
  let bool2 = colors.includes(1)
  console.log(bool1)  // true
  console.log(bool2)  // false
  ```

  ### [**toSource**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toSource)
  > **非标准**，不建议使用

<br />


## 迭代方法




## 参考
  - [MDN Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)