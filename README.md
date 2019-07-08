基于 GavinZhuLei/vue-form-making 进行量身开发，感谢 [GavinZhuLei/vue-form-making](https://github.com/GavinZhuLei/vue-form-making)

# 快速使用
> yarn add health-form-making

或  

> npm i health-form-making

# 基于作者之后新增的功能
1. 增加表单标题
2. 提交表单按钮，参考demo
3. 将原删格布局需要先规范删格结构，更改为每一个组件自带col删格属性（个人感觉，体验要比之前好些，更利于非研发人员使用）
4. 增加了字段的依赖属性，比如某些字段依赖于`性别=男`再显示，某些字段依赖于收入为 `0-100` 和 `1000-2000` 的人群进行显示
5. 增加初始化表单数据
6. 删除字段时针对特殊标识符进行处理：字段（前端传值）带有id的，则只进行is_delete的标识，不进行真实删除，便于表单数据追溯。

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