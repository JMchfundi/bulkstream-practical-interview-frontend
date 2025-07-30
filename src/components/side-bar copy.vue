<script>
import simplebar from "simplebar-vue";
import { layoutComputed } from "@/state/helpers";
import MetisMenu from "metismenujs/dist/metismenujs";
import menuApi from "@/api/menuApi"; // Import the menu API
import swal from "sweetalert";

export default {
  components: {
    simplebar,
  },
  props: {
    isCondensed: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      menuItems: [], // Initialize as an empty array, will be fetched dynamically
      loading: true, // Add loading state
      error: null,   // Add error state
    };
  },
  computed: {
    ...layoutComputed,
  },
  async created() {
    try {
      const response = await menuApi.getDynamicMenu(); // Assuming getDynamicMenu exists in your menuApi
      const rawMenu = response.data;

      // Recursive deduplication function (copied from your first component)
      const deduplicateById = (items) => {
        const seen = new Set();
        const uniqueItems = [];

        if (!Array.isArray(items)) {
          console.warn("Deduplication received non-array items:", items);
          return [];
        }

        for (const item of items) {
          // Skip if item doesn't have an id or if it's already been seen
          if (!item || item.id === undefined || seen.has(item.id)) {
            continue;
          }
          seen.add(item.id);

          // If subItems exist, deduplicate them recursively
          if (Array.isArray(item.subItems)) {
            item.subItems = deduplicateById(item.subItems);
          }

          uniqueItems.push(item);
        }
        return uniqueItems;
      };

      this.menuItems = deduplicateById(rawMenu);
    } catch (err) {
      this.error = err;
      console.error("Failed to fetch dynamic vertical menu items:", err);
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        swal({
          icon: "error",
          title: "Authentication Error",
          text: "Please log in again or check your permissions.",
        });
      } else {
        swal({
          icon: "error",
          title: "Error",
          text: "Failed to load vertical menu. Please try again later.",
        });
      }
    } finally {
      this.loading = false;
      // After menu items are loaded and rendered, initialize MetisMenu and set active states
      this.$nextTick(() => {
        this.initMetisMenuAndActiveStates();
      });
    }
  },
  methods: {
    hasItems(item) {
      return item.subItems && item.subItems.length > 0;
    },
    onRoutechange() {
      // This method is primarily for scrolling, and it should run after menu is rendered
      // The activation logic is now in initMetisMenuAndActiveStates
      setTimeout(() => {
        if (this.$refs.currentMenu && this.$refs.currentMenu.SimpleBar) {
          const el = document.getElementsByClassName("mm-active")[0];
          if (el && el.offsetTop > 400) {
            this.$refs.currentMenu.SimpleBar.getScrollElement().scrollTop = el.offsetTop - 100;
          }
        }
      }, 300);
    },
    setlable(item) {
      const label = this.$t(item.label);
      const link = item.link;

      swal({
        icon: "success",
        text: `${label} selected`,
        timer: 750,
        buttons: false,
      });

      localStorage.setItem("clickedmenu", label);
      // Using router.push for navigation within a Vue app is generally preferred
      // unless a full page reload is specifically desired.
      if (this.$router && link) {
        this.$router.push(link);
      } else if (link) {
        window.location.replace(link);
      }
    },
    // New method to encapsulate MetisMenu initialization and active state logic
    initMetisMenuAndActiveStates() {
      // Ensure that the element exists before initializing MetisMenu
      const sideMenuEl = document.getElementById("side-menu");
      if (sideMenuEl) {
        new MetisMenu("#side-menu");
      } else {
        console.warn("MetisMenu target element #side-menu not found.");
        return;
      }

      const links = document.getElementsByClassName("side-nav-link-ref");
      let matchingMenuItem = null;
      for (let i = 0; i < links.length; i++) {
        // Ensure that links[i].pathname is valid before comparison
        if (links[i].pathname && window.location.pathname === links[i].pathname) {
          matchingMenuItem = links[i];
          break;
        }
      }

      if (matchingMenuItem) {
        matchingMenuItem.classList.add("active");
        let parent = matchingMenuItem.parentElement;
        while (parent && parent !== sideMenuEl) {
          if (parent.tagName === "LI") {
            parent.classList.add("mm-active");
            const childAnchor = parent.querySelector(".has-arrow, .has-dropdown");
            if (childAnchor) childAnchor.classList.add("mm-active");
          } else if (parent.tagName === "UL") {
            parent.classList.add("mm-show");
          }
          parent = parent.parentElement;
        }
      }
    },
  },
  watch: {
    $route: {
      handler: "onRoutechange",
      immediate: true,
      deep: true,
    },
    // The type and width watchers can remain as they are for layout adjustments
    type: {
      immediate: true,
      handler(newVal) {
        const body = document.body;
        switch (newVal) {
          case "dark":
            body.setAttribute("data-sidebar", "dark");
            break;
          case "light":
            body.setAttribute("data-topbar", "dark");
            body.removeAttribute("data-sidebar");
            body.removeAttribute("data-sidebar-size");
            body.classList.remove("vertical-collpsed");
            break;
          case "compact":
            body.setAttribute("data-sidebar-size", "small");
            body.setAttribute("data-sidebar", "dark");
            break;
          case "icon":
            body.setAttribute("data-keep-enlarged", "true");
            body.classList.add("vertical-collpsed");
            body.setAttribute("data-sidebar", "dark");
            break;
          case "colored":
            body.setAttribute("data-sidebar", "colored");
            body.classList.remove("vertical-collpsed");
            break;
          default:
            body.setAttribute("data-sidebar", "dark");
        }
      },
    },
    width: {
      immediate: true,
      handler(newVal) {
        if (newVal === "boxed") {
          document.body.setAttribute("data-layout-size", "boxed");
        } else {
          document.body.setAttribute("data-layout-mode", "fluid");
          document.body.removeAttribute("data-layout-size");
        }
      },
    },
  },
};
</script>

<template>
  <div class="vertical-menu">
    <simplebar class="h-100" ref="currentMenu" id="my-element">
      <div id="sidebar-menu">
        <div v-if="loading">Loading menu items...</div>
        <div v-else-if="error">Error loading menu: {{ error.message }}</div>
        <ul class="metismenu list-unstyled" id="side-menu" v-else>
          <template v-for="item in menuItems">
            <li class="menu-title" v-if="item.isTitle" :key="item.id">
              {{ $t(item.label) }}
            </li>

            <li v-if="!item.isTitle && !item.isLayout" :key="item.id">
              <a
                v-if="hasItems(item)"
                href="javascript:void(0);"
                class="is-parent"
                :class="{
                  'has-arrow': !item.badge,
                  'has-dropdown': item.badge,
                }"
              >
                <i :class="`bx ${item.icon}`" v-if="item.icon"></i>
                <span>{{ $t(item.label) }}</span>
                <span
                  v-if="item.badge"
                  :class="`badge badge-pill badge-${item.badge.variant} float-right`"
                >
                  {{ $t(item.badge.text) }}
                </span>
              </a>

              <router-link
                v-if="!hasItems(item)"
                :to="item.link"
                class="side-nav-link-ref"
                @click.native.prevent="setlable(item)"
              >
                <i :class="`bx ${item.icon}`" v-if="item.icon"></i>
                <span>{{ $t(item.label) }}</span>
              </router-link>

              <ul v-if="hasItems(item)" class="sub-menu" aria-expanded="false">
                <li v-for="(subitem, index) in item.subItems" :key="index">
                  <router-link
                    v-if="!hasItems(subitem)"
                    :to="subitem.link"
                    class="side-nav-link-ref"
                    @click.native.prevent="setlable(subitem)"
                  >
                    {{ $t(subitem.label) }}
                  </router-link>

                  <a
                    v-if="hasItems(subitem)"
                    href="javascript:void(0);"
                    class="side-nav-link-a-ref has-arrow"
                  >
                    {{ $t(subitem.label) }}
                  </a>
                  <ul
                    v-if="hasItems(subitem)"
                    class="sub-menu mm-collapse"
                    aria-expanded="false"
                  >
                    <li v-for="(subSubitem, i) in subitem.subItems" :key="i">
                      <router-link
                        :to="subSubitem.link"
                        class="side-nav-link-ref"
                        @click.native.prevent="setlable(subSubitem)"
                      >
                        {{ $t(subSubitem.label) }}
                      </router-link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </template>
        </ul>
      </div>
    </simplebar>
  </div>
</template>