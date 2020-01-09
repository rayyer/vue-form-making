## 子表单使用
#### 子表单使用场景：
子表单主要用于存放模块的表单结构，用于后期重复被其他表单引入。  
比如一个人的简历里包含基本信息（性别、姓名、出生年月）、住址信息（地址、邮编）、教育经历（多条记录）、工作经验，  
基本信息和住址信息属于单记录性质的，但可能会被其他表单引用，比如基本信息表、中文简历、英文简历、背调表都可以用到，可以做成`基本信息子表单` 和 `住址信息子表单`，然后在以上的表单中插入子表单组件，指向对应的子表单即可。  
还有一种复杂的，比如“教育经历”和“工作经验”可能会有多条，设计思路是组装成多记录的子表单。通过循环的形式就可以读出来。  

#### 代码引入：
```javascript
<fm-making-form
    ref="makingForm"
    upload
    preview
    generate-json
    generate-code
    :childTablesRemoteUrl="childTablesRemoteUrl"
    style="height:100%;"
    clearable>
```
#### 参数说明：
##### childTablesRemoteUrl
`childTablesRemoteUrl` 须是一个包含表单结构的Url,  
> e.x.   
> 参考`src/demo/Home.vue` 中的 `childTablesRemoteUrl: "http://ubody.guolei.com/api/forms"`
##### url返回格式要求如下：
```
{
  "data":[
    {
      "key":"表单的key",
      "title": "表单的标题"
    },
    {
      "key":"表单的key2",
      "title": "表单的标题2"
    }
    ……
  ],
}
```
> tips: 在表单设计中，建议每个表单key唯一，并且做为系统中的业务识别。


![](http://qiniu.guolei.me/WX20191127-145556.png)

