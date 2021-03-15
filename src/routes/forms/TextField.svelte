<script>
  let tailwind;
  export { tailwind as class };
  export let label;
  export let value;
  export let placeholder = "...";
  export let description;
  export let prefix;
</script>

<div class={tailwind}>
  <label
    for={label}
    class="block font-medium text-gray-100 text-md focus-within:text-indigo-300"
    >{label}
    <div class="flex  {prefix ? 'rounded-r-md' : 'rounded-md'} shadow-sm">
      {#if prefix}
        <span
          class="flex items-center flex-grow-0 px-3 {label
            ? 'mt-1'
            : ''} mr-1 text-gray-400 bg-gray-700 border-gray-500 rounded-md whitespace-nowrap"
        >
          {prefix}
        </span>
      {/if}
      <input
        type="text"
        name={label}
        bind:value
        class="block w-full {label
          ? 'mt-1'
          : ''} text-lg text-white bg-gray-600 border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:bg-indigo-900"
        {placeholder}
        aria-describedby="{label}-description"
      />
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
