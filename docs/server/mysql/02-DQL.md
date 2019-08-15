# DQL

## 1. 语法

```sql
select
    字段列表
from
    表名列表
where
    条件列表
group by
    分组字段
having
    分组之后的条件
order by
    排序
limit
    分页限定
```

## 2. 基础查询

```sql
-- 1. 多个字段的查询
SELECT id, `name`, sex from `user`

-- 2. 用 * 号查询全部字段
SELECT * FROM `user`

-- 3. 用 as 起别名，as 也可以省略，字段之间用逗号隔开
SELECT name AS n, age a, sex AS s FROM `user`

-- 4. 去除重复
SELECT DISTINCT age FROM `user`

-- 5. 四则运算
SELECT `name`, id + age AS total, id FROM `user`
```

## 3. 条件查询

```sql
1. > 、< 、<= 、>= 、= 、<>
  -- 查询 id + age 大于 50 的记录
  SELECT *, id + age as count FROM `user` WHERE id + age > 50

2. between ... and ...
  -- 查询年龄大于等于20并且小于等于30（包含20跟30）
  SELECT * FROM `user` WHERE age >= 20 AND age <= 30
  SELECT * FROM `user` WHERE age BETWEEN 20 AND 30

3. in(集合)
  -- 查询 age 等于 20、23或者24的记录
  SELECT * FROM `user` WHERE id = 20	OR id = 23 OR id = 24
  SELECT * FROM `user` WHERE id IN (20, 23, 24)

4. like：模糊查询
  4.1 '_'：单个任意字符
  -- 第二个字是张并且只有两个字
  SELECT * FROM `user` WHERE `name` LIKE '_张'
  -- 有三个字符
  SELECT * FROM `user` WHERE `name` LIKE '___'

  4.2 '%'：多个任意字符
  -- 以张开头
  SELECT * FROM `user` WHERE `name` LIKE '张%'
  -- 以张结尾
  SELECT * FROM `user` WHERE `name` LIKE '%张'
  -- 包含张
  SELECT * FROM `user` WHERE `name` LIKE '%张%'

5. is null
  -- 查询time为null（不能用time=null）
  SELECT * FROM `user` WHERE time IS NULL
  -- 查询不为null
  SELECT * FROM `user` WHERE time IS NOT NULL

6. and  或  &&
  -- name包含三 并且 sex是男
  SELECT * FROM `user` WHERE `name` LIKE '%三%' AND sex = '男'

7. or   或  ||
  -- age 等于 10 或者 20
  SELECT * FROM `user` WHERE `age` = '10' OR age = '20'

8. not  或  !
  -- 查询不为null
  SELECT * FROM `user` WHERE time IS NOT NULL
```

## 4. 排序查询

- 语法

```sql
order by 排序字段1 排序方式1, 排序字段2 排序方式2, ...
```

- 排序方式
  1. ASC：升序，**默认**
  2. DESC：降序
- 示例

```sql
-- 升序（默认）
SELECT * FROM `user` ORDER BY `age`
SELECT * FROM `user` ORDER BY `age` ASC

-- 降序
SELECT * FROM `user` ORDER BY `age` DESC

-- 多个排序（前一个排序条件满足时，再排后一个条件）
SELECT * FROM `user` ORDER BY `age` ASC, `money` DESC
```

## 5. 聚合函数

- 示例（计算列）

```sql
-- 1. count：计算个数（一般使用主键）
SELECT COUNT(time) AS count FROM `user`

-- 2. max：计算最大值
SELECT MAX(age) FROM `user`

-- 3. min：计算最小值
SELECT MIN(age) FROM `user`

-- 4. sum：计算和
SELECT SUM(age) FROM `user`

-- 5. avg：计算平均值
SELECT AVG(age) FROM `user`
```

- 注意
  1. 集合函数会排除`Null`值

## 6. 分组查询

- 语法

```sql
group by 分组字段
```

- 示例

```sql
-- 按照性别分组。分别查询男、女同学的平均年龄
SELECT sex, AVG(age) AS avg FROM `user` GROUP BY sex

-- 按照性别分组。分别查询男、女同学的平均年龄、人数
SELECT sex, AVG(age) avg, COUNT(id) AS count FROM `user` GROUP BY sex

-- 按照性别分组。
-- 分别查询男、女同学的平均年龄、总人数。
-- 年龄低于22的人，不参与分组
SELECT sex, AVG(age) avg, COUNT(id) AS count FROM `user` WHERE age > 22 GROUP BY sex

-- 按照性别分组。
-- 分别查询男、女同学的平均年龄、总人数。
-- 年龄低于 23 的人，不参与分组。
-- 分组之后，人数大于 2 的才显示
SELECT
  sex,
  AVG( age ) avg,
  COUNT( id ) AS count
FROM
  `user`
WHERE
  age > 23
GROUP BY
  sex
HAVING  -- 这后面只能放分组字段、聚合函数，不能放其他的字段
  count > 2

```

- 注意

  1. `having`后面只能放分组字段、聚合函数

- `where` 和 `having` 的区别？
  1. `where` 在分组之前进行限定，如果不满足条件，则不参与分组。`having`在分组之后进行限定，如果不满足结果，则不会被查询出来
  2. `where` 后不可以跟聚合函数，`having`可以进行聚合函数的判断。

## 7. 分页查询

> 公式：开始的索引 = （当前的页码 - 1） \* 每页显示的条数

- 语法

```sql
limit 开始的索引,每页查询的条数;
```

- 示例

```sql
-- 假设每页显示 4 条
SELECT * FROM `user` LIMIT 0, 4   -- 第一页（1-1）* 4 = 0
SELECT * FROM `user` LIMIT 4, 4   -- 第二页（2-1）* 4 = 4
SELECT * FROM `user` LIMIT 8, 4   -- 第三页（3-1）* 4 = 8
```
