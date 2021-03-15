<script>
  let tailwind;
  export { tailwind as class };
  export let label;
  export let value;
  export let placeholder = "...";
  export let description;
  export let options;
</script>

<div class={tailwind}>
  <label
    class="block font-medium text-gray-100 text-md focus-within:text-indigo-300"
    >{label}
    <div
      class="flex w-full gap-2 mt-1 text-lg text-white bg-gray-600 border border-transparent rounded-md "
    >
      {#each options as option}
        <button
          class="items-center flex-grow block px-3 text-center text-gray-200 border-gray-500 rounded-md shadow-sm h-11 {value ==
          option
            ? 'bg-indigo-600'
            : 'bg-gray-700'}"
          on:click={() => (value = option)}>{option}</button
        >
      {/each}
    </div>
    {#if description}
      <p class="mt-2 text-gray-200 text-md" id="{label}-description">
        {description}
      </p>
    {:else}
      <slot name="description" />
    {/if}
  </label>
</div>
