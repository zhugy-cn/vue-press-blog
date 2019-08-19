# 基于注解

## 常用注解
- @Select：查询
- @Insert：新增
- @Update：更新
- @Delete：删除
- @Result：结果集封装
- @Results：可以与 @Result 一起使用，封装多个结果
- @ResultMap：引用 @Results 定义的封装
- @One：一对一结果集封装
- @Many：一对多结果集封装
- @SelectProvider： 动态 SQL 映射
- @CacheNamespace：注解二级缓存的使用


## 练习
- 别忘记配置扫描包
```xml
<package name="cn.zhugy.mybatisAnnotation.dao"/>
```
### 单表
```java
// 查询所有
@Select("select * from user")
List<User> findAll();

// 添加
@Insert("insert into user(name, birthday, address) values(#{name}, #{birthday}, #{address})")
int addUser(User user);

// 修改
@Update("update user set name=#{name}, birthday=#{birthday}, address=#{address} where id=#{id}")
int updateUser(User user);

// 删除
@Delete("delete from user where id=#{id}")
int deleteUser(int id);

// 根据 id 查询
@Select("select * from user where id=#{uid}")
User findUserById(int id);

// 根据姓名模糊查询
@Select("select * from user where name like #{name}")
List<User> findUserByName(String name);

// 查询总条数
@Select("select count(id) from user")
int findTotalUser();
```
### 复杂映射关系
- 当数据库字段跟实体类属性名不一致时，就需要配置映射关系
```java
// 查询所有
@Select("select * from account")
// 配置跟数据库的映射关系
@Results(id = "accountUserMap", value = {
        @Result(id = true, column = "id", property = "accountId"),
        @Result(column = "uid", property = "uid"),
        @Result(column = "money", property = "accountMoney")
})
List<Account> findAllAccounts();

// 根据 ID 查询
// 引入 id 为 accountUserMap 的 map
@ResultMap("accountUserMap")
@Select("select * from account where id=2")
Account findById(int id);
```

### 多表

- @Results 注解：代替了 resultMap 标签   
  该注解中可以使用单个@Result 注解，也可以使用@Result 集合  
  @Results（{@Result（），@Result（）}）或@Results（@Result（））

- @Resutl 注解：代替了 id 标签和 result 标签  
  属性介绍：
    - id：是否是主键字段
    - column：数据库的列名
    - property：需要装配的属性名，实体类的属性名
    - one：对一，（@Result（one=@One）（）））
    - many：对多，（@Result（many=@many）（）））

- @One 注解（一对一）：代替了 assocation 标签，在注解中用来指定子查询返回单一对象。  
  属性介绍：
    - select：指定用来多表查询的 Sql Mapper（方法）
    - fetchType：延迟加载配置，会覆盖全局的配置参数 lazyLoadingEnabled。。
    - @Result(column="传给select方法作为参数的字段", property="", one=@One(select=""))

- @Many 注解（多对多）：代替了 Collection 标签，在注解中用来指定子查询返回对象集合。
  - @Result(column="", property="", many=@Many(select=""))

- 一对一
```java
@Select("select * from account")
@Results(id = "accountUserMap", value = {
        @Result(id = true, column = "id", property = "accountId"),
        @Result(column = "uid", property = "uid"),
        @Result(column = "money", property = "accountMoney"),
        // column: 传哪个字段给方法当作参数
        @Result(column = "uid", property = "user",
                // 对一
                one = @One(
                        select = "cn.zhugy.mybatisAnnotation.dao.IUserDao.findUserById",
                        fetchType = FetchType.EAGER
                )
        )
})
List<Account> findAllAccountsAndUser();
```
- 一对多
```java
// 一对多,查询用户的同时把所属账户也查询出来
@Select("select * from user")
@Results({
        @Result(id = true, column = "id", property = "id"),
        @Result(column = "id", property = "accounts", many = @Many(
                fetchType = FetchType.LAZY,
                select = "cn.zhugy.mybatisAnnotation.dao.IAccountDao.findById"
        ))

})
List<User> findUserAndAccount();
```