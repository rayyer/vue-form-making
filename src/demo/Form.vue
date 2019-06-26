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
      "type": "grid",
      "name": "栅格布局",
      "icon": "icon-grid-",
      "columns": [
        {
          "span": 8,
          "list": []
        },
        {
          "span": 8,
          "list": [
            {
              "type": "blank",
              "name": "标题",
              "icon": "icon-ic",
              "options": {
                "defaultType": "String",
                "remoteFunc": "func_1561363869000_92637"
              },
              "key": "1561363869000_92637",
              "model": "blank_1561363869000_92637",
              "rules": []
            }
          ]
        },
        {
          "span": 8,
          "list": [
            {
              "type": "blank",
              "name": "评判",
              "icon": "icon-ic",
              "options": {
                "defaultType": "String",
                "remoteFunc": "func_1561363884000_80894"
              },
              "key": "1561363884000_80894",
              "model": "blank_1561363884000_80894",
              "rules": []
            }
          ]
        },
        {
          "span": 8,
          "list": [
            {
              "type": "blank",
              "name": "范围",
              "icon": "icon-ic",
              "options": {
                "defaultType": "String",
                "remoteFunc": "func_1561363894000_58278"
              },
              "key": "1561363894000_58278",
              "model": "blank_1561363894000_58278",
              "rules": []
            }
          ]
        }
      ],
      "options": {
        "gutter": 36,
        "justify": "end",
        "align": "middle",
        "remoteFunc": "func_1561363845000_83509"
      },
      "key": "1561363845000_83509",
      "model": "grid_1561363845000_83509",
      "rules": []
    },
    {
      "type": "grid",
      "name": "栅格布局",
      "icon": "icon-grid-",
      "columns": [
        {
          "span": 8,
          "list": [
            {
              "type": "blank",
              "name": "高血压",
              "icon": "icon-ic",
              "options": {
                "defaultType": "String",
                "remoteFunc": "func_1561364239000_52046"
              },
              "key": "1561364239000_52046",
              "model": "blank_1561364239000_52046",
              "rules": []
            }
          ]
        },
        {
          "span": 8,
          "list": [
            {
              "type": "input",
              "name": "11订单",
              "icon": "icon-input",
              "options": {
                "width": "100%",
                "defaultValue": "",
                "required": false,
                "dataType": "string",
                "pattern": "",
                "placeholder": "",
                "remoteFunc": "func_1561364223000_6671"
              },
              "key": "1561364223000_6671",
              "model": "input_1561364223000_6671",
              "rules": [
                {
                  "type": "string",
                  "message": "11订单格式不正确"
                }
              ]
            }
          ]
        },
        {
          "span": 8,
          "list": [
            {
              "type": "input",
              "name": "",
              "icon": "icon-input",
              "options": {
                "width": "100%",
                "defaultValue": "",
                "required": false,
                "dataType": "string",
                "pattern": "",
                "placeholder": "",
                "remoteFunc": "func_1561364249000_51440"
              },
              "key": "1561364249000_51440",
              "model": "input_1561364249000_51440",
              "rules": [
                {
                  "type": "string",
                  "message": "格式不正确"
                }
              ]
            }
          ]
        },
        {
          "span": 8,
          "list": [
            {
              "type": "input",
              "name": "",
              "icon": "icon-input",
              "options": {
                "width": "100%",
                "defaultValue": "",
                "required": false,
                "dataType": "string",
                "pattern": "",
                "placeholder": "",
                "remoteFunc": "func_1561364258000_1470"
              },
              "key": "1561364258000_1470",
              "model": "input_1561364258000_1470",
              "rules": [
                {
                  "type": "string",
                  "message": "格式不正确"
                }
              ]
            }
          ]
        }
      ],
      "options": {
        "gutter": 0,
        "justify": "center",
        "align": "top",
        "remoteFunc": "func_1561364201000_12486"
      },
      "key": "1561364201000_12486",
      "model": "grid_1561364201000_12486",
      "rules": []
    },
    {
      "type": "grid",
      "name": "栅格布局",
      "icon": "icon-grid-",
      "columns": [
        {
          "span": 8,
          "list": [
            {
              "type": "blank",
              "name": "糖尿病",
              "icon": "icon-ic",
              "options": {
                "defaultType": "String",
                "remoteFunc": "func_1561366187000_43394"
              },
              "key": "1561366187000_43394",
              "model": "blank_1561366187000_43394",
              "rules": []
            }
          ]
        },
        {
          "span": 8,
          "list": [
            {
              "type": "input",
              "name": "",
              "icon": "icon-input",
              "options": {
                "width": "100%",
                "defaultValue": "",
                "required": false,
                "dataType": "string",
                "pattern": "",
                "placeholder": "",
                "remoteFunc": "func_1561366195000_69922"
              },
              "key": "1561366195000_69922",
              "model": "input_1561366195000_69922",
              "rules": [
                {
                  "type": "string",
                  "message": "格式不正确"
                }
              ]
            }
          ]
        },
        {
          "span": 8,
          "list": [
            {
              "type": "input",
              "name": "",
              "icon": "icon-input",
              "options": {
                "width": "100%",
                "defaultValue": "",
                "required": false,
                "dataType": "string",
                "pattern": "",
                "placeholder": "",
                "remoteFunc": "func_1561366198000_33663"
              },
              "key": "1561366198000_33663",
              "model": "input_1561366198000_33663",
              "rules": [
                {
                  "type": "string",
                  "message": "格式不正确"
                }
              ]
            }
          ]
        },
        {
          "span": 8,
          "list": [
            {
              "type": "input",
              "name": "",
              "icon": "icon-input",
              "options": {
                "width": "100%",
                "defaultValue": "",
                "required": false,
                "dataType": "string",
                "pattern": "",
                "placeholder": "",
                "remoteFunc": "func_1561366201000_62124"
              },
              "key": "1561366201000_62124",
              "model": "input_1561366201000_62124",
              "rules": [
                {
                  "type": "string",
                  "message": "格式不正确"
                }
              ]
            }
          ]
        }
      ],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top",
        "remoteFunc": "func_1561366161000_25928"
      },
      "key": "1561366161000_25928",
      "model": "grid_1561366161000_25928",
      "rules": []
    }
  ],
  "config": {
    "labelWidth": 100,
    "labelPosition": "left",
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
