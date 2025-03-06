<template>
  <div class="employee-list">
    <el-text class="text-custom" size="large">Список сотрудников</el-text>

    <el-input
      class="input-custom"
      v-model="store.searchQuery"
      clearable
      placeholder="Введите имя, фамилию или отчество"
    >
      <template #prefix>
        <el-icon><Search /></el-icon>
      </template>
    </el-input>

    <div>
      <el-table
        class="table-custom"
        :data="store.paginatedEmployees"
        @row-click="handleRowClick"
      >
        <el-table-column label="ФИО" width="180">
          <template #default="scope: { row: Employee }">
          {{ scope.row.lastName }} {{ scope.row.firstName }} {{ scope.row.middleName }}
          </template>
        </el-table-column>
        <el-table-column prop="department" label="Департамент" width="180" />
        <el-table-column prop="post" label="Должность" />
      </el-table>
    </div>

    <div class="pagination-container">
      <el-pagination
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
import { useEmployeeStore } from '../EmployeeStore';
import { Employee } from '../EmployeeStore';
import { useRouter } from 'vue-router';

defineOptions({
  name: 'EmployeeList',
});

const store = useEmployeeStore();
const router = useRouter();

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

.el-text.text-custom {
  font-size: 20px; 
  margin-bottom: 20px;
}

.el-input.input-custom {
  width: 300px;
  margin-bottom: 20px;
}

.el-table.table-custom {
  width: 500px;
  height: 100%
}

.pagination-container {
  position: fixed;
  top: auto;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  padding-top: 20px;
}
</style>