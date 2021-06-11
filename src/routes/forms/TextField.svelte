<script>
  let tailwind: string;
  export { tailwind as class };
  export let label: string;
  export let value: string;
  export let placeholder = "...";
  export let description: string = "";
  export let prefix: string = "";
  export let type = "text";
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
      {#if type == "text"}
        <input
          type="text"
          name={label}
          bind:value
          class="block w-full {label
            ? 'mt-1'
            : ''} text-lg text-white bg-gray-600 border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:bg-indigo-900"
          {placeholder}
          aria-describedby="{label}-description"
        />{:else if type == "password"}
        <input
          type="password"
          name={label}
          bind:value
          class="block w-full {label
            ? 'mt-1'
            : ''} text-lg text-white bg-gray-600 border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:bg-indigo-900"
          {placeholder}
          aria-describedby="{label}-description"
        />{:else if type == "email"}
        <input
          type="email"
          name={label}
          bind:value
          class="block w-full {label
            ? 'mt-1'
            : ''} text-lg text-white bg-gray-600 border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:bg-indigo-900"
          {placeholder}
          aria-describedby="{label}-description"
        />{/if}
    </div>
  </label>
  {#if description}
    <p class="mt-2 text-gray-200 text-md" id="{label}-description">
      {description}
    </p>
  {:else}
    <slot name="description" />
    <slot />
  {/if}
</div>
