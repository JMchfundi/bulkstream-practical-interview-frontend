<style>
/* @import 'https://fonts.googleapis.com/css?family=Raleway:100,600,400'; */
/* @import 'https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css'; */
/* @import 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css'; */
</style>
<template>
  <div id="app">

    <Loader :start="isLoading" />
    <router-view />
  </div>
</template>

<script>
import appConfig from "@/app.config";
import Loader from "./components/loaders/loader";

export default {
  components: {
    Loader,
  },
  mounted() {
    this.$loadScript("lib/jquery/jquery.min.js").then(() => {
      this.$loadScript("lib/jquery/jquery-migrate.min.js").then(() => {
        this.$loadScript("lib/popper/popper.min.js").then(() => {
          this.$loadScript("lib/bootstrap/js/bootstrap.min.js").then(() => {
            this.$loadScript("lib/easing/easing.min.js").then(() => {
              this.$loadScript("lib/owlcarousel/owl.carousel.min.js").then(() => {
                this.$loadScript("lib/scrollreveal/scrollreveal.min.js").then(() => {
                  this.$loadScript("contactform/contactform.js").then(() => {
                    this.$loadScript("js/main.js").then(() => {
                      this.$loadScript("https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js").then(() => { });
                    });
                  }
                  );
                }
                );
              });
            });
          });
        });
      });
    });

  },

  data() {
    return {
      isLoading: false,
      // fullPage: true
    }
  },
  methods: {
    doAjax() {
      this.isLoading = true;
      // simulate AJAX
      setTimeout(() => {
        this.isLoading = false
      }, 5000)
    },

  },

  provide() {
    return {
      // mySpinner: this.spin,
      mySpinner: this.doAjax,
    }
  },
  name: "app",
  page: {
    // All subcomponent titles will be injected into this template.
    titleTemplate(title) {
      title = typeof title === "function" ? title(this.$store) : title;
      return title ? `${title} | ${appConfig.title}` : appConfig.title;
    }
  }
};
</script>