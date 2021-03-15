<script>
  let tailwind;
  export { tailwind as class };
  export let label;
  export let value;
  export let placeholder = "...";
  export let hex;
  export let submission;
  export let provider;
  let editing;
</script>

<div class={tailwind}>
  <label
    for={label}
    class="block font-medium text-gray-100 text-md focus-within:text-indigo-300"
  >
    <div
      class="flex w-full gap-2 {label
        ? 'mt-1'
        : ''} text-lg text-white bg-gray-600 border border-transparent rounded-md "
    >
      {#if editing}
        <input
          type="text"
          name={label}
          bind:value
          class="block w-full text-lg text-white bg-gray-700 border-0 rounded-md shadow-sm shadow-inner focus:ring-indigo-500 focus:border-indigo-500 focus:bg-indigo-900"
          {placeholder}
          aria-describedby="{label}-description"
        />
      {:else if value && value.length > 0}
        <a
          href={value}
          target="__blank"
          style="background: {hex}"
          class="flex items-center flex-grow gap-2 px-1 text-center text-gray-200 rounded-md shadow-sm h-11"
          ><slot />{provider}</a
        >
      {:else}
        <a
          href={submission}
          target="__blank"
          style="background: {hex}"
          class="flex items-center flex-grow gap-2 px-1 text-center text-gray-200 rounded-md shadow-sm h-11"
          ><slot />{label}</a
        >
      {/if}
      <button
        on:click={() => (editing = !editing)}
        class="flex items-center flex-grow-0 px-3  {editing
          ? 'bg-indigo-600 text-gray-200'
          : 'bg-gray-700 text-gray-200'} border-gray-500 rounded-md shadow-sm cursor-pointer h-11 whitespace-nowrap"
      >
        {#if editing}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            class="w-6 h-6 pointer-events-none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
        {:else}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="w-6 h-6"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        {/if}
      </button>
    </div>
  </label>
</div>
