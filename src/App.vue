<template>
  <div v-if="store.error" class="network-error-block">
    <el-alert title="Ошибка при загрузке данных" type="error" />
  </div>
  <div v-loading.fullscreen.lock="store.isLoading">
    <router-view v-if="!store.isLoading"></router-view>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useEmployeeStore } from './EmployeeStore';

const store = useEmployeeStore();

onMounted(() => {store.loadEmployees()})
</script>

<style lang="scss">
.network-error-block {
  margin: 10px auto;
  max-width: 600px;
}
</style>
