基于 GavinZhuLei/vue-form-making 进行量身开发，感谢 [GavinZhuLei/vue-form-making](https://github.com/GavinZhuLei/vue-form-making)

# form-making
> 部分引自原作者说明

基于Vue,ElementUI开发的一款表单设计器，提高表单开发效率的利器，让开发者从枯燥的表单代码编写中解放出来

原作者的工具演示地址：http://tools.xiaoyaoji.cn/form

![](https://user-gold-cdn.xitu.io/2018/9/27/1661a6cd60454273)


## 文档

* [快速使用](https://www.yuque.com/zhulei-sbpfz/ua9nar/mdgwki)
* [组件](https://www.yuque.com/zhulei-sbpfz/ua9nar/vtebqs)

## 特性

* 可视化配置页面
* 一键预览配置的效果
* 一键生成配置json数据
* 支持表单验证
* 快速获取表单数据
* 提供子表单组件，方便已设计表单的复用，避免表单相同内容的重复设计
* 灵活的删格化配置，灵活设置一个表单元素的占用宽度
* 结构化的表单json格式，分为配置对象和表单数组，表单数组由各个表单字段对象组成，无耦合
* 表单内各个字段之间存在依赖属性，比如某些字段需要根据选择的性别来展示

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


## 更多功能演示代码参考：  
> `/src/demo/Home.vue`(表单设计时)，  
> `/src/demo/Form.vue`(表单运行时)

# 快速使用
> yarn add health-form-making

或  

> npm i health-form-making

# 基于作者之后新增的功能
1. 增加表单标题和表单key
2. 重构原删格结构，删格方式与字段关联，而非采用原单独定义的形式
3. 增加了字段的依赖属性，点某个选项的时候显示/隐藏指定字段。
4. 对字段的删除进行特殊处理（对新加字段的删除和原有字段删除进行区别）
5. 增加分割线、纯文字、图片展示

# 已知bug
1. 表单嵌套，父表单顶部对齐，子表单左对齐的情况下，会出现子表单错误的情况，相反正常，可反过来考虑，顶部对齐使用子表单，父表单采用左对齐

# 版本记录
`v2.3.1`
1. 更改组件文字“换行符”为“断行”
2. 解决select复制数据没有深拷贝问题(合并原作者更新)
3. 计数器增加最小值和最大值

## 社区资料笔记

* [Vue.Draggable](https://note.youdao.com/share/?id=f525c8897d9d7f6648bc28d59f5d03f4&type=note#/) （by @[jianhunxia](https://github.com/jianhunxia) 提供)

* [jsonEditor、ace和clipboard](https://note.youdao.com/share/?id=4cb3b53c76cb9f5f733f171529f71501&type=note#/) （by @[jianhunxia](https://github.com/jianhunxia) 提供)

## 捐赠 

如果觉得还不错，可以支持下原作者 ☺

![](https://user-gold-cdn.xitu.io/2018/10/28/166ba780bb01fef7?w=2304&h=1050&f=jpeg&s=197327)

## 开源协议

[LGPL](https://opensource.org/licenses/LGPL-3.0)

## 商业许可

开源版本遵循 LGPL 条款发布，如果您不能接受 LGPL，并且需要将该项目用于商业用途且不想保留版权信息（底部“Powered by GavinZhuLei”版权及链接），为保障您的合法权益，需购买作者的[商业授权](http://tools.xiaoyaoji.cn/form/#/price)