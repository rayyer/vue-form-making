<template>
  <fm-generate-form
    :data="jsonData"
    :remote="remoteFuncs"
    :value="values"
    ref="generateForm">

    <template v-slot:blank="scope">
              宽度：<el-input v-model="scope.model.blank.width" style="width: 100px"></el-input>
              高度：<el-input v-model="scope.model.blank.height" style="width: 100px"></el-input>
            </template>
  </fm-generate-form>
</template>

<script>
export default {
  data () {
    return {
      jsonData: {
        "list": [
    {
      "type": "blank",
      "name": "自定义",
      "icon": "icon-ic",
      "options": {
        "defaultType": "String",
        "remoteFunc": "func_1561356971000_97592"
      },
      "key": "1561356971000_97592",
      "model": "blank",
      "rules": []
    }
  ],
  "config": {
    "labelWidth": 100,
    "labelPosition": "top",
    "size": "small"
  }
      },
          editData: {},
          remoteFuncs: {
            
          }
    }
  }
}
</script>
