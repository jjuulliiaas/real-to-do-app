<template>
  <div class="home">
    <div class="decorative-circle"></div>
    <div class="decorative-corner"></div>
    <button class="logout-btn" @click="logout">Logout</button>
    <div class="content-container"></div>
    <h1 class="title">To-Do List</h1>
    <TaskList v-if="userId" />
    <div v-else class="auth-redirect">
      <p>Redirecting to sign up...</p>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import TaskList from '../components/TaskList.vue'
import { ref, onMounted } from 'vue'

const userId = ref('')

onMounted(() => {
  
  const hash = window.location.hash
  if (hash.includes('sub=')) {
    const id = hash.split('sub=')[1]
    if (id) {
      localStorage.setItem('userId', id)
      userId.value = id
      window.history.replaceState(null, '', '/') 
      return
    }
  }

  const storedId = localStorage.getItem('userId')
  if (storedId) {
    userId.value = storedId
  } else {
    const signupUrl = `https://eu-north-1ljpkahius.auth.eu-north-1.amazoncognito.com/signup?client_id=1kfpnbj6cv5q59uh02nenr2na5&response_type=code&scope=email+openid+phone&redirect_uri=https://j4akexqfyd.execute-api.eu-north-1.amazonaws.com/dev/callback`
    window.location.href = signupUrl
  }
})

const logout = () => {
  localStorage.removeItem('userId')
  const logoutUrl = `https://eu-north-1ljpkahius.auth.eu-north-1.amazoncognito.com/logout?client_id=1kfpnbj6cv5q59uh02nenr2na5&logout_uri=https://eu-north-1_lJPKahius.auth.eu-north-1.amazoncognito.com/signup?client_id=1kfpnbj6cv5q59uh02nenr2na5&response_type=code&scope=email+openid+phone&redirect_uri=https://j4akexqfyd.execute-api.eu-north-1.amazonaws.com/dev/callback`
  window.location.href = logoutUrl
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: 'Segoe UI', Arial, sans-serif;
  background: linear-gradient(135deg, #2c0b1a 0%, #1a0826 100%);
  min-height: 100vh;
  color: #ffe6f2;
  position: relative; 
}

.title {
  font-size: 3rem;
  font-weight: 800;
  margin: 30px 0 40px 0;
  text-align: center;
  color: #ffc2e2;
  text-shadow: 0 0 10px rgba(255, 194, 226, 0.5);
  letter-spacing: 1px;
}

.logout-btn {
  position: fixed;
  top: 30px; 
  right: 30px; 
  padding: 12px 25px;
  background: #ff4d94;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.1rem;
  box-shadow: 0 4px 15px rgba(255, 77, 148, 0.4);
  transition: all 0.3s ease;
  z-index: 10;
}

.logout-btn:hover {
  background: #ff0066;
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(255, 0, 102, 0.6);
}

.auth-redirect {
  position: absolute;
  top: 30px;
  right: 30px;
  color: #d8a2c7;
  font-style: italic;
  font-size: 1.1rem;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}

.decorative-circle {
  position: absolute;
  top: 20%;
  left: 15%;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: rgba(255, 182, 193, 0.15);
  filter: blur(15px);
  z-index: 0;
}

.decorative-corner {
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle at top right, rgba(255, 105, 180, 0.2) 0%, transparent 70%);
  filter: blur(10px);
  z-index: 0;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.title {
  animation: float 3s ease-in-out infinite;
}

.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  z-index: 5;
}
</style>