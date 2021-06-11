<script lang="ts">
  import { setContext, SvelteComponent } from "svelte";
  import { writable } from "svelte/store";
  import { ctxSymbol, DataError } from "./common";
  import type { Options, AdditionalHeaders, TransformRequest } from "./common";
  let options = writable<Options>({
    base: "",
    headers: null,
    transform: null,
    defaultLoading: null,
    defaultError: null,
    onError: null
  });
  setContext(ctxSymbol, {
    subscribe: options.subscribe
  });

  export let base: string = "";
  export let headers: AdditionalHeaders | null = null;
  export let transform: TransformRequest | null = null;
  export let defaultLoading: typeof SvelteComponent | null = null;
  export let defaultError: typeof SvelteComponent | null = null;
  export let onError: ((err: DataError) => void) | null = null;

  $: {
    options.set({
      base,
      headers,
      transform,
      defaultLoading,
      defaultError,
      onError
    });
  }
</script>

<slot />
