<template>
  <div class="min-h-screen neural-grid">
    <!-- Header -->
    <header class="relative z-10 p-6">
      <div class="container mx-auto">
        <div class="glass-panel p-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <Cpu class="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  FriendNet AI
                </h1>
                <p class="text-gray-400 text-sm">Neural Friend Recognition System</p>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <div class="text-right">
                <div class="text-sm text-gray-400">Status</div>
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span class="text-green-400 text-sm">Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="container mx-auto p-6 space-y-8">
      <!-- Model Selection Panel -->
      <div class="glass-panel p-6">
        <h2 class="text-xl font-semibold mb-4 flex items-center">
          <Brain class="w-5 h-5 mr-2" />
          Neural Network Selection
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div 
            v-for="model in availableModels" 
            :key="model.id"
            class="relative group cursor-pointer"
            @click="toggleModel(model.id)"
          >
            <div 
              class="p-4 rounded-xl border-2 transition-all duration-300"
              :class="selectedModels.includes(model.id) 
                ? 'border-blue-500 bg-blue-500/20 shadow-lg shadow-blue-500/25' 
                : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'"
            >
              <div class="flex items-center justify-between mb-2">
                <component :is="model.icon" class="w-6 h-6" />
                <div 
                  class="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                  :class="selectedModels.includes(model.id) 
                    ? 'border-blue-500 bg-blue-500' 
                    : 'border-gray-400'"
                >
                  <Check v-if="selectedModels.includes(model.id)" class="w-2.5 h-2.5 text-white" />
                </div>
              </div>
              <h3 class="font-semibold">{{ model.name }}</h3>
              <p class="text-sm text-gray-400 mt-1">{{ model.description }}</p>
              <div class="mt-2">
                <div class="text-xs text-gray-500">Accuracy</div>
                <div class="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                  <div 
                    class="bg-gradient-to-r from-green-500 to-blue-500 h-1.5 rounded-full"
                    :style="`width: ${model.accuracy}%`"
                  ></div>
                </div>
              </div>
            </div>
            
            <!-- Selection animation -->
            <div 
              v-if="selectedModels.includes(model.id)"
              class="absolute inset-0 rounded-xl border-2 border-blue-500 animate-pulse-glow pointer-events-none"
            ></div>
          </div>
        </div>
        
        <div class="flex justify-between items-center mt-6">
          <button 
            @click="selectAllModels"
            class="text-blue-400 hover:text-blue-300 text-sm"
          >
            Select All Models
          </button>
          <div class="text-sm text-gray-400">
            {{ selectedModels.length }} model{{ selectedModels.length !== 1 ? 's' : '' }} selected
          </div>
        </div>
      </div>

      <!-- Upload Panel -->
      <div class="glass-panel p-6">
        <h2 class="text-xl font-semibold mb-4 flex items-center">
          <Upload class="w-5 h-5 mr-2" />
          Image Upload & Analysis
        </h2>
        
        <div 
          ref="dropZone"
          class="relative border-2 border-dashed border-gray-600 rounded-2xl p-8 text-center transition-all duration-300"
          :class="{ 
            'border-blue-500 bg-blue-500/10': isDragging,
            'scanning-effect': isProcessing
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
          
          <div v-if="!selectedFile && !isProcessing">
            <ImageIcon class="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p class="text-lg font-semibold mb-2">Drop your image here</p>
            <p class="text-gray-400 mb-4">or</p>
            <button 
              @click="$refs.fileInput.click()"
              class="ai-button"
            >
              <Upload class="w-4 h-4 mr-2 inline" />
              Choose File
            </button>
          </div>
          
          <div v-else-if="selectedFile && !isProcessing" class="space-y-4">
            <img 
              :src="imagePreview" 
              alt="Selected image"
              class="max-w-xs max-h-64 mx-auto rounded-xl shadow-lg"
            >
            <div>
              <p class="font-semibold">{{ selectedFile.name }}</p>
              <p class="text-sm text-gray-400">{{ formatFileSize(selectedFile.size) }}</p>
            </div>
            <div class="flex space-x-4 justify-center">
              <button 
                @click="analyzeImage"
                :disabled="!selectedModels.length"
                class="ai-button disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Zap class="w-4 h-4 mr-2 inline" />
                Analyze Image
              </button>
              <button 
                @click="clearFile"
                class="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-xl font-semibold transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
          
          <div v-else-if="isProcessing" class="space-y-4">
            <div class="w-16 h-16 mx-auto">
              <div class="relative">
                <div class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <Brain class="w-8 h-8 absolute inset-0 m-auto text-blue-500" />
              </div>
            </div>
            <p class="text-lg font-semibold">Analyzing with AI...</p>
            <p class="text-gray-400">{{ processingMessage }}</p>
            <div class="w-full bg-gray-700 rounded-full h-2">
              <div 
                class="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                :style="`width: ${processingProgress}%`"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Results Panel -->
      <div v-if="predictions" class="glass-panel p-6">
        <h2 class="text-xl font-semibold mb-6 flex items-center">
          <BarChart3 class="w-5 h-5 mr-2" />
          Neural Network Predictions
        </h2>
        
        <!-- Ensemble Result -->
        <div v-if="predictions.ensemble" class="mb-8 p-6 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl border border-purple-500/30">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold flex items-center">
              <Cpu class="w-5 h-5 mr-2" />
              Ensemble Prediction
            </h3>
            <div class="text-sm text-gray-400">
              Confidence: {{ (predictions.ensemble.confidence * 100).toFixed(1) }}%
            </div>
          </div>
          <div class="text-center mb-4">
            <div class="text-3xl font-bold text-purple-400 mb-2">
              {{ predictions.ensemble.predicted_class.toUpperCase() }}
            </div>
            <div class="text-lg text-gray-300">
              {{ (predictions.ensemble.max_probability * 100).toFixed(1) }}% probability
            </div>
          </div>
        </div>
        
        <!-- Individual Model Results -->
        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <div 
            v-for="(prediction, modelName) in predictions" 
            :key="modelName"
            class="bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
          >
            <div v-if="modelName !== 'ensemble'">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold capitalize">{{ modelName }}</h3>
                <div class="flex items-center space-x-2">
                  <div 
                    class="w-3 h-3 rounded-full"
                    :class="getConfidenceColor(prediction.confidence)"
                  ></div>
                  <span class="text-sm text-gray-400">
                    {{ (prediction.confidence * 100).toFixed(1) }}%
                  </span>
                </div>
              </div>
              
              <div class="space-y-3">
                <div 
                  v-for="(prob, friend) in prediction.probabilities" 
                  :key="friend"
                  class="space-y-1"
                >
                  <div class="flex justify-between items-center">
                    <span class="text-sm font-medium capitalize">{{ friend }}</span>
                    <span class="text-sm text-gray-400">{{ (prob * 100).toFixed(1) }}%</span>
                  </div>
                  <div class="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      class="prediction-bar h-2 rounded-full"
                      :style="`width: ${prob * 100}%`"
                    ></div>
                  </div>
                </div>
              </div>
              
              <div class="mt-4 pt-4 border-t border-gray-700">
                <div class="text-sm text-gray-400">
                  Best Match: <span class="text-white font-semibold">{{ prediction.predicted_class }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Processing Metadata -->
        <div v-if="metadata" class="mt-6 p-4 bg-gray-800/30 rounded-xl">
          <div class="text-sm text-gray-400 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <span class="block font-medium">Processing Time</span>
              {{ metadata.processing_time }}s
            </div>
            <div>
              <span class="block font-medium">Image Size</span>
              {{ metadata.image_size?.[0] }} × {{ metadata.image_size?.[1] }}
            </div>
            <div>
              <span class="block font-medium">Device</span>
              {{ metadata.device }}
            </div>
            <div>
              <span class="block font-medium">Models Used</span>
              {{ metadata.models_used?.length }}
            </div>
          </div>
        </div>
      </div>

      <!-- Error Panel -->
      <div v-if="error" class="glass-panel p-6 border-red-500/30 bg-red-500/10">
        <div class="flex items-center space-x-3">
          <AlertCircle class="w-5 h-5 text-red-400" />
          <div>
            <h3 class="font-semibold text-red-400">Error</h3>
            <p class="text-gray-300">{{ error }}</p>
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
  Check, AlertCircle 
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

// Available models from backend (can also be fetched)
const availableModels = ref([
  {
    id: 'friendnet',
    name: 'Custom CNN',
    description: 'Handcrafted model with deep convolutional layers',
    icon: Cpu,
    accuracy: 91
  },
  {
    id: 'resnet',
    name: 'ResNet50',
    description: 'Fine-tuned ResNet with skip connections',
    icon: Brain,
    accuracy: 93
  },
  {
    id: 'clip',
    name: 'CLIP OpenAI',
    description: 'Optimized architecture for speed and accuracy',
    icon: Zap,
    accuracy: 94
  }
])

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
  if (score > 0.9) return 'bg-green-500'
  if (score > 0.75) return 'bg-yellow-400'
  return 'bg-red-500'
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
    const config = useRuntimeConfig()
    const res = await fetch(`${config.public.apiBaseUrl}/predict`, {
      method: 'POST',
      body: formData
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.detail || 'Prediction failed')
    }

    processingMessage.value = 'Running predictions...'
    processingProgress.value = 70

    const data = await res.json()
    predictions.value = data.predictions
    metadata.value = data.metadata

    processingProgress.value = 100
    processingMessage.value = 'Complete!'
  } catch (err) {
    console.error(err)
    error.value = err.message || 'An error occurred during prediction'
  } finally {
    setTimeout(() => {
      isProcessing.value = false
      processingProgress.value = 0
      processingMessage.value = ''
    }, 1000)
  }
}
</script>

<style scoped>
.neural-grid {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  background-size: 400% 400%;
  animation: gradientShift 10s ease infinite;
  position: relative;
  overflow-x: hidden;
}

.neural-grid::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.glass-panel {
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(71, 85, 105, 0.3);
  border-radius: 1rem;
}

.ai-button {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
}

.ai-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
}

.prediction-bar {
  background: linear-gradient(90deg, #10b981, #3b82f6, #8b5cf6);
  transition: width 0.8s ease;
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.4); }
  50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.6); }
}

.animate-pulse-glow {
  animation: pulse-glow 2s infinite;
}

.scanning-effect {
  position: relative;
  overflow: hidden;
}

.scanning-effect::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent);
  animation: scan 2s infinite;
}

@keyframes scan {
  0% { left: -100%; }
  100% { left: 100%; }
}
</style>
