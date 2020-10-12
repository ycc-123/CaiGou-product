# 项目展示请看火蝶云BOSS小程序

## 项目小笔记

### 1.修改接口对应的key值value值不变
```
 //接口数据res.data.data
 var result = res.data.data.map(o=>{return{value:o.id,label:o.name}});
 console.log(result)

```

### 数组前面拼接一个数组
```
//arr 和 result 都是一个数组

[...arr,...result]

```