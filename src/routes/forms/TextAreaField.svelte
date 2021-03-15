<script>
  import Autosize from "./Autosize.svelte";

  let tailwind;
  export { tailwind as class };
  export let label;
  export let value;
  export let placeholder = "...";
  export let description;
</script>

<div class={tailwind}>
  <label
    class="block font-medium text-gray-100 text-md focus-within:text-indigo-300"
    >{label}

    <Autosize
      name={label}
      bind:value
      class="block w-full mt-1 text-lg text-white bg-gray-600 border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:bg-indigo-900"
      {placeholder}
      aria-describedby="{label}-description"
    />
  </label>
  {#if description}
    <p class="mt-2 text-gray-200 text-md" id="{label}-description">
      {description}
    </p>
  {:else}
    <slot name="description" />
  {/if}
</div>
