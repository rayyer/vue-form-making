<template>
  <div class="form-config-container">
    <el-form label-position="top">

      <el-form-item label="表单名称">
        <el-input v-model="data.title"></el-input>
      </el-form-item>

      <el-form-item label="系统标识">
        <el-input v-model="data.key"></el-input>
      </el-form-item>

      <el-form-item label="标签对齐方式">
        <el-radio-group v-model="data.labelPosition">
          <el-radio-button label="left">左对齐</el-radio-button>
          <el-radio-button label="right">右对齐</el-radio-button>
          <el-radio-button label="top">顶部对齐</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="表单字段宽度">
        <el-input-number v-model="data.labelWidth" :min="0" :max="200" :step="10"></el-input-number>
      </el-form-item>

      <el-form-item label="组件尺寸">
        <el-radio-group v-model="data.size">
          <el-radio-button label="medium">medium</el-radio-button>
          <el-radio-button label="small">small</el-radio-button>
          <el-radio-button label="mini">mini</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ['data'],
  mounted () {
    const key = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)
    if(this.data.title === '') this.data.title = 'Title_' + key
    if(this.data.key === '') this.data.key = 'Key_' + key
  }
}
</script>
