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
      <el-button type="primary" @click="handleReset">重置</el-button>
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
        "defaultValue": [''],
        "remoteFunc": "func_1563610030000_82402",
        "relatedTable": "table_input_1"
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
        "defaultValue": [''],
        "remoteFunc": "func_1563610030000_82402",
        "relatedTable": "table_input_2",
        "islists": true,
        "showName": false
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
    "size": "small",
    "key": "Key_1565935807000_89360"
  }
}

const dependChildTable = {
  "table_input_1": {
    "list": [
      {
        "name": "家族史",
        "type": "radio",
        "options": {
          "inline": true,
          "defaultValue": null,
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
          "width": null,
          "remote": false,
          "remoteOptions": [],
          "props": {
            "value": "value",
            "label": "label"
          },
          "remoteFunc": "func_1564384522000_9914",
          "disabled": false
        },
        "icon": "icon-radio-active",
        "key": "1564384522000_9914",
        "model": "radio_1564384522000_9914",
        "cols": 24,
        "rules": [],
        "is_delete": 0,
        "sort": 0
      },
      {
        "name": "成员",
        "type": "select",
        "options": {
          "defaultValue": "父亲",
          "multiple": false,
          "disabled": false,
          "clearable": false,
          "placeholder": "请选择",
          "required": false,
          "showLabel": false,
          "width": null,
          "options": [
            {
              "value": "父亲"
            },
            {
              "value": "母亲"
            },
            {
              "value": "兄弟姐妹"
            },
            {
              "value": "子女"
            }
          ],
          "remote": false,
          "filterable": false,
          "remoteOptions": [],
          "props": {
            "value": "value",
            "label": "label"
          },
          "remoteFunc": "func_1564384598000_85312",
          "dependents": [
            [
              "radio_1564384522000_9914",
              "有"
            ]
          ]
        },
        "icon": "icon-select",
        "key": "1564384598000_85312",
        "model": "select_1564384598000_85312",
        "cols": 24,
        "rules": [],
        "is_delete": 0,
        "sort": 1
      },
      {
        "name": "疾病",
        "type": "select",
        "options": {
          "defaultValue": [],
          "multiple": true,
          "disabled": false,
          "clearable": false,
          "placeholder": "请选择所患疾病",
          "required": false,
          "showLabel": false,
          "width": null,
          "options": [
            {
              "value": "无"
            },
            {
              "value": "高血压"
            },
            {
              "value": "糖尿病"
            },
            {
              "value": "冠心病"
            },
            {
              "value": "慢性阻塞性肺病"
            },
            {
              "value": "恶性肿瘤"
            },
            {
              "value": "脑卒中"
            },
            {
              "value": "严重精神障碍"
            },
            {
              "value": "肺结核"
            },
            {
              "value": "肝炎"
            },
            {
              "value": "先天畸形"
            },
            {
              "value": "其他"
            }
          ],
          "remote": false,
          "filterable": false,
          "remoteOptions": [],
          "props": {
            "value": "value",
            "label": "label"
          },
          "remoteFunc": "func_1564384722000_46717",
          "dependents": [
            [
              "radio_1564384522000_9914",
              "有"
            ]
          ]
        },
        "icon": "icon-select",
        "key": "1564384722000_46717",
        "model": "select_1564384722000_46717",
        "cols": 24,
        "rules": [],
        "is_delete": 0,
        "sort": 2
      }
    ],
    "config": {
      "title": "家族史",
      "key": "Key_1564384514000_80645",
      "labelWidth": 90,
      "labelPosition": "left",
      "size": "small"
    },
    "title": "Title_1563611683000_42625",
    "key": "Key_1563611683000_42625",
    "id": "2"
  },
  "table_input_2":{
    "list": [
      {
        "name": "无name的子表单",
        "type": "radio",
        "options": {
          "inline": true,
          "defaultValue": null,
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
          "width": null,
          "remote": false,
          "remoteOptions": [],
          "props": {
            "value": "value",
            "label": "label"
          },
          "remoteFunc": "func_1564384522000_9914",
          "disabled": false
        },
        "icon": "icon-radio-active",
        "key": "1564384522000_9914",
        "model": "radio_1564384522000_9914",
        "cols": 6,
        "rules": [],
        "is_delete": 0,
        "sort": 0
      },
      {
        "name": "成员",
        "type": "select",
        "options": {
          "defaultValue": "父亲",
          "multiple": false,
          "disabled": false,
          "clearable": false,
          "placeholder": "请选择",
          "required": false,
          "showLabel": false,
          "width": null,
          "options": [
            {
              "value": "父亲"
            },
            {
              "value": "母亲"
            },
            {
              "value": "兄弟姐妹"
            },
            {
              "value": "子女"
            }
          ],
          "remote": false,
          "filterable": false,
          "remoteOptions": [],
          "props": {
            "value": "value",
            "label": "label"
          },
          "remoteFunc": "func_1564384598000_85312",
          "dependents": [
            [
              "radio_1564384522000_9914",
              "有"
            ]
          ]
        },
        "icon": "icon-select",
        "key": "1564384598000_85312",
        "model": "select_1564384598000_85312",
        "cols": 6,
        "rules": [],
        "is_delete": 0,
        "sort": 1
      },
      {
        "name": "疾病",
        "type": "select",
        "options": {
          "defaultValue": [],
          "multiple": true,
          "disabled": false,
          "clearable": false,
          "placeholder": "请选择所患疾病",
          "required": false,
          "showLabel": false,
          "width": null,
          "options": [
            {
              "value": "无"
            },
            {
              "value": "高血压"
            },
            {
              "value": "糖尿病"
            },
            {
              "value": "冠心病"
            },
            {
              "value": "慢性阻塞性肺病"
            },
            {
              "value": "恶性肿瘤"
            },
            {
              "value": "脑卒中"
            },
            {
              "value": "严重精神障碍"
            },
            {
              "value": "肺结核"
            },
            {
              "value": "肝炎"
            },
            {
              "value": "先天畸形"
            },
            {
              "value": "其他"
            }
          ],
          "remote": false,
          "filterable": false,
          "remoteOptions": [],
          "props": {
            "value": "value",
            "label": "label"
          },
          "remoteFunc": "func_1564384722000_46717",
          "dependents": [
            [
              "radio_1564384522000_9914",
              "有"
            ]
          ]
        },
        "icon": "icon-select",
        "key": "1564384722000_46717",
        "model": "select_1564384722000_46717",
        "cols": 6,
        "rules": [],
        "is_delete": 0,
        "sort": 2
      }
    ],
    "config": {
      "title": "家族史",
      "key": "Key_1564384514000_80645",
      "labelWidth": 90,
      "labelPosition": "left",
      "size": "small"
    },
    "title": "Title_1563611683000_42625",
    "key": "Key_1563611683000_42625",
    "id": "2"
  }
}

export default {
  data () {
    return {
      jsonData,
      editData: {
        "childTable_1563610030011_82402": [
          // {"radio_1564384522000_9914": '有', "select_1564384598000_85312": '父亲',"select_1564384722000_46717": ['高血压']},
          // {"radio_1564384522000_9914": '有', "select_1564384598000_85312": '母亲',"select_1564384722000_46717": ['糖尿病']}
        ]
      },
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
      // this.$refs.generateForm.reset() // 为空则全部清空
      this.$refs.generateForm.reset('childTable_1563610030000_82402')
    },
  }
}
</script>
