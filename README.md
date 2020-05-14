基于 GavinZhuLei/vue-form-making 进行量身开发，感谢 [GavinZhuLei/vue-form-making](https://github.com/GavinZhuLei/vue-form-making)

# form-making
> 部分引自原作者说明

基于Vue,ElementUI开发的一款表单设计器，提高表单开发效率的利器，让开发者从枯燥的表单代码编写中解放出来

原作者的工具演示地址：http://tools.xiaoyaoji.cn/form

![](https://user-gold-cdn.xitu.io/2018/9/27/1661a6cd60454273)


## 文档

* [快速使用](https://www.yuque.com/zhulei-sbpfz/ua9nar/mdgwki)
* [组件](https://www.yuque.com/zhulei-sbpfz/ua9nar/vtebqs)
* [表单字段依赖关系](docs/fieldDepend.md)
* [子表单](docs/childForm.md)

## 更多功能演示代码参考：  
> `/src/demo/Home.vue`(表单设计时)    
> `/src/demo/Form.vue`(表单运行时)

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
`v2.3.3`
1. `feat:` 表单展示增加disable，可设置表单全局disable。

`v2.3.2`
1. `feat:` 字段增加隐藏属性，可以参与业务，只是针对用户不显示。
2. `feat:` 可清空指定字段或整个表单的值。

`v2.3.1`
1. `fix:` 更改组件文字“换行符”为“断行”
2. `fix:` 解决select复制数据没有深拷贝问题(合并原作者更新)
3. `feat:` 计数器增加最小值和最大值
4. `feat:` 单选框可取消选中
5. `chore:` 升级element-ui-v2.12

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