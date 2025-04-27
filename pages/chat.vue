<script setup>
const messageInput = ref("");
const messages = ref([]);
const { status, data, send, open, close } = useWebSocket('/chat', {
  immediate: false,
});

// Only open the websocket after the page is hydrated (client-only)
onMounted(open);

// if (status !== 'OPEN') open();

watch(
  () => JSON.parse(unref(data)),
  (d) => {
    messages.value.push(d);
  },
  {
    deep: true,
  }
);

function onSendMessage() {
  if (!messageInput.value) return;
  send(messageInput.value);
  messageInput.value = ''
}
</script>

<template>
  <div>
    <p>Status: {{ status }}</p>
    <p>Data: {{ data }}</p>
    <ul>
      <li v-for="{user, message} in messages" :key="message.user">
        {{ message }} {{ user }}
      </li>
    </ul>
    <UButtonGroup size="xl">
      <UInput
        v-model="messageInput"
        color="neutral"
        variant="outline"
        placeholder="Enter message"
        @keypress.enter="onSendMessage"
      />

      <UButton
        color="neutral"
        variant="subtle"
        icon="i-lucide-send"
        @click="onSendMessage"
      />
    </UButtonGroup>
    <div>
      <button @click="open">Open</button>
      <button @click="close(1000, 'Closing')">Close</button>
      <button @click="send('ping')">Send ping</button>
    </div>
  </div>
</template>
