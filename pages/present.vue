<template>
  <div ref="presentationRoot" class="presentation-page min-h-screen bg-black text-white overflow-x-hidden font-serif">
    <div class="fixed inset-0 opacity-30 pointer-events-none">
      <div class="grid-pattern"></div>
    </div>

    <header class="relative z-10 py-8">
      <div class="present-container flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <NuxtLink to="/" class="inline-flex items-center space-x-5 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/40">
          <div class="w-12 h-12 bg-white rounded-sm flex items-center justify-center transition-all group-hover:scale-105 group-hover:shadow-lg">
            <Cpu class="w-7 h-7 text-black" />
          </div>
          <div>
            <p class="text-3xl font-light tracking-wider text-shadow">Friendly</p>
            <p class="text-gray-500 text-sm font-light tracking-wide">FriendNet Presentation</p>
          </div>
        </NuxtLink>

        <div class="flex items-center justify-between gap-4 md:justify-end">
          <a
            href="/present/friendnet-presentation.pptx"
            download
            class="inline-flex min-h-11 items-center space-x-2 border border-gray-700/80 px-4 py-2 text-sm text-gray-300 transition-all hover:border-gray-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/40"
          >
            <Download class="w-4 h-4" />
            <span>Original PPTX</span>
          </a>
        </div>
      </div>
    </header>

    <main class="present-container relative z-10 pb-16 space-y-10">
      <section class="pt-8 space-y-8">
        <div class="max-w-5xl space-y-5">
          <p class="text-sm uppercase text-gray-500 font-light tracking-[0.2em]">Deep Learning Project</p>
          <h1 class="text-4xl md:text-6xl font-light leading-tight text-shadow">
            FriendNet: Recognizing Friendly Faces
          </h1>
          <p class="max-w-3xl text-gray-400 font-light leading-relaxed">
            Understanding how FriendNet was built.
          </p>
        </div>

        <div class="presentation-grid">
          <section class="space-y-5" aria-label="Presentation viewer">
            <div class="relative border border-gray-800/60 bg-gray-900/20 glass-effect overflow-hidden">
              <div class="flex items-center justify-between border-b border-gray-800/70 px-4 py-3 md:px-5">
                <div class="min-w-0">
                  <p class="text-xs uppercase text-gray-500 font-light tracking-[0.18em]">Slide {{ currentSlide.number }}</p>
                  <h2 class="truncate text-base md:text-lg font-light text-gray-200">{{ currentSlide.title }}</h2>
                </div>
                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    class="icon-button"
                    aria-label="Previous slide"
                    :disabled="currentIndex === 0"
                    @click="previousSlide"
                  >
                    <ChevronLeft class="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    class="icon-button"
                    aria-label="Next slide"
                    :disabled="currentIndex === slides.length - 1"
                    @click="nextSlide"
                  >
                    <ChevronRight class="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    class="icon-button"
                    aria-label="Open presentation fullscreen"
                    @click="openFullscreen"
                  >
                    <Maximize2 class="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div class="relative aspect-video bg-black">
                <img
                  :key="currentSlide.image"
                  :src="currentSlide.image"
                  :alt="currentSlide.alt"
                  class="w-full h-full object-contain fade-in"
                  width="1440"
                  height="810"
                  fetchpriority="high"
                >
              </div>
            </div>

            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div class="flex items-center gap-3">
                <button
                  type="button"
                  class="control-button"
                  :disabled="currentIndex === 0"
                  @click="previousSlide"
                >
                  <ChevronLeft class="w-4 h-4" />
                  <span>Previous</span>
                </button>
                <button
                  type="button"
                  class="control-button control-button-primary"
                  :disabled="currentIndex === slides.length - 1"
                  @click="nextSlide"
                >
                  <span>Next</span>
                  <ChevronRight class="w-4 h-4" />
                </button>
              </div>

              <div class="flex items-center gap-3 text-sm text-gray-500 font-light" aria-live="polite">
                <span>{{ currentSlide.number }} / {{ slides.length }}</span>
                <div class="h-1 w-28 bg-gray-800 overflow-hidden rounded-full">
                  <div class="h-full bg-white transition-all duration-300" :style="{ width: progressWidth }"></div>
                </div>
              </div>
            </div>
          </section>

          <aside class="space-y-5">
            <section class="explainer-panel">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="text-xs uppercase text-gray-500 font-light tracking-[0.18em] mb-3">Concise breakdown</p>
                  <h3 class="text-2xl font-light leading-tight">{{ currentSlide.title }}</h3>
                </div>
                <div class="shrink-0 border border-gray-800/70 bg-black/30 px-3 py-2 text-xs text-gray-500">
                  {{ currentSlide.number }} / {{ slides.length }}
                </div>
              </div>

              <p class="text-sm leading-relaxed text-gray-400 font-light mt-5">
                {{ currentSlide.summary }}
              </p>

              <div class="mt-6">
                <p class="text-xs uppercase text-gray-500 font-light tracking-[0.18em] mb-3">How it works</p>
                <ol class="space-y-3">
                  <li v-for="(step, index) in currentSlide.howItWorks" :key="step" class="flex gap-3">
                    <span class="step-number">{{ index + 1 }}</span>
                    <span class="text-sm leading-relaxed text-gray-300 font-light">{{ step }}</span>
                  </li>
                </ol>
              </div>

              <div class="mt-6">
                <p class="text-xs uppercase text-gray-500 font-light tracking-[0.18em] mb-3">Key concepts</p>
                <div class="flex flex-wrap gap-2">
                  <span v-for="concept in currentSlide.concepts" :key="concept" class="concept-chip">{{ concept }}</span>
                </div>
              </div>
            </section>

            <section class="explainer-panel visual-panel">
              <p class="text-xs uppercase text-gray-500 font-light tracking-[0.18em] mb-4">{{ currentSlide.visual.label }}</p>

              <div v-if="currentSlide.visual.type === 'pipeline'" class="pipeline-visual" aria-label="Dataset to model pipeline visualization">
                <div v-for="stage in currentSlide.visual.stages" :key="stage" class="pipeline-node">{{ stage }}</div>
              </div>

              <div v-else-if="currentSlide.visual.type === 'architecture'" class="architecture-visual" aria-label="Model architecture comparison visualization">
                <div v-for="layer in currentSlide.visual.layers" :key="layer.name" class="architecture-layer">
                  <span>{{ layer.name }}</span>
                  <div class="layer-bar" :style="{ width: layer.width }"></div>
                </div>
              </div>

              <div v-else-if="currentSlide.visual.type === 'training'" class="training-visual" aria-label="Training loop visualization">
                <div v-for="stage in currentSlide.visual.stages" :key="stage" class="training-step">{{ stage }}</div>
              </div>

              <div v-else-if="currentSlide.visual.type === 'performance'" class="metric-bars" aria-label="Model performance bar comparison">
                <div v-for="metric in currentSlide.visual.metrics" :key="metric.name" class="space-y-2">
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-gray-300 font-light">{{ metric.name }}</span>
                    <span class="text-gray-500 font-light">{{ metric.value }}</span>
                  </div>
                  <div class="h-2 bg-gray-900 border border-gray-800/80 overflow-hidden">
                    <div class="metric-fill" :style="{ width: metric.value }"></div>
                  </div>
                </div>
              </div>

              <div v-else-if="currentSlide.visual.type === 'curves'" class="curve-visual" aria-label="Loss and accuracy curve visualization">
                <div class="curve-line curve-line-loss"></div>
                <div class="curve-line curve-line-accuracy"></div>
                <div class="curve-axis"></div>
                <div class="flex justify-between text-xs text-gray-500 font-light">
                  <span>Early epochs</span>
                  <span>Convergence</span>
                </div>
              </div>

              <div v-else-if="currentSlide.visual.type === 'gradcam'" class="gradcam-visual" aria-label="Grad-CAM focus visualization">
                <div class="face-frame">
                  <div class="heat heat-one"></div>
                  <div class="heat heat-two"></div>
                  <div class="heat heat-three"></div>
                </div>
                <p class="mt-4 text-sm leading-relaxed text-gray-400 font-light">The brighter regions represent the pixels that most influenced the final class score.</p>
              </div>

              <div v-else class="demo-visual" aria-label="Demo evaluation visualization">
                <div v-for="item in currentSlide.visual.stages" :key="item" class="demo-node">{{ item }}</div>
              </div>
            </section>

            <section class="explainer-panel">
              <p class="text-xs uppercase text-gray-500 font-light tracking-[0.18em] mb-4">Deck</p>
              <div class="grid grid-cols-3 gap-3 text-center">
                <div>
                  <p class="text-2xl font-light">{{ slides.length }}</p>
                  <p class="text-xs text-gray-500 font-light">Slides</p>
                </div>
                <div>
                  <p class="text-2xl font-light">3</p>
                  <p class="text-xs text-gray-500 font-light">Models</p>
                </div>
                <div>
                  <p class="text-2xl font-light">5</p>
                  <p class="text-xs text-gray-500 font-light">Classes</p>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </section>

      <nav class="space-y-4" aria-label="Slide thumbnails">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-light text-gray-300 tracking-wide">Slides</h2>
          <span class="text-sm text-gray-500 font-light">{{ currentSlide.title }}</span>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-5 xl:grid-cols-10 gap-4">
          <button
            v-for="(slide, index) in slides"
            :key="slide.number"
            type="button"
            class="thumbnail-button"
            :class="{ 'thumbnail-button-active': currentIndex === index }"
            :aria-current="currentIndex === index ? 'true' : undefined"
            @click="goToSlide(index)"
          >
            <span class="sr-only">Open slide {{ slide.number }}: {{ slide.title }}</span>
            <span class="block aspect-video overflow-hidden bg-black">
              <img
                :src="slide.image"
                :alt="slide.alt"
                class="h-full w-full object-cover opacity-80 transition-all duration-200"
                width="320"
                height="180"
                loading="lazy"
              >
            </span>
            <span class="flex items-center justify-between px-3 py-2 text-left">
              <span class="truncate text-xs text-gray-400 font-light">{{ slide.title }}</span>
              <span class="text-xs text-gray-600 font-light">{{ slide.number }}</span>
            </span>
          </button>
        </div>
      </nav>

    </main>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import {
  ChevronLeft,
  ChevronRight,
  Cpu,
  Download,
  Maximize2
} from 'lucide-vue-next'

useHead({
  title: 'FriendNet Presentation',
  meta: [
    {
      name: 'description',
      content: 'FriendNet presentation deck for recognizing friendly faces with CNN, ResNet50, and CLIP models.'
    }
  ]
})

const presentationRoot = ref(null)
const currentIndex = ref(0)

const slides = [
  {
    number: 1,
    title: 'FriendNet: Recognizing Friendly Faces',
    image: '/present/slides/slides.001.png',
    summary: 'FriendNet is a face-recognition project that learns to identify five known friends from images. The presentation compares a custom CNN built for this dataset with two stronger pretrained approaches: ResNet50 and CLIP.',
    howItWorks: [
      'Each image is resized and normalized so the model sees a consistent input format.',
      'The network extracts visual patterns from the face, starting with simple details and building toward identity-specific cues.',
      'The final layer produces one score per friend, and the highest score becomes the prediction.'
    ],
    concepts: ['Supervised learning', 'Image classification', 'Feature extraction', 'Transfer learning'],
    visual: {
      type: 'pipeline',
      label: 'Recognition pipeline',
      stages: ['Image', 'Preprocess', 'Features', 'Class score', 'Prediction']
    }
  },
  {
    number: 2,
    title: 'Introduction',
    image: '/present/slides/slides.002.png',
    summary: 'This slide frames the project as a five-person recognition problem and introduces the three model paths. The key question is whether a small custom CNN can compete with models that already learned general visual features from much larger datasets.',
    howItWorks: [
      'FriendNet learns directly from the friend images, so it has to discover useful filters from this project data.',
      'ResNet50 starts with strong image-recognition knowledge from ImageNet, then adapts its final classifier to the five friends.',
      'CLIP turns each image into a rich embedding, and a small classifier learns which embedding patterns match each friend.'
    ],
    concepts: ['Custom CNN', 'ResNet50', 'CLIP embeddings', 'Model comparison'],
    visual: {
      type: 'pipeline',
      label: 'Three-model comparison',
      stages: ['FriendNet', 'ResNet50', 'CLIP', 'Five-way classifier']
    }
  },
  {
    number: 3,
    title: 'Dataset Preparation',
    image: '/present/slides/slides.003.png',
    summary: 'The dataset was built from video frames, then resized, normalized, balanced, split into train/validation/test sets, and augmented. This matters because face models can easily memorize repeated frames if the split is careless.',
    howItWorks: [
      'Frames are extracted from short videos so there are enough examples for each person.',
      'Images are resized to 224 by 224 pixels because CNNs and pretrained models expect fixed-size batches.',
      'Augmentation changes brightness, color, position, and scale so the model learns faces, not only the exact recording conditions.'
    ],
    concepts: ['Train-validation-test split', 'Normalization', 'Class balance', 'Augmentation'],
    visual: {
      type: 'pipeline',
      label: 'Data preparation flow',
      stages: ['Video frames', 'Resize', 'Normalize', 'Augment', 'Balanced split']
    }
  },
  {
    number: 4,
    title: 'Model Architectures',
    image: '/present/slides/slides.004.png',
    summary: 'This is the most important architecture slide. FriendNet is the custom CNN: it stacks convolution, normalization, activation, pooling, dropout, and dense layers to learn face features from scratch. ResNet50 and CLIP reuse pretrained visual knowledge, so they need less project data to perform well.',
    howItWorks: [
      'Custom CNN: convolution layers scan the image with small filters. Early filters catch edges and color changes, middle layers combine them into eyes, hairline, nose shape, and face contours, and the final dense layer maps those features to the five friends.',
      'ResNet50: the model is much deeper, but residual connections let each block learn a small correction instead of relearning the whole image representation. This helps gradients move through the network and makes deep training stable.',
      'CLIP: instead of training normal face filters from scratch, CLIP uses a vision encoder already trained to connect images with language. The project can use its image embedding as a strong summary of the face, then classify that summary.',
      'Freezing means keeping pretrained layers locked during training. Their weights do not change, so only the new classifier head learns. This is useful when the dataset is small because it avoids damaging useful pretrained features.'
    ],
    concepts: ['Convolution', 'BatchNorm', 'Dropout', 'Residual blocks', 'Classifier head'],
    visual: {
      type: 'architecture',
      label: 'Representation depth',
      layers: [
        { name: 'Input image', width: '38%' },
        { name: 'Low-level filters', width: '52%' },
        { name: 'Face features', width: '72%' },
        { name: 'Identity logits', width: '90%' }
      ]
    }
  },
  {
    number: 5,
    title: 'Training Process',
    image: '/present/slides/slides.005.png',
    summary: 'Training repeatedly shows batches of face images to the model, checks how wrong the predictions are, and updates the trainable weights. Validation is used during training to decide whether the model is improving or starting to overfit.',
    howItWorks: [
      'The forward pass sends a batch of images through the model and produces five class scores per image.',
      'Cross entropy punishes the model when the true friend does not receive the strongest score.',
      'Backpropagation traces the error backward through the classifier and feature extractor, then SGD adjusts the trainable weights.',
      'Early stopping saves the best validation checkpoint instead of blindly trusting the final epoch.'
    ],
    concepts: ['Forward pass', 'Cross entropy', 'Backpropagation', 'SGD momentum', 'Early stopping'],
    visual: {
      type: 'training',
      label: 'Training loop',
      stages: ['Batch', 'Predict', 'Loss', 'Gradient', 'Update', 'Validate']
    }
  },
  {
    number: 6,
    title: 'Model Performance',
    image: '/present/slides/slides.006.png',
    summary: 'The custom CNN performs strongly, but ResNet50 and CLIP perform best because they begin with stronger visual representations. The takeaway is not that the custom model failed; it is that transfer learning gives a major advantage on smaller image datasets.',
    howItWorks: [
      'Accuracy tells how many predictions were correct overall.',
      'Precision and recall help reveal whether the model is confusing one person for another.',
      'Pretrained models usually separate faces better because their earlier layers already understand useful visual structure.'
    ],
    concepts: ['Accuracy', 'Precision', 'Recall', 'F1 score', 'Generalization'],
    visual: {
      type: 'performance',
      label: 'Reported test performance',
      metrics: [
        { name: 'FriendNet', value: '95.73%' },
        { name: 'ResNet50', value: '100%' },
        { name: 'CLIP', value: '99.87%' }
      ]
    }
  },
  {
    number: 7,
    title: 'Loss and Accuracy Curves',
    image: '/present/slides/slides.007.png',
    summary: 'Loss and accuracy curves show whether the model is learning useful patterns or memorizing the training data. The goal is for validation performance to improve along with training performance.',
    howItWorks: [
      'Training loss dropping means the model is fitting the examples it sees during training.',
      'Validation loss dropping means the model is also improving on held-out examples.',
      'If training improves while validation gets worse, the model is memorizing details that do not transfer.'
    ],
    concepts: ['Convergence', 'Overfitting', 'Underfitting', 'Validation gap'],
    visual: {
      type: 'curves',
      label: 'Learning dynamics'
    }
  },
  {
    number: 8,
    title: 'Grad-CAM Explainability',
    image: '/present/slides/slides.008.png',
    summary: 'Grad-CAM helps explain what part of the image influenced the model. For face recognition, a useful heatmap should focus on the face, not the background, clothing, or room lighting.',
    howItWorks: [
      'First, the image passes through the model and receives a predicted friend label.',
      'Grad-CAM checks which late feature maps mattered most for that label.',
      'The heatmap is overlaid on the image so we can see whether the model used facial evidence or accidental background clues.'
    ],
    concepts: ['Explainability', 'Feature maps', 'Class activation', 'Model debugging'],
    visual: {
      type: 'gradcam',
      label: 'Attention heatmap'
    }
  },
  {
    number: 9,
    title: 'Conclusion and Future Work',
    image: '/present/slides/slides.009.png',
    summary: 'The conclusion is that FriendNet works, but pretrained architectures are stronger for this dataset. Future work should focus on more diverse images, better augmentation, and testing on harder real-world examples.',
    howItWorks: [
      'More data helps the model see each friend in different lighting, poses, expressions, and backgrounds.',
      'Stronger augmentation makes the model less fragile when the face is shifted, cropped, or slightly distorted.',
      'An ensemble can combine model predictions, but it only helps if the models make different kinds of mistakes.'
    ],
    concepts: ['Robustness', 'Dataset diversity', 'CutMix', 'Ensembling', 'Error analysis'],
    visual: {
      type: 'pipeline',
      label: 'Next iteration',
      stages: ['More data', 'Better augmentation', 'Ensemble', 'Evaluate', 'Deploy']
    }
  },
  {
    number: 10,
    title: 'Questions and Live Demo',
    image: '/present/slides/slides.010.png',
    summary: 'The live demo should show the full inference flow: take an image, preprocess it, run the model, return the predicted friend, and discuss confidence. For group photos, the system first needs to find each face before classification.',
    howItWorks: [
      'Evaluation images confirm the deployed model behaves like the tested notebook or training script.',
      'Unseen images reveal whether the model learned identity features instead of memorizing training frames.',
      'Group photos add a detection step: locate faces, crop each one, then classify each crop separately.'
    ],
    concepts: ['Inference', 'Robustness test', 'Face detection', 'Deployment validation'],
    visual: {
      type: 'demo',
      label: 'Demo path',
      stages: ['Evaluation set', 'Unseen set', 'Group photo']
    }
  }
]

const currentSlide = computed(() => ({
  ...slides[currentIndex.value],
  alt: `Slide ${slides[currentIndex.value].number}: ${slides[currentIndex.value].title}. ${slides[currentIndex.value].summary}`
}))

const progressWidth = computed(() => `${((currentIndex.value + 1) / slides.length) * 100}%`)

const goToSlide = (index) => {
  currentIndex.value = Math.min(Math.max(index, 0), slides.length - 1)
}

const previousSlide = () => {
  goToSlide(currentIndex.value - 1)
}

const nextSlide = () => {
  goToSlide(currentIndex.value + 1)
}

const openFullscreen = async () => {
  if (!presentationRoot.value || !document.fullscreenEnabled) return

  try {
    await presentationRoot.value.requestFullscreen()
  } catch (error) {
    console.warn('Fullscreen request failed:', error)
  }
}

const handleKeydown = (event) => {
  if (event.defaultPrevented) return

  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    previousSlide()
  }

  if (event.key === 'ArrowRight' || event.key === ' ') {
    event.preventDefault()
    nextSlide()
  }

  if (event.key === 'Home') {
    event.preventDefault()
    goToSlide(0)
  }

  if (event.key === 'End') {
    event.preventDefault()
    goToSlide(slides.length - 1)
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
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

.glass-effect {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.text-shadow {
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
}

.presentation-page {
  width: 100dvw;
  max-width: none;
}

.present-container {
  box-sizing: border-box;
  width: min(90dvw, 1800px) !important;
  max-width: none !important;
  margin-left: auto !important;
  margin-right: auto !important;
}

@supports not (width: 100dvw) {
  .presentation-page {
    width: 100vw;
  }

  .present-container {
    width: min(90vw, 1800px) !important;
  }
}

.presentation-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1.5rem;
}

@media (min-width: 1180px) {
  .presentation-grid {
    grid-template-columns: minmax(0, 1.05fr) minmax(460px, 0.95fr);
    gap: 2rem;
    align-items: start;
  }
}

@media (min-width: 1536px) {
  .presentation-grid {
    grid-template-columns: minmax(0, 1fr) minmax(560px, 1fr);
  }
}

.explainer-panel {
  border: 1px solid rgba(31, 41, 55, 0.75);
  background: rgba(17, 24, 39, 0.18);
  padding: 1.25rem;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.visual-panel {
  position: relative;
  overflow: hidden;
}

.step-number {
  width: 1.5rem;
  height: 1.5rem;
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(75, 85, 99, 0.8);
  background: rgba(255, 255, 255, 0.04);
  color: rgb(229, 231, 235);
  font-size: 0.75rem;
  line-height: 1;
}

.concept-chip {
  border: 1px solid rgba(75, 85, 99, 0.75);
  background: rgba(255, 255, 255, 0.04);
  color: rgb(209, 213, 219);
  padding: 0.4rem 0.65rem;
  font-size: 0.75rem;
  line-height: 1;
}

.pipeline-visual,
.training-visual,
.demo-visual {
  display: grid;
  gap: 0.75rem;
}

.pipeline-node,
.training-step,
.demo-node {
  position: relative;
  min-height: 44px;
  display: flex;
  align-items: center;
  border: 1px solid rgba(55, 65, 81, 0.9);
  background: linear-gradient(90deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02));
  color: rgb(229, 231, 235);
  padding: 0.75rem 0.9rem;
  font-size: 0.875rem;
  font-weight: 300;
  overflow: hidden;
}

.pipeline-node::after,
.training-step::after,
.demo-node::after {
  content: '';
  position: absolute;
  inset: 0;
  width: 35%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.12), transparent);
  animation: sweep 2.4s ease-in-out infinite;
}

.pipeline-node:nth-child(2)::after,
.training-step:nth-child(2)::after,
.demo-node:nth-child(2)::after {
  animation-delay: 0.18s;
}

.pipeline-node:nth-child(3)::after,
.training-step:nth-child(3)::after,
.demo-node:nth-child(3)::after {
  animation-delay: 0.36s;
}

.pipeline-node:nth-child(4)::after,
.training-step:nth-child(4)::after,
.demo-node:nth-child(4)::after {
  animation-delay: 0.54s;
}

.pipeline-node:nth-child(5)::after,
.training-step:nth-child(5)::after,
.demo-node:nth-child(5)::after {
  animation-delay: 0.72s;
}

.architecture-visual {
  display: grid;
  gap: 0.9rem;
}

.architecture-layer {
  display: grid;
  grid-template-columns: 7.5rem minmax(0, 1fr);
  gap: 0.75rem;
  align-items: center;
  color: rgb(209, 213, 219);
  font-size: 0.875rem;
  font-weight: 300;
}

.layer-bar {
  height: 0.65rem;
  border: 1px solid rgba(75, 85, 99, 0.8);
  background: linear-gradient(90deg, rgba(255,255,255,0.85), rgba(156,163,175,0.25));
  transform-origin: left center;
  animation: growBar 0.7s ease-out both;
}

.training-visual {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.training-step {
  justify-content: center;
  text-align: center;
}

.metric-bars {
  display: grid;
  gap: 1rem;
}

.metric-fill {
  height: 100%;
  background: linear-gradient(90deg, rgba(255,255,255,0.9), rgba(156,163,175,0.45));
  transform-origin: left center;
  animation: growBar 0.8s ease-out both;
}

.curve-visual {
  position: relative;
  min-height: 220px;
  border: 1px solid rgba(55, 65, 81, 0.75);
  background:
    linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 42px 42px;
  padding: 1rem;
  overflow: hidden;
}

.curve-line {
  position: absolute;
  left: 1rem;
  right: 1rem;
  height: 3px;
  transform: rotate(var(--curve-rotation)) scaleX(0);
  transform-origin: left center;
  animation: drawLine 0.9s ease-out both;
}

.curve-line-loss {
  --curve-rotation: -13deg;
  top: 58%;
  background: linear-gradient(100deg, rgba(248,113,113,0.85), rgba(248,113,113,0.2));
}

.curve-line-accuracy {
  --curve-rotation: 12deg;
  top: 38%;
  background: linear-gradient(100deg, rgba(255,255,255,0.25), rgba(255,255,255,0.95));
  animation-delay: 0.18s;
}

.curve-axis {
  position: absolute;
  left: 1rem;
  right: 1rem;
  bottom: 2.75rem;
  height: 1px;
  background: rgba(107, 114, 128, 0.7);
}

.gradcam-visual {
  display: grid;
  gap: 0.5rem;
}

.face-frame {
  position: relative;
  min-height: 250px;
  border: 1px solid rgba(55, 65, 81, 0.8);
  background:
    radial-gradient(circle at 50% 35%, rgba(255,255,255,0.08), transparent 22%),
    radial-gradient(circle at 42% 45%, rgba(255,255,255,0.12), transparent 8%),
    radial-gradient(circle at 58% 45%, rgba(255,255,255,0.12), transparent 8%),
    radial-gradient(circle at 50% 62%, rgba(255,255,255,0.1), transparent 10%),
    rgba(17, 24, 39, 0.25);
  overflow: hidden;
}

.heat {
  position: absolute;
  border-radius: 999px;
  filter: blur(18px);
  opacity: 0.58;
  animation: heatPulse 2.6s ease-in-out infinite;
}

.heat-one {
  width: 7rem;
  height: 7rem;
  top: 23%;
  left: 29%;
  background: rgba(248, 113, 113, 0.72);
}

.heat-two {
  width: 5.5rem;
  height: 5.5rem;
  top: 33%;
  right: 24%;
  background: rgba(250, 204, 21, 0.58);
  animation-delay: 0.3s;
}

.heat-three {
  width: 6rem;
  height: 6rem;
  bottom: 19%;
  left: 39%;
  background: rgba(255, 255, 255, 0.34);
  animation-delay: 0.55s;
}

.icon-button,
.control-button {
  min-height: 44px;
  min-width: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(75, 85, 99, 0.8);
  color: rgb(209, 213, 219);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.icon-button:hover:not(:disabled),
.control-button:hover:not(:disabled) {
  border-color: rgba(156, 163, 175, 0.9);
  color: white;
  transform: translateY(-1px);
}

.icon-button:focus-visible,
.control-button:focus-visible,
.thumbnail-button:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.45);
  outline-offset: 3px;
}

.icon-button:disabled,
.control-button:disabled {
  cursor: not-allowed;
  opacity: 0.35;
}

.control-button {
  gap: 0.5rem;
  padding: 0.7rem 1rem;
  min-width: 118px;
  font-size: 0.875rem;
  font-weight: 400;
}

.control-button-primary {
  background: white;
  color: black;
  border-color: white;
}

.control-button-primary:hover:not(:disabled) {
  background: rgb(243, 244, 246);
  color: black;
}

.thumbnail-button {
  border: 1px solid rgba(31, 41, 55, 0.75);
  background: rgba(17, 24, 39, 0.22);
  cursor: pointer;
  overflow: hidden;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.thumbnail-button:hover {
  border-color: rgba(107, 114, 128, 0.9);
  background: rgba(17, 24, 39, 0.35);
}

.thumbnail-button:hover img,
.thumbnail-button-active img {
  opacity: 1;
}

.thumbnail-button-active {
  border-color: rgba(255, 255, 255, 0.75);
  background: rgba(255, 255, 255, 0.06);
}

.fade-in {
  animation: fadeIn 0.22s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes sweep {
  0% {
    transform: translateX(-130%);
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  70% {
    opacity: 0.65;
  }
  100% {
    transform: translateX(310%);
    opacity: 0;
  }
}

@keyframes growBar {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

@keyframes drawLine {
  to {
    transform: rotate(var(--curve-rotation)) scaleX(1);
  }
}

@keyframes heatPulse {
  0%,
  100% {
    transform: scale(0.92);
    opacity: 0.42;
  }
  50% {
    transform: scale(1.08);
    opacity: 0.72;
  }
}

@media (prefers-reduced-motion: reduce) {
  .fade-in,
  .icon-button,
  .control-button,
  .thumbnail-button,
  img,
  .pipeline-node::after,
  .training-step::after,
  .demo-node::after,
  .layer-bar,
  .metric-fill,
  .curve-line,
  .heat {
    animation: none;
    transition: none;
  }

  .layer-bar,
  .metric-fill {
    transform: scaleX(1);
  }

  .curve-line {
    transform: rotate(var(--curve-rotation)) scaleX(1);
  }
}
</style>
