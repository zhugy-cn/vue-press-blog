# 约束

## 非空约束

- `not null`：值不能为`Null`

1. 创建表时添加

```sql
CREATE TABLE test (
  id INT,
  name VARCHAR(20) NOT NULL
)
```

2. 创建完表后添加

```sql
alter table test modify age varchar(20) not null
```

3. 删除非空约束

```sql
alter table test modify age varchar(20)
```

## 唯一约束

- `unique`：值不能重复，但是`Null`不包含在内

1. 创建表时添加

```sql
CREATE TABLE test (
  id INT,
  name VARCHAR(20) unique
)
```

2. 创建完表后添加

```sql
alter table test modify age varchar(20) unique
```

3. 删除唯一约束

```sql
alter table test drop index age
```

## 主键约束

- `primary key`
  1. 非空且唯一
  2. 一张表只能有一个主键
  3. 主键就是表中记录的唯一标识

1. 创建表时添加

```sql
CREATE TABLE test (
  id INT PRIMARY KEY,
  name VARCHAR(20)
)
```

2. 创建完表后添加

```sql
alter table test modify age varchar(20) unique
```

3. 删除唯一约束

```sql
alter table test drop index age
```

## 外键约束

- `foreign key`