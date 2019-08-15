# DML

## 添加

- 语法

```sql
insert into 表名 (列名1, 列名2, ...列名n) values(值1, 值2, ...值n)
```

- 示例

```sql
-- 基本
INSERT INTO `user` ( `name`, age, sex ) VALUES('张三', 22, '男')

-- 去掉列名
INSERT INTO `user` VALUES(DEFAULT, '张三', 22, '男')

-- 添加多个
INSERT INTO `user` VALUES
(NULL, '张三', 22, '男'),
(NULL, '李四', 23, '女'),
(NULL, '王五', 24, '男')
```

::: danger 注意

- 列名和值要一一对应
- 如果表名后，不定义列名，则默认给所有列添加值，`ID`自增的话可以用`default`或者`null`，但不能不写
- 处理数字类型，其他的类型用双引号包起来

:::

## 修改

- 语法

```sql
update 表名 set 列名1 = 值1, 列名2 = 值2, 列名三 = 值3, ... [where 条件]
```

- 示例

```sql
-- 基本
UPDATE `user` SET `name` = 'jack', age = 24 WHERE id = 16

-- 不加 where 条件会修改全部数据
UPDATE `user` SET sex = '男'
```

::: danger 注意

- 如果不加任何条件，则会将表中所有记录全部修改。

:::

## 删除

- 语法

```sql
update from 表名 [where 条件]
```

- 示例

```sql
-- 基本
DELETE FROM `user` WHERE `name` = 'jack'

-- 不加 where 条件会删除全部记录
DELETE FROM `user`

-- 删除表中所有记录（推荐）
TRUNCATE TABLE `user`
```

::: danger 注意

- 如果不加条件，则删除表中所有记录。
- 如果真的要删除所有记录
  - `delete from 表名`; 不推荐使用。有多少条记录就会执行多少次删除操作。效率低
  - `truncate table 表明`; 推荐使用，先删除表，然后再创建一张一样的表。效率高

:::
