<template>
  <el-form-item
    class="widget-view "
    :class="{active: selectWidget.key == element.key, 'is_req': element.options.required, 'radio_margin_design': element.type==='radio'}"
    label-width="0px"
    @click.native.stop="handleSelectWidget(index)"
    >
    <template v-if="element.type == 'input'">
      <el-input
        v-model="element.options.defaultValue"
        :style="{width: element.options.width}"
        :placeholder="element.options.placeholder"
        :disabled="element.options.disabled"
      >
      <i slot="suffix">
        {{element.options.suffix}}
      </i>
      </el-input>
    </template>

    <template v-if="element.type === 'image'">
      <el-image
        :style="{width: element.options.size.width+'px', height: element.options.size.height+'px', backgroundColor: '#ccc'}"
        :src="element.options.image_url"
        fit="fill">
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
    </template>

    <!-- 文本框组件 -->
    <template v-if="element.type === 'text'">
      <div
        :style="{ 
          fontSize: element.options.fontSize + 'px', 
          fontWeight: element.options.fontWeight, 
          textAlign: element.options.align
          }"
      >
        {{element.name}}
      </div>
    </template>

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
import FmUpload from './Upload'
import FmEditor from './Editor/tinymce'
export default {
  props: ['element', 'select', 'index', 'data'],
  components: {
    FmUpload,
    FmEditor
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
          if(!this.data.hasOwnProperty('deleted'))  this.data = Object.assign(this.data, {deleted: []})
          this.data.deleted.push(this.data.list[index])
        }

        this.data.list.splice(index, 1)
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
