<template>
  <fm-generate-form
    :data="jsonData"
    :remote="remoteFuncs"
    :value="values"
    ref="generateForm">
  </fm-generate-form>
</template>

<script>
export default {
  data () {
    return {
      jsonData: {
  "list": [
    {
      "type": "input",
      "name": "单行文本",
      "icon": "icon-input",
      "cols": 12,
      "options": {
        "width": "100%",
        "defaultValue": "",
        "required": false,
        "dataType": "string",
        "pattern": "",
        "placeholder": "",
        "remoteFunc": "func_1561623027000_24735"
      },
      "key": "1561623027000_24735",
      "model": "input_1561623027000_24735",
      "rules": [
        {
          "type": "string",
          "message": "单行文本格式不正确"
        }
      ]
    },
    {
      "type": "textarea",
      "name": "多行文本",
      "icon": "icon-diy-com-textarea",
      "cols": 12,
      "options": {
        "width": "100%",
        "defaultValue": "",
        "required": false,
        "disabled": false,
        "pattern": "",
        "placeholder": "",
        "remoteFunc": "func_1561623029000_95127"
      },
      "key": "1561623029000_95127",
      "model": "textarea_1561623029000_95127",
      "rules": []
    },
    {
      "type": "input",
      "name": "单行文本",
      "icon": "icon-input",
      "cols": 12,
      "options": {
        "width": "100%",
        "defaultValue": "",
        "required": false,
        "dataType": "string",
        "pattern": "",
        "placeholder": "",
        "remoteFunc": "func_1561623032000_98125"
      },
      "key": "1561623032000_98125",
      "model": "input_1561623032000_98125",
      "rules": [
        {
          "type": "string",
          "message": "单行文本格式不正确"
        }
      ]
    },
    {
      "type": "radio",
      "name": "单选框组",
      "icon": "icon-radio-active",
      "cols": 12,
      "options": {
        "inline": false,
        "defaultValue": "",
        "showLabel": false,
        "options": [
          {
            "value": "选项1",
            "label": "选项1"
          },
          {
            "value": "选项2",
            "label": "选项2"
          },
          {
            "value": "选项3",
            "label": "选项3"
          }
        ],
        "required": false,
        "width": "",
        "remote": false,
        "remoteOptions": [],
        "props": {
          "value": "value",
          "label": "label"
        },
        "remoteFunc": "func_1561623035000_50587"
      },
      "key": "1561623035000_50587",
      "model": "radio_1561623035000_50587",
      "rules": []
    },
    {
      "type": "input",
      "name": "单行文本",
      "icon": "icon-input",
      "cols": 12,
      "options": {
        "width": "100%",
        "defaultValue": "",
        "required": false,
        "dataType": "string",
        "pattern": "",
        "placeholder": "",
        "remoteFunc": "func_1561623037000_32246"
      },
      "key": "1561623037000_32246",
      "model": "input_1561623037000_32246",
      "rules": [
        {
          "type": "string",
          "message": "单行文本格式不正确"
        }
      ]
    },
    {
      "type": "number",
      "name": "计数器",
      "icon": "icon-number",
      "cols": 12,
      "options": {
        "width": "",
        "required": false,
        "defaultValue": 0,
        "min": 0,
        "max": 0,
        "step": 1,
        "disabled": false,
        "controlsPosition": "",
        "remoteFunc": "func_1561623041000_57961"
      },
      "key": "1561623041000_57961",
      "model": "number_1561623041000_57961",
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
