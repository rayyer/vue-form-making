<template>
  <el-container class="fm2-container">
    <el-main class="fm2-main">
      <el-container>
        <el-aside width="210px">
          <div class="components-list">
            <template v-if="basicFields.length">
              <div class="widget-cate">基础字段</div>
              <draggable tag="ul" :list="basicComponents" 
                v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
                @end="handleMoveEnd"
                @start="handleMoveStart"
                :move="handleMove"
              >
                
                <li v-if="basicFields.indexOf(item.type)>=0" class="form-edit-widget-label" :class="{'no-put': item.type == 'divider'}" v-for="(item, index) in basicComponents" :key="index">
                  <a>
                    <i class="icon iconfont" :class="item.icon"></i>
                    <span>{{item.name}}</span>
                  </a>
                </li>
              </draggable>
            </template>
            
            <template v-if="advanceFields.length">
              <div class="widget-cate">高级字段</div>
              <draggable tag="ul" :list="advanceComponents" 
                v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
                @end="handleMoveEnd"
                @start="handleMoveStart"
                :move="handleMove"
              >
                
                <li v-if="advanceFields.indexOf(item.type) >= 0" class="form-edit-widget-label" :class="{'no-put': item.type == 'table'}" v-for="(item, index) in advanceComponents" :key="index">
                  <a>
                    <i class="icon iconfont" :class="item.icon"></i>
                    <span>{{item.name}}</span>
                  </a>
                </li>
              </draggable>
            </template>

            
            <template v-if="layoutFields.length">
              <div class="widget-cate">布局字段</div>
              <draggable tag="ul" :list="layoutComponents" 
                v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
                @end="handleMoveEnd"
                @start="handleMoveStart"
                :move="handleMove"
              >
                
                <li v-if="layoutFields.indexOf(item.type) >=0" class="form-edit-widget-label no-put" v-for="(item, index) in layoutComponents" :key="index">
                  <a>
                    <i class="icon iconfont" :class="item.icon"></i>
                    <span>{{item.name}}</span>
                  </a>
                </li>
              </draggable>
            </template>
            
          </div>
          
        </el-aside>
        <el-container class="center-container" direction="vertical">
          <el-header class="btn-bar" style="height: 45px;">
            <slot name="action">
            </slot>
            <el-button v-if="upload" type="text" size="medium" icon="el-icon-upload2" @click="handleUpload">导入JSON</el-button>
            <el-button v-if="clearable" type="text" size="medium" icon="el-icon-delete" @click="handleClear">清空</el-button>
            <el-button v-if="preview" type="text" size="medium" icon="el-icon-view" @click="handlePreview">预览</el-button>
            <el-button v-if="generateJson" type="text" size="medium" icon="el-icon-tickets" @click="handleGenerateJson">生成JSON</el-button>
            <el-button v-if="generateCode" type="text" size="medium" icon="el-icon-document" @click="handleGenerateCode">生成代码</el-button>
          </el-header>
          <el-main :class="{'widget-empty': widgetForm.list.length == 0}">
            <widget-form v-if="!resetJson"  ref="widgetForm" :data="widgetForm" :select.sync="widgetFormSelect"></widget-form>
          </el-main>
        </el-container>
        
        <el-aside class="widget-config-container" style="width:315px">
          <el-container>
            <el-header height="45px">
              <div class="config-tab" :class="{active: configTab=='widget'}" @click="handleConfigSelect('widget')">字段属性</div>
              <div class="config-tab" :class="{active: configTab=='form'}" @click="handleConfigSelect('form')">表单属性</div>
            </el-header>
            <el-main class="config-content">
              <widget-config v-show="configTab=='widget'" :data="widgetFormSelect" :widgetFormList="widgetForm.list" :tableList="tableList"></widget-config>
              <form-config v-show="configTab=='form'" :data="widgetForm.config"></form-config>
            </el-main>
          </el-container>
          
        </el-aside>

        <cus-dialog
          :visible="previewVisible"
          @on-close="previewVisible = false"
          ref="widgetPreview"
          width="1000px"
          form
        >
          <generate-form insite="true" @on-change="handleDataChange" v-if="previewVisible" :data="widgetForm" :value="widgetModels" :remote="remoteFuncs" ref="generateForm">

            <template v-slot:blank="scope">
              宽度：<el-input v-model="scope.model.blank.width" style="width: 100px"></el-input>
              高度：<el-input v-model="scope.model.blank.height" style="width: 100px"></el-input>
            </template>
          </generate-form>

          <template slot="action">
            <el-button type="primary" @click="handleTest">获取数据</el-button>
            <el-button @click="handleReset">重置</el-button>
          </template>
        </cus-dialog>

        <cus-dialog
          :visible="uploadVisible"
          @on-close="uploadVisible = false"
          @on-submit="handleUploadJson"
          ref="uploadJson"
          width="800px"
          form
        >
          <el-alert type="info" title="JSON格式如下，直接复制生成的json覆盖此处代码点击确定即可"></el-alert>
          <el-input
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 22 }"
            placeholder="请输入内容"
            style="height: 400px;width: 100%;"
            v-model="uploadEditor">
            {{jsonEg}}
          </el-input>
          <!-- <div id="uploadeditor" style="height: 400px;width: 100%;">{{jsonEg}}</div> -->
        </cus-dialog>

        <cus-dialog
          :visible="jsonVisible"
          @on-close="jsonVisible = false"
          ref="jsonPreview"
          width="800px"
          form
        >
          
          <div id="jsoneditor" style="height: 400px;width: 100%;">{{jsonTemplate}}</div>
          
          <!-- <template slot="action">
            <el-button type="primary" class="json-btn" :data-clipboard-text="jsonCopyValue">复制数据</el-button>
          </template> -->
        </cus-dialog>

        <cus-dialog
          :visible="codeVisible"
          @on-close="codeVisible = false"
          ref="codePreview"
          width="800px"
          form
          :action="false"
        >
          <div id="codeeditor" style="height: 500px; width: 100%;">{{htmlTemplate}}</div>
        </cus-dialog>
      </el-container>
    </el-main>
    <el-footer height="30px" style="font-weight: 600;">Powered by <a target="_blank" href="https://github.com/GavinZhuLei/vue-form-making">GavinZhuLei</a></el-footer>
  </el-container>
  
</template>

<script>
import Draggable from 'vuedraggable'
import WidgetConfig from './WidgetConfig'
import FormConfig from './FormConfig'
import WidgetForm from './WidgetForm'
import CusDialog from './CusDialog'
import GenerateForm from './GenerateForm'
import Clipboard from 'clipboard'
import {basicComponents, layoutComponents, advanceComponents} from './componentsConfig.js'
import {loadJs, loadCss} from '../util/index.js'
import request from '../util/request.js'
import generateCode from './generateCode.js'

export default {
  name: 'fm-making-form',
  components: {
    Draggable,
    WidgetConfig,
    FormConfig,
    WidgetForm,
    CusDialog,
    GenerateForm
  },
  props: {
    preview: {
      type: Boolean,
      default: false
    },
    generateCode: {
      type: Boolean,
      default: false
    },
    generateJson: {
      type: Boolean,
      default: false
    },
    upload: {
      type: Boolean, 
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    loadData: {
      type: Object,
      default: function () {
        return {}
      }
    },
    tableList: {
      type: Array,
      default: function () {
        return []
      }
    },
    basicFields: {
      type: Array,
      default: () => ['input', 'textarea', 'number', 'radio', 'checkbox', 'time', 'date', 'rate', 'color', 'select', 'switch', 'slider']
    },
    advanceFields: {
      type: Array,
      default: () => ['childTable']
    },
    layoutFields: {
      type: Array,
      default: () => ['text', 'image', 'divider']
    }
  },
  data () {
    return {
      basicComponents,
      layoutComponents,
      advanceComponents,
      resetJson: false,
      widgetForm: {
        list: [],
        config: {
          title: '',
          key: '',
          labelWidth: 90,
          labelPosition: 'left',
          size: 'small'
        },
        deleted: []
      },
      configTab: 'form',
      widgetFormSelect: null,
      previewVisible: false,
      jsonVisible: false,
      codeVisible: false,
      uploadVisible: false,
      remoteFuncs: {
        func_test (resolve) {
          setTimeout(() => {
            const options = [
              {id: '1', name: '1111'},
              {id: '2', name: '2222'},
              {id: '3', name: '3333'}
            ]

            resolve(options)
          }, 2000)
        },
        funcGetToken (resolve) {
          request.get('http://tools-server.xiaoyaoji.cn/api/uptoken').then(res => {
            resolve(res.uptoken)
          })
        },
        upload_callback (response, file, fileList) {
          console.log('callback', response, file, fileList)
        }
      },
      widgetModels: {},
      blank: '',
      htmlTemplate: '',
      jsonTemplate: '',
      uploadEditor: null,
      // jsonCopyValue: '',
      jsonClipboard: null,
      jsonEg: `{
  "list": [
    {
      "type": "input",
      "name": "单行文本",
      "icon": "icon-input",
      "options": {
        "width": "100%",
        "defaultValue": "",
        "required": false,
        "dataType": "string",
        "pattern": "",
        "placeholder": "",
        "remoteFunc": "func_1540908864000_94322"
      },
      "key": "1540908864000_94322",
      "model": "input_1540908864000_94322",
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
      "options": {
        "width": "100%",
        "defaultValue": "",
        "required": false,
        "pattern": "",
        "placeholder": "",
        "remoteFunc": "func_1540908876000_19435"
      },
      "key": "1540908876000_19435",
      "model": "textarea_1540908876000_19435",
      "rules": []
    }
  ],
  "config": {
    "labelWidth": 100,
    "labelPosition": "top",
    "size": "small"
  }
}`
    }
  },
  mounted () {
    // 如果有传值，则初始化传值
    if(this.loadData.constructor === Object && Object.keys(this.loadData).length > 0) this.setJSON(this.loadData)
  },
  methods: {
    handleConfigSelect (value) {
      this.configTab = value
    },
    handleMoveEnd (evt) {
      // console.log('leftEnd', evt)
    },
    handleMoveStart ({oldIndex}) {
      // console.log('leftStart', oldIndex, this.basicComponents)
    },
    handleMove () {
      return true
    },
    handlePreview () {
      // console.log(this.widgetForm)
      this.previewVisible = true
    },
    handleTest () {
      this.$refs.generateForm.getData().then(data => {
        this.$alert(data, '').catch(e=>{})
        this.$refs.widgetPreview.end()
      }).catch(e => {
        this.$refs.widgetPreview.end()
      })
    },
    handleReset () {
      this.$refs.generateForm.reset()
    },
    handleGenerateJson () {
      this.jsonVisible = true

      this.jsonTemplate = this.jsonClear(this.widgetForm)

      this.$nextTick(() => {
        // const editor = ace.edit('jsoneditor')
        // editor.session.setMode("ace/mode/json")
        if (!this.jsonClipboard) {
          this.jsonClipboard = new Clipboard('.json-btn')
          this.jsonClipboard.on('success', (e) => {
            this.$message.success('复制成功')
          })
        }
        // this.jsonCopyValue = JSON.stringify(this.widgetForm)
      })
    },
    handleGenerateCode () {
      this.codeVisible = true
      this.htmlTemplate = generateCode(JSON.stringify(this.widgetForm))
      this.$nextTick(() => {
        const editor = ace.edit('codeeditor')
        editor.session.setMode("ace/mode/html")
      })
    },
    handleUpload () {
      this.uploadVisible = true
      // this.$nextTick(() => {
      //   this.uploadEditor = ace.edit('uploadeditor')
      //   this.uploadEditor.session.setMode("ace/mode/json")
      // })
    },
    handleUploadJson () {
      try {
        var jsonData = this.jsonClear(JSON.parse(this.uploadEditor))
        var deleted = [] // 被删除的字段组
        var oldModelExist = [] // 原json中已经存在的model

        if(!jsonData.hasOwnProperty('list')) return false

        // 通过model判断之前存在的字段，存在则从旧的list中清空
        for(var item of jsonData.list) {
          const fieldExist = this.widgetForm.list.filter(field => field.model === item.model)
          if(fieldExist.length === 1) oldModelExist.push(fieldExist[0].model)
        }

        // 删除之前系统存在的字段(有id字段并且model不在新导入的数组)进行删除标记，以便告知服务器
        for(var item of Object.keys(this.widgetForm.list)) {
          if(oldModelExist.indexOf(this.widgetForm.list[item].model) === -1 && this.widgetForm.list[item].hasOwnProperty('id'))
          // if(this.widgetForm.list[item].hasOwnProperty('id'))
          {
            this.widgetForm.list[item].is_delete = 1 //对当前组件进行软删除标记
            deleted.push(this.widgetForm.list[item])
          }
        }

        jsonData = Object.assign({}, jsonData, {deleted: deleted})

        this.handleClear()

        this.setJSON(jsonData)
        this.uploadVisible = false
      } catch (e) {
        this.$message.error(e.message)
        this.$refs.uploadJson.end()
      }
    },
    jsonClear (jsonData) {
      // 导入导出数据时，对系统数据进行清理，清除无效字段
      for(var item of Object.keys(jsonData.list)) {
        // 导出时清空数据库索引字段
        if(jsonData.list[item].hasOwnProperty('id'))
        {
          delete jsonData.list[item].id
          delete jsonData.list[item].form_id
        }
      }
      if(jsonData.hasOwnProperty('deleted')) delete jsonData.deleted
      return jsonData
    },
    handleClear () {
      this.widgetForm = {
        list: [],
        config: {
          labelWidth: 90,
          labelPosition: 'right',
          size: 'small',
          customClass: ''
        },
        deleted: []
      }
      this.widgetFormSelect = {}
    },
    getJSON () {
      return this.widgetForm
    },
    getHtml () {
      return generateCode(JSON.stringify(this.widgetForm))
    },
    setJSON (json) {
      // 针对外面传值，如果缺少指定key，则使用默认key
      if(!json.config) json.config = this.widgetForm.config
      if(!json.list) json.list = this.widgetForm.list

      this.widgetForm = json

      if (json.list.length> 0) {
        this.widgetFormSelect = json.list[0]
      }
    },
    handleInput (val) {
      // console.log(val)
      this.blank = val
    },
    handleDataChange (field, value, data) {
      console.log(field, value, data)
    }
  },
  watch: {
    // widgetForm: {
    //   deep: true,
    //   handler: function (val) {
    //     // console.log('111',this.$refs.widgetForm)
    //   }
    // },
    widgetFormSelect: {
      deep: true,
      handler: function (val) {
        this.configTab = 'widget'
      }
    }
  }
}
</script>

<style lang="scss">
.widget-empty{
  background: url('../assets/form_empty.png') no-repeat;
  background-position: 50%;
}

</style>
