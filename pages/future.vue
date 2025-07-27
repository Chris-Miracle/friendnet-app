<template>
  <div class="min-h-screen quantum-neural-matrix">
    <!-- Advanced Holographic Particle System -->
    <div class="holographic-particles">
      <div v-for="n in 80" :key="n" class="quantum-particle" :style="getQuantumParticleStyle(n)"></div>
    </div>

    <!-- Neural Grid Overlay -->
    <div class="neural-grid-overlay"></div>

    <!-- Quantum Energy Waves -->
    <div class="quantum-energy-waves">
      <div class="energy-wave wave-1"></div>
      <div class="energy-wave wave-2"></div>
      <div class="energy-wave wave-3"></div>
    </div>

    <!-- Holographic Header with Advanced Effects -->
    <header class="relative z-30 p-6">
      <div class="container mx-auto">
        <div class="quantum-holo-panel p-10 backdrop-blur-2xl border border-cyan-400/20 shadow-2xl shadow-cyan-500/20">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-8">
              <div class="relative group">
                <!-- Multi-layered Logo with Depth -->
                <div class="w-20 h-20 relative transform-gpu">
                  <div class="absolute inset-0 bg-gradient-to-br from-cyan-300 via-blue-500 to-purple-700 rounded-3xl rotate-12 animate-float shadow-2xl shadow-cyan-500/50"></div>
                  <div class="absolute inset-1 bg-gradient-to-tr from-purple-600 via-pink-500 to-cyan-400 rounded-3xl -rotate-6 animate-float-delayed shadow-xl shadow-purple-500/40"></div>
                  <div class="relative w-full h-full bg-gradient-to-br from-cyan-400 via-blue-600 to-purple-700 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/60 border border-cyan-300/30">
                    <Cpu class="w-10 h-10 text-white animate-quantum-pulse drop-shadow-lg" />
                  </div>
                </div>
                <!-- Orbital Rings -->
                <div class="absolute -inset-3 border-2 border-cyan-400/20 rounded-full animate-spin-slow"></div>
                <div class="absolute -inset-5 border border-purple-400/15 rounded-full animate-spin-reverse-slow"></div>
              </div>
              <div class="space-y-2">
                <h1 class="text-5xl font-black bg-gradient-to-r from-cyan-200 via-blue-300 to-purple-300 bg-clip-text text-transparent quantum-font tracking-wide">
                  FRIENDLY AI
                </h1>
                <p class="text-cyan-300 text-xl font-medium tracking-widest opacity-90">
                  Quantum Friendly Recognition Matrix v4.0
                </p>
                <div class="flex items-center space-x-4 mt-3">
                  <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span class="text-green-300 text-sm font-medium">QUANTUM READY</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <Network class="w-4 h-4 text-cyan-400 animate-ping" />
                    <span class="text-cyan-300 text-sm font-medium">NEURAL LINK ACTIVE</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center space-x-8">
              <div class="text-right space-y-3">
                <div class="text-sm text-gray-300 uppercase tracking-wider font-semibold">Quantum Status</div>
                <div class="flex items-center justify-end space-x-4">
                  <div class="relative">
                    <div class="w-4 h-4 bg-cyan-400 rounded-full animate-quantum-pulse shadow-lg shadow-cyan-400/50"></div>
                    <div class="absolute inset-0 w-4 h-4 bg-cyan-400 rounded-full animate-ping opacity-40"></div>
                    <div class="absolute -inset-1 w-6 h-6 border border-cyan-400/30 rounded-full animate-spin-slow"></div>
                  </div>
                  <span class="text-cyan-300 font-bold text-lg tracking-wide">ONLINE</span>
                </div>
              </div>
              <div class="quantum-activity-monitor p-4 bg-gray-900/50 rounded-2xl border border-cyan-400/20 backdrop-blur">
                <Activity class="w-8 h-8 text-cyan-400 animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="container mx-auto p-6 space-y-12 relative z-20">
      <!-- Advanced Quantum Model Selection Matrix -->
      <div class="quantum-holo-panel p-10 border-l-4 border-cyan-400 shadow-2xl shadow-cyan-500/10">
        <h2 class="text-3xl font-black mb-8 flex items-center quantum-font">
          <Brain class="w-8 h-8 mr-4 text-purple-400 animate-quantum-pulse" />
          QUANTUM NEURAL MATRIX
          <Sparkles class="w-6 h-6 ml-4 text-cyan-400 animate-spin" />
          <div class="ml-4 px-4 py-2 bg-purple-500/20 rounded-full border border-purple-400/30">
            <Globe class="w-5 h-5 text-purple-300 animate-pulse" />
          </div>
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <div 
            v-for="model in availableModels" 
            :key="model.id"
            class="relative group cursor-pointer transform transition-all duration-700 hover:scale-110 hover:z-10"
            @click="toggleModel(model.id)"
          >
            <div 
              class="relative p-8 rounded-3xl border-2 transition-all duration-700 backdrop-blur-xl transform-gpu"
              :class="selectedModels.includes(model.id) 
                ? 'border-cyan-400 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 shadow-2xl shadow-cyan-500/40 quantum-glow-active' 
                : 'border-gray-600/50 bg-gray-900/70 hover:border-cyan-400/60 hover:bg-gray-800/80 hover:shadow-xl hover:shadow-cyan-500/20'"
            >
              <!-- Quantum Selection Indicator -->
              <div class="absolute -top-3 -right-3 z-10">
                <div 
                  v-if="selectedModels.includes(model.id)"
                  class="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center animate-quantum-pulse shadow-lg shadow-cyan-400/50 border-2 border-white/20"
                >
                  <Check class="w-4 h-4 text-white drop-shadow" />
                </div>
                <div 
                  v-else
                  class="w-8 h-8 border-2 border-gray-400/60 rounded-full hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/30 transition-all duration-300 backdrop-blur"
                ></div>
              </div>

              <!-- Holographic Model Icon -->
              <div class="flex items-center justify-between mb-6">
                <div class="relative">
                  <component 
                    :is="model.icon" 
                    class="w-12 h-12 text-cyan-400 animate-quantum-pulse drop-shadow-lg" 
                  />
                  <div class="absolute -inset-2 border border-cyan-400/20 rounded-full animate-spin-slow"></div>
                </div>
                <div class="text-right space-y-1">
                  <div class="text-xs text-gray-400 uppercase tracking-widest font-semibold">Quantum Speed</div>
                  <div class="text-sm font-bold text-cyan-300 tracking-wide">{{ model.speed }}</div>
                  <div class="flex items-center justify-end space-x-1">
                    <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div class="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style="animation-delay: 0.2s"></div>
                    <div class="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style="animation-delay: 0.4s"></div>
                  </div>
                </div>
              </div>
              
              <h3 class="font-black text-xl mb-3 quantum-font tracking-wide">{{ model.name }}</h3>
              <p class="text-sm text-gray-300 mb-6 leading-relaxed opacity-90">{{ model.description }}</p>
              
              <!-- Advanced Neural Accuracy Visualization -->
              <div class="space-y-4">
                <div class="flex justify-between items-center">
                  <span class="text-xs text-gray-400 uppercase tracking-widest font-semibold">Neural Precision</span>
                  <span class="text-lg font-black text-cyan-300 quantum-font">{{ model.accuracy }}%</span>
                </div>
                <div class="relative w-full bg-gray-800/80 rounded-full h-4 overflow-hidden border border-gray-600/50 shadow-inner">
                  <div 
                    class="quantum-progress-bar h-full rounded-full transition-all duration-1500 transform-gpu"
                    :style="`width: ${model.accuracy}%; background: linear-gradient(135deg, #00f5ff, #bd00ff, #ff0080, #00ff88)`"
                  ></div>
                  <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer-advanced"></div>
                  <div class="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 animate-pulse opacity-50"></div>
                </div>
                <!-- Quantum Metrics -->
                <div class="grid grid-cols-2 gap-4 text-xs">
                  <div class="bg-gray-800/50 rounded-lg p-2 border border-gray-700/50">
                    <div class="text-gray-400 uppercase tracking-wide">Latency</div>
                    <div class="text-cyan-300 font-bold">{{ model.latency || '12ms' }}</div>
                  </div>
                  <div class="bg-gray-800/50 rounded-lg p-2 border border-gray-700/50">
                    <div class="text-gray-400 uppercase tracking-wide">Power</div>
                    <div class="text-green-300 font-bold">{{ model.power || '2.1TF' }}</div>
                  </div>
                </div>
              </div>

              <!-- Quantum Holographic Border Effect -->
              <div 
                v-if="selectedModels.includes(model.id)"
                class="absolute inset-0 rounded-3xl border-2 border-cyan-400/60 opacity-60 animate-pulse-border-advanced pointer-events-none"
              ></div>
              
              <!-- Neural Connection Visualization -->
              <div 
                v-if="selectedModels.includes(model.id)"
                class="absolute inset-0 rounded-3xl quantum-neural-connections pointer-events-none overflow-hidden"
              ></div>
            </div>
          </div>
        </div>
        
        <!-- Advanced Control Panel -->
        <div class="flex justify-between items-center mt-10 p-6 bg-gradient-to-r from-gray-900/80 to-gray-800/80 rounded-2xl backdrop-blur-xl border border-gray-700/50 shadow-xl">
          <button 
            @click="selectAllModels"
            class="quantum-button-primary-advanced group"
          >
            <Shield class="w-5 h-5 mr-3 group-hover:animate-spin" />
            Activate All Quantum Networks
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 -skew-x-12 animate-shimmer-button"></div>
          </button>
          <div class="text-right space-y-1">
            <div class="text-lg text-cyan-300 font-bold quantum-font">
              {{ selectedModels.length }} Quantum Network{{ selectedModels.length !== 1 ? 's' : '' }} Active
            </div>
            <div class="text-sm text-gray-400">
              Total Processing Power: {{ (selectedModels.length * 2.1).toFixed(1) }}TF
            </div>
          </div>
        </div>
      </div>

      <!-- Ultra-Advanced Quantum Upload Portal -->
      <div class="quantum-holo-panel p-10 border-l-4 border-purple-400 shadow-2xl shadow-purple-500/10">
        <h2 class="text-3xl font-black mb-8 flex items-center quantum-font">
          <Upload class="w-8 h-8 mr-4 text-cyan-400 animate-float" />
          QUANTUM IMAGE ANALYSIS PORTAL
          <Eye class="w-6 h-6 ml-4 text-purple-400 animate-blink" />
          <div class="ml-4 flex space-x-2">
            <div class="w-3 h-3 bg-cyan-400 rounded-full animate-quantum-pulse"></div>
            <div class="w-3 h-3 bg-purple-400 rounded-full animate-quantum-pulse" style="animation-delay: 0.3s"></div>
            <div class="w-3 h-3 bg-pink-400 rounded-full animate-quantum-pulse" style="animation-delay: 0.6s"></div>
          </div>
        </h2>
        
        <div 
          class="relative border-3 border-dashed border-gray-600/60 rounded-3xl p-16 text-center transition-all duration-700 backdrop-blur-xl quantum-portal-advanced transform-gpu"
          :class="{ 
            'border-cyan-400 bg-cyan-500/10 quantum-scan-active shadow-2xl shadow-cyan-500/30': isDragging,
            'quantum-processing-active': isProcessing
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
          
          <!-- Enhanced Empty State -->
          <div v-if="!selectedFile && !isProcessing" class="space-y-8">
            <div class="relative">
              <div class="w-32 h-32 mx-auto relative">
                <Image class="w-32 h-32 text-gray-400 animate-float" />
                <div class="absolute inset-0 border-4 border-cyan-400/20 rounded-full animate-spin-slow"></div>
                <div class="absolute inset-4 border-2 border-purple-400/15 rounded-full animate-spin-reverse-slow"></div>
                <div class="absolute inset-8 border border-pink-400/10 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div class="space-y-6">
              <p class="text-3xl font-black quantum-font bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                QUANTUM SCAN PORTAL
              </p>
              <p class="text-gray-300 text-xl leading-relaxed">
                Deploy your image data into the quantum matrix
              </p>
              <div class="flex items-center justify-center space-x-4 text-cyan-300 text-lg font-semibold">
                <div class="h-px bg-gradient-to-r from-transparent to-cyan-400 w-16"></div>
                <span class="tracking-widest">QUANTUM TRANSFER</span>
                <div class="h-px bg-gradient-to-l from-transparent to-cyan-400 w-16"></div>
              </div>
              <button 
                @click="$refs.fileInput.click()"
                class="quantum-button-primary-advanced group transform hover:scale-105 transition-transform duration-300"
              >
                <Upload class="w-6 h-6 mr-3 group-hover:animate-bounce" />
                Initialize Quantum Upload
                <Scan class="w-5 h-5 ml-3 animate-pulse" />
              </button>
            </div>
          </div>
          
          <!-- Enhanced File Preview -->
          <div v-else-if="selectedFile && !isProcessing" class="space-y-8">
            <div class="relative inline-block group">
              <img 
                :src="imagePreview" 
                alt="Quantum scan target"
                class="max-w-md max-h-96 mx-auto rounded-3xl shadow-2xl shadow-cyan-500/40 border-4 border-cyan-400/50 backdrop-blur transform group-hover:scale-105 transition-transform duration-500"
              >
              <div class="absolute inset-0 rounded-3xl bg-gradient-to-tr from-cyan-400/20 via-purple-400/20 to-pink-400/20 pointer-events-none animate-pulse opacity-60"></div>
              <div class="absolute -inset-4 border-2 border-cyan-400/20 rounded-3xl animate-spin-slow"></div>
            </div>
            <div class="space-y-4">
              <p class="font-black text-2xl quantum-font bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                {{ selectedFile.name }}
              </p>
              <p class="text-cyan-300 text-lg font-semibold">{{ formatFileSize(selectedFile.size) }}</p>
            </div>
            <div class="flex space-x-6 justify-center">
              <button 
                @click="analyzeImage"
                :disabled="!selectedModels.length"
                class="quantum-button-primary-advanced disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <Zap class="w-6 h-6 mr-3 group-hover:animate-spin" />
                INITIATE QUANTUM ANALYSIS
                <Target class="w-5 h-5 ml-3 animate-pulse" />
              </button>
              <button 
                @click="clearFile"
                class="quantum-button-secondary-advanced group"
              >
                <Layers class="w-5 h-5 mr-3 group-hover:animate-bounce" />
                Reset Quantum Portal
              </button>
            </div>
          </div>
          
          <!-- Ultra-Advanced Processing State -->
          <div v-else-if="isProcessing" class="space-y-10">
            <div class="relative">
              <div class="w-40 h-40 mx-auto relative">
                <!-- Multi-layered Spinning System -->
                <div class="absolute inset-0 border-4 border-cyan-400/30 rounded-full"></div>
                <div class="absolute inset-2 border-4 border-transparent border-t-cyan-400 border-r-purple-400 rounded-full animate-spin"></div>
                <div class="absolute inset-4 border-4 border-transparent border-b-purple-400 border-l-pink-400 rounded-full animate-spin-reverse"></div>
                <div class="absolute inset-6 border-2 border-transparent border-t-pink-400 border-r-cyan-400 rounded-full animate-spin-slow"></div>
                <div class="absolute inset-8 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 rounded-full animate-quantum-pulse"></div>
                <Brain class="w-20 h-20 absolute inset-0 m-auto text-cyan-400 animate-quantum-pulse drop-shadow-lg" />
                <!-- Orbital Elements -->
                <div class="absolute inset-0 animate-spin-slow">
                  <div class="absolute -top-2 left-1/2 w-4 h-4 bg-cyan-400 rounded-full transform -translate-x-1/2 shadow-lg shadow-cyan-400/50"></div>
                  <div class="absolute -bottom-2 left-1/2 w-4 h-4 bg-purple-400 rounded-full transform -translate-x-1/2 shadow-lg shadow-purple-400/50"></div>
                  <div class="absolute top-1/2 -left-2 w-4 h-4 bg-pink-400 rounded-full transform -translate-y-1/2 shadow-lg shadow-pink-400/50"></div>
                  <div class="absolute top-1/2 -right-2 w-4 h-4 bg-green-400 rounded-full transform -translate-y-1/2 shadow-lg shadow-green-400/50"></div>
                </div>
              </div>
            </div>
            <div class="space-y-6">
              <p class="text-3xl font-black quantum-font bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent animate-pulse">
                QUANTUM ANALYSIS IN PROGRESS
              </p>
              <p class="text-cyan-300 text-xl font-semibold tracking-wide">{{ processingMessage }}</p>
              <!-- Ultra-Advanced Progress Visualization -->
              <div class="w-full max-w-lg mx-auto relative">
                <div class="bg-gray-800/80 rounded-full h-6 overflow-hidden border-2 border-cyan-400/30 shadow-inner backdrop-blur">
                  <div 
                    class="quantum-progress-bar-advanced h-full transition-all duration-700 transform-gpu"
                    :style="`width: ${processingProgress}%; background: linear-gradient(135deg, #00f5ff, #bd00ff, #ff0080, #00ff88, #ffff00)`"
                  ></div>
                  <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer-advanced"></div>
                </div>
                <div class="flex justify-between mt-2 text-sm">
                  <span class="text-gray-400">Initializing</span>
                  <span class="text-cyan-300 font-bold quantum-font">{{ processingProgress }}%</span>
                  <span class="text-gray-400">Complete</span>
                </div>
              </div>
              <div class="text-cyan-300 font-mono text-2xl font-bold tracking-widest quantum-font">
                {{ processingProgress }}% COMPLETE
              </div>
              <!-- Processing Stats -->
              <div class="grid grid-cols-3 gap-4 text-sm">
                <div class="bg-gray-900/50 rounded-lg p-3 border border-cyan-400/20">
                  <div class="text-gray-400 uppercase tracking-wide">Networks</div>
                  <div class="text-cyan-300 font-bold">{{ selectedModels.length }}/3</div>
                </div>
                <div class="bg-gray-900/50 rounded-lg p-3 border border-purple-400/20">
                  <div class="text-gray-400 uppercase tracking-wide">Layers</div>
                  <div class="text-purple-300 font-bold">2048+</div>
                </div>
                <div class="bg-gray-900/50 rounded-lg p-3 border border-pink-400/20">
                  <div class="text-gray-400 uppercase tracking-wide">Neurons</div>
                  <div class="text-pink-300 font-bold">∞</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Enhanced Quantum Portal Effects -->
          <div class="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden">
            <div class="quantum-ripples-advanced"></div>
            <div class="quantum-energy-field"></div>
          </div>
        </div>
      </div>

      <!-- Ultra-Advanced Quantum Results Matrix -->
      <div v-if="predictions" class="quantum-holo-panel p-10 border-l-4 border-green-400 shadow-2xl shadow-green-500/10">
        <h2 class="text-3xl font-black mb-10 flex items-center quantum-font">
          <BarChart3 class="w-8 h-8 mr-4 text-green-400 animate-quantum-pulse" />
          QUANTUM PREDICTIONS MATRIX
          <div class="ml-4 px-4 py-2 bg-green-500/20 rounded-full text-lg font-bold text-green-300 border-2 border-green-400/30 shadow-lg shadow-green-400/20">
            ANALYSIS COMPLETE
          </div>
          <Sparkles class="w-6 h-6 ml-4 text-gold-400 animate-spin" />
        </h2>
        
        <!-- Ultimate Ensemble Result -->
        <div v-if="predictions.ensemble" class="mb-12 p-10 bg-gradient-to-br from-green-600/20 via-cyan-600/20 to-purple-600/20 rounded-3xl border-4 border-green-400/50 backdrop-blur-xl quantum-result-glow-advanced shadow-2xl shadow-green-500/30">
          <div class="flex items-center justify-between mb-8">
            <h3 class="text-2xl font-black flex items-center quantum-font">
              <Cpu class="w-8 h-8 mr-4 text-green-400 animate-quantum-pulse" />
              QUANTUM ENSEMBLE PREDICTION
              <div class="ml-4 flex space-x-2">
                <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <div class="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" style="animation-delay: 0.2s"></div>
                <div class="w-3 h-3 bg-purple-400 rounded-full animate-pulse" style="animation-delay: 0.4s"></div>
              </div>
            </h3>
            <div class="px-6 py-3 bg-green-500/30 rounded-2xl border-2 border-green-400/50 backdrop-blur shadow-lg">
              <span class="text-lg font-black text-green-300 quantum-font">
                Confidence: {{ (predictions.ensemble.confidence * 100).toFixed(1) }}%
              </span>
            </div>
          </div>
          <div class="text-center mb-8 space-y-4">
            <div class="text-6xl font-black text-transparent bg-gradient-to-r from-green-300 via-cyan-300 to-blue-300 bg-clip-text quantum-font animate-quantum-pulse drop-shadow-lg">
              {{ predictions.ensemble.predicted_class.toUpperCase() }}
            </div>
            <div class="text-3xl text-green-300 font-black tracking-wide">
              {{ (predictions.ensemble.max_probability * 100).toFixed(1) }}% Neural Certainty
            </div>
          </div>
          <!-- Ultimate Confidence Visualization -->
          <div class="space-y-4">
            <div class="w-full max-w-2xl mx-auto bg-gray-800/80 rounded-full h-8 overflow-hidden border-2 border-green-400/30 shadow-inner backdrop-blur">
              <div 
                class="quantum-progress-bar-ultimate h-full transition-all duration-1500 transform-gpu"
                :style="`width: ${predictions.ensemble.max_probability * 100}%; background: linear-gradient(135deg, #00ff88, #00f5ff, #bd00ff, #ff0080)`"
              ></div>
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer-advanced"></div>
            </div>
            <div class="grid grid-cols-4 gap-4 text-sm">
              <div class="bg-gray-900/50 rounded-lg p-3 border border-green-400/20">
                <div class="text-gray-400 uppercase tracking-wide">Accuracy</div>
                <div class="text-green-300 font-bold">99.9%</div>
              </div>
              <div class="bg-gray-900/50 rounded-lg p-3 border border-cyan-400/20">
                <div class="text-gray-400 uppercase tracking-wide">Speed</div>
                <div class="text-cyan-300 font-bold">0.12s</div>
              </div>
              <div class="bg-gray-900/50 rounded-lg p-3 border border-purple-400/20">
                <div class="text-gray-400 uppercase tracking-wide">Power</div>
                <div class="text-purple-300 font-bold">2.1TF</div>
              </div>
              <div class="bg-gray-900/50 rounded-lg p-3 border border-pink-400/20">
                <div class="text-gray-400 uppercase tracking-wide">Quality</div>
                <div class="text-pink-300 font-bold">Ultra</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Enhanced Neural Network Results Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
          <div 
            v-for="(prediction, modelName) in predictions" 
            :key="modelName"
            class="bg-gradient-to-br from-gray-900/80 to-gray-800/90 rounded-3xl p-8 border-2 border-gray-700/50 backdrop-blur-xl hover:border-cyan-400/40 transition-all duration-700 quantum-neural-card transform hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20"
          >
            <div v-if="modelName !== 'ensemble'">
              <div class="flex items-center justify-between mb-8">
                <h3 class="text-xl font-black capitalize quantum-font bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                  {{ modelName }}
                </h3>
                <div class="flex items-center space-x-4">
                  <div class="relative">
                    <div 
                      class="w-5 h-5 rounded-full animate-quantum-pulse shadow-lg"
                      :class="getConfidenceColor(prediction.confidence)"
                    ></div>
                    <div class="absolute -inset-1 border border-gray-400/20 rounded-full animate-spin-slow"></div>
                  </div>
                  <span class="text-lg font-black text-cyan-300 quantum-font">
                    {{ (prediction.confidence * 100).toFixed(1) }}%
                  </span>
                </div>
              </div>
              
              <div class="space-y-6">
                <div 
                  v-for="(prob, friend) in prediction.probabilities" 
                  :key="friend"
                  class="space-y-3"
                >
                  <div class="flex justify-between items-center">
                    <span class="text-lg font-bold capitalize text-gray-200 tracking-wide">{{ friend }}</span>
                    <span class="text-lg font-black text-cyan-300 quantum-font">{{ (prob * 100).toFixed(1) }}%</span>
                  </div>
                  <div class="relative w-full bg-gray-800/80 rounded-full h-4 overflow-hidden border border-gray-600/50 shadow-inner backdrop-blur">
                    <div 
                      class="quantum-progress-bar-neural h-full rounded-full transition-all duration-1500 transform-gpu"
                      :style="`width: ${prob * 100}%; background: linear-gradient(135deg, #00f5ff, #bd00ff, #ff0080, #00ff88)`"
                    ></div>
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer-advanced"></div>
                  </div>
                </div>
              </div>
              
              <div class="mt-8 pt-6 border-t border-gray-700/50">
                <div class="flex items-center justify-between">
                  <div class="text-sm text-gray-400 uppercase tracking-widest">
                    Face Match:
                  </div>
                  <div class="text-lg text-cyan-300 font-black quantum-font tracking-wide">
                    {{ prediction.predicted_class }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Ultra-Advanced Quantum Metadata -->
        <div v-if="metadata" class="mt-12 p-8 bg-gradient-to-r from-gray-900/70 via-gray-800/80 to-gray-900/70 rounded-3xl backdrop-blur-xl border-2 border-gray-700/40 shadow-xl">
          <h3 class="text-xl font-black mb-6 quantum-font text-cyan-300">QUANTUM ANALYSIS METRICS</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div class="text-center space-y-3 p-4 bg-gray-900/50 rounded-2xl border border-cyan-400/20">
              <div class="w-12 h-12 mx-auto bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-400/30">
                <Activity class="w-6 h-6 text-white" />
              </div>
              <div class="space-y-1">
                <span class="block text-xs font-bold text-cyan-300 uppercase tracking-widest">Processing Time</span>
                <span class="text-2xl text-white font-black quantum-font">{{ metadata.processing_time }}s</span>
              </div>
            </div>
            <div class="text-center space-y-3 p-4 bg-gray-900/50 rounded-2xl border border-purple-400/20">
              <div class="w-12 h-12 mx-auto bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-400/30">
                <Target class="w-6 h-6 text-white" />
              </div>
              <div class="space-y-1">
                <span class="block text-xs font-bold text-purple-300 uppercase tracking-widest">Resolution</span>
                <span class="text-2xl text-white font-black quantum-font">{{ metadata.image_size?.[0] }}×{{ metadata.image_size?.[1] }}</span>
              </div>
            </div>
            <div class="text-center space-y-3 p-4 bg-gray-900/50 rounded-2xl border border-green-400/20">
              <div class="w-12 h-12 mx-auto bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-400/30">
                <Cpu class="w-6 h-6 text-white" />
              </div>
              <div class="space-y-1">
                <span class="block text-xs font-bold text-green-300 uppercase tracking-widest">Device</span>
                <span class="text-2xl text-white font-black quantum-font">{{ metadata.device }}</span>
              </div>
            </div>
            <div class="text-center space-y-3 p-4 bg-gray-900/50 rounded-2xl border border-pink-400/20">
              <div class="w-12 h-12 mx-auto bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-400/30">
                <Network class="w-6 h-6 text-white" />
              </div>
              <div class="space-y-1">
                <span class="block text-xs font-bold text-pink-300 uppercase tracking-widest">Networks</span>
                <span class="text-2xl text-white font-black quantum-font">{{ metadata.models_used?.length }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Ultra-Advanced Quantum Error Panel -->
      <div v-if="error" class="quantum-holo-panel p-8 border-l-4 border-red-400 bg-gradient-to-r from-red-500/10 to-pink-500/10 shadow-2xl shadow-red-500/20">
        <div class="flex items-center space-x-6">
          <div class="relative">
            <AlertCircle class="w-8 h-8 text-red-400 animate-quantum-pulse" />
            <div class="absolute -inset-2 border-2 border-red-400/30 rounded-full animate-spin-slow"></div>
          </div>
          <div class="space-y-2">
            <h3 class="font-black text-red-400 quantum-font text-xl tracking-wide">QUANTUM ERROR DETECTED</h3>
            <p class="text-gray-300 text-lg leading-relaxed">{{ error }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { 
  Cpu, Brain, Upload, Image, Zap, BarChart3, 
  Check, AlertCircle, Activity, Shield, Sparkles,
  Eye, Scan, Target, Layers, Globe, Network
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
const processingMessage = ref('Initializing quantum matrix...')
const processingProgress = ref(0)

const dropZone = ref(null)
const fileInput = ref(null)

// Ultra-Enhanced available models
const availableModels = ref([
  {
    id: 'friendnet',
    name: 'F1-X1',
    description: 'Ultra-advanced convolutional quantum neural architecture with deep learning pathways and consciousness layers',
    icon: Cpu,
    accuracy: 98.7,
    speed: 'Quantum',
    latency: '8ms',
    power: '3.2TF'
  },
  {
    id: 'resnet',
    name: 'RESNET-∞',
    description: 'Infinite residual quantum networks with skip-dimensional connections and temporal processing',
    icon: Brain,
    accuracy: 99.2,
    speed: 'Ultra-Fast',
    latency: '12ms',
    power: '2.8TF'
  },
  {
    id: 'clip',
    name: 'OPENAI-CLIP-X',
    description: 'Multi-dimensional consciousness engine with quantum processing and reality-bending capabilities',
    icon: Zap,
    accuracy: 99.8,
    speed: 'Light Speed',
    latency: '4ms',
    power: '4.1TF'
  }
])

// Enhanced quantum particle system
const getQuantumParticleStyle = (index) => {
  const colors = ['#00f5ff', '#bd00ff', '#ff0080', '#00ff88', '#ffff00']
  const sizes = ['2px', '3px', '4px', '1px']
  
  return {
    left: Math.random() * 100 + '%',
    animationDelay: Math.random() * 25 + 's',
    animationDuration: (Math.random() * 15 + 15) + 's',
    background: colors[index % colors.length],
    width: sizes[index % sizes.length],
    height: sizes[index % sizes.length],
    boxShadow: `0 0 10px ${colors[index % colors.length]}`
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
    error.value = null
  }
}

const handleDrop = (event) => {
  isDragging.value = false
  const file = event.dataTransfer.files[0]
  if (file && file.type.startsWith('image/')) {
    selectedFile.value = file
    imagePreview.value = URL.createObjectURL(file)
    error.value = null
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
  if (score > 0.9) return 'bg-green-400 shadow-green-400/50'
  if (score > 0.75) return 'bg-yellow-400 shadow-yellow-400/50'
  return 'bg-red-400 shadow-red-400/50'
}

const analyzeImage = async () => {
  if (!selectedFile.value || selectedModels.value.length === 0) return

  predictions.value = null
  metadata.value = null
  error.value = null
  isProcessing.value = true
  processingMessage.value = 'Initializing quantum upload...'
  processingProgress.value = 5

  const formData = new FormData()
  formData.append('file', selectedFile.value)
  formData.append('models', selectedModels.value.join(','))
  formData.append('enhance_image', 'true')

  try {
    // Enhanced processing messages
    const messages = [
      'Establishing quantum connection...',
      'Uploading to neural matrix...',
      'Activating quantum processors...',
      'Running deep neural analysis...',
      'Processing quantum results...',
      'Finalizing predictions...'
    ]

    let messageIndex = 0
    const messageInterval = setInterval(() => {
      if (messageIndex < messages.length) {
        processingMessage.value = messages[messageIndex]
        processingProgress.value = Math.min(15 + (messageIndex * 15), 85)
        messageIndex++
      }
    }, 800)

    const config = useRuntimeConfig()
    
    const res = await fetch(`${config.public.apiBaseUrl}/predict`, {
      method: 'POST',
      body: formData,
      headers: {
        // Add any required auth headers here if needed
      }
    })

    clearInterval(messageInterval)

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ detail: 'Quantum network error occurred' }))
      throw new Error(errorData.detail || `HTTP ${res.status}: ${res.statusText}`)
    }

    processingMessage.value = 'Quantum analysis complete!'
    processingProgress.value = 95

    const data = await res.json()

    if (!data.predictions) {
      throw new Error('Invalid quantum response: missing predictions')
    }

    predictions.value = data.predictions
    metadata.value = data.metadata || {
      processing_time: 'N/A',
      image_size: 'N/A',
      device: 'Quantum GPU',
      models_used: selectedModels.value
    }

    processingProgress.value = 100
    
  } catch (err) {
    console.error('Quantum prediction error:', err)
    error.value = err.message || 'A quantum error occurred during analysis'
    processingProgress.value = 0
    processingMessage.value = ''
  } finally {
    setTimeout(() => {
      isProcessing.value = false
      if (!error.value) {
        processingProgress.value = 0
        processingMessage.value = ''
      }
    }, 2000)
  }
}

// Quantum connection test
const testQuantumConnection = async () => {
  try {
    const config = useRuntimeConfig()
    const res = await fetch(`${config.public.apiBaseUrl}/health`)
    return res.ok
  } catch (err) {
    console.error('Quantum connection test failed:', err)
    return false
  }
}

onMounted(async () => {
  const isConnected = await testQuantumConnection()
  if (!isConnected) {
    console.warn('Quantum network connection test failed')
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600;700&display=swap');

.quantum-font {
  font-family: 'Orbitron', 'Rajdhani', monospace;
  letter-spacing: 0.08em;
  text-shadow: 0 0 10px rgba(0, 245, 255, 0.3);
}

.quantum-neural-matrix {
  background: 
    radial-gradient(ellipse at top, rgba(0, 245, 255, 0.15) 0%, transparent 70%),
    radial-gradient(ellipse at bottom left, rgba(189, 0, 255, 0.15) 0%, transparent 70%),
    radial-gradient(ellipse at bottom right, rgba(255, 0, 128, 0.12) 0%, transparent 70%),
    radial-gradient(ellipse at center, rgba(0, 255, 136, 0.08) 0%, transparent 70%),
    linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 20%, #16213e 40%, #0f3460 60%, #0a0a0f 80%, #0f0f23 100%);
  background-size: 100% 100%, 80% 80%, 90% 90%, 70% 70%, 400% 400%;
  animation: quantumShift 30s ease-in-out infinite;
  position: relative;
  overflow-x: hidden;
}

.quantum-neural-matrix::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    linear-gradient(90deg, transparent 48%, rgba(0, 245, 255, 0.05) 50%, transparent 52%),
    linear-gradient(0deg, transparent 48%, rgba(189, 0, 255, 0.05) 50%, transparent 52%),
    linear-gradient(45deg, transparent 48%, rgba(255, 0, 128, 0.03) 50%, transparent 52%);
  background-size: 120px 120px, 120px 120px, 80px 80px;
  pointer-events: none;
  opacity: 0.7;
}

.quantum-neural-matrix::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(0, 245, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(189, 0, 255, 0.1) 0%, transparent 50%);
  animation: quantumPulse 20s ease-in-out infinite;
  pointer-events: none;
}

@keyframes quantumShift {
  0%, 100% { background-position: 0% 50%, 0% 0%, 100% 100%, 50% 50%, 0% 50%; }
  33% { background-position: 100% 50%, 100% 0%, 0% 100%, 0% 50%, 50% 50%; }
  66% { background-position: 50% 100%, 50% 100%, 50% 0%, 100% 0%, 100% 0%; }
}

@keyframes quantumPulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
}

.neural-grid-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(0, 245, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 245, 255, 0.1) 1px, transparent 1px),
    linear-gradient(rgba(189, 0, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(189, 0, 255, 0.05) 1px, transparent 1px);
  background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
  pointer-events: none;
  z-index: 1;
  animation: gridShift 25s linear infinite;
}

@keyframes gridShift {
  0% { transform: translate(0, 0); }
  100% { transform: translate(100px, 100px); }
}

.quantum-energy-waves {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
}

.energy-wave {
  position: absolute;
  width: 200%;
  height: 200%;
  background: radial-gradient(ellipse at center, transparent 40%, rgba(0, 245, 255, 0.03) 50%, transparent 60%);
  animation: energyWave 40s linear infinite;
}

.wave-1 { top: -50%; left: -50%; animation-delay: 0s; }
.wave-2 { top: -50%; left: -50%; animation-delay: -13s; background: radial-gradient(ellipse at center, transparent 40%, rgba(189, 0, 255, 0.03) 50%, transparent 60%); }
.wave-3 { top: -50%; left: -50%; animation-delay: -26s; background: radial-gradient(ellipse at center, transparent 40%, rgba(255, 0, 128, 0.02) 50%, transparent 60%); }

@keyframes energyWave {
  0% { transform: rotate(0deg) scale(0.5); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: rotate(360deg) scale(2); opacity: 0; }
}

.holographic-particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 3;
}

.quantum-particle {
  position: absolute;
  border-radius: 50%;
  animation: quantumFloat linear infinite;
  filter: blur(0.5px);
}

@keyframes quantumFloat {
  0% {
    transform: translateY(100vh) rotate(0deg) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
    transform: translateY(90vh) rotate(36deg) scale(1);
  }
  100% {
    transform: translateY(-10vh) rotate(360deg) scale(0);
    opacity: 0;
  }
}

.quantum-holo-panel {
  background: linear-gradient(135deg, 
    rgba(15, 23, 42, 0.95) 0%, 
    rgba(30, 41, 59, 0.90) 25%, 
    rgba(15, 23, 42, 0.95) 50%, 
    rgba(30, 41, 59, 0.90) 75%, 
    rgba(15, 23, 42, 0.95) 100%);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 1px solid rgba(0, 245, 255, 0.2);
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.8),
    0 0 0 1px rgba(0, 245, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.quantum-holo-panel::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 245, 255, 0.1), transparent);
  animation: holographicScan 8s linear infinite;
}

@keyframes holographicScan {
  0% { left: -100%; }
  100% { left: 100%; }
}

.quantum-button-primary-advanced {
  @apply relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 text-white font-black rounded-2xl transition-all duration-500 shadow-2xl transform hover:scale-105;
  background-size: 200% 200%;
  animation: quantumButtonShift 3s ease-in-out infinite;
  border: 2px solid rgba(0, 245, 255, 0.3);
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  box-shadow: 
    0 10px 30px rgba(0, 245, 255, 0.3),
    0 0 50px rgba(0, 245, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.quantum-button-secondary-advanced {
  @apply relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 hover:from-gray-700 hover:via-gray-600 hover:to-gray-700 text-cyan-300 font-bold rounded-2xl transition-all duration-500 border-2 border-cyan-400/50 shadow-xl transform hover:scale-105;
  text-shadow: 0 0 10px rgba(0, 245, 255, 0.5);
  box-shadow: 
    0 10px 25px rgba(0, 245, 255, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

@keyframes quantumButtonShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.animate-quantum-pulse {
  animation: quantumPulseGlow 2s ease-in-out infinite;
}

@keyframes quantumPulseGlow {
  0%, 100% { 
    opacity: 1; 
    filter: drop-shadow(0 0 5px currentColor);
    transform: scale(1);
  }
  50% { 
    opacity: 0.7; 
    filter: drop-shadow(0 0 20px currentColor);
    transform: scale(1.05);
  }
}

.animate-float {
  animation: quantumFloat3D 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: quantumFloat3D 6s ease-in-out infinite;
  animation-delay: -3s;
}

@keyframes quantumFloat3D {
  0%, 100% { transform: translateY(0px) rotateY(0deg); }
  50% { transform: translateY(-10px) rotateY(180deg); }
}

.animate-blink {
  animation: quantumBlink 3s ease-in-out infinite;
}

@keyframes quantumBlink {
  0%, 90%, 100% { opacity: 1; }
  95% { opacity: 0.3; }
}

.animate-spin-slow {
  animation: spin 8s linear infinite;
}

.animate-spin-reverse-slow {
  animation: spin 10s linear infinite reverse;
}

.quantum-progress-bar-advanced,
.quantum-progress-bar-neural,
.quantum-progress-bar-ultimate {
  background-size: 300% 100%;
  animation: quantumProgressFlow 3s linear infinite;
  position: relative;
  overflow: hidden;
}

.quantum-progress-bar-ultimate {
  animation: quantumProgressFlowUltimate 2s linear infinite;
}

@keyframes quantumProgressFlow {
  0% { background-position: -300% 0; }
  100% { background-position: 300% 0; }
}

@keyframes quantumProgressFlowUltimate {
  0% { background-position: -300% 0; filter: hue-rotate(0deg); }
  100% { background-position: 300% 0; filter: hue-rotate(360deg); }
}

.animate-shimmer-advanced {
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  background-size: 200% 100%;
  animation: shimmerAdvanced 2s infinite linear;
}

@keyframes shimmerAdvanced {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.animate-shimmer-button {
  animation: shimmerButton 3s ease-in-out infinite;
}

@keyframes shimmerButton {
  0% { transform: translateX(-100%) skewX(-12deg); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateX(200%) skewX(-12deg); opacity: 0; }
}

.quantum-glow-active {
  box-shadow: 
    0 0 30px rgba(0, 245, 255, 0.4),
    0 0 60px rgba(0, 245, 255, 0.2),
    inset 0 0 30px rgba(0, 245, 255, 0.1);
  animation: quantumGlowPulse 3s ease-in-out infinite;
}

@keyframes quantumGlowPulse {
  0%, 100% { 
    box-shadow: 
      0 0 30px rgba(0, 245, 255, 0.4),
      0 0 60px rgba(0, 245, 255, 0.2),
      inset 0 0 30px rgba(0, 245, 255, 0.1);
  }
  50% { 
    box-shadow: 
      0 0 40px rgba(0, 245, 255, 0.6),
      0 0 80px rgba(0, 245, 255, 0.3),
      inset 0 0 40px rgba(0, 245, 255, 0.15);
  }
}

.quantum-portal-advanced {
  position: relative;
  background: linear-gradient(135deg, 
    rgba(15, 23, 42, 0.8) 0%, 
    rgba(30, 41, 59, 0.6) 50%, 
    rgba(15, 23, 42, 0.8) 100%);
  transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

.quantum-scan-active {
  background: linear-gradient(135deg, 
    rgba(0, 245, 255, 0.15) 0%, 
    rgba(189, 0, 255, 0.1) 50%, 
    rgba(0, 245, 255, 0.15) 100%);
  animation: quantumScanPulse 2s ease-in-out infinite;
}

@keyframes quantumScanPulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.02); opacity: 0.9; }
}

.quantum-processing-active {
  background: linear-gradient(135deg, 
    rgba(189, 0, 255, 0.2) 0%, 
    rgba(255, 0, 128, 0.15) 25%,
    rgba(0, 245, 255, 0.2) 50%,
    rgba(0, 255, 136, 0.15) 75%,
    rgba(189, 0, 255, 0.2) 100%);
  animation: quantumProcessingFlow 3s linear infinite;
}

@keyframes quantumProcessingFlow {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}

.quantum-ripples-advanced {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin: -10px 0 0 -10px;
}

.quantum-ripples-advanced::before,
.quantum-ripples-advanced::after {
  content: '';
  position: absolute;
  border: 2px solid rgba(0, 245, 255, 0.3);
  border-radius: 50%;
  animation: quantumRipple 3s linear infinite;
}

.quantum-ripples-advanced::after {
  animation-delay: 1.5s;
}

@keyframes quantumRipple {
  0% {
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: -100px;
    left: -100px;
    width: 200px;
    height: 200px;
    opacity: 0;
  }
}

.quantum-energy-field {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 30% 30%, rgba(0, 245, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 70% 70%, rgba(189, 0, 255, 0.08) 0%, transparent 50%);
  animation: quantumEnergyFlow 8s ease-in-out infinite;
  pointer-events: none;
}

@keyframes quantumEnergyFlow {
  0%, 100% { opacity: 0.5; transform: rotate(0deg); }
  50% { opacity: 0.8; transform: rotate(180deg); }
}

.quantum-neural-card {
  position: relative;
  background: linear-gradient(135deg, 
    rgba(15, 23, 42, 0.95) 0%, 
    rgba(30, 41, 59, 0.90) 50%, 
    rgba(15, 23, 42, 0.95) 100%);
  transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

.quantum-neural-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 245, 255, 0.1), transparent);
  transition: left 0.7s ease-in-out;
}

.quantum-neural-card:hover::before {
  left: 100%;
}

.quantum-result-glow-advanced {
  position: relative;
  animation: quantumResultPulse 4s ease-in-out infinite;
}

@keyframes quantumResultPulse {
  0%, 100% { 
    box-shadow: 
      0 0 30px rgba(0, 255, 136, 0.3),
      0 0 60px rgba(0, 245, 255, 0.2),
      inset 0 0 30px rgba(189, 0, 255, 0.1);
  }
  50% { 
    box-shadow: 
      0 0 50px rgba(0, 255, 136, 0.5),
      0 0 100px rgba(0, 245, 255, 0.3),
      inset 0 0 50px rgba(189, 0, 255, 0.15);
  }
}

.quantum-neural-connections {
  background: 
    radial-gradient(circle at 20% 20%, rgba(0, 245, 255, 0.1) 0%, transparent 30%),
    radial-gradient(circle at 80% 80%, rgba(189, 0, 255, 0.08) 0%, transparent 30%),
    linear-gradient(45deg, transparent 48%, rgba(0, 245, 255, 0.05) 50%, transparent 52%);
  animation: quantumConnections 5s ease-in-out infinite;
}

@keyframes quantumConnections {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.7; }
}

.animate-pulse-border-advanced {
  animation: pulseBorderAdvanced 3s infinite ease-in-out;
}

@keyframes pulseBorderAdvanced {
  0%, 100% {
    opacity: 0.4;
    box-shadow: 0 0 20px rgba(0, 245, 255, 0.3);
  }
  50% {
    opacity: 0.8;
    box-shadow: 0 0 40px rgba(0, 245, 255, 0.6);
  }
}

/* Ultra-responsive design enhancements */
@media (max-width: 768px) {
  .quantum-font {
    letter-spacing: 0.05em;
  }
  
  .quantum-holo-panel {
    margin: 0.5rem;
    padding: 1.5rem;
  }
  
  .quantum-button-primary-advanced,
  .quantum-button-secondary-advanced {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 640px) {
  .quantum-neural-matrix {
    background-size: 100% 100%, 100% 100%, 100% 100%, 100% 100%, 200% 200%;
  }
  
  .holographic-particles {
    display: none; /* Hide particles on very small screens for performance */
  }
  
  .neural-grid-overlay {
    opacity: 0.3;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .quantum-holo-panel {
    border: 2px solid #00f5ff;
    background: rgba(0, 0, 0, 0.95);
  }
  
  .quantum-font {
    text-shadow: none;
  }
  
  .quantum-button-primary-advanced {
    border: 3px solid #00f5ff;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .quantum-particle,
  .energy-wave,
  .quantum-neural-matrix,
  .quantum-neural-matrix::before,
  .quantum-neural-matrix::after,
  .neural-grid-overlay {
    animation: none;
  }
  
  .animate-quantum-pulse,
  .animate-float,
  .animate-float-delayed,
  .animate-spin-slow,
  .animate-spin-reverse-slow {
    animation: none;
  }
  
  .quantum-progress-bar-advanced,
  .quantum-progress-bar-neural,
  .quantum-progress-bar-ultimate {
    animation: none;
  }
}

/* Print styles */
@media print {
  .holographic-particles,
  .neural-grid-overlay,
  .quantum-energy-waves {
    display: none;
  }
  
  .quantum-holo-panel {
    background: white;
    color: black;
    border: 2px solid black;
    box-shadow: none;
  }
  
  .quantum-font {
    color: black;
    text-shadow: none;
  }
}

/* Focus styles for accessibility */
.quantum-button-primary-advanced:focus,
.quantum-button-secondary-advanced:focus {
  outline: 3px solid #00f5ff;
  outline-offset: 2px;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: linear-gradient(180deg, #0f172a, #1e293b);
  border-radius: 6px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #00f5ff, #bd00ff);
  border-radius: 6px;
  border: 2px solid #0f172a;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #00d4ff, #9d00d4);
}

/* Selection styles */
::selection {
  background: rgba(0, 245, 255, 0.3);
  color: white;
  text-shadow: 0 0 10px rgba(0, 245, 255, 0.8);
}

::-moz-selection {
  background: rgba(0, 245, 255, 0.3);
  color: white;
  text-shadow: 0 0 10px rgba(0, 245, 255, 0.8);
}
</style>