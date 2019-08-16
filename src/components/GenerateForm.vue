<template>
  <div>
    <el-form ref="generateForm"
      :size="data.config.size"
      :model="models"
      :rules="rules"
      :label-position="data.config.labelPosition"
      :label-width="data.config.labelWidth + 'px'"
      >
      <el-row :gutter="24">
        <el-col
          v-for="(item, index) in data.list"
          :key="index"
          :xl="item.cols"
          :lg="item.cols"
          :md="item.cols"
          :sm="24"
          :xs="24">
          <!-- 自定义组件 -->
          <el-form-item v-if="item.type=='blank'" :label="item.name" :prop="item.model" :key="item.key">
            <slot :name="item.model" :model="models"></slot>
          </el-form-item>

          <!-- 图片组件 -->
          <el-image
            v-else-if="item.type === 'image'"
            :style="{width: item.options.size.width+'px', height: item.options.size.height+'px', marginLeft: '20%', backgroundColor: '#f0f0f0'}"
            :src="item.options.image_url"
            fit="fill"
            v-show="!dependents.hasOwnProperty(item.model) || dependentShow[item.model] === true"
            >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>

          <!-- 文本组件 -->
          <div 
            v-else-if="item.type === 'text'"
            :style="{ 
              fontSize: item.options.fontSize + 'px', 
              fontWeight: item.options.fontWeight, 
              textAlign: item.options.align, 
              height:  item.options.height + 'px',
              lineHeight:  item.options.height + 'px'
              }"
              v-show="!dependents.hasOwnProperty(item.model) || dependentShow[item.model] === true"
              >
            {{item.name}}
          </div>

          <!-- 分割线组件 -->
          <div v-else-if="item.type === 'divider'">
            <el-divider :content-position="item.options.position">{{item.options.text}}</el-divider>
          </div>

          <!-- 子表单,此处应该是设计器和数据关联 -->
          <el-form-item
            v-else-if="item.type == 'childTable'"
            :label="item.name"
            :prop="item.model"
            v-show="!dependents.hasOwnProperty(item.model) || dependentShow[item.model] === true"
            >
            <div v-for="(v, index) in models[item.model]" :key="index" style="margin-right:10px">
              <span v-for="(childItem, i) in dependChildTable[item.options.relatedTable].list" :key="i">
                <b>{{ childItem.name }}</b>: {{ models[item.model][index][childItem.model] }} 
              </span>
              <el-button type="text" @click="handleChildTableDelete(item.model, index)"><i class="el-icon-delete"></i></el-button>
            </div>
            <el-button type="text" @click="handleChildTableShow(item)">+ 添加</el-button>
          </el-form-item>

          <!-- 其他 -->
          <genetate-form-item 
            v-else 
            :key="item.key" 
            :models.sync="models" 
            :remote="remote" 
            :rules="rules" 
            :widget="item" 
            v-show="!dependents.hasOwnProperty(item.model) || dependentShow[item.model] === true"
          ></genetate-form-item>
        </el-col>
      </el-row>
    </el-form>

    <cus-dialog
      :visible="childTableModalVisible"
      @on-close="childTableModalVisible = false"
      width="700px"
    >
      <fm-generate-form :data="currentChildTableDesigner" ref="childFrom">
      </fm-generate-form>

      <template slot="action">
        <el-button type="primary" @click="handleChildTableAdd">添加</el-button>
        <el-button @click="childTableModalVisible = false">取消</el-button>
      </template>
    </cus-dialog>

  </div>
</template>

<script>
import GenetateFormItem from './GenerateFormItem'
import {loadJs} from '../util/index.js'
import CusDialog from './CusDialog'

export default {
  name: 'fm-generate-form',
  components: {
    GenetateFormItem,
    CusDialog
  },
  props: ['data', 'remote', 'value', 'insite', 'dependChildTable'],
  data () {
    return {
      models: {},
      rules: {},
      dependents: {}, // 依赖字段
      dependentShow: [], // 字段是否显示
      colsAmount: 0,
      childTableModalVisible: false, 
      currentChildTableDesigner: {} // 当前用到的子表单设计器
    }
  },
  created () {
    this.generateModle(this.data.list)
  },
  mounted () {
  },
  methods: {
    /**
     * 生成当前子表单设计器，this.currentChildTableDesigner
     */
    handleChildTableShow (childTable) {
      if(childTable.options.hasOwnProperty('relatedTable') && this.dependChildTable.hasOwnProperty(childTable.options.relatedTable))
      {
        const childTableDesigner = this.dependChildTable[childTable.options.relatedTable]
        this.currentChildTableDesigner = {...childTableDesigner, ...{parentModel: childTable.model}}
        this.childTableModalVisible = true
      }
      else
      {
        this.$notify({
          title: '提示',
          message: '未发现子表单字段',
          type: 'warning'
        })
      }
    },
    /**
     * 生成用于向后台提交的model，this.models
     */
    handleChildTableAdd () {
      this.$refs.childFrom.getData().then(data => {
        let model = {}
        for (var item of this.currentChildTableDesigner.list) {
          // 循环子表单设计器，生成表单的label:value的格式
          if(data[item.model] === "") continue
          const key = item.name
          const value = data[item.model]
          model = {...model, ...{[key]: value}}
        }

        if((typeof this.models[this.currentChildTableDesigner.parentModel]) !== 'object')  {
          this.models[this.currentChildTableDesigner.parentModel] = []
        }

        this.models[this.currentChildTableDesigner.parentModel].push(data) // 子表单数据更新

        this.childTableModalVisible = false
        // 数据校验成功
        // data 为获取的表单数据
      }).catch(e => {
        this.$notify({
          title: '添加失败',
          message: e,
          duration: 0
        })
        // 数据校验失败
      })
    },
    handleChildTableDelete (model, index) {
      this.models[model].splice(index, 1)
    },
    generateModle (genList) {
      for (let i = 0; i < genList.length; i++) {
        if (genList[i].type === 'grid') {
          genList[i].columns.forEach(item => {
            this.generateModle(item.list)
          })
        } else {
          if (this.value && Object.keys(this.value).indexOf(genList[i].model) >= 0) {
            this.models[genList[i].model] = this.value[genList[i].model]
          } else {
            if (genList[i].type === 'blank') {
              this.$set(this.models, genList[i].model, genList[i].options.defaultType === 'String' ? '' : (genList[i].options.defaultType === 'Object' ? {} : []))
            } else {
              this.models[genList[i].model] = genList[i].options.defaultValue
            }
          }

          this.getDependents(genList[i]) // 整理出需要的依赖项

          if (this.rules[genList[i].model]) {
            this.rules[genList[i].model] = [...this.rules[genList[i].model], ...genList[i].rules.map(item => {
              if (item.pattern) {
                return {...item, pattern: eval(item.pattern)}
              } else {
                return {...item}
              }
            })]
          } else {
            this.rules[genList[i].model] = [...genList[i].rules.map(item => {
              if (item.pattern) {
                return {...item, pattern: eval(item.pattern)}
              } else {
                return {...item}
              }
            })]
          }
        }
      }
    },
    getDependents (item) {
      if(item.options.dependents)
      {
        const dependents = item.options.dependents
        var data = {}
        for(var m of dependents)
        {
          if(data.hasOwnProperty(m[0])) 
          {
            data[m[0]].push(m[1])
          }
          else
          {
            data = Object.assign({}, data, {[m[0]]: [m[1]]})
          }
        }
        this.dependents[item.model] = data
      }
    },
    getData () {
      return new Promise((resolve, reject) => {
        this.$refs.generateForm.validate(valid => {
          if (valid) {
            resolve(this.models)
          } else {
            reject(new Error('表单数据校验失败').message)
          }
        })
      })
    },
    reset () {
      this.$refs.generateForm.resetFields()
    },
    refresh () {
    },
    filedHidden (models) {
      this.dependentShow = [] // 初始化被依赖显示的组件
      // console.log('dependents:', this.dependents)
      // console.log('models', models) // 表单内容
      for (var modelKey in this.dependents)
      {
        // console.log('modelKey', modelKey) // 本身的字段key
        const modelValue = models[modelKey]

        // 循环预设的依赖项
        for(var dependKey in this.dependents[modelKey])
        {
          if(!models.hasOwnProperty(dependKey))
          {
            this.dependentShow[modelKey] = false
            this.models[modelKey] = '' // 没有依赖则将当前值清空
            continue
          }

          var dependModelValue = models[dependKey] // 被依赖项的当前值
          if(dependModelValue === null || dependModelValue === '') {
            this.dependentShow[modelKey] = false
            this.models[modelKey] = '' // 没有依赖则将当前值清空
            continue
          }

          const dependItems = this.dependents[modelKey][dependKey] // 被依赖项期望值
          if((typeof dependModelValue) === 'string') dependModelValue = [dependModelValue] // 将单选框整理成数组

          // console.log('dependKey', dependKey, 'dependItems', dependItems) // 被依赖的字段Key
          // console.log('dependKey value:', dependModelValue)

          for(var item in dependModelValue)
          {
            // 对比两个数组，如果存在则显示并跳出
            if(dependItems.indexOf(dependModelValue[item]) > -1)
            {
              this.dependentShow[modelKey] = true
              break
            }
          }

          if(this.dependentShow[modelKey] === true)
          {
            break
          }
          else
          {
            this.dependentShow[modelKey] = false
            this.models[modelKey] = '' // 没有依赖则将当前值清空
            continue
          }
        }
      }
    }
  },
  watch: {
    models: function (val) {
      this.filedHidden(val)
    },
    data: {
      deep: true,
      handler (val) {
        this.generateModle(val.list)
      }
    },
    value: {
      deep: true,
      handler (val) {
        this.models = {...this.models, ...val}
        this.generateModle(this.data.list)
      }
    }
  }
}
</script>

<style lang="scss">
// @import '../styles/cover.scss';
</style>
