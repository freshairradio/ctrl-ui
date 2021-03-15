<script>
  export let value;
  let tailwind;
  export { tailwind as class };
</script>

<div class="grid">
  <div
    class="row-start-1 col-start-1 whitespace-pre-wrap pointer-events-none invisible py-2 px-3 {tailwind}"
  >
    {value + "\n"}
  </div>
  <textarea
    {...$$props}
    bind:value
    class="row-start-1 col-start-1 resize-none {tailwind}"
  />
</div>
