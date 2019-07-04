<template>
  <fm-making-form ref="makingForm" upload preview generate-json clearable>
    <template slot="action" slot-scope="props">
      <el-button type="text" size="medium" icon="el-icon-document" @click="handleSubmitForm(props.formData)">保存表单</el-button>
    </template>
  </fm-making-form>
</template>

<script>

import request from '../util/request.js'
export default {
  mounted () {
  },
  methods: {
    handleSubmitForm (formData) {
      // console.log(formData)
      request.post('/user', formData)
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
