<template>
  <div>
    <el-form ref="generateForm"
      :size="data.config.size"
      :model="models"
      :rules="rules"
      :label-position="data.config.labelPosition"
      :label-width="data.config.labelWidth + 'px'"
      v-loading="loading"
      >
      <el-row :gutter="16">
        <el-col
          v-for="(item, index) in data.list"
          :key="index"
          :xl="item.cols"
          :lg="item.cols"
          :md="item.cols"
          :sm="item.cols"
          :xs="item.cols"
          >
          <!-- 自定义组件 -->
          <el-form-item v-if="item.type=='blank'" :label="item.name" :prop="item.model" :key="item.key">
            <slot :name="item.model" :model="models"></slot>
          </el-form-item>

          <!-- 换行符,原理就是用一个整行隔离上下业务 -->
          <template v-else-if="item.type === 'newLine'">
          </template>
          
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
              lineHeight:  '2'
              }"
            v-show="!dependents.hasOwnProperty(item.model) || dependentShow[item.model] === true"
            >
            {{item.name}}
          </div>

          <!-- 分割线组件 -->
          <div v-else-if="item.type === 'divider'">
            <el-divider :content-position="item.options.position">{{item.options.text}}</el-divider>
          </div>

          <div v-else-if="item.type == 'childTable'">
            <div v-if="dependChildTable.hasOwnProperty(item.options.relatedTable)" v-show="!dependents.hasOwnProperty(item.model) || dependentShow[item.model] === true" style="min-height:50px" :id="item.model">
              <div v-if="item.options.showName===false">
                <fm-generate-form :data="dependChildTable[item.options.relatedTable]" :value="list" v-for="(list, index) in models[item.model]" :key="index" @childFromModels="getChildModels(item.model, index, $event)">
                  <template slot="dynamicFormDel" v-if="item.options.hasOwnProperty('islists') && item.options.islists">
                    <el-button type="text" @click.prevent="removeChildTableRecord(item.model, index)" icon="el-icon-delete">删除</el-button>
                    <el-button type="text" @click.prevent="getChildModels(item.model, index)" icon="el-icon-plus" v-if="models[item.model].length===index+1">新增</el-button>
                  </template>
                </fm-generate-form>
              </div>
              <div v-else>
                <el-form-item :label="item.name" :prop="item.model">
                  <fm-generate-form :data="dependChildTable[item.options.relatedTable]" :value="list" v-for="(list, index) in models[item.model]" :key="index" @childFromModels="getChildModels(item.model, index, $event)">
                    <template slot="dynamicFormDel" v-if="item.options.hasOwnProperty('islists') && item.options.islists">
                      <el-button type="text" @click.prevent="removeChildTableRecord(item.model, index)" icon="el-icon-delete">删除</el-button>
                      <el-button type="text" @click.prevent="getChildModels(item.model, index)" icon="el-icon-plus" v-if="models[item.model].length===index+1">新增</el-button>
                    </template>
                  </fm-generate-form>
                </el-form-item>
              </div>
            </div>
          </div>

          <template v-else-if="item.options.showName===false">
            <el-form-item
              :prop="item.model"
              label-width="0px"
              v-show="!dependents.hasOwnProperty(item.model) || dependentShow[item.model] === true"
              :id="item.model"
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
              :id="item.model"
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
        <el-col :span="4">
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
  // filters: {
  //   filtersGetName:function(model, list){
  //     const modelItem = list.filter(item => item.model === model)
  //     if(modelItem.length>0) return modelItem[0].name
  //     return '-'
  //   }
  // },
  data () {
    return {
      models: {},
      rules: {},
      dependents: {}, // 依赖字段
      dependentShow: {}, // 字段是否显示
      colsAmount: 0,
      childTableModalVisible: false, 
      loading: true,
      currentChildTableDesigner: {} // 当前用到的子表单设计器
    }
  },
  created () {
    this.generateModle(this.data.list)
  },
  mounted () {
    if(this.data.hasOwnProperty('dumpPosition')) this.initPosition(this.data.dumpPosition)
  },
  methods: {
    initPosition(dumpPosition) {
      // 跳转到指定锚点位置
      if(document.getElementById(dumpPosition)) document.documentElement.scrollTop = document.getElementById(dumpPosition).offsetTop
    },
    /*
    * index=-1 && model=''则用来添加一行空的子表单
    * 或者为指定一个索引index的item替换表单内容model
    */
    getChildModels (item, index=-1, model='') {
      if (model==='') {
        this.models[item].push('')
        // index === -1 ? this.models[item].push('') : this.models[item].splice(index+1, 0, '')
        this.$set(this.models, item, this.models[item])
      } else {
        this.models[item][index] = model
      }
    },
    removeChildTableRecord (item, index) {
      if(this.models[item].length===1)
      {
        this.$notify({
          title: '禁止删除',
          message: '最后一条记录禁止删除',
          type: 'warning'
        })
        return false
      }
      this.models[item].splice(index, 1)
    },
    generateModle (genList) {
      for (let i = 0; i < genList.length; i++) {
        if (this.value && Object.keys(this.value).indexOf(genList[i].model) >= 0) {
          var value = this.value[genList[i].model]
          if(typeof(this.value[genList[i].model]) === 'string') {
            if(genList[i].type === 'select' && genList[i].options.multiple === true ) value = JSON.parse(this.value[genList[i].model])
            if(genList[i].type === 'childTable') value = JSON.parse(this.value[genList[i].model])
            if (genList[i].type == 'radio')
            {
              // radio发现一个问题，对0，1，2，3这些字符串类型的value，只能识别"0"，如果都转换为int，则不能识别整型的0，所以下面代码进行转换，将0默认字符串，其他的数字转换成Int
              var n = Number(this.value[genList[i].model]);
              if (!isNaN(n) && n!==0) value=n
            }
          }
          this.models = Object.assign({}, this.models, {[genList[i].model]: value})
          // this.models[genList[i].model] = this.value[genList[i].model]
        } else {
          if (genList[i].type === 'blank') {
            this.$set(this.models, genList[i].model, genList[i].options.defaultType === 'String' ? '' : (genList[i].options.defaultType === 'Object' ? {} : []))
          } else {
            // this.models[genList[i].model] = genList[i].options.defaultValue
            this.models=Object.assign({}, this.models, {[genList[i].model]: genList[i].options.defaultValue})
          }
        }

        if (genList[i].type === 'childTable' && this.models[genList[i].model].length === 0) this.getChildModels(genList[i].model) // 子表单初始化

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
      this.loading = false
    },
    getDependents (item) {
      if(item.options.dependents && item.options.dependents.length>0)
      {
        const dependents = item.options.dependents
        var data = {}
        for (var m of dependents)
        {
          if (data.hasOwnProperty(m[0])) {
            data[m[0]].push(m[1])
          } else {
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
    // reset () {
    //   this.$refs.generateForm.resetFields()
    // },
    /**
     * key 需要清空的model，留空则清空全部表单
     * 最终的思路是：
     * @todo 1. 查询model对应的options.defaultValue，赋值给model
     * 
     * 当前仅实现对子表单（需指定key）和主表单的reset
     */
    reset (model = '') {
      if(model === '') {
        this.$refs.generateForm.resetFields()
        for(var item of this.data.list) {
          if(this.models.hasOwnProperty(item.model) && item.type === 'childTable') this.models[item.model]=[{}]
        }
      } else {
        if(this.models.hasOwnProperty(model)) this.models[model]=[{}]
      }
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
        const modelDesigner = this.data.list.filter(m=>m.model===modelKey)
        if(modelDesigner.length===0) continue

        // 循环预设的依赖项
        for(var dependKey in this.dependents[modelKey])
        {
          // 如果没有找到被依赖的属性则跳出
          if(!models.hasOwnProperty(dependKey))
          {
            // dependentShow[modelKey] = false
            // 没有依赖则将当前值清空， 避免在循环中更新models，否则和watch models容易成死循环
            // value[modelKey] = modelDesigner[0].options.defaultValue
            break
          }

          // 被依赖的值是空也跳出
          var dependModelValue = models[dependKey] // 被依赖项的当前值
          if((dependModelValue === null || dependModelValue === '') && this.models[modelKey] !== modelDesigner[0].options.defaultValue) {
            dependentShow[modelKey] = false
            value[modelKey] = modelDesigner[0].options.defaultValue
            continue
          }

          const dependItems = this.dependents[modelKey][dependKey] // 被依赖项期望值
          if((typeof dependModelValue) === 'string') dependModelValue = [dependModelValue] // 将单选框整理成数组

          for(var item in dependModelValue) {
            // 对比两个数组，如果存在被依赖选项中，则显示并跳出业务
            if(dependItems.indexOf(dependModelValue[item]) > -1) {
              dependentShow[modelKey] = true
              break
            }
          }

          // 如果已经被设定为显示，则不用再进行其他业务判断，直接为显示状态
          if(dependentShow[modelKey] === true) break

          // 没有依赖则将有依赖关系的内容清空，并显示，此处解决了A->B,B->C，如果选择B，显示了C，此时在A中触发隐藏B，则需要清除B的内容，进而触发隐藏C
          dependentShow[modelKey] = false
          if( this.models[modelKey] !== modelDesigner[0].options.defaultValue) value[modelKey] = modelDesigner[0].options.defaultValue
        }
      }

      if(Object.keys(dependentShow).length>0) this.dependentShow = dependentShow
      if(Object.keys(value).length>0) this.models = {...this.models, ...value}
    }
  },
  watch: {
    // models: function (val) {
    //   this.$emit('childFromModels', val)
    //   console.log('models', val)
    //   this.filedHidden(val)
    // },
    models: {
      // deep: true,
      handler (val) {
        console.log('models', val)
        this.$emit('childFromModels', val)
        this.filedHidden(val)
      }
    },
    data: {
      // deep: true,
      handler (val) {
        console.log('data', val)
        this.generateModle(val.list)
      }
    },
    value: {
      // deep: true,
      handler (val) {
        this.models = {...this.models, ...val}
        console.log('value', val)
        this.generateModle(this.data.list)
      }
    }
  }
}
</script>

<style lang="scss">
// @import '../styles/cover.scss';
</style>
