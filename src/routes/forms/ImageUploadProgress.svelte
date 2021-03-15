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

  export let value;

  let percentage = 0;
  let uploading = false;
  let done = false;

  const upload = (file, signed) => {
    uploading = true;
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
        uploading = false;
      },
      false
    );
    xhr.open("PUT", signed.signed);
    xhr.setRequestHeader("x-amz-acl", "public-read");
    xhr.setRequestHeader("Content-Type", file.type);
    xhr.overrideMimeType(file.type);
    reader.onload = (evt) => {
      xhr.send(evt.target.result);
    };
    reader.readAsArrayBuffer(file);
  };
  // onMount(() => {
  //   console.log(value, process, processedValue);
  //   if (value && !process) {
  //     done = true;
  //     return;
  //   } else if (value && process && !processedValue) {
  //     percentage = 100;
  //     processing = true;
  //     setupProgressListening(value);
  //     return;
  //   } else if (value && process && processedValue) {
  //     done = true;
  //     return;
  //   }
  // });
  $: file && signed && upload(file, signed);
</script>

{#if uploading}
  <div class="absolute top-0 left-0 w-full h-full bg-indigo-500 opacity-75" />

  <div class="flex w-full h-full">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      class="w-8 h-8 m-auto text-white animate-spin "
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  </div>
{/if}
