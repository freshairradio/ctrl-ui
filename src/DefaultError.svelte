<script>
  import type { DataError } from "./svelte-data-loading/common";
  export let error: DataError;
</script>

<div class="p-4 mt-4 rounded-md bg-red-50">
  <div class="flex">
    <div class="flex-shrink-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5 text-red-400"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    <div class="ml-3">
      <h3 class="text-sm font-medium text-red-800">
        {#if !error.data || !error.data?.message}
          <slot name="defaultError">
            Something went wrong — please email <a
              class="text-red-600 underline"
              href="mailto:manager@freshair.radio">manager@freshair.radio</a
            ></slot
          >
        {:else}
          {error.data.message}
        {/if}
      </h3>
    </div>
  </div>
</div>
