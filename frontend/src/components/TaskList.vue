<template>
  <div class="task-list">
    <h2>My Tasks</h2>
    
    <div class="add-task">
      <input v-model="newTask" placeholder="Add new task..." @keyup.enter="add" />
      <button class="add-btn" @click="add">Add+</button>
    </div>
    
    <ul>
      <li v-for="task in tasks" :key="task.taskId" :class="{ done: task.completed }">
        <span>{{ task.title }}</span>
        <div class="buttons-container">
          <button class="toggle-btn" @click="toggle(task)">
            {{ task.completed ? '↩ Undo' : '✓ Done' }}
          </button>
          <button class="delete-btn" @click="remove(task)">✕ Delete</button>
        </div>
      </li>
    </ul>
    
  </div>
  
  <div class="decorative-element"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface Task {
  taskId: string
  title: string
  description?: string
  completed: boolean
  createdAt: string
}

const apiBase = "https://j4akexqfyd.execute-api.eu-north-1.amazonaws.com/dev"
const tasks = ref<Task[]>([])
const newTask = ref('')

const userId = localStorage.getItem('userId') || ''

const fetchTasks = async () => {
  if (!userId) return
  const res = await axios.get(`${apiBase}/getUserTasks`, { params: { userId } })
  tasks.value = res.data
}

const add = async () => {
  if (!newTask.value.trim() || !userId) return
  await axios.post(`${apiBase}/addTask`, { userId, title: newTask.value })
  newTask.value = ''
  fetchTasks()
}

const toggle = async (task: Task) => {
  if (!userId) return
  await axios.put(`${apiBase}/updateTask`, { userId, taskId: task.taskId, completed: !task.completed })
  fetchTasks()
}

const remove = async (task: Task) => {
  if (!userId) return
  await axios.post(`${apiBase}/deleteTask`, { userId, taskId: task.taskId })
  fetchTasks()
}

onMounted(fetchTasks)
</script>

<style scoped>
.task-list {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background: rgba(40, 12, 30, 0.8);
  backdrop-filter: blur(10px);
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  position: absolute;
  bottom: 30px; 
  left: 50%;
  transform: translateX(-50%);
  box-sizing: border-box;
  z-index: 10;
  border: 1px solid rgba(255, 182, 193, 0.3);
}

h2 {
  text-align: center;
  margin: 0 0 25px 0;
  font-size: 2.2rem;
  color: #ffb6e1; 
  text-shadow: 0 0 10px rgba(255, 182, 225, 0.4);
}

ul {
  list-style: none;
  padding: 0;
  max-height: 50vh; 
  overflow-y: auto;
  margin-bottom: 25px;
}

li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  margin: 12px 0;
  background: rgba(70, 20, 50, 0.5);
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 182, 193, 0.2);
}

li:hover {
  background: rgba(90, 30, 65, 0.7);
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

li span {
  flex-grow: 1;
  color: #ffe6f2;
  font-size: 1.1rem;
  padding-right: 15px;
}

li.done span {
  text-decoration: line-through;
  color: #d8a2c7; 
}

.buttons-container {
  display: flex;
  gap: 10px;
}

.toggle-btn, .delete-btn, .add-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.toggle-btn {
  background: linear-gradient(145deg, #ff85b3, #ff4d94); 
  color: white;
}

.toggle-btn:hover {
  background: linear-gradient(145deg, #ff4d94, #ff0066);
  transform: scale(1.05);
}

.delete-btn {
  background: linear-gradient(145deg, #ff6b6b, #ff2b2b);
  color: white;
}

.delete-btn:hover {
  background: linear-gradient(145deg, #ff2b2b, #cc0000);
  transform: scale(1.05);
}

.add-task {
  display: flex;
  margin-top: 0; 
  margin-bottom: 30px;
  gap: 12px;
}

input {
  flex: 1;
  padding: 14px 20px;
  border: none;
  border-radius: 12px;
  background: rgba(50, 15, 35, 0.7);
  color: #ffe6f2;
  font-size: 1.1rem;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.3);
}

input:focus {
  outline: none;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.3), 0 0 0 2px #ff85b3;
}

input::placeholder {
  color: #d8a2c7;
}

.add-btn {
  background: linear-gradient(145deg, #ff9aed, #ff5be1);
  color: white;
  font-weight: bold;
  font-size: 1.1rem;
  padding: 0 25px;
}

.add-btn:hover {
  background: linear-gradient(145deg, #ff5be1, #ff00cc);
  transform: scale(1.05);
}

.logout-btn {
  position: fixed;
  top: 30px;
  right: 30px;
  padding: 12px 25px;
  background: linear-gradient(145deg, #ff4d94, #ff0066);
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.1rem;
  box-shadow: 0 4px 15px rgba(255, 0, 102, 0.5);
  transition: all 0.3s ease;
  z-index: 20;
}

.logout-btn:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 20px rgba(255, 0, 102, 0.7);
}

/* Декоративні елементи фону */
.decorative-element {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 300px;
  background: radial-gradient(ellipse at center, rgba(255, 105, 180, 0.15) 0%, transparent 70%);
  z-index: 0;
  pointer-events: none;
}

/* Смуга прокрутки */
ul::-webkit-scrollbar {
  width: 8px;
}

ul::-webkit-scrollbar-track {
  background: rgba(40, 12, 30, 0.5);
  border-radius: 4px;
}

ul::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #ff85b3, #ff4d94);
  border-radius: 4px;
}
</style>