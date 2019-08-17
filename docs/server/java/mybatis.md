# Mybatis

## 基于XML的使用

### 使用步骤
1. Maven 中导入坐标
2. 编写 SqlMapConfig.xml 主配置文件
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<!-- mybatis的主配置文件 -->
<configuration>
    <!-- 配置环境 -->
    <environments default="mysql">
        <!-- 配置mysql的环境-->
        <environment id="mysql">
            <!-- 配置事务的类型-->
            <transactionManager type="JDBC"/>
            <!-- 配置数据源（连接池） -->
            <dataSource type="POOLED">
                <!-- 配置连接数据库的4个基本信息 -->
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/study?serverTimezone=UTC"/>
                <property name="username" value="root"/>
                <property name="password" value="root"/>
            </dataSource>
        </environment>
    </environments>

    <!-- 指定 Dao 对应的 mapper 映射文件的位置 -->
    <mappers>
        <mapper resource="cn/zhugy/mybatis/mapper/IUserMapper.xml"/>
    </mappers>
</configuration>
```
3. 编写 User 实体类
```java
import lombok.Data;
@Data
public class User {
    private Integer id;
    private String name;
    private String address;
}
```
4. 编写 IUserMapper 接口和操作数据库方法
```java
public interface IUserDao {
    List<User> findAll();
}
```
5. 编写 IUserMapper.xml 映射配置文件
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<!--  Dao 类所在的全限定类名-->
<mapper namespace="cn.zhugy.mybatis.dao.IUserDao">
    <!--  与方法名称，还需要配置返回类型  -->
    <select id="findAll" resultType="cn.zhugy.mybatis.domain.User">
        select * from user
    </select>
</mapper>
```
  
### 在测试类中使用
1. 读取 SqlMapConfig 配置文件
2. 创建 SqlSessionFactoryBuilder 构建对象
3. 使用构建者对象构建出 SqlSessionFactory 工厂对象
4. 使用工厂对象生产 SqlSession 对象
5. 使用 SqlSession 对象创建 Dao 代理对象
6. 使用 Dao 代理对象执行方法
7. 释放资源
```java
// 1. 读取配置文件
InputStream inputStream = Resources.getResourceAsStream("SqlMapConfig.xml");
// 2. 创建 SqlSessionFactoryBuilder 构建对象
SqlSessionFactoryBuilder factoryBuilder = new SqlSessionFactoryBuilder();
// 3. 使用构建对象构建 SqlSessionFactory 工厂对象
SqlSessionFactory factory = factoryBuilder.build(inputStream);
// 4. 使用工厂 SqlSessionFactory 生产 SqlSession 对象
SqlSession sqlSession = factory.openSession();
// 5. 使用 SqlSession 创建 Dao 的代理对象
IUserDao userMapper = sqlSession.getMapper(IUserDao.class);
// 6. 使用代理对象执行接口方法
List<User> list = userMapper.findAll();
for (User user : list) {
    System.out.println(user);
}
// 7. 释放资源
sqlSession.close();
inputStream.close();
```

### 练习
1. 编写 Account 实体类
2. 编写 IAccountDao 接口
3. 在 SqlMapConfig 中配置 Dao 对应的 mapper 配置文件所在
4. 编写 IAccountMapper 配置文件

### 注意事项
1. Mybatis 映射配置文件必须和 mapper 接口的包结构相同
2. 映射文件的（IUserMapper.xml） mapper 标签的 namespace 属性的取值必须是 mapper 接口的全限定类型
3. 映射配置文件（IUserMapper.xml）的操作配置（select标签）的 ID 属性的取值必须与 mapper 接口的方法一致
4. 无需再写 mapper 的实现类

## 基于注解使用

### 使用步骤
1. 删除 Dao 对应的 mapper.xml 配置文件
2. SqlMapConfig 猪配置文件的 mappers > mapper 标签需要修改
```xml
<!-- 基于 xml 配置 -->
<mappers>
    <!-- 指定 Dao 对应的 mapper 映射文件的位置 -->
    <mapper resource="cn/zhugy/mybatis/mapper/IUserMapper.xml"/>
</mappers>
<!-- 基于注解 -->
<mappers>
    <!-- 改为: 被注解的 Dao 接口的全限定类名 -->
    <mapper class="cn.zhugy.mybatis.dao.IUserDao"/>
</mappers>
```
3. 在 Dao 接口的方法上使用 @select 注解并指定 Sql 语句
```java
@Select("select * from user")
List<User> findAll();
```


## CURD操作