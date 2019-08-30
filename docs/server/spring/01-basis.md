# spring 的概念

## IOC

- IOC：Inversion Of Control（控制反转），降低程序之间的耦合（依赖关系）

- 依赖关系的管理：都交给 Spring 来维护，当当前类需要用到其他类时（产生依赖关系），只需要在配置文件（依赖注入）中加已说明，Spring 就会根据配置文件来提供所依赖的类



## 实现 Bean 工厂
- bean.properties
```properties
accountService=cn.zhugy.service.impl.AccountServiceImpl
accountDao=cn.zhugy.dao.impl.AccountDaoImpl
```
- 工厂模式
```java
/*
 *   1. 需要一个配置文件来配置 service 和 dao
 *       配置的内容：全限定类名
 *
 *   2. 通过读取配置文件中配置的内容，反射创建对象
 * */
public class BeanFactory {
    private static Properties props;

    // 定义一个 map，用于存放要创建的对象，称为容器
    private static Map<String, Object> beans;

    static {
        try {
            // 加载配置文件
            props = new Properties();
            InputStream in = BeanFactory.class.getClassLoader().getResourceAsStream("bean.properties");
            props.load(in);

            // 单例模式
            beans = new HashMap<String, Object>();
            // 取出配置文件中所有的 key
            Enumeration keys = props.keys();
            while (keys.hasMoreElements()) {
                // 取出每个 key
                String key = keys.nextElement().toString();
                // 根据 key 获取 value
                String beanPath = props.getProperty(key);
                // 反射创建对象
                Object value = Class.forName(beanPath).newInstance();
                // 把 key 和 value 存入容器中
                beans.put(key, value);
            }
        } catch (Exception e) {
            throw new ExceptionInInitializerError("初始化 properties 失败");
        }
    }

    // 根据 bean 的名称获取 bean
    public static Object getBean(String beanName) {
        return beans.get(beanName);
    }
}
```

## ApplicationContext
- `ApplicationContext`（核心容器）的三个实现类
  1. `ClassPathXmlApplicationContext`：加载类路径下的文件创建容器
  2. `FileSystemXmlApplicationContext`：加载磁盘任意路径下的配置文件创建容器
  3. `AnnotationConfigApplicationContext`：读取注解创建容器


- 核心容器的两个接口
  1. ApplicationContext：单例对象适用  
    在构建核心容器时，采取立即加载的方式，只要一读完配置文件就马上创建配置的 Bean 对象

  2. BeanFactory：多例对象适用    
    在构建核心容器时，采取延迟加载的方式，什么时候根据 ID 获取对象了，就什么时候创建 Bean 对象
  


## Bean 标签
- 获取 Bean 对象步骤
```java
// 1. 获取核心容器
ApplicationContext ac = new ClassPathXmlApplicationContext("bean.xml");
// 2. 根据 ID 获取 bean 对象
IAccountService as = (IAccountService) ac.getBean("accountService");
```

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

3. 使用类（工厂）中的**普通方法**创建对象，并存入 Spring 容器

```xml
<bean id="instancFactory" class="cn.zhugy.factory.InstanceFactory" />
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

## 基于注解环境
### 创建对象
- `@Component`  
  - 作用：把当前类对象存入 Spring 容器中  
  - 属性：  
      value：用于指定 Bean 的 ID，当不写时，默认值是当前类名，首字母小写  

- 这三个注解作用属性与 @Component 一样，只是语义化更好  
  `@Controller`：用在表现层  
  `@Service`：用于业务层  
  `@Repository`：用于持久层  

### 注入数据
- `@Autowired`：自当按照类型注入，只要容器中有唯一的一个 Bean 对象类型和要注入的变量类型匹配，就可以成功注入
- `@Qualifier`：在按照类中注入的基础上再按照名称注入（和 Autowired 配合）。在给类成员注入时不能单独使用，但是在给方法参数注入时可以
- `@Resource`：不依托于 Autowired ，但是属性不是 value 了，而是 name

以上三个注解只能注入 bean 类型的数据，不能注入基本类型和 String 类型，另外，集合类型只能通过 xml 注入

- `@Value`：用于注入基本类型和 String 类型的数据  


### 改变范围
- `@Scope`：用于指定 bean 的作用范围

### 生命周期
- `@PostConstruct`：用于指定销毁方法
- `@Repository`：用于指定初始化方法
<!-- 新内容 start -->

## 其他注解

- `@Configuration`：指定当前类是一个 spring 配置类，当创建容器时会从该类上加载注解。获取容器时需要使用：  
  `AnnotationApplicationContext (有@Configuration 注解的类.class)`。

- `@ComponentScan`：用于指定 spring 在初始化容器时要扫描的包。作用和在 spring 的 xml 配置文件中的：  
  `<context:component-scan base-package="cn.zhugy"/>` 是一样的。

- `@Bean`：该注解只能写在方法上，表明使用此方法创建一个 Bean 对象，并且放入 spring 容器。  
  属性：name：用于指定 Bean 的 Id ， 当不写时，默认值是当前方法的名称  
  注意：当使用注解配置方法时，如果方法有参数，spring 框架会去容器中查找可用的 bean 对象

- `@Import`：用于导入其他配置类，在引入其他配置类时，可以不用再写 `@Configuration` 注解。

- `@PropertySource`：用于加载.properties 文件中的配置。如果是在类路径下，需要写上 classpath:。

## 整合 Junit

1. 导入 jar 包 `spring-test`
2. 使用 Junit 提供的注解把原有的 main 方法替换成 spring 提供的

```java
@RunWith(SpringJUnit4ClassRunner.class)
public class AccountServiceTest {
  ...
}
```

3. 告知 spring 运行器，spring 和 ioc 创建是基于 xml 还是注解，并且指定位置

```java

// locations 属性：用于指定配置文件的位置。如果是类路径下，需要用 classpath:表明
// classes 属性：用于指定注解的类。当不使用 xml 配置时，需要用此属性指定注解类的位置。

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations= {"classpath:bean.xml"})
public class AccountServiceTest {
  ...
}
```

4. 使用 `@Autowired` 给测试类中的变量注入数据

<!-- 新内容 end -->
