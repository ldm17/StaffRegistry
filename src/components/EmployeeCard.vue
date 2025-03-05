<template>
  <div class="employee-card" v-if="employee">
    <el-card style="max-width: 650px; margin: 20px auto;">
      <div class="employee-content">

        <div class="photo-container">
          <img 
            :src="photoSrc" 
            alt="Фото сотрудника"
            class="employee-photo"
          />
        </div>

        <div class="employee-info">
          <el-descriptions :column="1">
            <el-descriptions-item label="ФИО">{{ fullName }}</el-descriptions-item>
            <el-descriptions-item label="Дата рождения"> {{ formattedBirthDate }}</el-descriptions-item>
            <el-descriptions-item label="Департамент">{{ employee.department }}</el-descriptions-item>
            <el-descriptions-item label="Должность">{{ employee.post }}</el-descriptions-item>
          </el-descriptions>
        </div>

      </div>
    </el-card>
    
    <el-button @click="goBack">Назад</el-button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useEmployeeStore } from '../employeeStore';
import { Employee } from '../employeeStore';
import { useRouter } from 'vue-router';

defineOptions({
  name: 'EmployeeCard',
});

const props = defineProps<{
  id: string;
}>();

const store = useEmployeeStore();
const router = useRouter();

const employee = computed<Employee | undefined>(() => 
  store.employees.find(e => e.id === Number(props.id))
);

const fullName = computed(() =>
  `${employee.value?.firstName} ${employee.value?.lastName} ${employee.value?.middleName}`
);

const formattedBirthDate = computed(() =>
  employee.value?.birthDate ? new Date(employee.value.birthDate).toLocaleString() : ''
);

const photoSrc = computed(() => 
  employee.value?.photo ? `data:image/jpeg;base64,${employee.value.photo}` : '/placeholder-employee.jpg'
);

const goBack = () => {
  router.push('/');
};
</script>

<style lang="scss">
.employee-card {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;

  .el-card {
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .employee-content {
    display: flex;
    align-items: flex-start;
    gap: 30px;
    padding: 20px;
  }

  .photo-container {
    flex-shrink: 0;
    width: 200px;
    height: 250px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    .employee-photo {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
    }
  }

  .employee-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;

    .el-descriptions {
      width: 100%;
      
      &__header {
        margin-bottom: 15px;
        font-size: 18px;
      }

      &__body {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      &__table {
        tbody {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
      }

      &__row {
        display: block;
        margin-bottom: 8px;
      }

      &__label {
        display: inline-block;
        width: 140px;
        font-weight: 600;
        color: #606266;
      }

      &__content {
        display: inline-block;
        color: #303133;
        font-size: 16px;
      }
    }
  }

  .el-button {
    margin-top: 25px;
    font-size: 16px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>