<template>
  <!-- <fm-making-form
    ref="makingForm"
    upload
    preview
    generate-json
    generate-code
    clearable
    :tableList="tableList"
    :loadData="jsonData"> -->
  <fm-making-form
    ref="makingForm"
    upload
    preview
    generate-json
    generate-code
    :tableList="tableList"
    clearable>
  </fm-making-form>
</template>

<script>

const formList = [
    {
      "id": 32,
      "form_id": 13,
      "name": "单行文本2",
      "type": "input",
      "options": {
        "width": "100%",
        "defaultValue": null,
        "required": false,
        "dataType": "string",
        "pattern": null,
        "placeholder": null,
        "disabled": false,
        "remoteFunc": "func_1562576523000_62589",
        "suffix":""
      },
      "icon": "icon-input",
      "key": "1562576523000_62589",
      "model": "input_1562576523000_62589",
      "cols": 12,
      "rules": [
        {
          "type": "string",
          "message": "单行文本2格式不正确"
        }
      ],
      "is_delete": 1
    },
    {
      "id": 33,
      "form_id": 13,
      "name": "单行文本1",
      "type": "input",
      "options": {
        "width": "100%",
        "defaultValue": null,
        "required": false,
        "dataType": "string",
        "pattern": null,
        "placeholder": null,
        "disabled": false,
        "remoteFunc": "func_1562576589000_46001",
        "suffix":""
      },
      "icon": "icon-input",
      "key": "1562576589000_46001",
      "model": "input_1562576589000_46001",
      "cols": 12,
      "rules": [
        {
          "type": "string",
          "message": "单行文本1格式不正确"
        }
      ],
      "is_delete": 1
    },
    {
      "id": 34,
      "form_id": 13,
      "name": "单行文本3",
      "type": "input",
      "options": {
        "width": "100%",
        "defaultValue": null,
        "required": false,
        "dataType": "string",
        "pattern": null,
        "placeholder": null,
        "disabled": false,
        "remoteFunc": "func_1562576567000_73306",
        "suffix":""
      },
      "icon": "icon-input",
      "key": "1562576567000_73306",
      "model": "input_1562576567000_73306",
      "cols": 12,
      "rules": [
        {
          "type": "string",
          "message": "单行文本3格式不正确"
        }
      ],
      "is_delete": 0
    },
    {
      "id": 35,
      "form_id": 13,
      "name": "单行文本4",
      "type": "input",
      "options": {
        "width": "100%",
        "defaultValue": null,
        "required": false,
        "dataType": "string",
        "pattern": null,
        "placeholder": null,
        "disabled": false,
        "remoteFunc": "func_1562576618000_36628",
        "suffix":""
      },
      "icon": "icon-input",
      "key": "1562576618000_36628",
      "model": "input_1562576618000_36628",
      "cols": 12,
      "rules": [
        {
          "type": "string",
          "message": "单行文本4格式不正确"
        }
      ],
      "is_delete": 0
    },
    {
      "id": 36,
      "form_id": 13,
      "name": "计数器",
      "type": "number",
      "options": {
        "width": null,
        "required": false,
        "defaultValue": 0,
        "min": 0,
        "max": 0,
        "step": 1,
        "disabled": false,
        "controlsPosition": null,
        "remoteFunc": "func_1562576639000_87448"
      },
      "icon": "icon-number",
      "key": "1562576639000_87448",
      "model": "number_1562576639000_87448",
      "cols": 12,
      "rules": [],
      "is_delete": 0
    },
    {
      "id": 37,
      "form_id": 13,
      "name": "多行文本",
      "type": "textarea",
      "options": {
        "width": "100%",
        "defaultValue": null,
        "required": false,
        "disabled": false,
        "pattern": null,
        "placeholder": null,
        "remoteFunc": "func_1562576644000_91614"
      },
      "icon": "icon-diy-com-textarea",
      "key": "1562576644000_91614",
      "model": "textarea_1562576644000_91614",
      "cols": 12,
      "rules": [],
      "is_delete": 0
    }
  ]

const config = {
    "title": '默认标题',
    "key":'default_key_20190808',
    "labelWidth": 80,
    "labelPosition": "left",
    "size": "small"
  }

import request from '../util/request.js'
export default {
  data () {
    return {
      visible: false,
      confirmLoading: false,
      jsonData: {},
      tableList: [
        {id: '123123',  title: "基本信息表15"},
        {id: 'adfa', title: "基本信息表16"}
      ] // 子表单列表
    }
  },
  created () {
    this.formatJson()
  },
  methods: {
    formatJson () {
      this.jsonData = Object.assign(
        {},
        // {'list': formList},
        {'list': formList.filter(item => item.is_delete!==1 )}, // 表单字段
        {'deleted': formList.filter(item => item.is_delete===1 )},  // 表单已删除字段
        {'config': config} // 表单配置项
      )
      // console.log(this.jsonData)
    }
  }
}
</script>
