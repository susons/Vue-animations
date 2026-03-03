<template>
  <div class="container">
    <ListData />
  </div>
  <div class="container">
    <div class="block" :class="{ animate: animateSquare }"></div>
    <button @click="animateBlock">Animate</button>
  </div>
  <div class="container">
    <!-- <transition name="para" enter-to-class="" enter-active-class="to"> -->
    <transition
      :css="false"
      name="para"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
      @enter-cancelled="enterCancelled"
      @leave-cancelled="leaveCancelled"
    >
      <p v-if="pVisible">This para is visible thanks to magic of sound</p>
    </transition>
    <button @click="toggleP">Toggle something</button>
  </div>
  <div class="container">
    <transition name="fade" mode="out-in">
      <button @click="showUsers" v-if="!show">show users</button>
      <button @click="hideUsers" v-else>hide users</button>
    </transition>
  </div>
  <base-modal @close="hideDialog" :open="dialogIsVisible">
    <p>This is a test dialog!</p>
    <button @click="hideDialog">Close it!</button>
  </base-modal>
  <div class="container">
    <button @click="showDialog">Show Dialog</button>
  </div>
</template>

<script>
import ListData from "./components/ListData.vue";

export default {
  components: {
    ListData,
  },
  data() {
    return {
      animateSquare: false,
      dialogIsVisible: false,
      pVisible: false,
      enterInterval: null,
      leaveInterval: null,
      show: false,
    };
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
    showUsers() {
      this.show = true;
    },
    hideUsers() {
      this.show = false;
    },

    beforeEnter(el) {
      console.log("beforeEnter(: ");
      el.style.opacity = 0;
    },
    enter(el, done) {
      console.log("enter(: ");
      let round = 1;
      this.enterInterval = setInterval(() => {
        el.style.opacity = round * 0.01;
        round++;

        if (round > 100) {
          clearInterval(this.enterInterval);
          done();
        }
      }, 20);
    },
    afterEnter(el) {
      console.log("afterEnter(: ");
    },
    beforeLeave(el) {
      el.style.opacity = 1;
    },
    leave(el, done) {
      console.log("leave(: ");
      let round = 1;
      this.leaveInterval = setInterval(() => {
        el.style.opacity = 1 - round * 0.01;
        round++;

        if (round > 100) {
          clearInterval(this.leaveInterval);
          done();
        }
      }, 20);
    },
    afterLeave(el) {
      console.log("afterLeave(: ");
      el.style.opacity = 0;
    },
    enterCancelled(el) {
      console.log("enterCancelled");
      clearInterval(this.enterInterval);
    },
    leaveCancelled(el) {
      console.log("leaveCancelled");
      clearInterval(this.leaveInterval);
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
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.3s ease-out;
}
.fade-leave-active {
  transition: opacity 0.3s ease-in;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
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

/* .para-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.para-enter-active {
  transition: all 0.3s ease-in-out;
}
.para-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.para-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.para-leave-active {
  transition: all 0.3s ease-in;
}
.para-leave-to {
  opacity: 0;
  transform: translateY(-30px);
} */

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
