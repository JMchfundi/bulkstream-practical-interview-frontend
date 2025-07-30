<script>
import { layoutMethods } from "@/state/helpers";
import swal from "sweetalert";
import menuApi from "@/api/menuApi"; // Import the menu API

export default {
  data() {
    return {
      menuItems: [], // Initialize as an empty array
      loading: true, // Add loading state
      error: null,   // Add error state
    };
  },
  async created() {
  try {
    const response = await menuApi.getDynamicMenu();
    const rawMenu = response.data;

    // Recursive deduplication function
    const deduplicateById = (items) => {
      const seen = new Set();
      const uniqueItems = [];

      for (const item of items) {
        if (!item.id || seen.has(item.id)) continue;
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
    console.error("Failed to fetch dynamic menu items:", err);
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
        text: "Failed to load menu. Please try again later.",
      });
    }
  } finally {
    this.loading = false;
  }
},
  mounted() {
    // Your existing DOM manipulation logic in mounted remains largely the same,
    // but ensure menuItems are loaded before it runs if dependent on dynamic content.
    // For now, it will run after menuItems are set, because `created` finishes first.
    // However, if the menu rendering is asynchronous, you might need to
    // re-run this logic after the menu is fully rendered (e.g., using Vue's nextTick)
    // or use Vue's reactivity for active states instead of direct DOM manipulation.
    // For simplicity, keeping it as is for now.

    if (!this.loading && !this.error && this.menuItems.length > 0) {
        var links = document.getElementsByClassName("side-nav-link-ref");
        var matchingMenuItem = null;
        for (var i = 0; i < links.length; i++) {
            if (window.location.pathname === links[i].pathname) {
                matchingMenuItem = links[i];
                break;
            }
        }
        if (matchingMenuItem) {
            matchingMenuItem.classList.add("active");
            var parent = matchingMenuItem.parentElement;

            /**
             * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
             * We should come up with non hard coded approach
             */
            if (parent) {
                parent.classList.add("active");
                const parent2 = parent.parentElement;
                if (parent2) {
                    parent2.classList.add("active");
                }
                const parent3 = parent2.parentElement;
                if (parent3) {
                    parent3.classList.add("active");
                    var childAnchor = parent3.querySelector(".has-dropdown");
                    if (childAnchor) childAnchor.classList.add("active");
                }

                const parent4 = parent3.parentElement;
                if (parent4) parent4.classList.add("active");
                const parent5 = parent4.parentElement;
                if (parent5) parent5.classList.add("active");
            }
        }
    }
  },

  methods: {
    ...layoutMethods,
    setlable(value, link) {
      swal({
        icon: "success",
        text: value + " selected",
        timer: 750,
        buttons: false,
      });
      localStorage.setItem("clickedmenu", value);
      window.location.replace(link);
    },
    /**
     * Menu clicked show the submenu
     */
    onMenuClick(event) {
      event.preventDefault();
      const nextEl = event.target.nextSibling;
      if (nextEl && !nextEl.classList.contains("show")) {
        const parentEl = event.target.parentNode;
        if (parentEl) {
          parentEl.classList.remove("show");
        }
        nextEl.classList.add("show");
      } else if (nextEl) {
        nextEl.classList.remove("show");
      }
      return false;
    },
    /**
     * Returns true or false if given menu item has child or not
     * @param item menuItem
     */
    hasItems(item) {
      return item.subItems !== undefined ? item.subItems.length > 0 : false;
    },
    change_layout(layout) {
      return this.changeLayoutType({ layoutType: layout });
    },
    topbarLight() {
      document.body.setAttribute("data-topbar", "light");
      document.body.removeAttribute("data-layout-size", "boxed");
    },
    boxedWidth() {
      document.body.setAttribute("data-layout-size", "boxed");
      document.body.removeAttribute("data-topbar", "light");
      document.body.setAttribute("data-topbar", "dark");
    },
  },
};
</script>

<template>
  <div class="topnav">
    <div class="container d-flex justify-content-center">
      <nav class="navbar navbar-light navbar-expand-lg topnav-menu">
        <div class="collapse navbar-collapse" id="topnav-menu-content">
          <div v-if="loading">Loading menu items...</div>
          <div v-else-if="error">Error loading menu: {{ error.message }}</div>
          <ul class="navbar-nav" v-else>
            <li class="nav-item dropdown" v-for="(item, index) of menuItems" :key="index">
              <router-link
                @click.native.capture="setlable(item.label, item.link)"
                tag="a"
                v-if="!item.subItems"
                :to="item.link"
                class="nav-link arrow-none"
              >
                <i :class="`${item.icon} mr-2`"></i>
                {{ $t(item.label) }}
              </router-link>
              <a
                v-if="item.subItems"
                class="nav-link arrow-none"
                @click="onMenuClick"
                href="javascript: void(0);"
                id="topnav-components"
                role="button"
              >
                <i :class="`${item.icon} mr-2`"></i>
                {{ $t(item.label) }}
                <div class="arrow-down"></div>
              </a>
              <div class="dropdown-menu row" aria-labelledby="topnav-dashboard" v-if="hasItems(item)">
                <template v-for="(subitem) of item.subItems">
                  <router-link
                    @click.native.capture="setlable(subitem.label, subitem.link)"
                    :key="subitem.id"
                    class="col dropdown-item side-nav-link-ref"
                    v-if="!hasItems(subitem)"
                    :to="subitem.link"
                  >{{ $t(subitem.label) }}</router-link>
                  <div class="dropdown" v-if="hasItems(subitem)" :key="subitem.id">
                    <a class="dropdown-item" href="javascript: void(0);" @click="onMenuClick">
                      {{ $t(subitem.label) }}
                      <div class="arrow-down"></div>
                    </a>
                    <div class="dropdown-menu">
                      <router-link
                        v-for="(subSubitem, index) of subitem.subItems"
                        :key="index"
                        :to="subSubitem.link"
                        @click.native.capture="setlable(subSubitem.label, subSubitem.link)"
                        class="dropdown-item side-nav-link-ref"
                      >{{ $t(subSubitem.label) }}</router-link>
                    </div>
                  </div>
                </template>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>