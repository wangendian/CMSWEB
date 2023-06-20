<template>
  <el-dialog
    :model-value="updateUserVisible"
    title="Update User"
    :before-close="updateUserClose"
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
          <el-form-item label="角色" prop="roles">
            <el-checkbox-group v-model="form.roles">
              <el-checkbox
                v-for="role in roles"
                :key="role.roleId"
                :label="role.roleId"
              >
                {{ role.roleName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <el-button @click="updateUserClose">Cancel</el-button>
        <el-button type="success" @click="handleConfirm(ruleFormRef)">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineEmits, ref, defineProps, watch } from 'vue'
import { editUser, getAllRoles, getRolesByUserId } from '@/api/user'
import { ElMessage } from 'element-plus'
const ruleFormRef = ref()
const form = ref({
  userId: '',
  name: '',
  phoneNumber: '',
  password: '',
  roles: []
})
const emit = defineEmits(['update:modelValue', 'initGetUsers'])
const props = defineProps({
  dialogUpdateUserInfo: {
    type: Object,
    default: () => {}
  }
})
const roles = ref({})
watch(
  () => props.dialogUpdateUserInfo,
  () => {
    form.value = props.dialogUpdateUserInfo
  },
  {
    deep: true,
    immediate: true
  }
)
const updateUserClose = () => {
  emit('update:modelValue', false)
}
const handleConfirm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      console.log(form.value)
      editUser(form.value)
      ElMessage({
        message: 'success!',
        type: 'success'
      })
      emit('initGetUsers')
      updateUserClose()
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
const initRoles = async () => {
  const allRolesRes = await getAllRoles()
  roles.value = allRolesRes.data
  const nowRolesRes = await getRolesByUserId(form.value.userId)
  form.value.roles = nowRolesRes.data
}
initRoles()
</script>

<style lang="scss" scoped></style>
