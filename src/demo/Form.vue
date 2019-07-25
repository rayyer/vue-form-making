<template>
  <div>
    <fm-generate-form :data="jsonData" :remote="remoteFuncs" :value="editData" ref="generateForm" :dependChildTable="dependChildTable">

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
const jsonData = {
  "title": "",
  "list": [
    {
      "type": "blank",
      "name": "自定义",
      "icon": "icon-ic",
      "cols": 24,
      "options": {
        "defaultType": "Object",
        "remoteFunc": "func_1562222183000_12341"
      },
      "key": "1562222183000_12341",
      "model": "blank",
      "rules": []
    },
    {
      "type": "childTable",
      "name": "疾病史",
      "icon": "icon-grid-",
      "cols": 24,
      "options": {
        "defaultValue": [],
        "remoteFunc": "func_1563610030000_82402",
        "relatedTable": "1"
      },
      "key": "1563610030000_82402",
      "model": "childTable_1563610030000_82402",
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
      "type": "childTable",
      "name": "子表单2",
      "icon": "icon-grid-",
      "cols": 24,
      "options": {
        "defaultValue": [],
        "remoteFunc": "func_1563610030000_82402",
        "relatedTable": "1"
      },
      "key": "1563610030000_82402",
      "model": "childTable_1563610030011_82402",
      "rules": []
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
    }
  ],
  "config": {
    "labelWidth": 90,
    "labelPosition": "left",
    "size": "small"
  }
}

const dependChildTable = [
  {
    "list": [
      {
        "type": "radio",
        "name": "手术",
        "icon": "icon-radio-active",
        "cols": 6,
        "options": {
          "inline": true,
          "defaultValue": "",
          "showLabel": false,
          "options": [
            {
              "value": "无"
            },
            {
              "value": "有"
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
          "remoteFunc": "func_1563611702000_87397",
          "disabled": false
        },
        "key": "1563611702000_87397",
        "model": "radio_1563611702000_87397",
        "rules": []
      },
      {
        "type": "input",
        "name": "名称",
        "icon": "icon-input",
        "cols": 6,
        "options": {
          "width": "100%",
          "defaultValue": "",
          "required": false,
          "dataType": "string",
          "pattern": "",
          "placeholder": "",
          "disabled": false,
          "suffix": "",
          "remoteFunc": "func_1563611759000_22446",
          "dependents": [
            [
              "radio_1563611702000_87397",
              "有"
            ]
          ]
        },
        "key": "1563611759000_22446",
        "model": "input_1563611759000_22446",
        "rules": [
          {
            "type": "string",
            "message": "名称格式不正确"
          }
        ]
      },
      {
        "type": "time",
        "name": "时间",
        "icon": "icon-time",
        "cols": 12,
        "options": {
          "defaultValue": "",
          "readonly": false,
          "disabled": false,
          "editable": true,
          "clearable": true,
          "placeholder": "",
          "startPlaceholder": "",
          "endPlaceholder": "",
          "isRange": false,
          "arrowControl": true,
          "format": "HH:mm:ss",
          "required": false,
          "width": "",
          "remoteFunc": "func_1563611794000_70235",
          "dependents": [
            [
              "radio_1563611702000_87397",
              "有"
            ]
          ]
        },
        "key": "1563611794000_70235",
        "model": "time_1563611794000_70235",
        "rules": []
      }
    ],
    "config": {
      "title": "Title_1563611683000_42625",
      "key": "Key_1563611683000_42625",
      "labelWidth": 50,
      "labelPosition": "left",
      "size": "small"
    },
    "title": "Title_1563611683000_42625",
    "key": "Key_1563611683000_42625",
    "id": "1"
  }
]

export default {
  data () {
    return {
      jsonData,
      editData: {},
      remoteFuncs: {},
      dependChildTable
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
