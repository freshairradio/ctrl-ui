<script>
  import Data from "../Data.svelte";
  import ShowEdit from "./ShowEdit.svelte";
  export let slug: string;
</script>

<div class="max-w-4xl mx-auto">
  <Data load="/v1/shows/{slug}" live>
    <div slot="loaded" let:data let:dirty>
      <ShowEdit show={data} {dirty} />
    </div>
  </Data>
</div>
