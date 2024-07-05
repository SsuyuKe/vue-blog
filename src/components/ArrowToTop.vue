<script setup>
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
</script>

<template>
  <div
    @click="scrollToTop"
    class="fixed bottom-14 right-12 w-10 h-10 border-2 border-black border-solid rounded-full cursor-pointer
    hover:text-themeColor hover:border-themeColor">
      <i
        class="fa-solid fa-arrow-up absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">
      </i>
  </div>
</template>