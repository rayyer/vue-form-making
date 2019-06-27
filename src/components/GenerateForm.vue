<template>
  <div>
    <el-form ref="generateForm" 
      :size="data.config.size"
      :model="models" :rules="rules" :label-position="data.config.labelPosition" :label-width="data.config.labelWidth + 'px'">
      <el-row :gutter="24">
        <el-col v-for="(item, index) in data.list" :key="index" :span="item.cols">
            <el-form-item v-if="item.type=='blank'" :label="item.name" :prop="item.model" :key="item.key">
              <slot :name="item.model" :model="models"></slot>
            </el-form-item>
            <genetate-form-item v-else :key="item.key" :models.sync="models" :remote="remote" :rules="rules" :widget="item"></genetate-form-item>
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
      rules: {}
    }
  },
  created () {
    this.generateModle(this.data.list)
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
    refresh () {
      
    }
  },
  watch: {
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
