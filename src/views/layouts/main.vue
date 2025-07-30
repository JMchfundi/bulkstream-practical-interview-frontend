<!-- src/layouts/ResponsiveLayout.vue -->
<template>
  <component :is="isMobile ? 'SidebarLayout' : 'HorizontalLayout'">
    <slot />
  </component>
</template>

<script>
import HorizontalLayout from "./horizontal.vue";
import SidebarLayout from "./vertical.vue";

export default {
  name: "ResponsiveLayout",
  components: {
    HorizontalLayout,
    SidebarLayout,
  },
  data() {
    return {
      isMobile: false,
    };
  },
  created() {
    this.checkScreenSize();
    window.addEventListener("resize", this.checkScreenSize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkScreenSize);
  },
  methods: {
    checkScreenSize() {
      this.isMobile = window.innerWidth < 992;
    },
  },
};
</script>
