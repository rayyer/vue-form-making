<template>
  <div>
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

    <template v-if="element.type == 'textarea'">
      <el-input type="textarea" :rows="5"
        v-model="element.options.defaultValue"
        :style="{width: element.options.width}"
        :disabled="element.options.disabled"
        :placeholder="element.options.placeholder"
      ></el-input>
    </template>

    <template v-if="element.type == 'number'">
      <el-input-number 
        v-model="element.options.defaultValue" 
        :disabled="element.options.disabled"
        :controls-position="element.options.controlsPosition"
        :style="{width: element.options.width}"
      ></el-input-number>
    </template>

    <template v-if="element.type == 'radio'">
      <el-radio-group v-model="element.options.defaultValue"
        :style="{width: element.options.width}"
        :disabled="element.options.disabled"
      >
        <el-radio  
          :style="{display: element.options.inline ? 'inline-block' : 'block'}"
          :label="item.value" v-for="(item, index) in element.options.options" :key="item.value + index"
          
        >
          {{element.options.showLabel ? item.label : item.value}}
        </el-radio>
      </el-radio-group>
    </template>

    <template v-if="element.type == 'checkbox'">
      <el-checkbox-group v-model="element.options.defaultValue"
        :style="{width: element.options.width}"
        :disabled="element.options.disabled"
      >
        <el-checkbox
          :style="{display: element.options.inline ? 'inline-block' : 'block'}"
          :label="item.value" v-for="(item, index) in element.options.options" :key="item.value + index"
        >
          {{element.options.showLabel ? item.label : item.value}}
        </el-checkbox>
      </el-checkbox-group>
    </template>

    <template v-if="element.type == 'time'">
      <el-time-picker 
        v-model="element.options.defaultValue"
        :is-range="element.options.isRange"
        :placeholder="element.options.placeholder"
        :start-placeholder="element.options.startPlaceholder"
        :end-placeholder="element.options.endPlaceholder"
        :readonly="element.options.readonly"
        :disabled="element.options.disabled"
        :editable="element.options.editable"
        :clearable="element.options.clearable"
        :arrowControl="element.options.arrowControl"
        :style="{width: element.options.width}"
      >
      </el-time-picker>
    </template>

    <template v-if="element.type == 'date'">
      <el-date-picker
        v-model="element.options.defaultValue"
        :type="element.options.type"
        :is-range="element.options.isRange"
        :placeholder="element.options.placeholder"
        :start-placeholder="element.options.startPlaceholder"
        :end-placeholder="element.options.endPlaceholder"
        :readonly="element.options.readonly"
        :disabled="element.options.disabled"
        :editable="element.options.editable"
        :clearable="element.options.clearable"
        :style="{width: element.options.width}"  
      >
      </el-date-picker>
    </template>

    <template v-if="element.type == 'rate'">
      <el-rate v-model="element.options.defaultValue"
        :max="element.options.max"
        :disabled="element.options.disabled"
        :allow-half="element.options.allowHalf"
      ></el-rate>
    </template>

    <template v-if="element.type == 'color'">
      <el-color-picker 
        v-model="element.options.defaultValue"
        :disabled="element.options.disabled"
        :show-alpha="element.options.showAlpha"
      ></el-color-picker>
    </template>

    <template v-if="element.type == 'select'">
      <el-select
        v-model="element.options.defaultValue"
        :disabled="element.options.disabled"
        :multiple="element.options.multiple"
        :clearable="element.options.clearable"
        :placeholder="element.options.placeholder"
        :style="{width: element.options.width}"
      >
        <el-option v-for="item in element.options.options" :key="item.value" :value="item.value" :label="element.options.showLabel?item.label:item.value"></el-option>
      </el-select>
    </template>

    <template v-if="element.type=='switch'">
      <el-switch
        v-model="element.options.defaultValue"
        :disabled="element.options.disabled"
      >
      </el-switch>
    </template>

    <template v-if="element.type=='slider'">
      <el-slider 
        v-model="element.options.defaultValue"
        :min="element.options.min"
        :max="element.options.max"
        :disabled="element.options.disabled"
        :step="element.options.step"
        :show-input="element.options.showInput"
        :range="element.options.range"
        :style="{width: element.options.width}"
      ></el-slider>
    </template>

    <!-- <template v-if="element.type=='imgupload'">
      <fm-upload
        v-model="element.options.defaultValue"
        :disabled="element.options.disabled"
        :style="{'width': element.options.width}"
        :width="element.options.size.width"
        :height="element.options.size.height"
        token="xxx"
        domain="xxx"
      >
        
      </fm-upload>
    </template> -->

    <template v-if="element.type == 'cascader'">
      <el-cascader
        v-model="element.options.defaultValue"
        :disabled="element.options.disabled"
        :clearable="element.options.clearable"
        :placeholder="element.options.placeholder"
        :style="{width: element.options.width}"
        :options="element.options.remoteOptions"
      >

      </el-cascader>
    </template>

    <!-- <template v-if="element.type == 'editor'">
      <fm-editor
        v-model="element.options.defaultValue"
        :width="element.options.width"
        :height="element.options.height"
      >

      </fm-editor>
    </template> -->

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
          textAlign: element.options.align,
          height:  element.options.height + 'px',
          lineHeight:  element.options.height + 'px',
          }"
      >
        {{element.name}}
      </div>
    </template>

    <template v-if="element.type === 'divider'">
      <el-divider :content-position="element.options.position">{{element.options.text}}</el-divider>
    </template>

    <template v-if="element.type=='blank'">
      <div style="height: 50px;color: #999;background: #eee;line-height:50px;text-align:center;">自定义区域</div>
    </template>

    <template v-if="element.type=='childTable'">
      <div style="height: 50px;color: #999;background: #eee;line-height:50px;text-align:center;">{{ element.name }}子表单</div>
    </template>

  </div>
</template>

<script>
// import FmUpload from './Upload'
// import FmEditor from './Editor/tinymce'
export default {
  props: ['element', 'select', 'index', 'data'],
  components: {
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
