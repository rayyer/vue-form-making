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
          :xs="24" >
          <!-- 自定义组件 -->
          <el-form-item v-if="item.type=='blank'" :label="item.name" :prop="item.model" :key="item.key">
            <slot :name="item.model" :model="models"></slot>
          </el-form-item>

          <!-- 图片组件 -->
          <el-image
            v-else-if="item.type === 'image'"
            :style="{width: item.options.size.width+'px', height: item.options.size.height+'px', marginLeft: '20%'}"
            :src="item.options.image_url"
            fit="fill">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>

          <!-- 其他 -->
          <genetate-form-item 
            v-else 
            :key="item.key" 
            :models.sync="models" 
            :remote="remote" 
            :rules="rules" 
            :widget="item" 
            v-show="!dependences.hasOwnProperty(item.model) || dependenceShow[item.model] === true"
          ></genetate-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import GenetateFormItem from './GenerateFormItem'
import {loadJs} from '../util/index.js'

export default {
  name: 'fm-generate-form',
  components: {
    GenetateFormItem
  },
  props: ['data', 'remote', 'value', 'insite'],
  data () {
    return {
      models: {},
      rules: {},
      dependences: {}, // 依赖字段
      dependenceShow: [], // 字段是否显示
      colsAmount: 0
    }
  },
  created () {
    this.generateModle(this.data.list)
    console.log('dependences', this.dependences)
  },
  mounted () {
  },
  methods: {
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

          this.getDependences(genList[i]) // 整理出需要的依赖项

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
    getDependences (item, models) {
      if(item.dependences)
      {
        this.dependences[item.model] = []
        for(var m of item.dependences)
        {
          this.dependences[item.model].push(m)
        }
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
      this.dependenceShow = [] // 初始化禁止显示的组件
      for (var index in this.dependences)
      {
        for(var item of this.dependences[index])
        {
          if(models.hasOwnProperty(item[0]))  // item[0]是要依赖的表单key
          {
            var field_value = models[item[0]]  // 被依赖项当前选中的值

            if((typeof field_value)==='string') field_value = [models[item[0]]] // 将单选框整理成数组

            if(field_value.indexOf(item[1]) > -1) 
            {
              this.dependenceShow[index] = true
              break
            }
          }
        }
      }
    }
  },
  watch: {
    models: {
      deep: true,
      handler (val) {
        this.filedHidden(val)
      }
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
        console.log(JSON.stringify(val))
        this.models = {...this.models, ...val}
      }
    }
  }
}
</script>

<style lang="scss">
// @import '../styles/cover.scss';
</style>
