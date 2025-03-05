import { defineStore } from 'pinia'

export interface Employee {
  id: number
  firstName: string
  lastName: string
  middleName: string
  birthDate: string
  department: string
  post: string
  salary: number
  photo?: string
}

export const useEmployeeStore = defineStore('employee', {
  state: () => ({
    employees: [] as Employee[],
    searchQuery: '',
    currentPage: 1,
    pageSize: 10,
    isLoading: false,
    error: null as string | null,
  }),

  actions: {
    async loadEmployees() {
      this.isLoading = true
      this.error = null
      try {
        const response = await fetch('/data.json')
        if (!response.ok) throw new Error('Ошибка загрузки данных')
        this.employees = await response.json()
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Неизвестная ошибка'
      } finally {
        this.isLoading = false
      }
    },
  },

  getters: {
    filteredEmployees(state): Employee[] {
      const query = state.searchQuery.toLowerCase()
      return state.employees.filter(employee =>
        `${employee.firstName} ${employee.lastName} ${employee.middleName}`
          .toLowerCase().includes(query)
      )
    },

    paginatedEmployees(state): Employee[] {
      const start = (state.currentPage - 1) * state.pageSize
      const end = start + state.pageSize
      return this.filteredEmployees.slice(start, end)
    },
  },
})