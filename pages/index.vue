<template>
  <div class="min-h-screen bg-black text-white overflow-hidden font-serif">
    <!-- Subtle Background Grid -->
    <div class="fixed inset-0 opacity-30">
      <div class="grid-pattern"></div>
    </div>

    <!-- Clean Header -->
    <header class="relative z-10 px-6 py-8">
      <div class="max-w-6xl mx-auto">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-5">
            <div class="w-12 h-12 bg-white rounded-sm flex items-center justify-center transition-all hover:scale-105 hover:shadow-lg">
              <Cpu class="w-7 h-7 text-black" />
            </div>
            <div>
              <h1 class="text-3xl font-light tracking-wider text-shadow">FriendNet</h1>
              <p class="text-gray-500 text-sm font-light tracking-wide">Neural Recognition System</p>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span class="text-sm text-gray-400 font-light">Online</span>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-6xl mx-auto px-6 py-16 space-y-20">
      <!-- Model Selection -->
      <section class="space-y-10">
        <div class="text-center space-y-2">
          <h2 class="text-2xl font-light text-gray-300 tracking-wide">Neural Networks</h2>
          <p class="text-sm text-gray-500 font-light">Select recognition models to analyze your image</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="model in availableModels" 
            :key="model.id"
            class="group cursor-pointer card-hover"
            @click="toggleModel(model.id)"
          >
            <div 
              class="relative p-8 border border-gray-800/60 bg-gray-900/20 glass-effect transition-all duration-300 hover:border-gray-600/80 hover:bg-gray-900/30"
              :class="selectedModels.includes(model.id) ? 'border-white/60 bg-white/5' : ''"
            >
              <!-- Selection Indicator -->
              <div class="absolute top-6 right-6">
                <div 
                  class="w-5 h-5 border border-gray-600 rounded-full transition-all duration-200"
                  :class="selectedModels.includes(model.id) ? 'bg-white border-white' : 'group-hover:border-gray-400'"
                >
                  <div 
                    v-if="selectedModels.includes(model.id)"
                    class="w-2 h-2 bg-black rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  ></div>
                </div>
              </div>

              <div class="space-y-5">
                <component 
                  :is="model.icon" 
                  class="w-7 h-7 text-gray-500 transition-colors group-hover:text-white" 
                />
                <div>
                  <h3 class="font-medium mb-2 text-lg">{{ model.name }}</h3>
                  <p class="text-sm text-gray-400 leading-relaxed font-light">{{ model.description }}</p>
                </div>
                <div class="flex justify-between items-center text-sm pt-2 border-t border-gray-800/50">
                  <span class="text-gray-500 font-light">Accuracy</span>
                  <span class="text-white font-medium">{{ model.accuracy }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex justify-between items-center pt-6">
          <button 
            @click="selectAllModels"
            class="text-sm text-gray-400 hover:text-white transition-colors underline underline-offset-4 font-light"
          >
            {{ selectAllButtonText }}
          </button>
          <div class="text-sm text-gray-400 font-light">
            {{ selectedModels.length }} of {{ availableModels.length }} selected
          </div>
        </div>
      </section>

      <!-- Upload Section -->
      <section class="space-y-10">
        <div class="text-center space-y-2">
          <h2 class="text-2xl font-light text-gray-300 tracking-wide">Image Analysis</h2>
          <p class="text-sm text-gray-500 font-light">Upload an image to identify faces using selected models</p>
        </div>
        
        <div 
          class="relative border-2 border-dashed border-gray-800/60 transition-all duration-300 overflow-hidden glass-effect"
          :class="{ 
            'border-white/60 bg-white/5': isDragging,
            'border-gray-700/80': isProcessing
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
          
          <!-- Upload State -->
          <div v-if="!selectedFile && !isProcessing" class="p-20 text-center">
            <ImageIcon class="w-16 h-16 mx-auto mb-8 text-gray-600" />
            <p class="text-xl font-light mb-3 tracking-wide">Drop image here</p>
            <p class="text-gray-500 mb-10 font-light">or</p>
            <button 
              @click="$refs.fileInput.click()"
              class="px-8 py-3 bg-white text-black font-medium transition-all hover:bg-gray-100 hover:shadow-lg active:scale-95"
            >
              Choose File
            </button>
          </div>
          
          <!-- Preview State -->
          <div v-else-if="selectedFile && !isProcessing" class="p-10">
            <div class="flex flex-col md:flex-row items-start space-y-8 md:space-y-0 md:space-x-10">
              <div class="flex-shrink-0">
                <img 
                  :src="imagePreview" 
                  alt="Preview"
                  class="max-w-sm max-h-72 object-contain rounded-sm shadow-lg"
                >
              </div>
              <div class="flex-1 space-y-8">
                <div>
                  <h3 class="font-medium mb-3 text-lg">{{ selectedFile.name }}</h3>
                  <p class="text-sm text-gray-400 font-light">{{ formatFileSize(selectedFile.size) }}</p>
                </div>
                <div class="flex space-x-5">
                  <button 
                    @click="analyzeImage"
                    :disabled="!selectedModels.length"
                    class="px-8 py-3 bg-white text-black font-medium disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:bg-gray-100 hover:shadow-lg active:scale-95"
                  >
                    Analyze Image
                  </button>
                  <button 
                    @click="clearFile"
                    class="px-8 py-3 border border-gray-600/80 text-gray-300 font-medium transition-all hover:border-gray-400 hover:text-white"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Processing State -->
          <div v-else-if="isProcessing" class="p-20 text-center">
            <div class="w-10 h-10 mx-auto mb-8">
              <div class="w-full h-full border-2 border-gray-700 border-t-white rounded-full animate-spin"></div>
            </div>
            <p class="text-xl font-light mb-3 tracking-wide">{{ processingMessage }}</p>
            <div class="w-80 mx-auto h-1 bg-gray-800 rounded-full overflow-hidden">
              <div 
                class="h-full bg-white transition-all duration-500 ease-out"
                :style="`width: ${processingProgress}%`"
              ></div>
            </div>
            <p class="text-sm text-gray-400 mt-4 font-light">{{ processingProgress }}%</p>
          </div>
        </div>
      </section>

      <!-- Results Section -->
      <section v-if="predictions" class="space-y-10">
        <div class="text-center space-y-2">
          <h2 class="text-2xl font-light text-gray-300 tracking-wide">Analysis Results</h2>
          <p class="text-sm text-gray-500 font-light">Neural network predictions and confidence scores</p>
        </div>
        
        <!-- Ensemble Result -->
        <div v-if="predictions.ensemble" class="p-10 border border-gray-800/60 bg-gray-900/20 glass-effect">
          <div class="flex justify-between items-start mb-8">
            <div>
              <h3 class="text-xl font-medium mb-2">Ensemble Prediction</h3>
              <p class="text-sm text-gray-400 font-light">Combined neural network result</p>
            </div>
            <div class="text-right">
              <div class="text-sm text-gray-500 font-light">Confidence</div>
              <div class="text-xl font-medium">{{ (predictions.ensemble.confidence * 100).toFixed(1) }}%</div>
            </div>
          </div>
          
          <div class="text-center py-12">
            <div class="text-5xl font-light mb-4 text-shadow">{{ predictions.ensemble.predicted_class }}</div>
            <div class="text-gray-400 font-light text-lg">{{ (predictions.ensemble.max_probability * 100).toFixed(1) }}% match</div>
          </div>
          
          <div class="w-full h-2 bg-gray-800 rounded-full overflow-hidden mt-8">
            <div 
              class="h-full bg-gradient-to-r from-white to-gray-300 transition-all duration-1000 ease-out"
              :style="`width: ${predictions.ensemble.max_probability * 100}%`"
            ></div>
          </div>
        </div>
        
        <!-- Individual Model Results -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(prediction, modelName) in individualPredictions" 
            :key="modelName"
            class="p-8 border border-gray-800/60 bg-gray-900/10 glass-effect space-y-6"
          >
            <div class="flex justify-between items-center mb-6">
              <h3 class="font-medium capitalize text-lg">{{ modelName }}</h3>
              <div class="text-sm text-gray-400 font-light">
                {{ (prediction.confidence * 100).toFixed(1) }}%
              </div>
            </div>
            
            <div class="space-y-4">
              <div 
                v-for="(prob, friend) in prediction.probabilities" 
                :key="friend"
                class="space-y-2"
              >
                <div class="flex justify-between text-sm">
                  <span class="capitalize font-light">{{ friend }}</span>
                  <span class="font-medium">{{ (prob * 100).toFixed(1) }}%</span>
                </div>
                <div class="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    class="h-full bg-gray-400 transition-all duration-700 ease-out"
                    :style="`width: ${prob * 100}%`"
                  ></div>
                </div>
              </div>
            </div>
            
            <div class="pt-4 border-t border-gray-800/50 text-sm text-gray-400 font-light">
              Best match: <span class="text-white font-medium">{{ prediction.predicted_class }}</span>
            </div>
          </div>
        </div>
        
        <!-- Metadata -->
        <div v-if="metadata" class="p-8 border border-gray-800/60 bg-gray-900/5 glass-effect">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
            <div>
              <div class="text-gray-500 mb-2 font-light">Processing Time</div>
              <div class="font-mono text-lg">{{ metadata.processing_time }}s</div>
            </div>
            <div>
              <div class="text-gray-500 mb-2 font-light">Resolution</div>
              <div class="font-mono text-lg">{{ metadata.image_size?.[0] }} × {{ metadata.image_size?.[1] }}</div>
            </div>
            <div>
              <div class="text-gray-500 mb-2 font-light">Device</div>
              <div class="font-mono text-lg">{{ metadata.device }}</div>
            </div>
            <div>
              <div class="text-gray-500 mb-2 font-light">Models Used</div>
              <div class="font-mono text-lg">{{ metadata.models_used?.length }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Error State -->
      <div v-if="error" class="p-8 border border-red-900/60 bg-red-900/10 glass-effect">
        <div class="flex items-center space-x-4">
          <AlertCircle class="w-6 h-6 text-red-400 flex-shrink-0" />
          <div>
            <h3 class="font-medium text-red-400 mb-1">Analysis Error</h3>
            <p class="text-sm text-gray-300 font-light">{{ error }}</p>
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

// Available models
const availableModels = ref([
  {
    id: 'friendnet',
    name: 'FriendNet',
    description: 'Custom convolutional neural network optimized for face recognition',
    icon: Cpu,
    accuracy: 98.2
  },
  {
    id: 'resnet',
    name: 'ResNet-50',
    description: 'Deep residual network with skip connections for robust feature extraction',
    icon: Brain,
    accuracy: 100.0
  },
  {
    id: 'clip',
    name: 'OpenAI CLIP',
    description: 'Multi-modal neural network trained on diverse image-text pairs',
    icon: Zap,
    accuracy: 99.1
  }
])

// Computed property to filter out ensemble predictions
const individualPredictions = computed(() => {
  if (!predictions.value) return {}
  
  const filtered = {}
  for (const [modelName, prediction] of Object.entries(predictions.value)) {
    if (modelName !== 'ensemble') {
      filtered[modelName] = prediction
    }
  }
  return filtered
})

// Computed property for select all button text
const selectAllButtonText = computed(() => {
  return selectedModels.value.length === availableModels.value.length 
    ? 'Deselect All' 
    : 'Select All'
})

const toggleModel = (modelId) => {
  if (selectedModels.value.includes(modelId)) {
    selectedModels.value = selectedModels.value.filter(m => m !== modelId)
  } else {
    selectedModels.value.push(modelId)
  }
}

const selectAllModels = () => {
  const allModelIds = availableModels.value.map(m => m.id)
  
  if (selectedModels.value.length === allModelIds.length) {
    // Deselect all
    selectedModels.value = []
  } else {
    // Select all
    selectedModels.value = allModelIds
  }
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
    
    processingMessage.value = 'Connecting to models...'
    processingProgress.value = 25
    
    const res = await fetch(`${config.public.apiBaseUrl}/predict`, {
      method: 'POST',
      body: formData
    })

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ detail: 'Network error occurred' }))
      throw new Error(errorData.detail || `HTTP ${res.status}: ${res.statusText}`)
    }

    processingMessage.value = 'Running analysis...'
    processingProgress.value = 60

    const data = await res.json()
    
    processingMessage.value = 'Processing results...'
    processingProgress.value = 85

    if (!data.predictions) {
      throw new Error('Invalid response format: missing predictions')
    }

    predictions.value = data.predictions
    metadata.value = data.metadata || {
      processing_time: 'N/A',
      image_size: 'N/A',
      device: 'GPU',
      models_used: selectedModels.value
    }

    processingProgress.value = 100
    processingMessage.value = 'Analysis complete'
    
  } catch (err) {
    console.error('Prediction error:', err)
    error.value = err.message || 'An error occurred during prediction'
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

onMounted(async () => {
  const isConnected = await testConnection()
  if (!isConnected) {
    console.warn('API connection test failed')
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&display=swap');

.font-serif {
  font-family: 'Fraunces', serif;
}

.grid-pattern {
  background-image: 
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  width: 100%;
  height: 100%;
}

/* Smooth transitions for all interactive elements */
* {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Enhanced hover effects */
button:hover {
  transform: translateY(-0.5px);
}

button:active {
  transform: translateY(0);
}

.card-hover:hover {
  transform: translateY(-2px);
}

/* Clean focus states */
button:focus {
  outline: 2px solid rgba(255, 255, 255, 0.3);
  outline-offset: 3px;
}

/* Glass morphism effect */
.glass-effect {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* Text glow effect */
.text-shadow {
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
}

/* Minimal scrollbar */
::-webkit-scrollbar {
  width: 3px;
}

::-webkit-scrollbar-track {
  background: #0a0a0a;
}

::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Enhanced progress bar */
.progress-bar {
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>