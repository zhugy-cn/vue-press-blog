# JDBC
[[toc]]

## 基本概念

- 概念：Java DataBase Connectivity。Java 数据库连接。Java 语言操作数据库
- 本质：由官方定义的一套操作所有关系型数据库的规则（接口），各个数据库厂商去实现这套接口，提供数据库
  驱动`jar`包。开发人员使用这套接口（JDBC）编程，真正执行的代码是驱动`jar`包中的实现类。
- 使用时需要引入``mysql-connector-java` 驱动包

## 快速入门

- jdbc 使用步骤
  1. 注册驱动（首先需要引入 `mysql-connector-java` 驱动包）
  2. 获取数据库连接对象
  3. 定义 Sql 语句
  4. 获取执行 Sql 的对象 Statement
  5. 执行 Sql
  6. 处理结果
  7. 释放资源

::: tip 1. 注册驱动

```java
Class.forName("com.mysql.cj.jdbc.Driver")
```

:::

::: tip 2. 获取数据库连接对象

```java
Connection conn = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/study?serverTimezone=UTC", "root", "root")
```

:::

::: tip 3. 定义 Sql 语句

```java
String sql = "update use set name='张三' where id=1";
```

:::

::: tip 4. 获取执行 Sql 的对象 Statement

```java
Statement stmt = conn.createStatement()
```

:::

::: tip 5. 执行 Sql 语句

```java
int count = stmt.executeUpdate(sql);
```

:::

::: tip 6. 处理返回结果

```java
System.out.println(count);
```

:::

::: tip 7. 释放资源

```java
stmt.close()
conn.close()
```

:::

```java
Connection conn = null;
Statement stmt = null;
try {
    // 1. 注册驱动
    Class.forName("com.mysql.cj.jdbc.Driver");
    // 2. 获取 Connection 对象
    conn = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/study?serverTimezone=UTC", "root", "root");
    // 3. 定义 Sql 语句
    String sql = "update user set name='李四' where id=41";
    // 4. 获取执行 Sql 的 Statement 对象
    stmt = conn.createStatement();
    // 5. 执行 Sql
    int count = stmt.executeUpdate(sql);    // 影响的行数
    // 6. 处理结果
    if (count > 0) {
        System.out.println("操作成功！");
    } else {
        System.out.println("操作失败！");
    }

} catch (ClassNotFoundException e) {
    e.printStackTrace();
} catch (SQLException e) {
    e.printStackTrace();
} finally {
    //7. 释放资源
    //避免空指针异常
    if (stmt != null) {
        try {
            stmt.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    if (conn != null) {
        try {
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
```

## 常用类介绍

::: tip 1、DriverManager：驱动管理对象

- 注册驱动，指定数据库驱动 jar 包

  - 通过代码注册驱动：`Class.forName("com.mysql.jdbc.Driver")`
  - 查看源码发现：在`com.mysql.jdbc.Driver`类中存在静态代码块

  ```java
  static {
      try {
          java.sql.DriverManager.registerDriver(new Driver());
      } catch (SQLException E) {
          throw new RuntimeException("Can't register driver!");
      }
  }
  ```

  - 注意：mysql5 之后的驱动 jar 包可以省略注册驱动的步骤。
  - 获取数据库连接方法：`static Connection getConnection(String url, String user, String password)`

:::

::: tip 2、Connection：数据库连接对象

- 获取执行 Sql 的对象

  - `Statement createStatement()`
  - `PreparedStatement prepareStatement(String sql)`

- 管理事务
  - 开启事务：`setAutoCommit(boolean autoCommit)`。调用该方法设置参数为 false，即开启事务
  - 提交事务：`commit()`
  - 回滚事务：`rollback()`

:::

::: tip 3. Statement： 执行 “静态 Sql” 对象。拼接 Sql 有 Sql 注入的风险

- 执行 Sql

  - `int executeUpdate(String sql)`：执行 DML（insert、update、delete）语句、DDL(create，alter、drop)语句
  - `ResultSet executeQuery(string sql)`：执行 DQL（select）语句

:::

::: tip 4. ResultSet：结果集对象，封装查询结果

- `getXxx(参数)`方法：从结果集中获取数据

  - Xxx：代表数据类型。 如：String getString() 、 int getInt()，**数据类型最好跟数据库一致，不然可能会报错**
  - 参数：
    1. int: 代表列的编号，从 1 开始。 如：getString(1)
    2. String：代表列的名称。 如：getString("name")

- `Boolean next()方法`：判断游标是否是最后一行末尾，返回 false 则表示没有数据了，默认是指向表头

```java
String sql = "select * from user";
ResultSet resultSet = stmt.executeQuery(sql);
while (resultSet.next()) {
		int id = resultSet.getInt("id");
		String name = resultSet.getString("name");
		System.out.println(id);
		System.out.println(name);
}
```

:::

::: tip 5. PreparedStatement：执行 “动态 Sql” 的对象。 ，解决了 Statement Sql 注入的问题

- SQL 注入：拼接 SQL 如果有一些特殊的关键字也参与了拼接，那么可能会造成安全问题：
  - 输入用户随便，输入密码：b' or 'b' = 'b
  - sql：select \* from user where username = 'fhdsjkf' and password = 'b' or 'b' = 'b'

- 预编译SQL：参数使用 ？ 来作为占位符

- setXxx(参数1，参数2)：获取数据
  - 参数1：？的位置编号 从 1 开始
  - 参数2：？的值

```java
String sql = "select * from user where name=? and password=?";
// 这里返回的不是 Statement 了，这里需要把 Sql 传进去
PreparedStatement pstmt = conn.prepareStatement(sql);
// 给占位符（？）赋值
pstmt.setString(1, 'root');   // name 的值
pstmt.setString(2, 'root');   // password 的值
pstmt.executeQuery();   // 这里不需要传入 Sql 了
```

:::


## 事务管理
- 使用Connection对象来管理事务
  - 开启事务：setAutoCommit(boolean autoCommit) ：调用该方法设置参数为 false，即开启事务  
      - 在执行 sql 之前开启事务
  - 提交事务：commit()   
      - 当所有 sql 都执行完提交事务
  - 回滚事务：rollback()   
      - 在 catch 中回滚事务
```java
Connection conn = null;
PreparedStatement pstmt1 = null;
PreparedStatement pstmt2 = null;
try {
    conn = JDBCUtils.getConnection();
    // 将事务设置成手动提交（开启事务）
    conn.setAutoCommit(false);

    String sql1 = "update user set money = money - ? where id = ?";
    String sql2 = "update user set money = money + ? where id = ?";
    pstmt1 = conn.prepareStatement(sql1);
    pstmt2 = conn.prepareStatement(sql2);
    // 给 Sql 赋值
    pstmt1.setString(1, "500");
    pstmt1.setString(2, "41");
    pstmt2.setString(1, "500");
    pstmt2.setString(2, "42");

    pstmt1.executeUpdate();
    int i = 2 % 0;
    pstmt2.executeUpdate();

    // 成功提交事务
    conn.commit();
} catch (SQLException e) {
    try {
        if (conn != null) {
            // 失败回滚事务
            System.out.println("rollback");
            conn.rollback();
        }
    } catch (SQLException ex) {
        ex.printStackTrace();
    }
    e.printStackTrace();
} finally {
    JDBCUtils.close(pstmt1, conn);
    JDBCUtils.close(pstmt2, null);
}
```

## 数据库连接池

- 概念：就是一个存放数据库连接的容器。  
当系统初始化好后，容器被创建，容器中会申请一些连接对象，当用户来访问数据库时，从容器中获取连接对象，用户访问完之后，会将连接对象归还给容器

- 好处：
  - 节约资源
  - 用户访问高效

- 实现
  - 标准接口：DataSource（javax.sql.DataSource）  
    - 获取连接：getConnection()
    - 归还连接：Connection.close()。如果连接对象Connection是从连接池中获取的，那么调用Connection.close()方法，则不会再关闭连接了。而是归还连接


## C3P0
- 数据库连接池技术
- 使用步骤
  1. Maven添加依赖： `c3p0 和 mysql-connector-java`
  2. 定义配置文件：文件名必须是 c3p0.properties 或者 c3p0-config.xml，会自动读取
  3. 创建数据库连接池对象。 DataSource ds = new ComboPooledDataSource();
  4. 获取连接。 Connection conn = ds.getConnection();

- 代码示例：
```xml
<!-- c3p0-config.xml 文件配置 -->
<c3p0-config>
    <!-- 使用默认的配置读取连接池对象 -->
    <default-config>
        <!--  连接参数 -->
        <property name="driverClass">com.mysql.cj.jdbc.Driver</property>
        <property name="jdbcUrl">jdbc:mysql://127.0.0.1:3306/study?serverTimezone=UTC</property>
        <property name="user">root</property>
        <property name="password">root</property>

        <!-- 连接池参数 -->
        <!--初始化申请的连接数量-->
        <property name="initialPoolSize">5</property>
        <!--最大的连接数量-->
        <property name="maxPoolSize">10</property>
        <!--超时时间-->
        <property name="checkoutTimeout">3000</property>
    </default-config>

    <named-config name="otherc3p0">
        <!--  连接参数 -->
        <property name="driverClass">com.mysql.jdbc.Driver</property>
        <property name="jdbcUrl">jdbc:mysql://localhost:3306/db3</property>
        <property name="user">root</property>
        <property name="password">root</property>

        <!-- 连接池参数 -->
        <property name="initialPoolSize">5</property>
        <property name="maxPoolSize">8</property>
        <property name="checkoutTimeout">1000</property>
    </named-config>
</c3p0-config>
```
```java
// 1. 创建数据库连接池对象
DataSource ds = new ComboPooledDataSource();
// 2. 创建连接
Connection conn = ds.getConnection();
String sql = "update user set name='张三三' where id=42";
PreparedStatement pstmt = conn.prepareStatement(sql);
int count = pstmt.executeUpdate();
System.out.println(count);
```


##  Druid
- 由阿里巴巴提供的数据库连接池技术

- 使用步骤
  1. Maven添加依赖：druid 和 mysql-connector-java 
  2. 定义配置文件并导入。配置文件是 properties 形式的，可以叫任意名称
  3. 加载 .properties 配置文件
  4. 通过`DruidDataSourceFactory.createDataSource(properties)`工厂来获取数据库连接池对象。 
  5. 获取连接

- 代码示例
```properties
# druid.properties 配置文件
driverClassName=com.mysql.cj.jdbc.Driver
url=jdbc:mysql://127.0.0.1:3306/study?serverTimezone=UTC
username=root
password=root
# 初始连接数量
initialSize=5
# 最大的连接数量
maxActive=10
# 超时时间
maxWait=3000
```
```java
// 1. 加载配置文件
Properties properties = new Properties();
InputStream inputStream = Demo1.class.getClassLoader().getResourceAsStream("druid.properties");
properties.load(inputStream);
// 2. 获取数据库连接池对象
DataSource dataSource = DruidDataSourceFactory.createDataSource(properties);
// 3. 获取数据库连接对象
Connection conn = dataSource.getConnection();
// 执行 sql
String sql = "update user set name='王五五' where id=45";
PreparedStatement pstmt = conn.prepareStatement(sql);
int count = pstmt.executeUpdate();
System.out.println(count);
```
