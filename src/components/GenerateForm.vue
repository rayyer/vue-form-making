<template>
  <div>
    <div style="color:#999; font-size:12px; height:30px">* 因子表单涉及到动态传值，所以暂时无法在预览中展现，可在具体业务中传值后体验。</div>
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
            fit="fill">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>

          <!-- 文本组件 -->
          <div 
            v-else-if="item.type === 'text'"
            :style="{ fontSize: item.options.fontSize + 'px', fontWeight: item.options.fontWeight, textAlign: item.options.align }">
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
            >
            <!-- <div v-for="(childItem, index) in models[item.model]" :key="index">
              <span v-for="(v, k) in childItem" :key="k" style="margin-right:10px"> <b>{{k | filtersGetName(childTableList)}}</b> : {{v}}  </span>
            </!-->
            <div v-for="(childItem, index) in childTableList[item.model]" :key="index">
              <span v-for="(v, k) in childItem" :key="k" style="margin-right:10px" v-if="v!==''"> <b>{{k}}</b> : {{v}}  </span>
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
      <fm-generate-form insite="true" :data="currentChildTableDesigner" ref="childFrom">
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
      currentChildTableDesigner: {}, // 当前用到的子表单设计器
      childTableList: {}  // 所有子表单的内容, key=>value，用于显示
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
      if(childTable.options.hasOwnProperty('relatedTable') && childTable.options.relatedTable !== '')
      {
        // 过滤id=关联表字段的对象
        const childTableDesigner = this.dependChildTable.filter(item => item.id === childTable.options.relatedTable)
        this.currentChildTableDesigner = Object.assign({}, childTableDesigner[0], {'parentModel': childTable.model})
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
     * 生成当前子表单数据清单，this.childTableList
     * 生成用于向后台提交的model，this.models
     */
    handleChildTableAdd () {
      this.$refs.childFrom.getData().then(data => {
        let model = {}
        for (var item of this.currentChildTableDesigner.list) {
          // 循环，生成表单的label:value的格式
          model = Object.assign({}, model, {[item.name]: data[item.model]})
        }

        if(!this.childTableList.hasOwnProperty(this.currentChildTableDesigner.parentModel)) { 
          // 子表数据，判断字段是否存在，不存在创建
          this.childTableList = Object.assign(
            {},
            this.childTableList,
            {[this.currentChildTableDesigner.parentModel]: []}
          )
        }
          
        this.childTableList[this.currentChildTableDesigner.parentModel].push(model) // 显示列表更新
        this.models[this.currentChildTableDesigner.parentModel].push(data) // 子表单数据更新
        this.childTableModalVisible = false
        // 数据校验成功
        // data 为获取的表单数据
      }).catch(e => {
        // 数据校验失败
      })
    },
    handleChildTableDelete (model, index) {
      this.models[model].splice(index, 1)
      this.childTableList[model].splice(index, 1)
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
        this.dependents[item.model] = []
        for(var m of dependents)
        {
          this.dependents[item.model].push(m)
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
      this.dependentShow = [] // 初始化禁止显示的组件
      for (var index in this.dependents)
      {
        for(var item of this.dependents[index])
        {
          if(models.hasOwnProperty(item[0]))  // item[0]是要依赖的表单key
          {
            var field_value = models[item[0]]  // 被依赖项当前选中的值

            if((typeof field_value)==='string') field_value = [models[item[0]]] // 将单选框整理成数组

            if(field_value.indexOf(item[1]) > -1) 
            {
              this.dependentShow[index] = true
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
