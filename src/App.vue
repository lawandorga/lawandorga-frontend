<template>
  <div>
    <div class="flex h-screen overflow-hidden print:h-auto print:overflow-auto">
      <NavigationMobile :open="menuOpen" :set-open="setMenuOpen" />

      <NavigationSidebar v-if="authenticated" />

      <div class="flex flex-col flex-1 w-0 overflow-hidden">
        <NavigationTop v-if="authenticated" :set-open="setMenuOpen" />

        <NavigationDefault v-if="!authenticated" />

        <!-- Main Panel -->
        <main
          class="relative flex-1 px-6 py-6 overflow-y-auto focus:outline-none"
        >
          <!-- <div class="px-6" :class="{ 'py-6': authenticated }"> -->
          <router-view></router-view>
          <!-- </div> -->
        </main>
      </div>
    </div>
    <AlertList
      :alerts="$store.getters['alert/alerts']"
      @close="$store.dispatch('alert/closeAlert', $event)"
    />
  </div>
</template>

<script lang="ts">
import NavigationDefault from "@/components/NavigationDefault.vue";
import { defineComponent } from "vue";
import { AlertList } from "@lawandorga/components";
import NavigationSidebar from "./components/NavigationSidebar.vue";
import NavigationTop from "./components/NavigationTop.vue";
import NavigationMobile from "./components/NavigationMobile.vue";

export default defineComponent({
  components: {
    AlertList,
    NavigationTop,
    NavigationDefault,
    NavigationMobile,
    NavigationSidebar,
  },
  data: function () {
    return {
      menuOpen: false,
      mobileMenuOpen: false,
    };
  },
  computed: {
    authenticated(): boolean {
      return this.$store.getters["user/isAuthenticated"];
    },
  },
  methods: {
    setMenuOpen(open: boolean) {
      this.menuOpen = open;
    },
  },
});
</script>
