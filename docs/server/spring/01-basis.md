# spring 的概念

## 体系结构

### IOC

- IOC：Inversion Of Control（控制反转），降低程序之间的耦合（依赖关系）

- 依赖关系的管理：都交给 Spring 来维护，当当前类需要用到其他类时（产生依赖关系），只需要在配置文件（依赖注入）中加已说明，Spring 就会根据配置文件来提供所依赖的类

## Bean 标签

### 创建 Bean 对象的三种方式

1. 使用默认无参构造函数

- 它会根据默认无参构造函数来创建类对象。如果 Bean（AccountServiceImpl 对象） 中没有默认无参构造函数，将会创建失败。

```xml
<bean id="accountService" class="cn.zhugy.service.impl.AccountServiceImpl"/>
```

- 后面这两种是把类中方法的返回值存入 Spring 容器中，而不是把整个类存入 Spring 容器

2. 使用类（工厂）中的**静态方法**创建对象，并存入容器

```xml
<!-- 使用 accountService 类的 createAccountService 静态方法创建对象 -->
<bean id="accountService" class="cn.zhugy.service.impl.AccountServiceImpl" factory-method="createAccountService" />

```

3. 使用类（工厂）中的**方法**创建对象，并存入 Spring 容器

```xml
<bean id="instancFactory" class="com.itheima.factory.InstanceFactory" />
<bean id="accountService" factory-bean="instancFactory" factory-method="createAccountService" />
```

### Bean 对象的作用范围

- bean 标签的 scope 属性用于指定 bean 的作用范围

  1. singleton：单例的，默认值

  2. prototype：多例的

  3. request：作用于 Web 应用的请求范围

  4. session：作用于 Web 应用的会话范围

  5. global-session：作用于集群环境的会话范围（全局会话范围），当不是集群环境时，它就是上一条的 session

### Bean 对象的生命周期

1. 单例：一个应用只有一个 Bean 对象的实例，它的作用范围是整个应用

   - 创建：当容器创建时 Bean 对象被创建
   - 存在：只要容器在，Bean 对象也一直存在
   - 销毁：当应用卸载，容器销毁时，Bean 对象也跟着销毁

2. 多例：每次访问 Bean 对象时，都会重新创建 Bean 对象实例

   - 创建：每次使用 Bean 对象时，创建对象实例
   - 存在：只要 Bean 对象还在使用，就一直存在
   - 销毁：当 Bean 对象长时间不用且没有其他对象引用时，就会被 Java 的垃圾回收器回收了

## 依赖注入

- Dependency Injection：它是 spring 框架核心 ioc 的具体实现。

- IOC 只能降低程序间的耦合（依赖），不能说让程序之间完全没有依赖，那么这些依赖的关系将交给 Spring 的 **依赖注入** 来管理，

### 能注入的三类数据

1. 基本类型和 String
2. 其它的 Bean 类型，在配置文件或者注解配置过的 Bean 对象
3. 复杂类型/集合类型

### 注入的三种方式

1. 使用构造函数注入：不适用与经常变动的数据

```xml
<!--
使用的标签：constructor-arg
标签出现的位置：bean 标签的内部
标签的属性：
  type：用户指定要注入的数据的数据类型，该数据类型也是构造函数中某个或某些参数的类型
  index：用于指定要把数据注入给构造函数参数的哪个索引位置，索引的位置从零开始
  name：用于指定给构造函数中指定名称的参数赋值（常用）
  =========================
  value：需要注入的数据（基本类型和 String 类型）
  ref：用于引用其他的 Bean 类型数据（指的是在 Spring 核心容器中出现过的 Bean 对象）
 -->
```

2. 使用 Set 方法注入

- 类里面的属性需要有 set 方法

```xml
<!--
使用的标签：property
标签出现的位置：bean 标签的内部
标签的属性：
  name：指定注入时需要调用的 set 名称，跟属性名无关，只跟 set 方法名称有关，比如 setUsername -> username
  value：需要注入的数据（基本类型和 String 类型）
  ref：用于引用其他的 Bean 类型数据（指的是在 Spring 核心容器中出现过的 Bean 对象）
 -->
```

- 注入集合数据

```xml
<!--
  在 property 标签中使用子标签：
    给 List 结构集合注入的标签有：list、array、set
    给 Map 结构集合注入的标签有：map、props

  总结：结构相同，标签可以互换，也就是说相同的结构下用所属结构下的什么标签都是一样的

 -->
```

3. 使用注解注入
