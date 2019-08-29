<template>
  <div>
    <el-form ref="generateForm"
      :size="data.config.size"
      :model="models"
      :rules="rules"
      :label-position="data.config.labelPosition"
      :label-width="data.config.labelWidth + 'px'"
      >
      <el-row :gutter="16">
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

          <template v-else-if="item.type == 'childTable'">
            <template v-if="dependChildTable.hasOwnProperty(item.options.relatedTable)">
              <template v-if="item.options.showName===false">
                <fm-generate-form :data="dependChildTable[item.options.relatedTable]" :value="list" v-for="(list, index) in models[item.model]" :key="index" @childFromModels="getChildModels(item.model, index, $event)">
                  <template slot="dynamicFormDel" v-if="item.options.hasOwnProperty('islists') && item.options.islists">
                    <el-button type="text" @click.prevent="removeChildTableRecord(item.model, index)" icon="el-icon-delete">删除</el-button>
                  </template>
                </fm-generate-form>
                <el-button @click="getChildModels(item.model)" icon="el-icon-plus"  v-if="item.options.hasOwnProperty('islists') && item.options.islists">新增{{item.name}}</el-button>
              </template>
              <template v-else>
                <el-form-item
                  :label="item.name"
                  :prop="item.model"
                  v-show="!dependents.hasOwnProperty(item.model) || dependentShow[item.model] === true"
                  >
                  <fm-generate-form :data="dependChildTable[item.options.relatedTable]" :value="list" v-for="(list, index) in models[item.model]" :key="index" @childFromModels="getChildModels(item.model, index, $event)">
                    <template slot="dynamicFormDel" v-if="item.options.hasOwnProperty('islists') && item.options.islists">
                      <el-button type="text" @click.prevent="removeChildTableRecord(item.model, index)" icon="el-icon-delete">删除</el-button>
                    </template>
                  </fm-generate-form>
                  <el-button @click="getChildModels(item.model)" icon="el-icon-plus"  v-if="item.options.hasOwnProperty('islists') && item.options.islists">新增{{item.name}}</el-button>
                </el-form-item>
              </template>
            </template>
          </template>

          <template v-else-if="item.options.showName===false">
            <el-form-item
              :prop="item.model"
              label-width="0px"
              v-show="!dependents.hasOwnProperty(item.model) || dependentShow[item.model] === true"
              >
              <genetate-form-item
                :key="item.key" 
                :models.sync="models" 
                :remote="remote" 
                :rules="rules" 
                :widget="item" 
                @input-change="onInputChange"
              ></genetate-form-item>
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item
              :label="item.name"
              :prop="item.model"
              :label-width="(item.options.labelWidth || 80) + 'px'"
              v-show="!dependents.hasOwnProperty(item.model) || dependentShow[item.model] === true"
              >
              <genetate-form-item
                :key="item.key" 
                :models.sync="models" 
                :remote="remote" 
                :rules="rules" 
                :widget="item" 
                @input-change="onInputChange"
              ></genetate-form-item>
            </el-form-item>
          </template>
        </el-col>
        <el-col :span="3">
          <slot name="dynamicFormDel"></slot>
        </el-col>
      </el-row>
    </el-form>

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
  filters: {
    filtersGetName:function(model, list){
      const modelItem = list.filter(item => item.model === model)
      if(modelItem.length>0) return modelItem[0].name
      return '-'
    }
  },
  data () {
    return {
      models: {},
      rules: {},
      dependents: {}, // 依赖字段
      dependentShow: {}, // 字段是否显示
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
    /*
    * index=-1 && model=''则用来添加一行空的子表单
    * 或者为指定一个索引index的item替换表单内容model
    */
    getChildModels (item, index=-1, model='') {
      if (model==='') {
        this.models[item].push('')
        this.$set(this.models, item, this.models[item])
      } else {
        this.models[item][index] = model
      }
    },
    removeChildTableRecord (item, index) {
      this.models[item].splice(index, 1)
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
            }
            else if (genList[i].type === 'childTable') {
              this.$set(this.models, genList[i].model, [""])
            }
            else {
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
      if(item.options.dependents && item.options.dependents.length>0)
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
        this.filedHidden(this.models)
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
    onInputChange (value, field) {
      this.$emit('on-change', field, value, this.models)
    },
    refresh () {
    },
    filedHidden (models) {
      let dependentShow = {} // 初始化被依赖显示的组件
      let value = {}
      // console.log('dependents:', this.dependents)
      // console.log('models', models) // 表单内容
      for (var modelKey in this.dependents)
      {
        // console.log('modelKey', modelKey) // 本身的字段key
        const modelValue = models[modelKey]

        // 循环预设的依赖项
        for(var dependKey in this.dependents[modelKey])
        {
          // 如果没有找到被依赖的属性则跳出
          if(!models.hasOwnProperty(dependKey))
          {
            dependentShow[modelKey] = false
            // 没有依赖则将当前值清空， 避免在循环中更新models，否则和watch models容易成死循环
            if(typeof(this.models[modelKey])==='string' && this.models[modelKey] !== '') value[modelKey]=''
            if(typeof(this.models[modelKey])==='object' && this.models[modelKey].length !== 0) value[modelKey]=[]
            continue
          }

          // 被依赖的值是空也跳出
          var dependModelValue = models[dependKey] // 被依赖项的当前值
          if(dependModelValue === null || dependModelValue === '') {
            dependentShow[modelKey] = false
            if(typeof(this.models[modelKey])==='string' && this.models[modelKey] !== '') value[modelKey]=''
            if(typeof(this.models[modelKey])==='object' && this.models[modelKey].length !== 0) value[modelKey]=[]
            continue
          }

          const dependItems = this.dependents[modelKey][dependKey] // 被依赖项期望值
          if((typeof dependModelValue) === 'string') dependModelValue = [dependModelValue] // 将单选框整理成数组

          // console.log('dependKey', dependKey, 'dependItems', dependItems) // 被依赖的字段Key
          // console.log('dependKey value:', dependModelValue)

          for(var item in dependModelValue) {
            // 对比两个数组，如果存在则显示并跳出
            if(dependItems.indexOf(dependModelValue[item]) > -1) {
              dependentShow[modelKey] = true
              break
            }
          }

          if(dependentShow[modelKey] === true) break

          dependentShow[modelKey] = false
          if(typeof(this.models[modelKey])==='string' && this.models[modelKey] !== '') value[modelKey]=''
          if(typeof(this.models[modelKey])==='object' && this.models[modelKey].length !== 0) value[modelKey]=[] // 没有依赖则将当前值清空
        }
      }
      
      if(Object.keys(dependentShow).length>0) this.dependentShow = dependentShow
      if(Object.keys(value).length>0) this.models = {...this.models, ...value}
    }
  },
  watch: {
    models: function (val) {
      this.$emit('childFromModels', val)
      console.log('models', val)
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
