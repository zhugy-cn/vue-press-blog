# JDBC

## 基本概念
  - 概念：Java DataBase Connectivity。Java 数据库连接。Java语言操作数据库
  - 本质：由官方定义的一套操作所有关系型数据库的规则（接口），各个数据库厂商去实现这套接口，提供数据库
  驱动`jar`包。开发人员使用这套接口（JDBC）编程，真正执行的代码是驱动`jar`包中的实现类。


## 快速入门

- jdbc 使用步骤
  1. 注册驱动
  2. 获取数据库连接对象
  3. 定义 Sql 语句
  4. 获取执行 Sql 的对象 Statement
  5. 执行 Sql
  6. 处理结果
  7. 释放资源

::: tip 1. 注册驱动

``` java
Class.forName("com.mysql.cj.jdbc.Driver")
```
:::

::: tip 2. 获取数据库连接对象

``` java
Connection conn = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/study?serverTimezone=UTC", "root", "root")
```
:::

::: tip 3. 定义 Sql 语句
``` java
String sql = "update use set name='张三' where id=1";
```
:::

::: tip 4. 获取执行 Sql 的对象 Statement
``` java
Statement stmt = conn.createStatement()
```
:::

::: tip 5. 执行 Sql 语句
``` java
int count = stmt.executeUpdate(sql);
```
:::

::: tip 6. 处理返回结果
``` java
System.out.println(count);
```
:::

::: tip 7. 释放资源
``` java
stmt.close()
conn.close()
```
:::

``` java
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
    * 通过代码注册驱动：`Class.forName("com.mysql.jdbc.Driver")`
    * 查看源码发现：在`com.mysql.jdbc.Driver`类中存在静态代码块
    ``` java
    static {
        try {
            java.sql.DriverManager.registerDriver(new Driver());
        } catch (SQLException E) {
            throw new RuntimeException("Can't register driver!");
        }
    }
    ```
    * 注意：mysql5之后的驱动 jar 包可以省略注册驱动的步骤。
  - 获取数据库连接
    * 方法：`static Connection getConnection(String url, String user, String password)`
:::

::: tip 2、Connection：数据库连接对象

  - 获取执行 Sql 的对象
    * `Statement createStatement()`
    * `PreparedStatement prepareStatement(String sql)`

  - 管理事务
    * 开启事务：`setAutoCommit(boolean autoCommit)`。调用该方法设置参数为false，即开启事务
    * 提交事务：`commit()`
    * 回滚事务：`rollback()`

:::

::: tip 3. Statement：Sql 执行对象
  - 执行 Sql
    * `int executeUpdate(String sql)`：执行DML（insert、update、delete）语句、DDL(create，alter、drop)语句
    * `ResultSet executeQuery(string sql)`：执行 DQL（select）语句
:::

::: tip 4. ResultSet：结果集对象
``` java
stmt.close()
conn.close()
```
:::

::: tip 5. PreparedStatement：执行sql的对象
``` java
stmt.close()
conn.close()
```
::: 