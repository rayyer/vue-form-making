<template>
  <el-form-item
    v-if="element.options.hasOwnProperty('showName') && element.options.showName===false"
    class="widget-view "
    :class="{active: selectWidget.key == element.key, 'is_req': element.options.required}"
    label-width="0px"
    @click.native.stop="handleSelectWidget(index)"
    >
    <widget-form-item
      :key="element.key"
      :element="element"
      :select.sync="selectWidget"
      :index="index"
      :data="data">
    </widget-form-item>

    <div class="widget-view-action" v-if="selectWidget.key == element.key">
      <i class="iconfont icon-icon_clone" @click.stop="handleWidgetClone(index)"></i>
      <i class="iconfont icon-trash" @click.stop="handleWidgetDelete(index)"></i>
    </div>

    <div class="widget-view-drag" v-if="selectWidget.key == element.key">
      <i class="iconfont icon-drag drag-widget"></i>
    </div>
  </el-form-item>

  <el-form-item
    v-else
    class="widget-view "
    :class="{active: selectWidget.key == element.key, 'is_req': element.options.required}"
    :label="element.name"
    @click.native.stop="handleSelectWidget(index)"
    :label-width="(element.options.labelWidth || 80) + 'px'"
    >
    
    <widget-form-item
      :key="element.key"
      :element="element"
      :select.sync="selectWidget"
      :index="index"
      :data="data">
    </widget-form-item>

    <div class="widget-view-action" v-if="selectWidget.key == element.key">
      <i class="iconfont icon-icon_clone" @click.stop="handleWidgetClone(index)"></i>
      <i class="iconfont icon-trash" @click.stop="handleWidgetDelete(index)"></i>
    </div>

    <div class="widget-view-drag" v-if="selectWidget.key == element.key">
      <i class="iconfont icon-drag drag-widget"></i>
    </div>
    
  </el-form-item>
</template>

<script>
import WidgetFormItem from './WidgetFormItem'
// import FmUpload from './Upload'
// import FmEditor from './Editor/tinymce'
export default {
  props: ['element', 'select', 'index', 'data'],
  components: {
    WidgetFormItem
    // FmUpload,
    // FmEditor
  },
  data () {
    return {
      selectWidget: this.select
    }
  },
  mounted () {
    
  },
  methods: {
    handleSelectWidget (index) {
      this.selectWidget = this.data.list[index]
    },
    handleWidgetDelete (index) {
      if (this.data.list.length - 1 === index) {
        if (index === 0) {
          this.selectWidget = {}
        } else {
          this.selectWidget = this.data.list[index - 1]
        }
      } else {
        this.selectWidget = this.data.list[index + 1]
      }

      this.$nextTick(() => {
        // 存在id属性，可能是从服务器上返回，在修改表单的场景下进行删除，则不删除当前字段对象
        // 如果没有id属性，则是新增字段，删除无需保存
        if(this.data.list[index].hasOwnProperty('id'))
        {
          this.data.list[index].is_delete = 1 //对当前组件进行软删除标记
          if(!this.data.hasOwnProperty('deleted'))  this.data = Object.assign(this.data, {deleted: []})
          this.data.deleted.push(this.data.list[index])
        }

        this.data.list.splice(index, 1)

        // 删除字段之后清除无效依赖项
        for(var item of Object.keys(this.data.list)) {
          if(this.data.list[item].options.hasOwnProperty('dependents') && this.data.list[item].options.dependents.length > 0) {
            var i=0
            for(var deItem of this.data.list[item].options.dependents) {
              const itemExit = this.data.list.filter(m=>m.model===deItem[0])
              if(itemExit.length === 0) this.data.list[item].options.dependents.splice(i, 1)
            }
            i++
          }
        }
      })
    },
    handleWidgetClone (index) {
      const key = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)

      let cloneData = {
        ...this.data.list[index],
        options: {...this.data.list[index].options},
        key: key,
        model: this.data.list[index].type + '_' + key
      }

      if (this.data.list[index].type === 'radio' || this.data.list[index].type === 'checkbox') {

        cloneData = {
          ...cloneData,
          options: {
            ...cloneData.options,
            options: cloneData.options.options.map(item => ({...item}))
          }
        }
      }

      // 无须复制的字段
      if(cloneData.hasOwnProperty('id')) delete cloneData.id
      if(cloneData.hasOwnProperty('form_id')) delete cloneData.form_id

      this.data.list.splice(index+1, 0, cloneData)

      this.$nextTick(() => {
        this.selectWidget = this.data.list[index + 1]
      })
    },
  },
  watch: {
    select (val) {
      this.selectWidget = val
    },
    selectWidget: {
      handler (val) {
        this.$emit('update:select', val)
      },
      deep: true
    }
  }
}
</script>
