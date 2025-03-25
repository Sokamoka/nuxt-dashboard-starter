<script setup>
const { status, data, send, open, close } = useWebSocket('/ws', { immediate: false })

// Only open the websocket after the page is hydrated (client-only)
onMounted(open)
</script>

<template>
  <div>
    <p>Status: {{ status }}</p>
    <p>Data: {{ data }}</p>
    <p>
      <button @click="open">Open</button>
      <button @click="close(1000, 'Closing')">Close</button>
      <button @click="send('hello')">Send hello</button>
    </p>
  </div>
</template>
