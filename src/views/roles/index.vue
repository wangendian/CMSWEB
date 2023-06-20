<template>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="7">
        <el-input
          placeholder="Please search name"
          clearable
          v-model="queryForm.queryName"
        ></el-input>
      </el-col>
      <el-button type="success" :icon="Search" @click="handSearch"
        >Search</el-button
      >
      <el-button type="success" :icon="Edit" v-show="perm" @click="handAdd"
        >Add</el-button
      >
    </el-row>
  </el-card>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="roleId" label="roleId" width="350" />
    <el-table-column prop="roleName" label="roleName" width="350" />
    <el-table-column prop="brief" label="brief" width="350" />
    <el-table-column fixed="right" label="操作" v-show="perm">
      <template #default="scope">
        <el-button
          link
          type="success"
          size="small"
          @click="handleUpdate(scope.row)"
          v-show="perm"
          >update</el-button
        >
        <el-button
          link
          type="success"
          size="small"
          @click="handleDelete(scope.row)"
          v-show="perm"
          >delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    v-model:current-page="queryForm.currentPage"
    v-model:page-size="queryForm.pageSize"
    :page-sizes="[2, 10, 20, 50, 100]"
    :small="small"
    :disabled="disabled"
    :background="background"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
  <addRole
    v-model="addRoleVisible"
    v-if="addRoleVisible"
    @initGetRoles="initGetRoles"
  />
  <updateRole
    v-model="updateRoleVisible"
    @initGetRoles="initGetRoles"
    v-if="updateRoleVisible"
    :dialogUpdateRoleInfo="dialogUpdateRoleInfo"
  />
</template>

<script setup>
import { ref } from 'vue'
import { Search, Edit } from '@element-plus/icons-vue'
import { getRoles, delRole } from '@/api/role'
import store from '@/store'
import addRole from './components/addRole.vue'
import updateRole from './components/updateRole.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
const perm = store.getters.perms.includes('systemInfoModification')
const queryForm = ref({
  queryName: '',
  currentPage: 1,
  pageSize: 10
})
const total = ref(0)
const tableData = ref([])
const addRoleVisible = ref(false)
const updateRoleVisible = ref(false)
const dialogUpdateRoleInfo = ref({})
const initGetRoles = async () => {
  const res = await getRoles(
    queryForm.value.queryName,
    queryForm.value.currentPage,
    queryForm.value.pageSize
  )
  total.value = res.data.totalElements
  tableData.value = res.data.content
}
initGetRoles()
const handSearch = () => {
  initGetRoles()
}
const handleSizeChange = () => {
  initGetRoles()
}
const handleCurrentChange = () => {
  initGetRoles()
}
const handAdd = () => {
  addRoleVisible.value = true
}
const handleUpdate = (row) => {
  updateRoleVisible.value = true
  dialogUpdateRoleInfo.value = JSON.parse(JSON.stringify(row))
}
const handleDelete = (row) => {
  console.log(row)
  ElMessageBox.confirm('Are you sure delete ?', 'Warning', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  })
    .then(async () => {
      await delRole(row.roleId.toString()).then((res) => {
        ElMessage({
          type: 'success',
          message: 'Delete completed'
        })
        initGetRoles()
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled'
      })
    })
}
</script>

<style lang="scss" scoped>
::v-deep .el-pagination {
  padding-top: 16px;
  box-sizing: border-box;
  text-align: right;
}
</style>
