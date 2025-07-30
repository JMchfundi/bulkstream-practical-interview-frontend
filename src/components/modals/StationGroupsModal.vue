<template>
  <b-modal
    :id="modalId"
    title="Station Groups"
    :visible="value"
    @hide="$emit('input', false)"
    size="md"
    centered
    hide-footer
  >
    <div>
      <div v-if="groups.length">
        <ul class="list-group">
          <li v-for="(group, index) in groups" :key="index" class="list-group-item">
            {{ group }}
          </li>
        </ul>
      </div>
      <div v-else class="text-muted text-center">
        No groups available for this station.
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'StationGroupsModal',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    groups: {
      type: Array,
      default: () => []
    },
    modalId: {
      type: String,
      default: 'station-groups-modal'
    }
  }
};
</script>
