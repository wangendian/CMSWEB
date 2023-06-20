<template>
  <el-dialog
    :model-value="addUserVisible"
    title="Add User"
    :before-close="addUserClose"
  >
    <template #footer>
      <span class="dialog-footer">
        <el-form
          ref="ruleFormRef"
          label-position="top"
          label-width="100px"
          :model="form"
          style="max-width: 460px"
          :rules="rules"
        >
          <el-form-item label="用户名" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="电话号码" prop="phoneNumber">
            <el-input v-model="form.phoneNumber" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" />
          </el-form-item>
        </el-form>
        <el-button @click="addUserClose">Cancel</el-button>
        <el-button type="success" @click="handleConfirm(ruleFormRef)">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineEmits, ref } from 'vue'
import { addUser } from '@/api/user'
import { ElMessage } from 'element-plus'
const ruleFormRef = ref()
const form = ref({
  userId: '',
  name: '',
  phoneNumber: '',
  password: ''
})
const emit = defineEmits(['update:modelValue', 'initGetUsers'])
const addUserClose = () => {
  emit('update:modelValue', false)
}
const handleConfirm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      console.log(form.value)
      addUser(form.value)
      ElMessage({
        message: 'success!',
        type: 'success'
      })
      emit('initGetUsers')
      addUserClose()
    } else {
      console.log('error submit!', fields)
    }
  })
}

const rules = ref({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
  ],
  phoneNumber: [
    {
      required: true,
      message: 'Please input phone number',
      trigger: 'change'
    }
  ],
  password: [
    {
      required: true,
      message: 'Please input password',
      trigger: 'change'
    }
  ]
})
</script>

<style lang="scss" scoped></style>
