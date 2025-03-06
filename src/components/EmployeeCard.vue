<template>
  <div class="employee-card" v-if="employee">
    <el-card>
      <div class="employee-content">

        <div class="photo-container">
          <img 
            :src="photoSrc" 
            alt="Фото сотрудника"
            class="photo-container__image"
          />
        </div>

        <div class="employee-info">
          <el-descriptions class="description-custom" :column="1">
            <el-descriptions-item label="Фамилия" class="force-text-wrap">{{ employee.lastName }}</el-descriptions-item>
            <el-descriptions-item label="Имя" class="force-text-wrap">{{ employee.firstName }}</el-descriptions-item>
            <el-descriptions-item label="Отчество" class="force-text-wrap">{{ employee.middleName }}</el-descriptions-item>
            <el-descriptions-item label="Дата рождения"> {{ formattedBirthDate }}</el-descriptions-item>
            <el-descriptions-item label="Департамент">{{ employee.department }}</el-descriptions-item>
            <el-descriptions-item label="Должность">{{ employee.post }}</el-descriptions-item>
          </el-descriptions>
        </div>

      </div>
    </el-card>
  </div>
  <div v-else>
    <div class="text-error">
      <el-text size="large">Сотрудник не найден</el-text>
    </div>
  </div>

  <div class="employee-footer">
    <el-button @click="router.push('/')" size="large">На главную</el-button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useEmployeeStore } from '../EmployeeStore';
import { Employee } from '../EmployeeStore';
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

const formattedBirthDate = computed(() =>
  employee.value?.birthDate ? new Date(employee.value.birthDate).toLocaleString() : ''
);

const photoSrc = computed(() => 
  employee.value?.photo ? `data:image/jpeg;base64,${employee.value.photo}` : '/placeholder-employee.jpg'
);
</script>

<style lang="scss">
.employee-card {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;

  .el-card {
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    max-width: 700px;
    margin: 20px auto;
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

    .photo-container__image {
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

    .el-descriptions.description-custom {
      width: 100%;
      
      & .el-descriptions__header {
        margin-bottom: 15px;
        font-size: 18px;
      }

      & .el-descriptions__body {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      & .el-descriptions__table {
        tbody {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
      }

      & .el-descriptions__row {
        display: block;
        margin-bottom: 8px;
      }

      & .el-descriptions__label {
        display: inline-block;
        width: 140px;
        font-weight: 600;
        color: #606266;
      }

      & .el-descriptions__content {
        display: inline-block;
        color: #303133;
        font-size: 16px;
      }
    }
  }
}

.employee-footer {
  text-align: center;
}

.text-error {
  text-align: center;
  margin: 10px;
}
</style>