<template>
  <el-dialog
    :model-value="addRoleVisible"
    title="Add Role"
    :before-close="addRoleClose"
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
          <el-form-item label="角色名" prop="roleName">
            <el-input v-model="form.roleName" />
          </el-form-item>
          <el-form-item label="角色简介" prop="brief">
            <el-input v-model="form.brief" />
          </el-form-item>
        </el-form>
        <el-button @click="addRoleClose">Cancel</el-button>
        <el-button type="success" @click="handleConfirm(ruleFormRef)">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineEmits, ref } from 'vue'
import { addRole } from '@/api/role'
import { ElMessage } from 'element-plus'
const ruleFormRef = ref()
const form = ref({
  roleId: '',
  roleName: '',
  brief: ''
})
const emit = defineEmits(['update:modelValue', 'initGetRoles'])
const addRoleClose = () => {
  emit('update:modelValue', false)
}
const handleConfirm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      console.log(form.value)
      addRole(form.value)
      ElMessage({
        message: 'success!',
        type: 'success'
      })
      emit('initGetRoles')
      addRoleClose()
    } else {
      console.log('error submit!', fields)
    }
  })
}

const rules = ref({
  roleName: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
  ],
  brief: [
    {
      required: true,
      message: 'Please input brief',
      trigger: 'change'
    }
  ]
})
emit('initGetRoles')
</script>

<style lang="scss" scoped></style>
