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
        "relatedTable": "2"
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
        "type": "select",
        "name": "既往史",
        "icon": "icon-select",
        "cols": 24,
        "options": {
          "defaultValue": "",
          "multiple": false,
          "disabled": false,
          "clearable": true,
          "placeholder": "请选择既往史",
          "required": false,
          "showLabel": false,
          "width": "",
          "options": [
            {
              "value": "疾病"
            },
            {
              "value": "手术"
            },
            {
              "value": "外伤"
            },
            {
              "value": "输血"
            }
          ],
          "remote": false,
          "filterable": false,
          "remoteOptions": [],
          "props": {
            "value": "value",
            "label": "label"
          },
          "remoteFunc": "func_1564366641000_55903"
        },
        "key": "1564366641000_55903",
        "model": "select_1564366641000_55903",
        "rules": []
      },
      {
        "type": "select",
        "name": "疾病",
        "icon": "icon-select",
        "cols": 12,
        "options": {
          "defaultValue": "",
          "multiple": false,
          "disabled": false,
          "clearable": true,
          "placeholder": "请选择所患疾病",
          "required": false,
          "showLabel": false,
          "width": "",
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
              "value": "其他法定传染病"
            }
          ],
          "remote": false,
          "filterable": false,
          "remoteOptions": [],
          "props": {
            "value": "value",
            "label": "label"
          },
          "remoteFunc": "func_1564366343000_72254",
          "dependents": [
            [
              "select_1564366641000_55903",
              "疾病"
            ]
          ]
        },
        "key": "1564366343000_72254",
        "model": "select_1564366343000_72254",
        "rules": []
      },
      {
        "type": "date",
        "name": "确诊时间",
        "icon": "icon-date",
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
          "type": "date",
          "format": "yyyy-MM-dd",
          "timestamp": false,
          "required": false,
          "width": "",
          "remoteFunc": "func_1564366777000_91330",
          "dependents": [
            [
              "select_1564366641000_55903",
              "疾病"
            ]
          ]
        },
        "key": "1564366777000_91330",
        "model": "date_1564366777000_91330",
        "rules": []
      },
      {
        "type": "radio",
        "name": "手术",
        "icon": "icon-radio-active",
        "cols": 12,
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
          "remoteFunc": "func_1564366952000_17057",
          "disabled": false,
          "dependents": [
            [
              "select_1564366641000_55903",
              "手术"
            ]
          ]
        },
        "key": "1564366952000_17057",
        "model": "radio_1564366952000_17057",
        "rules": []
      },
      {
        "type": "input",
        "name": "名称",
        "icon": "icon-input",
        "cols": 12,
        "options": {
          "width": "100%",
          "defaultValue": "",
          "required": false,
          "dataType": "string",
          "pattern": "",
          "placeholder": "",
          "disabled": false,
          "suffix": "",
          "remoteFunc": "func_1564367047000_68069",
          "dependents": [
            [
              "radio_1564366952000_17057",
              "有"
            ]
          ]
        },
        "key": "1564367047000_68069",
        "model": "input_1564367047000_68069",
        "rules": [
          {
            "type": "string",
            "message": "名称格式不正确"
          }
        ]
      },
      {
        "type": "date",
        "name": "时间",
        "icon": "icon-date",
        "cols": 18,
        "options": {
          "defaultValue": "",
          "readonly": false,
          "disabled": false,
          "editable": true,
          "clearable": true,
          "placeholder": "",
          "startPlaceholder": "",
          "endPlaceholder": "",
          "type": "date",
          "format": "yyyy-MM-dd",
          "timestamp": false,
          "required": false,
          "width": "",
          "remoteFunc": "func_1564367141000_76963",
          "dependents": [
            [
              "radio_1564366952000_17057",
              "有"
            ]
          ]
        },
        "key": "1564367141000_76963",
        "model": "date_1564367141000_76963",
        "rules": []
      },
      {
        "type": "radio",
        "name": "外伤",
        "icon": "icon-radio-active",
        "cols": 12,
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
          "remoteFunc": "func_1564367404000_10365",
          "disabled": false,
          "dependents": [
            [
              "select_1564366641000_55903",
              "外伤"
            ]
          ]
        },
        "key": "1564367404000_10365",
        "model": "radio_1564367404000_10365",
        "rules": []
      },
      {
        "type": "input",
        "name": "名称",
        "icon": "icon-input",
        "cols": 12,
        "options": {
          "width": "100%",
          "defaultValue": "",
          "required": false,
          "dataType": "string",
          "pattern": "",
          "placeholder": "",
          "disabled": false,
          "suffix": "",
          "remoteFunc": "func_1564367432000_22185",
          "dependents": [
            [
              "radio_1564367404000_10365",
              "有"
            ]
          ]
        },
        "key": "1564367432000_22185",
        "model": "input_1564367432000_22185",
        "rules": [
          {
            "type": "string",
            "message": "名称格式不正确"
          }
        ]
      },
      {
        "type": "date",
        "name": "时间",
        "icon": "icon-date",
        "cols": 18,
        "options": {
          "defaultValue": "",
          "readonly": false,
          "disabled": false,
          "editable": true,
          "clearable": true,
          "placeholder": "",
          "startPlaceholder": "",
          "endPlaceholder": "",
          "type": "date",
          "format": "yyyy-MM-dd",
          "timestamp": false,
          "required": false,
          "width": "",
          "remoteFunc": "func_1564367445000_90053",
          "dependents": [
            [
              "radio_1564367404000_10365",
              "有"
            ]
          ]
        },
        "key": "1564367445000_90053",
        "model": "date_1564367445000_90053",
        "rules": []
      },
      {
        "type": "radio",
        "name": "输血",
        "icon": "icon-radio-active",
        "cols": 12,
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
          "remoteFunc": "func_1564367635000_33034",
          "disabled": false,
          "dependents": [
            [
              "select_1564366641000_55903",
              "输血"
            ]
          ]
        },
        "key": "1564367635000_33034",
        "model": "radio_1564367635000_33034",
        "rules": []
      },
      {
        "type": "input",
        "name": "原因",
        "icon": "icon-input",
        "cols": 12,
        "options": {
          "width": "100%",
          "defaultValue": "",
          "required": false,
          "dataType": "string",
          "pattern": "",
          "placeholder": "",
          "disabled": false,
          "suffix": "",
          "remoteFunc": "func_1564367648000_15514",
          "dependents": [
            [
              "radio_1564367635000_33034",
              "有"
            ]
          ]
        },
        "key": "1564367648000_15514",
        "model": "input_1564367648000_15514",
        "rules": [
          {
            "type": "string",
            "message": "原因格式不正确"
          }
        ]
      },
      {
        "type": "date",
        "name": "时间",
        "icon": "icon-date",
        "cols": 18,
        "options": {
          "defaultValue": "",
          "readonly": false,
          "disabled": false,
          "editable": true,
          "clearable": true,
          "placeholder": "",
          "startPlaceholder": "",
          "endPlaceholder": "",
          "type": "date",
          "format": "yyyy-MM-dd",
          "timestamp": false,
          "required": false,
          "width": "",
          "remoteFunc": "func_1564367665000_50718",
          "dependents": [
            [
              "radio_1564367635000_33034",
              "有"
            ]
          ]
        },
        "key": "1564367665000_50718",
        "model": "date_1564367665000_50718",
        "rules": []
      }
    ],
    "config": {
      "title": "既往史子表单",
      "key": "Key_1564366019000_60954",
      "labelWidth": 90,
      "labelPosition": "left",
      "size": "small"
    },
    "title": "Title_1563611683000_42625",
    "key": "Key_1563611683000_42625",
    "id": "1"
  },
  {
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
      "name": '成员',
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
      "name": '疾病',
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
