<script>
  import Data from "../Data.svelte";
  import UploadProgress from "./UploadProgress.svelte";
  let fileInput;
  let file;

  let overrideClasses;
  const chooseFile = (e) => {
    overrideClasses = "border-indigo-500 bg-indigo-900 ring-indigo-500";
    console.log(e);
    fileInput.click();
  };
  const dropFile = (e) => {
    const dt = e.dataTransfer;
    file = dt.files[0];
  };

  const dragenter = (e) => {
    overrideClasses = "border-indigo-500 bg-indigo-900 ring-indigo-500";
  };

  let tailwind;
  export { tailwind as class };
  export let label;
  export let placeholder = "Drag and drop or click to upload";
  export let description;
  export let ct;

  export let value;
  export let processedValue;
  export let process;
</script>

<div class={tailwind}>
  <label
    class="block text-md font-medium {overrideClasses
      ? 'text-indigo-300'
      : 'text-gray-100'} "
    >{label || ""}

    <input
      bind:this={fileInput}
      on:change={(e) => (file = e.target.files[0])}
      type="file"
      accept={ct}
      class="hidden"
    />

    <div
      class="mt-1 shadow-sm border w-full text-lg border-gray-500 rounded-md bg-gray-600 text-white h-16 block relative overflow-hidden cursor-pointer {overrideClasses}"
      on:click={chooseFile}
      on:dragenter|preventDefault|stopPropagation={dragenter}
      on:dragover|preventDefault|stopPropagation={dragenter}
      on:dragleave|preventDefault|stopPropagation={() => (overrideClasses = "")}
      on:drop|preventDefault|stopPropagation={dropFile}
    >
      {#if file || value || processedValue}
        <Data
          load="/v1/media-upload?ct={file?.type ?? 'audio/mpeg'}"
          let:data={signed}
        >
          <UploadProgress
            {signed}
            {file}
            {value}
            {processedValue}
            {process}
            on:uploaded
          >
            <slot data={signed} />
          </UploadProgress>
        </Data>
      {:else}
        <div class="flex w-full h-full gap-4 px-4">
          <svg
            class="w-8 h-8 my-auto"
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

          <div class="my-auto text-sm leading-5 text-gray-100">
            {placeholder}
          </div>
        </div>
      {/if}
    </div>
  </label>
  {#if description}
    <p class="mt-2 text-gray-200 text-md" id="{label}-description">
      {description}
    </p>
  {:else}
    <slot name="description" />
  {/if}
</div>

{#if false}
  <!-- <div class="mt-5">
    <div
      class="px-6 py-5 rounded-md bg-gray-50 sm:flex sm:items-start sm:justify-between"
    >
      <div class="sm:flex sm:items-start">
        <svg
          class="w-auto h-8 sm:flex-shrink-0 sm:h-6"
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

        <div class="mt-3 sm:mt-0 sm:ml-4">
          <div
            class="text-sm leading-5 text-gray-600 sm:flex sm:items-center"
          >
            <div class="">
              {$episode.meta && $episode.meta.length
                ? `${($episode.meta.length / 60).toPrecision(2)} minutes`
                : "..."}
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
        <span
          class="inline-flex items-center px-3 py-0.5 rounded-full
            text-sm font-medium leading-5 {$episode.meta &&
          $episode.meta.published
            ? 'bg-green-100 text-green-800'
            : 'bg-yellow-100 text-yellow-800'}"
        >
          {$episode.meta && $episode.meta.published
            ? "Published"
            : "Processing"}
        </span>
      </div>
    </div>
  </div> -->
{:else}{/if}
