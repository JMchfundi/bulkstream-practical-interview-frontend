<template>
  <b-modal id="translate-modal" size="xl" title="Choose Your Language" hide-backdrop scrollable>
    <Translator :countries="countries" @on-country-click="hideModal" />
  </b-modal>
</template>

<script>
import { Translator } from "vue-google-translate";
export default {
  name: "TranslateModal",
  components: {
    Translator,
  },
  data() {
    return {
      countries: [
        // {
        //   code: "en|zh-CN",
        //   title: "Chinese (Simplified)",
        // },
        {
          code: "en|en",
          title: "English",
        },
        {
          code: "en|fr",
          title: "French",
        },
        // {
        //   code: 'en|af',
        //   title: 'Afrikaans',
        // },
        {
          code: 'en|ar',
          title: 'Arabic',
        },
        {
          code: 'en|sw',
          title: 'Swahili',
          flagIconUrl: 'https://img.icons8.com/?size=48&id=1ZDex9dMvi8E&format=png',
          altText: 'Swahili language translation',
        },
        // {
        //   code: 'en|ko',
        //   title: 'Korean',
        // },
        // {
        //   code: 'en|lt',
        //   title: 'Lithuanian',
        // },
        // {
        //   code: "en|de",
        //   title: "German",
        // },
        // {
        //   code: "en|it",
        //   title: "Italian",
        // },
        // {
        //   code: "en|ru",
        //   title: "Russian",
        // },
        // {
        //   code: "en|es",
        //   title: "Spanish",
        // },
        // {
        //   code: "en|iw",
        //   title: "Hebrew",
        //   flagIconUrl: "https://flagicons.lipis.dev/flags/4x3/il.svg",
        //   altText: "Hebrew language translation",
        // },
      ],
    };
  },
  methods: {
    hideModal() {
      this.$bvModal.hide("translate-modal");
    },
  },
};
</script>