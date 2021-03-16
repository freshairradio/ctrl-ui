<script>
  import { onMount, createEventDispatcher, onDestroy } from "svelte";
  const dispatch = createEventDispatcher();

  let ws;
  onDestroy(() => {
    if (ws) {
      ws.close();
    }
  });
  export let signed;
  export let file;
  export let process = true;

  export let value;
  export let processedValue;

  let percentage = 0;
  let processingPercentage = 0;
  let processing = false;
  let done = false;
  const setupProgressListening = (url) => {
    processing = true;
    ws = new WebSocket("wss://ws.freshair.radio");
    ws.onmessage = (m) => {
      const data = JSON.parse(m.data);
      if (data.type == "processingUpdate" && url == data.for) {
        processingPercentage = Math.round(data.progress);
      } else if (data.type == "processingDone" && url == data.for) {
        done = true;
      }
      console.log(data);
    };
  };
  const upload = (file, signed) => {
    const reader = new FileReader();
    const xhr = new XMLHttpRequest();
    xhr.upload.addEventListener(
      "progress",
      (e) => {
        if (e.lengthComputable) {
          percentage = Math.round((e.loaded * 100) / e.total);
          console.log(percentage);
        }
      },
      false
    );

    xhr.upload.addEventListener(
      "load",
      (e) => {
        percentage = 100;
        dispatch("uploaded", signed);
        if (process) {
          setupProgressListening(signed.access);
        }
      },
      false
    );
    xhr.open("PUT", signed.signed);
    xhr.setRequestHeader("x-amz-acl", "public-read");
    xhr.setRequestHeader("Content-Type", "audio/mpeg");
    xhr.overrideMimeType("audio/mpeg");
    reader.onload = (evt) => {
      xhr.send(evt.target.result);
    };
    reader.readAsArrayBuffer(file);
  };
  onMount(() => {
    console.log(value, process, processedValue);
    if (value && !process) {
      done = true;
      return;
    } else if (value && process && !processedValue) {
      percentage = 100;
      processing = true;
      setupProgressListening(value);
      return;
    } else if (value && process && processedValue) {
      done = true;
      return;
    }
    upload(file, signed);
  });
</script>

<div
  class="absolute top-0 left-0 h-full bg-indigo-500 "
  style="width: {percentage}%; transition: width .2s"
/>
{#if processing}
  <div
    class="absolute top-0 left-0 h-full bg-yellow-500 "
    style="width: {processingPercentage}%; transition: width .2s"
  />
{/if}
{#if done}
  <div
    class="absolute top-0 left-0 h-full bg-green-500 "
    style="width: 100%; transition: width .2s"
  />
{/if}
<div class="flex w-full h-full gap-4 px-4">
  {#if done}
    <svg
      class="z-10 w-8 h-8 my-auto text-white"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010
      12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0
      011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0
      .891-1.077 1.337-1.707.707L5.586 15z"
      />
    </svg>
  {:else}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      class="w-8 h-8 my-auto text-white animate-spin "
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  {/if}
  <div class="z-10 my-auto text-sm leading-5 text-gray-100">
    {#if done}
      Uploaded
    {:else if processing}
      {processingPercentage == 0 ? "Processing..." : `${processingPercentage}%`}
    {:else}
      {percentage}%
    {/if}
  </div>
</div>
