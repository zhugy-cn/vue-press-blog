# 多表查询

- 创建表

```sql
-- 创建部门表
CREATE TABLE dept(
    id INT PRIMARY KEY AUTO_INCREMENT,
    NAME VARCHAR(20)
);
INSERT INTO dept (NAME) VALUES ('开发部'),('市场部'),('财务部');
-- 创建员工表
CREATE TABLE emp (
    id INT PRIMARY KEY AUTO_INCREMENT,
    NAME VARCHAR(10),
    gender CHAR(1), -- 性别
    salary DOUBLE, -- 工资
    join_date DATE, -- 入职日期
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES dept(id) -- 外键，关联部门表(部门表的主键)
);
INSERT INTO emp(NAME,gender,salary,join_date,dept_id) VALUES('张三','男',7200,'2013-02-24',1);
INSERT INTO emp(NAME,gender,salary,join_date,dept_id) VALUES('李四','男',3600,'2010-12-02',2);
INSERT INTO emp(NAME,gender,salary,join_date,dept_id) VALUES('王五','男',9000,'2008-08-08',2);
INSERT INTO emp(NAME,gender,salary,join_date,dept_id) VALUES('赵六','女',5000,'2015-10-07',3);
INSERT INTO emp(NAME,gender,salary,join_date,dept_id) VALUES('蜘蛛精','女',4500,'2011-03-14',1);
INSERT INTO emp(NAME,gender,salary,join_date,dept_id) VALUES('测试内外链接','女',4500,Null,Null);
```

- 笛卡儿积
  1. 有两个集合 A、B，取这两个集合的所有组成情况
  2. 要完成多表查询，需要用`where`消除无用的数据
- 数据表对应关系

  - `emp` 表的 `dept_id` 外键 `dept` 表的 `id`
    ![inheritAttrs: true](./images/mysql-01.png)

## 内链接

- 内连接指的是把表与表之间匹配的数据行查询出来。就是两张表之间数据行匹配时，要同时满足`ON`语句后面的条件才行。

- **1.1 隐式内链接**，条件前面是`Where`

::: warning 语法

```sql
select
  字段1, 字段2, ...
from
  表名1, 表名2, ...   -- 在表之间加上 inner join 就是显示内链接了
where
  条件
```

:::

::: tip 示例

```sql
SELECT
  t1.*,               -- 字段名
  t2.`name` t2_name   -- 字段名
FROM
  emp t1,   -- 表名
  dept t2   -- 表名
WHERE
  t1.dept_id = t2.id    -- 条件
```

:::

- **1.2 显式内链接**，条件前面是`On`

::: warning 语法

```sql
select
  字段1, 字段2, ...
from
  表名1
inner join
  表名2
on
  条件
```

:::

::: tip 示例

```sql
SELECT
  t1.*,               -- 字段名
  t2.`name` t2_name   -- 字段名
FROM
  emp t1    -- 表名
INNER JOIN  -- inner 可以省略
  dept t2   -- 表名
ON
  t1.dept_id = t2.id  -- 条件
```

:::

- **1.3 内链接要点**
  1. 从哪些表中查询数据
  2. 条件是什么
  3. 查询哪些字段
  4. **如果某一条的外键为`Null`的话就会忽略这一条，这时候就需要使用外链接来查询**

## 外链接

- `JOIN`前面的表叫`左表`，后面的表叫`右表`，外链接的条件在`On`后面添加，

- **1.1 左外链接**
  > 无论是否符合`ON`语句后面的条件都会把**左表的记录全部查询出来**，右边的那张表只匹配符合条件的数据。当左表有数据而右表不满足条件时右表则填充 `Null`

::: warning 语法

```sql
select
  字段1, 字段2, ...
from
  表名1
left outer join   -- outer可以省略
  表名2
on
  条件
```

:::

::: tip 查询的是左表所有数据以及其右表交集部分。

```sql
SELECT
  t1.*,               -- 字段名
  t2.`name` t2_name   -- 字段名
FROM
  emp t1   -- 表名
LEFT JOIN
  dept t2   -- 表名
ON
  t1.dept_id = t2.id    -- 条件
```

:::

- **1.2 右外链接**

  > 跟左外链接恰好相反，右边的表不管有没有满足`ON`后面的条件都会查询出来

::: warning 语法

```sql
select
  字段1, 字段2, ...
from
  表名1
right outer join  -- outer可以省略
  表名2
on
  条件
```

:::

::: tip 查询的是右表所有数据以及其左表交集部分。

```sql
SELECT
  t1.*,               -- 字段名
  t2.`name` t2_name   -- 字段名
FROM
  emp t1    -- 表名
RIGHT JOIN
  dept t2   -- 表名
ON
  t1.dept_id = t2.id    -- 条件
```

:::

- **1.3 当查询字段为`Null`时内链接、左外链接和右外链接的一些区别**
  ![inheritAttrs: true](./images/mysql-05.png)

  2. 内链接（inner join）

  ![inheritAttrs: true](./images/mysql-04.png)

  3. 左外链接（left join）

  ![inheritAttrs: true](./images/mysql-02.png)

  4. 右外链接（right join）

  ![inheritAttrs: true](./images/mysql-03.png)

## 子查询

- 概念：查询中嵌套查询，称嵌套查询为子查询。根据子查询返回的结果可分为 3 钟情况
  1. 子查询的结果是**单行单列**
  2. 子查询的结果是**多行单列**
  3. 子查询的结果是**多行多列**，又叫虚拟表

::: tip 1. 单行单列：查询员工工资小于平均工资的记录

```sql
-- 1. 找出子查询语句
SELECT AVG(salary) FROM emp

-- 2. 使用子查询
SELECT * FROM emp WHERE salary < (SELECT AVG(salary) FROM emp)
```

- 子查询的结果是单行单列的
  ![inheritAttrs: true](./images/mysql-06.png)

:::

::: tip 2. 多行单列：查询 财务部 和 市场部 所有的员工信息

```sql
-- 1. 找出子查询语句
SELECT id FROM dept WHERE `name` = '开发部' OR `name` = '市场部'

-- 2. 使用子查询
SELECT
  *
FROM
  emp
WHERE
  dept_id
IN (SELECT id FROM dept WHERE `name` IN('开发部', '市场部'))
```

- 子查询的结果是多行单列的
  ![inheritAttrs: true](./images/mysql-07.png)

:::

::: tip 3. 多行多列：查询员工入职日期是 2011-11-11 日之后的 员工信息 和 部门信息

```sql
-- 1. 找出子查询语句
SELECT * FROM emp WHERE join_date > '2011-11-11'

-- 2. 使用 子查询 跟 内链接
SELECT
	t1.*,
	t2.name t2_name
FROM
	( SELECT * FROM emp WHERE join_date > '2011-11-11' ) t1,
	dept t2
WHERE
	t1.dept_id IN (t2.id)

-- 单独使用内链接也可以实现
SELECT
	t1.*,
	t2.name t2_name
FROM
	emp	t1,
	dept t2
WHERE
	t1.join_date>'2011-11-11' AND t1.dept_id = t2.id
```

- 子查询的结果是多行多列的，**虚拟表**
  ![inheritAttrs: true](./images/mysql-08.png)

:::

## 多表查询练习

- 准备数据表

```sql
  -- 1. 部门表
  CREATE TABLE dept (
    id INT PRIMARY KEY PRIMARY KEY, -- 部门id
    dname VARCHAR(50), -- 部门名称
    loc VARCHAR(50) -- 部门所在地
  );

  -- 添加4个部门
  INSERT INTO dept(id,dname,loc) VALUES
  (10,'教研部','北京'),
  (20,'学工部','上海'),
  (30,'销售部','广州'),
  (40,'财务部','深圳');


  -- 2. 职务表
  CREATE TABLE job (
    id INT PRIMARY KEY,
    jname VARCHAR(20),    -- 职务名称
    description VARCHAR(50)   -- 职务描述
  );
  -- 添加4个职务
  INSERT INTO job (id, jname, description) VALUES
  (1, '董事长', '管理整个公司，接单'),
  (2, '经理', '管理部门员工'),
  (3, '销售员', '向客人推销产品'),
  (4, '文员', '使用办公软件');


  -- 3. 员工表
  CREATE TABLE emp (
    id INT PRIMARY KEY, -- 员工id
    ename VARCHAR(50), -- 员工姓名
    job_id INT, -- 职务id
    mgr INT , -- 上级领导
    joindate DATE, -- 入职日期
    salary DECIMAL(7,2), -- 工资
    bonus DECIMAL(7,2), -- 奖金
    dept_id INT, -- 所在部门编号
    CONSTRAINT emp_jobid_ref_job_id_fk FOREIGN KEY (job_id) REFERENCES job (id),
    CONSTRAINT emp_deptid_ref_dept_id_fk FOREIGN KEY (dept_id) REFERENCES dept (id)
  );
  -- 添加员工
  INSERT INTO emp(id,ename,job_id,mgr,joindate,salary,bonus,dept_id) VALUES
  (1001,'张三',4,1004,'2000-12-17','8000.00',NULL,20),
  (1002,'李四',3,1006,'2001-02-20','16000.00','3000.00',30),
  (1003,'王五',3,1006,'2001-02-22','12500.00','5000.00',30),
  (1004,'赵六',2,1009,'2001-04-02','29750.00',NULL,20),
  (1009,'孙七',1,NULL,'2001-11-17','50000.00',NULL,10),
  (1010,'周八',3,1006,'2001-09-08','15000.00','0.00',30),
  (1011,'吴九',4,1004,'2007-05-23','11000.00',NULL,20),
  (1012,'郑十',4,1006,'2001-12-03','9500.00',NULL,30),
  (1005,'哼哼',4,1006,'2001-09-28','12500.00','14000.00',30),
  (1006,'呵呵',2,1009,'2001-05-01','28500.00',NULL,30),
  (1007,'嘻嘻',2,1009,'2001-09-01','24500.00',NULL,10),
  (1008,'哈哈',4,1004,'2007-04-19','30000.00',NULL,20),
  (1013,'嗯嗯',4,1004,'2001-12-03','30000.00',NULL,20),
  (1014,'呃呃',4,1007,'2002-01-23','13000.00',NULL,10);


  -- 4. 工资等级表
  CREATE TABLE salarygrade (
    grade INT PRIMARY KEY,   -- 级别
    losalary INT,  -- 最低工资
    hisalary INT -- 最高工资
  );
  -- 添加5个工资等级
  INSERT INTO salarygrade(grade,losalary,hisalary) VALUES
  (1,7000,12000),
  (2,12010,14000),
  (3,14010,20000),
  (4,20010,30000),
  (5,30010,99990);

```

- 表关系
  ![inheritAttrs: true](./images/mysql-09.png)

::: tip 练习一：查询 员工编号，员工姓名，工资，职务名称，职务描述

- 分析
  1. emp 表：员工编号，员工姓名，工资
  2. job 表：职务名称，职务描述

```sql
SELECT
	*
FROM
	emp t1,
	job t2
WHERE
	t1.job_id = t2.id   -- 查询条件
```

:::

<hr>

::: tip 练习二：查询 员工编号，员工姓名，工资，职务名称，职务描述，部门名称，部门位置

- 分析
  1. emp 表：员工编号，员工姓名，工资
  2. job 表：职务名称，职务描述
  3. dept 表：部门名称，部门位置

```sql
SELECT
	t1.id,          -- 员工编号
	t1.name,        -- 员工姓名
	t1.salary,      -- 员工工资
	t2.jname,       -- 职务名称
	t2.description, -- 职务描述
	t3.dname,       -- 部门名称
	t3.loc          -- 部门位置
FROM
	emp t1,
	job t2,
	dept t3
WHERE
	t1.job_id = t2.id   -- 查询条件 1
AND
  t1.dept_id = t3.id  -- 查询条件 2
```

:::

<hr>

::: tip 练习三：查询 员工姓名，工资，工资等级

- 分析
  1. emp 表：员工姓名，工资
  2. salarygrade 表：工资等级
  3. 查询条件：`emp.salary BETWEEN salarygrade.min AND salarygrade.max`

```sql
SELECT
	t1.name,      -- 员工编号
	t1.salary,    -- 员工姓名
	t2.*          -- salarygrade 表
FROM
	emp t1,
	salarygrade t2
WHERE
	t1.salary BETWEEN t2.min AND t2.max   -- 查询条件
```

:::

<hr>

::: tip 练习四：查询 员工姓名，工资，职务名称，职务描述，部门名称，部门位置，工资等级

- 分析
  1. emp 表：员工姓名，工资
  2. job 表：职务名称，职务描述
  3. dept 表：部门名称，部门位置
  4. salarygrade 表：工资等级

```sql
SELECT
	t1.id,            -- 员工编号
	t1.NAME,          -- 员工姓名
	t1.salary,        -- 员工工资

	t2.jname,         -- 职务名称
	t2.description,   -- 职务描述

	t3.dname,         -- 部门名称
	t3.loc,           -- 部门位置

	t4.grade          -- 工资等级
FROM
	emp t1,
	job t2,
	dept t3,
	salarygrade t4
WHERE
	t1.job_id = t2.id       -- 查询条件 1
AND
	t1.dept_id = t3.id      -- 查询条件 2
AND
	t1.salary BETWEEN t4.min AND t4.max   -- 查询条件 3
```

:::

<hr>

::: tip 练习五：查询 部门编号、部门名称、部门位置、部门人数

- 分析
  1. dept 表：部门编号、部门名称、部门位置
  2. emp 表：部门人数，通过分组获得
  3. 知识点：分组查询，子查询（生成一张虚拟表），外链接

```sql

SELECT 
	*
FROM
	dept t1
LEFT JOIN
	(SELECT dept_id, COUNT(id) total FROM emp GROUP BY dept_id) t2
ON t1.id = t2.dept_id

```

:::

<hr>

::: tip 练习六：查询 所有员工的姓名 及其 直接上级的姓名,没有领导的员工也需要查询

- 分析
  1. 由于上级也在当前表，所以用起别名的方式来自查询
  2. 为了防止为`Null`的情况，需要使用外链接
```sql
SELECT
	t1.name,
	t1.mgr,
	t2.`id`,
	t2.name 
FROM
	emp t1
LEFT JOIN
	emp t2 
ON
	t1.mgr = t2.`id`;
```

:::


