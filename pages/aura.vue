<template>
  <div class="min-h-screen cyber-neural-grid">
    <!-- Floating Particles Background -->
    <div class="floating-particles">
      <div v-for="n in 50" :key="n" class="particle" :style="getParticleStyle(n)"></div>
    </div>

    <!-- Holographic Header -->
    <header class="relative z-20 p-6">
      <div class="container mx-auto">
        <div class="holo-panel p-8 backdrop-blur-xl">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-6">
              <div class="relative">
                <div class="w-16 h-16 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-cyan-500/50">
                  <Cpu class="w-8 h-8 text-white animate-pulse" />
                </div>
                <div class="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-3xl opacity-20 animate-pulse-ring"></div>
              </div>
              <div>
                <h1 class="text-4xl font-black bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent cyber-font">
                  FRIENDNET AI
                </h1>
                <p class="text-cyan-300 text-lg font-medium tracking-wide">Neural Friend Recognition System v1.0</p>
              </div>
            </div>
            <div class="flex items-center space-x-6">
              <div class="text-right">
                <div class="text-sm text-gray-400 uppercase tracking-wider">System Status</div>
                <div class="flex items-center space-x-3 mt-1">
                  <div class="relative">
                    <div class="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                    <div class="absolute inset-0 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
                  </div>
                  <span class="text-cyan-300 font-semibold">ONLINE</span>
                </div>
              </div>
              <div class="neural-activity">
                <Activity class="w-6 h-6 text-cyan-400 animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="container mx-auto p-6 space-y-10 relative z-10">
      <!-- Quantum Model Selection Panel -->
      <div class="holo-panel p-8 border-l-4 border-cyan-400">
        <h2 class="text-2xl font-bold mb-6 flex items-center cyber-font">
          <Brain class="w-7 h-7 mr-3 text-purple-400 animate-pulse" />
          DEEP NEURAL NETWORK MATRIX
          <Sparkles class="w-5 h-5 ml-3 text-cyan-400 animate-spin" />
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div 
            v-for="model in availableModels" 
            :key="model.id"
            class="relative group cursor-pointer transform transition-all duration-500 hover:scale-105"
            @click="toggleModel(model.id)"
          >
            <div 
              class="relative p-6 rounded-2xl border-2 transition-all duration-500 backdrop-blur-lg"
              :class="selectedModels.includes(model.id) 
                ? 'border-cyan-400 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 shadow-2xl shadow-cyan-500/30 neural-glow' 
                : 'border-gray-600 bg-gray-900/60 hover:border-gray-400 hover:bg-gray-800/70'"
            >
              <!-- Neural Activity Indicator -->
              <div class="absolute -top-2 -right-2">
                <div 
                  v-if="selectedModels.includes(model.id)"
                  class="w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center animate-pulse-glow"
                >
                  <Check class="w-3 h-3 text-white" />
                </div>
                <div 
                  v-else
                  class="w-6 h-6 border-2 border-gray-400 rounded-full hover:border-cyan-400 transition-colors"
                ></div>
              </div>

              <div class="flex items-center justify-between mb-4">
                <component 
                  :is="model.icon" 
                  class="w-8 h-8 text-cyan-400 animate-pulse" 
                />
                <div class="text-right">
                  <div class="text-xs text-gray-400 uppercase tracking-wide">Speed</div>
                  <div class="text-sm font-bold text-cyan-300">{{ model.speed }}</div>
                </div>
              </div>
              
              <h3 class="font-bold text-lg mb-2 cyber-font">{{ model.name }}</h3>
              <p class="text-sm text-gray-300 mb-4 leading-relaxed">{{ model.description }}</p>
              
              <!-- Neural Accuracy Display -->
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-xs text-gray-400 uppercase tracking-wide">Neural Accuracy</span>
                  <span class="text-sm font-bold text-cyan-300">{{ model.accuracy }}%</span>
                </div>
                <div class="relative w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                  <div 
                    class="neural-progress-bar h-full rounded-full transition-all duration-1000"
                    :style="`width: ${model.accuracy}%; background: linear-gradient(90deg, #00f5ff, #bd00ff, #ff0080)`"
                  ></div>
                  <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                </div>
              </div>

              <!-- Holographic Border -->
              <div 
                v-if="selectedModels.includes(model.id)"
                class="absolute inset-0 rounded-2xl border-2 border-cyan-400 opacity-50 animate-pulse-border pointer-events-none"
              ></div>
            </div>
            
            <!-- Neural Connection Lines -->
            <div 
              v-if="selectedModels.includes(model.id)"
              class="absolute inset-0 rounded-2xl neural-connections pointer-events-none"
            ></div>
          </div>
        </div>
        
        <div class="flex justify-between items-center mt-8 p-4 bg-gray-900/50 rounded-xl backdrop-blur">
          <button 
            @click="selectAllModels"
            class="quantum-button-secondary"
          >
            <Shield class="w-4 h-4 mr-2" />
            Activate All Neural Networks
          </button>
          <div class="text-sm text-cyan-300 font-medium">
            {{ selectedModels.length }} Neural Network{{ selectedModels.length !== 1 ? 's' : '' }} Active
          </div>
        </div>
      </div>

      <!-- Quantum Upload Portal -->
      <div class="holo-panel p-8 border-l-4 border-purple-400">
        <h2 class="text-2xl font-bold mb-6 flex items-center cyber-font">
          <Upload class="w-7 h-7 mr-3 text-cyan-400 animate-bounce" />
          DEEP IMAGE ANALYSIS PORTAL
          <div class="ml-3 flex space-x-1">
            <div class="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <div class="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style="animation-delay: 0.2s"></div>
            <div class="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style="animation-delay: 0.4s"></div>
          </div>
        </h2>
        
        <div 
          class="relative border-3 border-dashed border-gray-600 rounded-3xl p-12 text-center transition-all duration-500 backdrop-blur-lg quantum-portal"
          :class="{ 
            'border-cyan-400 bg-cyan-500/10 neural-scan-active': isDragging,
            'neural-processing': isProcessing
          }"
          @dragover.prevent="isDragging = true"
          @dragleave.prevent="isDragging = false"
          @drop.prevent="handleDrop"
        >
          <input 
            ref="fileInput"
            type="file" 
            accept="image/*" 
            @change="handleFileSelect"
            class="hidden"
          >
          
          <!-- Empty State -->
          <div v-if="!selectedFile && !isProcessing" class="space-y-6">
            <div class="relative">
              <ImageIcon class="w-24 h-24 mx-auto text-gray-400 mb-6" />
              <div class="absolute inset-0 w-24 h-24 mx-auto border-4 border-cyan-400/20 rounded-full animate-spin-slow"></div>
            </div>
            <div>
              <p class="text-2xl font-bold mb-3 cyber-font">NEURAL SCAN PORTAL</p>
              <p class="text-gray-300 mb-6 text-lg">Drop your image data here</p>
              <div class="text-cyan-300 text-sm mb-6">--- OR ---</div>
              <button 
                @click="$refs.fileInput.click()"
                class="quantum-button-primary"
              >
                <Upload class="w-5 h-5 mr-3" />
                Initialize Upload Sequence
              </button>
            </div>
          </div>
          
          <!-- File Preview -->
          <div v-else-if="selectedFile && !isProcessing" class="space-y-6">
            <div class="relative inline-block">
              <img 
                :src="imagePreview" 
                alt="Neural scan target"
                class="max-w-sm max-h-80 mx-auto rounded-2xl shadow-2xl shadow-cyan-500/30 border-2 border-cyan-400/50"
              >
              <div class="absolute inset-0 rounded-2xl bg-gradient-to-tr from-cyan-400/20 to-purple-400/20 pointer-events-none"></div>
            </div>
            <div class="space-y-2">
              <p class="font-bold text-xl cyber-font">{{ selectedFile.name }}</p>
              <p class="text-cyan-300">{{ formatFileSize(selectedFile.size) }}</p>
            </div>
            <div class="flex space-x-4 justify-center">
              <button 
                @click="analyzeImage"
                :disabled="!selectedModels.length"
                class="quantum-button-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Zap class="w-5 h-5 mr-3" />
                INITIATE NEURAL SCAN
              </button>
              <button 
                @click="clearFile"
                class="quantum-button-secondary"
              >
                <span class="mr-2">⚡</span>
                Reset Portal
              </button>
            </div>
          </div>
          
          <!-- Processing State -->
          <div v-else-if="isProcessing" class="space-y-8">
            <div class="relative">
              <div class="w-32 h-32 mx-auto relative">
                <!-- Outer Ring -->
                <div class="absolute inset-0 border-4 border-cyan-400/30 rounded-full"></div>
                <!-- Spinning Ring -->
                <div class="absolute inset-0 border-4 border-transparent border-t-cyan-400 border-r-purple-400 rounded-full animate-spin"></div>
                <!-- Inner Glow -->
                <div class="absolute inset-4 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full animate-pulse"></div>
                <!-- Center Icon -->
                <Brain class="w-16 h-16 absolute inset-0 m-auto text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div class="space-y-4">
              <p class="text-2xl font-bold cyber-font">DEEP ANALYSIS IN PROGRESS</p>
              <p class="text-cyan-300 text-lg">{{ processingMessage }}</p>
              <!-- Neural Progress Bar -->
              <div class="w-full max-w-md mx-auto bg-gray-800 rounded-full h-4 overflow-hidden border border-cyan-400/30">
                <div 
                  class="neural-progress-bar h-full transition-all duration-500"
                  :style="`width: ${processingProgress}%; background: linear-gradient(90deg, #00f5ff, #bd00ff, #ff0080)`"
                ></div>
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </div>
              <div class="text-cyan-300 font-mono text-lg">{{ processingProgress }}% COMPLETE</div>
            </div>
          </div>

          <!-- Quantum Portal Effects -->
          <div class="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden">
            <div class="quantum-ripples"></div>
          </div>
        </div>
      </div>

      <!-- Quantum Results Matrix -->
      <div v-if="predictions" class="holo-panel p-8 border-l-4 border-green-400">
        <h2 class="text-2xl font-bold mb-8 flex items-center cyber-font">
          <BarChart3 class="w-7 h-7 mr-3 text-green-400 animate-pulse" />
          DEEP NEURAL PREDICTIONS MATRIX
          <div class="ml-4 px-3 py-1 bg-green-500/20 rounded-full text-sm font-medium text-green-300 border border-green-400/30">
            ANALYSIS COMPLETE
          </div>
        </h2>
        
        <!-- Quantum Ensemble Result -->
        <div v-if="predictions.ensemble" class="mb-10 p-8 bg-gradient-to-br from-green-600/20 via-cyan-600/20 to-purple-600/20 rounded-3xl border-2 border-green-400/40 backdrop-blur-lg quantum-result-glow">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold flex items-center cyber-font">
              <Cpu class="w-6 h-6 mr-3 text-green-400 animate-pulse" />
              DEEP ENSEMBLE PREDICTION
            </h3>
            <div class="px-4 py-2 bg-green-500/30 rounded-full border border-green-400/50">
              <span class="text-sm font-bold text-green-300">
                Confidence: {{ (predictions.ensemble.confidence * 100).toFixed(1) }}%
              </span>
            </div>
          </div>
          <div class="text-center mb-6">
            <div class="text-5xl font-black text-transparent bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text mb-4 cyber-font animate-pulse">
              {{ predictions.ensemble.predicted_class.toUpperCase() }}
            </div>
            <div class="text-2xl text-green-300 font-bold">
              {{ (predictions.ensemble.max_probability * 100).toFixed(1) }}% Neural Certainty
            </div>
          </div>
          <!-- Quantum Confidence Visualization -->
          <div class="w-full max-w-md mx-auto bg-gray-800 rounded-full h-6 overflow-hidden border-2 border-green-400/30">
            <div 
              class="neural-progress-bar h-full transition-all duration-1000"
              :style="`width: ${predictions.ensemble.max_probability * 100}%; background: linear-gradient(90deg, #00ff88, #00f5ff, #bd00ff)`"
            ></div>
          </div>
        </div>
        
        <!-- Neural Network Results Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          <div 
            v-for="(prediction, modelName) in predictions" 
            :key="modelName"
            class="bg-gray-900/70 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-lg hover:border-cyan-400/30 transition-all duration-500 neural-card"
          >
            <div v-if="modelName !== 'ensemble'">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-lg font-bold capitalize cyber-font">{{ modelName }}</h3>
                <div class="flex items-center space-x-3">
                  <div 
                    class="w-4 h-4 rounded-full animate-pulse"
                    :class="getConfidenceColor(prediction.confidence)"
                  ></div>
                  <span class="text-sm font-bold text-cyan-300">
                    {{ (prediction.confidence * 100).toFixed(1) }}%
                  </span>
                </div>
              </div>
              
              <div class="space-y-4">
                <div 
                  v-for="(prob, friend) in prediction.probabilities" 
                  :key="friend"
                  class="space-y-2"
                >
                  <div class="flex justify-between items-center">
                    <span class="text-sm font-semibold capitalize text-gray-200">{{ friend }}</span>
                    <span class="text-sm font-bold text-cyan-300">{{ (prob * 100).toFixed(1) }}%</span>
                  </div>
                  <div class="relative w-full bg-gray-800 rounded-full h-3 overflow-hidden border border-gray-600/50">
                    <div 
                      class="neural-progress-bar h-full rounded-full transition-all duration-1000"
                      :style="`width: ${prob * 100}%; background: linear-gradient(90deg, #00f5ff, #bd00ff, #ff0080)`"
                    ></div>
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                  </div>
                </div>
              </div>
              
              <div class="mt-6 pt-4 border-t border-gray-700/50">
                <div class="text-sm text-gray-400">
                  Face Match: <span class="text-cyan-300 font-bold">{{ prediction.predicted_class }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Quantum Metadata -->
        <div v-if="metadata" class="mt-8 p-6 bg-gray-900/50 rounded-2xl backdrop-blur border border-gray-700/30">
          <div class="text-sm text-gray-300 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div class="space-y-1">
              <span class="block font-bold text-cyan-300 uppercase tracking-wide">Processing Time</span>
              <span class="text-white font-mono">{{ metadata.processing_time }}s</span>
            </div>
            <div class="space-y-1">
              <span class="block font-bold text-cyan-300 uppercase tracking-wide">Deep Resolution</span>
              <span class="text-white font-mono">{{ metadata.image_size?.[0] }} × {{ metadata.image_size?.[1] }}</span>
            </div>
            <div class="space-y-1">
              <span class="block font-bold text-cyan-300 uppercase tracking-wide">Neural Device</span>
              <span class="text-white font-mono">{{ metadata.device }}</span>
            </div>
            <div class="space-y-1">
              <span class="block font-bold text-cyan-300 uppercase tracking-wide">Networks Active</span>
              <span class="text-white font-mono">{{ metadata.models_used?.length }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quantum Error Panel -->
      <div v-if="error" class="holo-panel p-6 border-l-4 border-red-400 bg-red-500/10">
        <div class="flex items-center space-x-4">
          <AlertCircle class="w-6 h-6 text-red-400 animate-pulse" />
          <div>
            <h3 class="font-bold text-red-400 cyber-font">DEEP ERROR DETECTED</h3>
            <p class="text-gray-300 mt-1">{{ error }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { 
  Cpu, Brain, Upload, ImageIcon, Zap, BarChart3, 
  Check, AlertCircle, Activity, Shield, Sparkles 
} from 'lucide-vue-next'

// Reactive state
const selectedModels = ref(['friendnet'])
const selectedFile = ref(null)
const imagePreview = ref(null)
const predictions = ref(null)
const metadata = ref(null)
const error = ref(null)
const isDragging = ref(false)
const isProcessing = ref(false)
const processingMessage = ref('Initializing...')
const processingProgress = ref(0)

const dropZone = ref(null)
const fileInput = ref(null)

// Enhanced available models
const availableModels = ref([
  {
    id: 'friendnet',
    name: 'F1-X1',
    description: 'Custom Convolutional deep learning architecture with neural pathways',
    icon: Cpu,
    accuracy: 98.2,
    speed: 'Ultra Fast'
  },
  {
    id: 'resnet',
    name: 'RESNET50',
    description: 'Advanced residual neural networks with skip connections',
    icon: Brain,
    accuracy: 100.0,
    speed: 'Fast'
  },
  {
    id: 'clip',
    name: 'OPENAI-CLIP',
    description: 'Multi-modal consciousness engine with cutting edge deep processing',
    icon: Zap,
    accuracy: 99.1,
    speed: 'Lightning'
  }
])

// Computed property to get only selected model predictions
const selectedModelPredictions = computed(() => {
  if (!predictions.value) return null
  
  const filtered = {}
  selectedModels.value.forEach(modelId => {
    if (predictions.value[modelId]) {
      filtered[modelId] = predictions.value[modelId]
    }
  })
  
  // Always include ensemble if it exists
  if (predictions.value.ensemble) {
    filtered.ensemble = predictions.value.ensemble
  }
  
  return filtered
})

const getParticleStyle = (index) => {
  return {
    left: Math.random() * 100 + '%',
    animationDelay: Math.random() * 20 + 's',
    animationDuration: (Math.random() * 10 + 10) + 's'
  }
}

const toggleModel = (modelId) => {
  if (selectedModels.value.includes(modelId)) {
    selectedModels.value = selectedModels.value.filter(m => m !== modelId)
  } else {
    selectedModels.value.push(modelId)
  }
}

const selectAllModels = () => {
  selectedModels.value = availableModels.value.map(m => m.id)
}

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file && file.type.startsWith('image/')) {
    selectedFile.value = file
    imagePreview.value = URL.createObjectURL(file)
  }
}

const handleDrop = (event) => {
  isDragging.value = false
  const file = event.dataTransfer.files[0]
  if (file && file.type.startsWith('image/')) {
    selectedFile.value = file
    imagePreview.value = URL.createObjectURL(file)
  }
}

const clearFile = () => {
  selectedFile.value = null
  imagePreview.value = null
  predictions.value = null
  metadata.value = null
  error.value = null
  processingProgress.value = 0
}

const formatFileSize = (size) => {
  const kb = size / 1024
  return kb < 1024
    ? `${kb.toFixed(1)} KB`
    : `${(kb / 1024).toFixed(1)} MB`
}

const getConfidenceColor = (score) => {
  if (score > 0.9) return 'bg-green-400'
  if (score > 0.75) return 'bg-yellow-400'
  return 'bg-red-400'
}

const analyzeImage = async () => {
  if (!selectedFile.value || selectedModels.value.length === 0) return

  predictions.value = null
  metadata.value = null
  error.value = null
  isProcessing.value = true
  processingMessage.value = 'Uploading image...'
  processingProgress.value = 10

  const formData = new FormData()
  formData.append('file', selectedFile.value)
  formData.append('models', selectedModels.value.join(','))
  formData.append('enhance_image', 'true')

  try {
    // Get runtime config for API base URL
    const config = useRuntimeConfig()
    
    processingMessage.value = 'Connecting to quantum servers...'
    processingProgress.value = 25
    
    const res = await fetch(`${config.public.apiBaseUrl}/predict`, {
      method: 'POST',
      body: formData,
      headers: {
        // Add any required auth headers here if needed
        // 'Authorization': `Bearer ${authToken}`,
      }
    })

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ detail: 'Network error occurred' }))
      throw new Error(errorData.detail || `HTTP ${res.status}: ${res.statusText}`)
    }

    processingMessage.value = 'Running neural network analysis...'
    processingProgress.value = 60

    const data = await res.json()
    
    processingMessage.value = 'Processing quantum results...'
    processingProgress.value = 85

    // Validate response structure
    if (!data.predictions) {
      throw new Error('Invalid response format: missing predictions')
    }

    predictions.value = data.predictions
    metadata.value = data.metadata || {
      processing_time: 'N/A',
      image_size: 'N/A',
      device: 'Quantum GPU',
      models_used: selectedModels.value
    }

    processingProgress.value = 100
    processingMessage.value = 'Quantum analysis complete!'
    
  } catch (err) {
    console.error('Prediction error:', err)
    error.value = err.message || 'An error occurred during prediction'
    
    // Reset processing state on error
    processingProgress.value = 0
    processingMessage.value = ''
  } finally {
    setTimeout(() => {
      isProcessing.value = false
      if (!error.value) {
        processingProgress.value = 0
        processingMessage.value = ''
      }
    }, 1500)
  }
}

// Optional: Add method to test API connection
const testConnection = async () => {
  try {
    const config = useRuntimeConfig()
    const res = await fetch(`${config.public.apiBaseUrl}/health`)
    return res.ok
  } catch (err) {
    console.error('Connection test failed:', err)
    return false
  }
}

// Optional: Initialize component
onMounted(async () => {
  // Test API connection on mount
  const isConnected = await testConnection()
  if (!isConnected) {
    console.warn('API connection test failed')
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');

.cyber-font {
  font-family: 'Orbitron', monospace;
  letter-spacing: 0.05em;
}

.cyber-neural-grid {
  background: 
    radial-gradient(circle at 25% 25%, rgba(0, 245, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(189, 0, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 50% 0%, rgba(255, 0, 128, 0.1) 0%, transparent 60%),
    linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 25%, #16213e 50%, #0a0a0f 75%, #0f0f23 100%);
  background-size: 100% 100%, 100% 100%, 100% 100%, 400% 400%;
  animation: cyberShift 20s ease-in-out infinite;
  position: relative;
  overflow-x: hidden;
}

.cyber-neural-grid::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    linear-gradient(90deg, transparent 49%, rgba(0, 245, 255, 0.03) 50%, transparent 51%),
    linear-gradient(0deg, transparent 49%, rgba(189, 0, 255, 0.03) 50%, transparent 51%);
  background-size: 100px 100px, 100px 100px;
  pointer-events: none;
  opacity: 0.5;
}

@keyframes cyberShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.floating-particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
}

.particle {
  position: absolute;
  width: 2px;
  height: 2px;
  background: linear-gradient(45deg, #00f5ff, #bd00ff);
  border-radius: 50%;
  animation: float linear infinite;
}

@keyframes float {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  100% {
    transform: translateY(-10vh) rotate(360deg);
    opacity: 0;
  }
}

/* Utility classes for buttons and visual effects */
.quantum-button-primary {
  @apply inline-flex items-center px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-cyan-400/20;
}

.quantum-button-secondary {
  @apply inline-flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-cyan-300 font-semibold rounded-xl transition-all duration-300 border border-cyan-400/40 shadow-md;
}

.neural-progress-bar {
  background-size: 200% 100%;
  background-position: left center;
  animation: pulseBar 2s linear infinite;
}

@keyframes pulseBar {
  0% {
    background-position: left center;
  }
  100% {
    background-position: right center;
  }
}

.animate-pulse-border {
  animation: pulseBorder 2s infinite ease-in-out;
}

@keyframes pulseBorder {
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 0.3;
  }
}

.animate-pulse-ring {
  animation: pulseRing 1.5s infinite ease-in-out;
}

@keyframes pulseRing {
  0% {
    transform: scale(0.9);
    opacity: 0.4;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.2;
  }
  100% {
    transform: scale(0.9);
    opacity: 0.4;
  }
}

.animate-shimmer {
  background-size: 200% 100%;
  animation: shimmer 2s infinite linear;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>