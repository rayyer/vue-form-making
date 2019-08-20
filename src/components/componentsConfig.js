export const basicComponents = [
  {
    type: 'input',
    name: '单行文本',
    icon: 'icon-input',
    cols: 12,
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      dataType: 'string',
      pattern: '',
      placeholder: '',
      disabled: false,
      suffix: ''
    }
  },
  {
    type: 'textarea',
    name: '多行文本',
    icon: 'icon-diy-com-textarea',
    cols: 12,
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      disabled: false,
      pattern: '',
      placeholder: ''
    }
  },
  {
    type: 'number',
    name: '计数器',
    icon: 'icon-number',
    cols: 12,
    options: {
      width: '',
      required: false,
      defaultValue: 0,
      min: '',
      max: '',
      step: 1,
      disabled: false,
      controlsPosition: ''
    }
  },
  {
    type: 'radio',
    name: '单选框组',
    icon: 'icon-radio-active',
    cols: 12,
    options: {
      inline: true,
      defaultValue: '',
      showLabel: false,
      options: [
        {
          value: '选项1',
          // label: '选项1'
        },
        {
          value: '选项2',
          // label: '选项2'
        },
        {
          value: '选项3',
          // label: '选项3'
        }
      ],
      required: false,
      width: '',
      remote: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: '',
      disabled: false
    }
  },
  {
    type: 'checkbox',
    name: '多选框组',
    icon: 'icon-check-box',
    cols: 12,
    options: {
      inline: true,
      defaultValue: [],
      showLabel: false,
      options: [
        {
          value: '选项1'
        },
        {
          value: '选项2'
        },
        {
          value: '选项3'
        }
      ],
      required: false,
      width: '',
      remote: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: '',
      disabled: false
    }
  },
  {
    type: 'time',
    name: '时间选择器',
    icon: 'icon-time',
    cols: 12,
    options: {
      defaultValue: '21:19:56',
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: '',
      startPlaceholder: '',
      endPlaceholder: '',
      isRange: false,
      arrowControl: true,
      format: 'HH:mm:ss',
      required: false,
      width: ''
    }
  },
  {
    type: 'date',
    name: '日期选择器',
    icon: 'icon-date',
    cols: 12,
    options: {
      defaultValue: '',
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: '',
      startPlaceholder: '',
      endPlaceholder: '',
      type: 'date',
      format: 'yyyy-MM-dd',
      timestamp: false,
      required: false,
      width: ''
    }
  },
  {
    type: 'rate',
    name: '评分',
    icon: 'icon-icon-test',
    cols: 12,
    options: {
      defaultValue: null,
      max: 5,
      disabled: false,
      allowHalf: false,
      required: false
    }
  },
  {
    type: 'color',
    name: '颜色选择器',
    icon: 'icon-color',
    cols: 12,
    options: {
      defaultValue: '',
      disabled: false,
      showAlpha: false,
      required: false
    }
  },
  {
    type: 'select',
    name: '下拉选择框',
    icon: 'icon-select',
    cols: 12,
    options: {
      defaultValue: '',
      multiple: false,
      disabled: false,
      clearable: false,
      placeholder: '',
      required: false,
      showLabel: false,
      width: '',
      options: [
        {
          value: '下拉框1'
        },
        {
          value: '下拉框2'
        },{
          value: '下拉框3'
        }
      ],
      remote: false,
      filterable: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: ''
    }
  },
  {
    type: 'switch',
    name: '开关',
    icon: 'icon-switch',
    cols: 12,
    options: {
      defaultValue: false,
      required: false,
      disabled: false
    }
  },
  {
    type: 'slider',
    name: '滑块',
    icon: 'icon-slider',
    cols: 12,
    options: {
      defaultValue: 0,
      disabled: false,
      required: false,
      min: 0,
      max: 100,
      step: 1,
      showInput: false,
      range: false,
      width: ''
    }
  }
]

export const advanceComponents = [
  {
    type: 'childTable',
    name: '子表单',
    icon: 'icon-grid-',
    cols: 24,
    options: {
      defaultValue: []
    }
  },
  // {
  //   type: 'blank',
  //   name: '自定义',
  //   icon: 'icon-ic',
  //   cols: 24,
  //   options: {
  //     defaultType: 'Object'
  //   }
  // },
  // {
  //   type: 'imgupload',
  //   name: '图片',
  //   icon: 'icon-tupian',
  //   cols: 24,
  //   options: {
  //     defaultValue: [],
  //     size: {
  //       width: 100,
  //       height: 100,
  //     },
  //     width: '',
  //     tokenFunc: 'funcGetToken',
  //     token: '',
  //     domain: 'http://pfp81ptt6.bkt.clouddn.com/',
  //     disabled: false,
  //     length: 8,
  //     multiple: false,
  //     isQiniu: false,
  //     isDelete: false,
  //     min: 0,
  //     isEdit: false,
  //     action: 'https://jsonplaceholder.typicode.com/photos/'
  //   }
  // },
  // {
  //   type: 'editor',
  //   name: '编辑器',
  //   icon: 'icon-fuwenbenkuang',
  //   cols: 24,
  //   options: {
  //     defaultValue: '',
  //     width: ''
  //   }
  // },
  // {
  //   type: 'cascader',
  //   name: '级联选择器',
  //   icon: 'icon-jilianxuanze',
  //   cols: 12,
  //   options: {
  //     defaultValue: [],
  //     width: '',
  //     placeholder: '',
  //     disabled: false,
  //     clearable: false,
  //     remote: true,
  //     remoteOptions: [],
  //     props: {
  //       value: 'value',
  //       label: 'label',
  //       children: 'children'
  //     },
  //     remoteFunc: ''
  //   }
  // }
]

export const layoutComponents = [
  {
    type: 'text',
    name: '文本标签',
    icon: 'icon-fuwenbenkuang',
    cols: 24,
    options: {
      fontSize: '12',
      height: '50',
      fontWeight: 'normal',
      align: 'left'
    }
  },
  {
    type: 'image',
    name: '图片占位',
    icon: 'icon-tupian',
    cols: 24,
    options: {
      image_url:'http://6120491.s21i.faiusr.com/2/ABUIABACGAAg0725rAUoiLv9qAQwrAI4rAI.jpg',
      size: {
        width: '100',
        height: '100'
      }
    }
  },
  {
    type: 'divider',
    name: '分割线',
    icon: 'icon-tupian',
    cols: 24,
    options: {
      text: '',
      position: 'left'
    }
  }
  // {
  //   type: 'grid',
  //   name: '栅格布局',
  //   icon: 'icon-grid-',
  //   columns: [
  //     {
  //       span: 12,
  //       list: []
  //     },
  //     {
  //       span: 12,
  //       list: []
  //     }
  //   ],
  //   options: {
  //     gutter: 0,
  //     justify: 'start',
  //     align: 'top'
  //   }
  // }
]
