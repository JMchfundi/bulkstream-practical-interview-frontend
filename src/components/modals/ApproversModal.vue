<template>
  <b-modal :visible="value" @hide="$emit('input', false)" title="Approvers" size="md" centered hide-footer>
    <ul v-if="approvers.length" class="list-group">
      <li v-for="(approver, index) in approvers" :key="index" class="list-group-item">
        {{ approver.fullName || approver.name || 'Unnamed' }}
      </li>
    </ul>
    <p v-else class="text-muted">No approvers available.</p>
  </b-modal>
</template>

<script>
export default {
  props: {
    value: { type: Boolean, required: true },
    approvers: { type: Array, default: () => [] }
  }
};
</script>
