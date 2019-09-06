# SpringMVC
[tomcat乱码问题](https://www.cnblogs.com/shej123/p/10312806.html)

## 请求参数绑定
:::warning 注意
- 如果传递的属性名不一致则为 Null
- 使用过滤器解决 post 乱码问题
```xml
<!-- web.xml 中配置 -->
<filter>
    <filter-name>characterEncodingFilter</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <init-param>
        <param-name>encoding</param-name>
        <param-value>UTF-8</param-value>
    </init-param>
</filter>
<filter-mapping>
    <filter-name>characterEncodingFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```
:::
- 基本数据类型和字符串类型
```html
<a href="./param/test1?name=jack&age=24">测试参数一</a>
```
```java
@RequestMapping("/test1")
public String test1(String name, String age) {
    System.out.println("name：" + name);
    System.out.println("age：" + age);
    return "success";
}
```

- 实体类型
```java
// 控制器
@RequestMapping("test2")
public String test2(Account account) {
    System.out.println(account);
    return "success";
}
```
:::tip 第一种情况
```java
// 实体类型
public class Account implements Serializable {
    private String username;
    private String password;
    private Double money;
}
```
```html
姓名：<input type="text" name="username">
密码：<input type="text" name="password">
金额：<input type="text" name="money">
```
:::

:::tip 第二种情况
```java
// 实体类里面包含其它复杂类型
public class Account implements Serializable {
    // 其它实体类
    private User user;
    // List
    private List<User> list;
    // Map
    private Map<String, User> map;
}
```
```java
// User 实体类
public class User implements Serializable {
    private String uname;
    private Integer uage;
}
```
```html
<!-- 前面加属性名 -->
用户姓名：<input type="text" name="user.uname">
用户年龄：<input type="text" name="user.uage">

<!-- 封装进 List -->
用户姓名：<input type="text" name="list[0].uname">
用户年龄：<input type="text" name="list[0].uage">

<!-- 封装进 Map -->
用户姓名：<input type="text" name="map['one'].uname">
用户年龄：<input type="text" name="map['one'].uage">
```
:::

- 自定义类型转换器

## 常用注解
### `@RequestParam`
- 作用：把请求中指定名称的参数给控制器中的形参赋值
- 属性：
    1. value：请求参数名称
    2. required：请求参数中是否必须提供此参数，默认值是true，必须提供
    ```java
    public String test4(@RequestParam("username") String name) {}
    public String test4(@RequestParam(value = "username", required = false) String name) {}
    ```

### `@RequestBody`
- 作用：用于获取请求体的内容（get 方法不可以）
- 属性：
    1. required：是由必须有请求体，默认为 true
    ```java
    public String test5(@RequestBody String body) {
      System.out.println(body);   // username=root&password=12346
    }
    ```
    
### `@PathVariable`
- 作用：获取 url 中的占位符。例如：url中有/delete/{id}，{id} 就是占位符
- 属性：
    1. value：指定 url 中占位符的名称
    2. required：是否必须提供占位符
    ```html
    <a href="./param/test6/12">PathVariable</a>
    ```
    ```java
    @RequestMapping("/test6/{uid}")
    public String test6(@PathVariable("uid") int id) {
        System.out.println(id);   // 12
        return "success";
    }
    ```

## 控制器返回值
### 返回字符串
