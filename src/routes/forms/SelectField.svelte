<script>
  import { select_multiple_value } from "svelte/internal";

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
    <select
      name={label}
      bind:value
      aria-describedby="{label}-description"
      {placeholder}
      class="block w-full {label
        ? 'mt-1'
        : ''} text-lg text-white bg-gray-600 border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:bg-indigo-900"
    >
      {#each options as option}
        <option selected={value == option}>{option}</option>
      {/each}
    </select>
  </label>
  {#if description}
    <p class="mt-2 text-gray-200 text-md" id="{label}-description">
      {description}
    </p>
  {:else}
    <slot name="description" />
  {/if}
</div>
