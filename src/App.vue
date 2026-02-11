<template>
  <div class="container">
    <div class="block" :class="{ animate: animateSquare }"></div>
    <button @click="animateBlock">Animate</button>
  </div>
  <div class="container">
    <transition>
      <p v-if="pVisible">This para is visible thanks to magic of sound</p>
    </transition>
    <button @click="toggleP">Toggle something</button>
  </div>
  <base-modal @close="hideDialog" v-if="dialogIsVisible">
    <p>This is a test dialog!</p>
    <button @click="hideDialog">Close it!</button>
  </base-modal>
  <div class="container">
    <button @click="showDialog">Show Dialog</button>
  </div>
</template>

<script>
export default {
  data() {
    return { animateSquare: false, dialogIsVisible: false, pVisible: false };
  },
  methods: {
    toggleP() {
      this.pVisible = !this.pVisible;
    },
    showDialog() {
      this.dialogIsVisible = true;
    },
    hideDialog() {
      this.dialogIsVisible = false;
    },
    animateBlock() {
      this.animateSquare = !this.animateSquare;
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
html {
  font-family: sans-serif;
}
body {
  margin: 0;
}

button {
  font: inherit;
  padding: 0.5rem 2rem;
  border: 1px solid #810032;
  border-radius: 30px;
  background-color: #810032;
  color: white;
  cursor: pointer;
}
button:hover,
button:active {
  background-color: #a80b48;
  border-color: #a80b48;
}
.block {
  width: 8rem;
  height: 8rem;
  background-color: #290033;
  margin-bottom: 2rem;
  /* transition: transform 1s ease-in-out; */
}
.animate {
  /* transform: translateX(-50px); */
  animation: slide-fade 1s ease-in-out forwards;
}
.container {
  max-width: 40rem;
  margin: 2rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  border: 2px solid #ccc;
  border-radius: 12px;
}

.v-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.v-enter-active {
  transition: all 0.3s ease-in-out;
}
.v-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.v-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.v-leave-active {
  transition: all 0.3s ease-in;
}
.v-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

@keyframes slide-fade {
  0% {
    transform: translateX(0px) scale(1);
  }
  20% {
    transform: translateX(-30px) scale(1.1);
  }
  40% {
    transform: translateX(-60px) scale(1.2);
  }
  60% {
    transform: translateX(30px) scale(1.1);
  }
  80% {
    transform: translateX(0px) scale(1);
  }
  100% {
    /* transform: rotate(360px); */
    transform: translateX(0px) scale(0.5);
  }
}
</style>
