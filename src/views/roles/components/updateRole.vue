<template>
  <el-dialog
    :model-value="updateRoleVisible"
    title="Update Role"
    :before-close="updateRoleClose"
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
          <el-form-item label="权限" prop="permissions">
            <el-checkbox-group v-model="form.permissions">
              <el-checkbox
                v-for="permission in permissions"
                :key="permission.permissionId"
                :label="permission.permissionId"
              >
                {{ permission.permissionName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <el-button @click="updateRoleClose">Cancel</el-button>
        <el-button type="success" @click="handleConfirm(ruleFormRef)">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineEmits, ref, defineProps, watch } from 'vue'
import { editRole, getAllPermissions, getPermissionsByRoleId } from '@/api/role'
import { ElMessage } from 'element-plus'
const ruleFormRef = ref()
const form = ref({
  roleId: '',
  roleName: '',
  brief: '',
  permissions: []
})
const emit = defineEmits(['update:modelValue', 'initGetRoles'])
const props = defineProps({
  dialogUpdateRoleInfo: {
    type: Object,
    default: () => {}
  }
})
const permissions = ref({})
watch(
  () => props.dialogUpdateRoleInfo,
  () => {
    form.value = props.dialogUpdateRoleInfo
  },
  {
    deep: true,
    immediate: true
  }
)
const updateRoleClose = () => {
  emit('update:modelValue', false)
}
const handleConfirm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      console.log(form.value)
      editRole(form.value)
      ElMessage({
        message: 'success!',
        type: 'success'
      })
      emit('initGetRoles')
      updateRoleClose()
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
  const allPermissionRes = await getAllPermissions()
  permissions.value = allPermissionRes.data
  const nowRolesRes = await getPermissionsByRoleId(form.value.roleId)
  form.value.permissions = nowRolesRes.data
}
initRoles()
</script>

<style lang="scss" scoped></style>
