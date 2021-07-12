<script>
  import Data from '../Data.svelte';
  import StationEdit from './StationEdit.svelte';
  export let id: string;
</script>

<div class="max-w-4xl mx-auto">
  <Data load="/v1/stations/{id}" live>
    <div slot="loaded" let:data let:dirty>
      <StationEdit station={data} {dirty} />
    </div>
  </Data>
</div>
