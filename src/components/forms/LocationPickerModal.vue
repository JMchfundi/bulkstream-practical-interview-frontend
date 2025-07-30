<template>
  <div v-if="visible" class="modal fade show d-block" tabindex="-1" style="background: rgba(0,0,0,0.5)">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">📍 Pick Your Location</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>

        <div class="modal-body">
          <!-- Autocomplete Search -->
          <input
            v-model="searchQuery"
            class="form-control mb-2"
            placeholder="Search location e.g. Voi, Diani"
            @input="searchPlaces"
          />
          <ul v-if="searchResults.length" class="list-group position-absolute w-100 zindex-dropdown" style="max-height: 150px; overflow-y: auto">
            <li
              class="list-group-item list-group-item-action"
              v-for="(result, index) in searchResults"
              :key="index"
              @click="selectPlace(result)"
            >
              {{ result.properties.name }} - {{ result.properties.city || result.properties.country }}
            </li>
          </ul>

          <!-- Map -->
          <div class="position-relative">
            <l-map
              ref="mapRef"
              :zoom="zoom"
              :center="center"
              style="height: 300px; width: 100%; border-radius: 10px"
              @click="onMapClick"
            >
              <l-tile-layer :url="tileUrl" :attribution="tileAttr" />
              <l-marker v-if="marker" :lat-lng="marker" :icon="blueIcon" />
            </l-map>

            <!-- Current Location Button -->
            <button
              class="btn btn-light rounded-circle position-absolute"
              style="bottom: 12px; left: 12px; width: 42px; height: 42px; z-index: 1000"
              @click="setUserLocation"
              title="Use my current location"
            >
              <i class="bi bi-crosshair text-primary fs-5"></i>
            </button>
          </div>
        </div>

        <div class="modal-footer justify-content-between">
          <div class="text-start text-muted small">
            <div>📍 <strong>Location:</strong> {{ locationData.gps }}</div>
            <div v-if="locationData.landmark">🏙️ <strong>Landmark:</strong> {{ locationData.landmark }}</div>
          </div>
          <div>
            <button class="btn btn-secondary me-2" @click="closeModal">Cancel</button>
            <button class="btn btn-primary" @click="confirmLocation">Use This Location</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import debounce from "lodash/debounce";

// Blue Marker
const blueIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default {
  name: "LocationPickerModal",
  components: { LMap, LTileLayer, LMarker },
  props: {
    visible: Boolean
  },
  data() {
    return {
      searchQuery: "",
      searchResults: [],
      zoom: 13,
      center: [ -1.2921, 36.8219 ],
      marker: null,
      tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      tileAttr: '&copy; OpenStreetMap contributors',
      locationData: {
        county: '',
        subCounty: '',
        ward: '',
        landmark: '',
        gps: ''
      },
      blueIcon,
    };
  },
  mounted() {
    this.setUserLocation();
  },
  methods: {
    // 🔍 Photon Search API
    searchPlaces: debounce(async function () {
      if (this.searchQuery.length < 3) {
        this.searchResults = [];
        return;
      }
      const res = await fetch(`https://photon.komoot.io/api/?q=${this.searchQuery}&limit=5`);
      const data = await res.json();
      this.searchResults = data.features || [];
    }, 400),

    selectPlace(place) {
      const lat = place.geometry.coordinates[1];
      const lng = place.geometry.coordinates[0];
      this.center = [lat, lng];
      this.marker = { lat, lng };
      this.searchResults = [];
      this.searchQuery = `${place.properties.name}, ${place.properties.city || ''}`;
      this.setLocation(lat, lng);
    },

    setUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            this.center = [latitude, longitude];
            this.marker = { lat: latitude, lng: longitude };
            this.setLocation(latitude, longitude);
          },
          () => {
            alert("Unable to retrieve your location.");
          }
        );
      } else {
        alert("Geolocation is not supported.");
      }
    },

    onMapClick(e) {
      const { lat, lng } = e.latlng;
      this.marker = { lat, lng };
      this.setLocation(lat, lng);
    },

    async setLocation(lat, lng) {
      this.locationData.gps = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`);
        const data = await res.json();
        const address = data.address || {};
        this.locationData = {
          county: address.state || '',
          subCounty: address.county || address.city || '',
          ward: address.city || address.hamlet || '',
          landmark: data.display_name || '',
          gps: this.locationData.gps
        };
      } catch (e) {
        console.warn("Reverse geocoding failed", e);
      }
    },

    confirmLocation() {
      this.$emit('location-selected', this.locationData);
      this.closeModal();
    },

    closeModal() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.zindex-dropdown {
  z-index: 2000;
}
</style>
