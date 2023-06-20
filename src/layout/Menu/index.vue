<template>
  <el-menu
    :active-text-color="variables.menuActiveText"
    :background-color="variables.menuBg"
    class="el-menu-vertical-demo"
    :default-active="defaultActive"
    text-color="#fff"
    @open="handleOpen"
    @close="handleClose"
    router
  >
    <el-sub-menu index="1">
      <template #title>
        <span>首页</span>
      </template>
      <el-menu-item-group title="首页">
        <el-menu-item index="/hello">首页</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="2" v-show="perm">
      <template #title>
        <span>系统信息</span>
      </template>
      <el-menu-item-group title="用户管理">
        <el-menu-item index="/system/users">用户信息</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="角色管理">
        <el-menu-item index="/system/roles">角色信息</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="权限管理">
        <el-menu-item index="/system/permissions">权限信息</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import store from '@/store'
import variables from '@/styles/variables.module.scss'
import { ref } from 'vue'
const defaultActive = ref('/hello"')
const perm = store.getters.perms.includes('systemInfoView')
</script>

<style lang="scss" scoped></style>
