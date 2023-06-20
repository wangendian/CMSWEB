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
    <el-table-column prop="userId" label="userId" width="350" />
    <el-table-column prop="name" label="userName" width="350" />
    <el-table-column prop="phoneNumber" label="phoneNumber" width="350" />
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
  <addUser
    v-model="addUserVisible"
    v-if="addUserVisible"
    @initGetUsers="initGetUsers"
  />
  <updateUser
    v-model="updateUserVisible"
    @initGetUsers="initGetUsers"
    v-if="updateUserVisible"
    :dialogUpdateUserInfo="dialogUpdateUserInfo"
  />
</template>

<script setup>
import { ref } from 'vue'
import { Search, Edit } from '@element-plus/icons-vue'
import { getUsers, delUser } from '@/api/user'
import store from '@/store'
import addUser from './components/addUser.vue'
import updateUser from './components/updateUser.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
const perm = store.getters.perms.includes('systemInfoModification')
const queryForm = ref({
  queryName: '',
  currentPage: 1,
  pageSize: 10
})
const total = ref(0)
const tableData = ref([])
const addUserVisible = ref(false)
const updateUserVisible = ref(false)
const dialogUpdateUserInfo = ref({})
const initGetUsers = async () => {
  const res = await getUsers(
    queryForm.value.queryName,
    queryForm.value.currentPage,
    queryForm.value.pageSize
  )
  console.log(res)
  total.value = res.data.totalElements
  tableData.value = res.data.content
}
initGetUsers()
const handSearch = () => {
  initGetUsers()
}
const handleSizeChange = () => {
  initGetUsers()
}
const handleCurrentChange = () => {
  initGetUsers()
}
const handAdd = () => {
  addUserVisible.value = true
}
const handleUpdate = (row) => {
  updateUserVisible.value = true
  dialogUpdateUserInfo.value = JSON.parse(JSON.stringify(row))
}
const handleDelete = (row) => {
  console.log(row)
  ElMessageBox.confirm('Are you sure delete ?', 'Warning', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  })
    .then(async () => {
      await delUser(row.userId.toString()).then((res) => {
        ElMessage({
          type: 'success',
          message: 'Delete completed'
        })
        initGetUsers()
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled'
      })
    })
}

console.log(store.getters.perms)
console.log(perm)
</script>

<style lang="scss" scoped>
::v-deep .el-pagination {
  padding-top: 16px;
  box-sizing: border-box;
  text-align: right;
}
</style>
