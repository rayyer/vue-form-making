<template>
  <div>
    <fm-generate-form :data="jsonData" :remote="remoteFuncs" :value="editData" ref="generateForm">

        <template slot="blank" slot-scope="scope">
          <!-- 自定义 -->
          宽度：<el-input v-model="scope.model.blank.width" style="width: 100px"></el-input>
          高度：<el-input v-model="scope.model.blank.height" style="width: 100px"></el-input>
          <!-- 通过 v-model="scope.model.blank" 绑定数据 -->
        </template>

      </fm-generate-form>
      <el-button type="primary" @click="handleSubmit">提交</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      jsonData: {"title":"","list":[{"type":"blank","name":"自定义","icon":"icon-ic","cols":24,"options":{"defaultType":"Object","remoteFunc":"func_1562222183000_12341"},"key":"1562222183000_12341","model":"blank","rules":[]},{"type":"input","name":"单行文本","icon":"icon-input","cols":12,"options":{"width":"100%","defaultValue":"","required":false,"dataType":"string","pattern":"","placeholder":"","remoteFunc":"func_1561623027000_24735"},"key":"1561623027000_24735","model":"input_1561623027000_24735","rules":[{"type":"string","message":"单行文本格式不正确"}]},{"type":"textarea","name":"多行文本","icon":"icon-diy-com-textarea","cols":12,"options":{"width":"100%","defaultValue":"","required":false,"disabled":false,"pattern":"","placeholder":"","remoteFunc":"func_1561623029000_95127"},"key":"1561623029000_95127","model":"textarea_1561623029000_95127","rules":[]},{"type":"input","name":"单行文本","icon":"icon-input","cols":12,"options":{"width":"100%","defaultValue":"","required":false,"dataType":"string","pattern":"","placeholder":"","remoteFunc":"func_1561623032000_98125"},"key":"1561623032000_98125","model":"input_1561623032000_98125","rules":[{"type":"string","message":"单行文本格式不正确"}]},{"type":"radio","name":"单选框组","icon":"icon-radio-active","cols":12,"options":{"inline":false,"defaultValue":"","showLabel":false,"options":[{"value":"选项1","label":"选项1"},{"value":"选项2","label":"选项2"},{"value":"选项3","label":"选项3"}],"required":false,"width":"","remote":false,"remoteOptions":[],"props":{"value":"value","label":"label"},"remoteFunc":"func_1561623035000_50587"},"key":"1561623035000_50587","model":"radio_1561623035000_50587","rules":[]},{"type":"input","name":"单行文本","icon":"icon-input","cols":12,"options":{"width":"100%","defaultValue":"","required":false,"dataType":"string","pattern":"","placeholder":"","remoteFunc":"func_1561623037000_32246"},"key":"1561623037000_32246","model":"input_1561623037000_32246","rules":[{"type":"string","message":"单行文本格式不正确"}]},{"type":"number","name":"计数器","icon":"icon-number","cols":12,"options":{"width":"","required":false,"defaultValue":0,"min":0,"max":0,"step":1,"disabled":false,"controlsPosition":"","remoteFunc":"func_1561623041000_57961"},"key":"1561623041000_57961","model":"number_1561623041000_57961","rules":[]}],"config":{"labelWidth":90,"labelPosition":"left","size":"small"}},
          editData: {},
          remoteFuncs: {
          }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.generateForm.getData().then(data => {
        console.log(data)
        // 数据校验成功
        // data 为获取的表单数据
      }).catch(e => {
        // 数据校验失败
      })
    },
    handleReset () {
      this.$refs.generateForm.reset()
    },
  }
}
</script>
