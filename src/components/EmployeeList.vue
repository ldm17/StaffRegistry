<template>
  <div class="employee-list">
    <el-text style="font-size: 20px; margin-bottom: 20px;" size="large">Список сотрудников</el-text>

    <el-input
      v-model="store.searchQuery"
      clearable
      placeholder="Введите имя, фамилию или отчество"
      style="width: 300px; margin-bottom: 20px;"
    >
      <template #prefix>
        <el-icon><Search /></el-icon>
      </template>
    </el-input>

    <div class="table-container">
      <el-table
        :data="store.paginatedEmployees"
        style="width: 500px;
        height: 100%"
        @row-click="handleRowClick"
      >
        <el-table-column label="ФИО" width="180">
          <template #default="scope: { row: Employee }">
          {{ scope.row.firstName }} {{ scope.row.lastName }} {{ scope.row.middleName }}
          </template>
        </el-table-column>
        <el-table-column prop="department" label="Департамент" width="180" />
        <el-table-column prop="post" label="Должность" />
      </el-table>
    </div>

    <div class="pagination-container">
      <el-pagination
        style="margin-top: 20px;"
        background
        layout="prev, pager, next"
        :total="store.filteredEmployees.length"
        :page-size="store.pageSize"
        :current-page="store.currentPage"
        @current-change="store.currentPage = $event"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEmployeeStore } from '../employeeStore';
import { Employee } from '../employeeStore';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

defineOptions({
  name: 'EmployeeList',
});

const store = useEmployeeStore();
const router = useRouter();

onMounted(() => {store.loadEmployees()})

const handleRowClick = (employee: Employee) => {
  router.push(`/employee/${employee.id}`)
}
</script>

<style lang="scss">
.employee-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.pagination-container {
  position: fixed;
  top: auto;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}
</style>