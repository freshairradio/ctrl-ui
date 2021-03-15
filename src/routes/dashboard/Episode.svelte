<script>
  import Data from "../Data.svelte";
  import EpisodeEdit from "./EpisodeEdit.svelte";
  export let slug: string;
  export let episodeId: string;
  $: console.log(slug, episodeId);
</script>

<div class="max-w-4xl mx-auto">
  <Data load="/v1/shows/{slug}/episodes/{episodeId}" live>
    <div slot="loaded" let:data let:dirty>
      <EpisodeEdit episode={data} {dirty} />
    </div>
  </Data>
</div>
