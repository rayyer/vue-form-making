基于 GavinZhuLei/vue-form-making 进行量身开发，感谢 [GavinZhuLei/vue-form-making](https://github.com/GavinZhuLei/vue-form-making)

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

# 规范化子表单结构说明
子表单分 `列表子表单` 和 `非列表子表单`
`列表子表单`： 子表单内部可能会有多条记录，需要添加和删除进行操作，比如居民既往史子表单，
`非列表子表单`： 子表单内部单独一个模块，无需增加删除，比如居民基本信息子表单包含姓名、年龄、生日
建议提交业务中，将`非列表的子表单`和父表单内容合并，因为不可增减的本来就一层，合并之后减少业务量。  
另外读取的时候，通过判断是否是`非列表`， 然后可从父表单还原对应的value

```json
# 默认子表单model格式
{
  ......
  "childTable_model1":[
    {"input_name_model":"疾病", "value_model":"高血压"},
    {"input_name_model":"家族史", "value_model":"高血压"},
  ],
  "childTable_model1":[
    {"name":"张三", "sex":"男"}
  ]
  ......
}
````

# form-making
基于Vue,ElementUI开发的一款表单设计器，提高表单开发效率的利器，让开发者从枯燥的表单代码编写中解放出来

工具地址：http://tools.xiaoyaoji.cn/form

![](https://user-gold-cdn.xitu.io/2018/9/27/1661a6cd60454273)

## 特性

* 可视化配置页面
* 提供栅格布局，并采用flex实现对齐
* 一键预览配置的效果
* 一键生成配置json数据
* 一键生成代码，立即可运行
* 提供自定义组件满足用户自定义需求
* 提供远端数据接口，方便用户需要异步获取数据加载
* 提供功能强大的高级组件
* 支持表单验证
* 快速获取表单数据

## 文档

* [快速使用](https://www.yuque.com/zhulei-sbpfz/ua9nar/mdgwki)
* [组件](https://www.yuque.com/zhulei-sbpfz/ua9nar/vtebqs)

## 高级字段使用

* [自定义扩展](https://github.com/GavinZhuLei/vue-form-making/blob/master/doc/blank.md "自定义扩展")
* [图片上传](https://github.com/GavinZhuLei/vue-form-making/blob/master/doc/imgupload.md "图片上传")

## 社区资料笔记

* [Vue.Draggable](https://note.youdao.com/share/?id=f525c8897d9d7f6648bc28d59f5d03f4&type=note#/) （by @[jianhunxia](https://github.com/jianhunxia) 提供)

* [jsonEditor、ace和clipboard](https://note.youdao.com/share/?id=4cb3b53c76cb9f5f733f171529f71501&type=note#/) （by @[jianhunxia](https://github.com/jianhunxia) 提供)

## 捐赠 

如果觉得还不错，请作者喝杯咖啡吧 ☺

![](https://user-gold-cdn.xitu.io/2018/10/28/166ba780bb01fef7?w=2304&h=1050&f=jpeg&s=197327)

## 开源协议

[LGPL](https://opensource.org/licenses/LGPL-3.0)

## 商业许可

开源版本遵循 LGPL 条款发布，如果您不能接受 LGPL，并且需要将该项目用于商业用途且不想保留版权信息（底部“Powered by GavinZhuLei”版权及链接），为保障您的合法权益，需购买作者的[商业授权](http://tools.xiaoyaoji.cn/form/#/price)