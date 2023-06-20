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
    </el-row>
  </el-card>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="permissionId" label="permissionId" width="350" />
    <el-table-column prop="permissionName" label="permissionName" width="350" />
    <el-table-column
      prop="type"
      label="type"
      width="350"
      :formatter="typeFormat"
    />
    <el-table-column prop="brief" label="brief" width="500" />
    <el-table-column fixed="right" label="操作" v-show="perm">
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
</template>

<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { getPermissions } from '@/api/permission'
import store from '@/store'
const perm = store.getters.perms.includes('systemInfoModification')
const queryForm = ref({
  queryName: '',
  currentPage: 1,
  pageSize: 10
})
const total = ref(0)
const tableData = ref([])
const initGetPermissions = async () => {
  const res = await getPermissions(
    queryForm.value.queryName,
    queryForm.value.currentPage,
    queryForm.value.pageSize
  )
  console.log(res)
  total.value = res.data.totalElements
  tableData.value = res.data.content
}
initGetPermissions()
const handSearch = () => {
  initGetPermissions()
}
const handleSizeChange = () => {
  initGetPermissions()
}
const handleCurrentChange = () => {
  initGetPermissions()
}

const typeFormat = (row, column) => {
  if (row.type === 0) {
    return '菜单权限'
  } else {
    return '按钮权限'
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-pagination {
  padding-top: 16px;
  box-sizing: border-box;
  text-align: right;
}
</style>
