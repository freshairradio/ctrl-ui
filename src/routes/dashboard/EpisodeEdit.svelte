<script>
  import { navigate, Link } from "svelte-routing";
  import { TextField, TextAreaField, SelectField, MediaField } from "../forms";
  import Data from "../Data.svelte";
  export let episode;
  export let dirty;
  let confirmDelete = false;
  $: console.log($episode.meta);
</script>

{#if $episode.Show.picture}
  <img
    src={$episode.Show.picture}
    class="fixed top-0 left-0 object-cover w-screen h-screen -z-10"
    style="filter: blur(15px) opacity(0.8)"
  />
{/if}

<div class="max-w-3xl px-4 mx-auto mt-16 sm:px-6 md:px-8">
  <Link to="/dashboard/shows/{$episode.Show.slug}">
    <div class="mb-4 bg-gray-600 shadow sm:rounded-lg">
      <div class="p-4">
        <div class="flex-shrink-0 block w-full">
          <div class="flex items-center">
            <div>
              <img
                class="inline-block h-20 w-20 object-cover rounded-lg {!$episode
                  .Show.picture && 'bg-white'}"
                src={$episode.Show.picture ??
                  "https://cdn.freshair.radio/logos/FreshairBlackLogo.png"}
                alt=""
              />
            </div>
            <div class="ml-3">
              <p class="text-xl font-bold text-white">
                {$episode.Show.title}
              </p>
              <p class="font-medium text-gray-200 text-md ">
                presented by {$episode.Show.meta.byline ?? ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Link>
  <div class="overflow-hidden bg-gray-700 shadow sm:rounded-lg mt-15 mb-15 ">
    <div class="flex items-center px-4 py-5 pb-0 sm:px-6">
      <h3 class="text-lg font-medium leading-6 text-gray-100">
        Episode Details
      </h3>
      {#if dirty}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-6 h-6 ml-auto mr-2 text-white animate-spin"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      {/if}
      <Data
        load="/v1/shows/{$episode.Show.id}/episodes/{$episode.id}"
        del={true}
        onFinish={() => navigate(`/dashboard/shows/${$episode.Show.slug}`)}
      >
        <button
          let:trigger
          on:click={() => {
            if (confirmDelete) {
              trigger();
            } else {
              confirmDelete = true;
            }
          }}
          slot="trigger"
          class="{dirty ? '' : 'ml-auto'}  p-2 rounded-full {confirmDelete
            ? 'text-white bg-red-500 px-4 flex hover:bg-red-600'
            : 'hover:bg-gray-600'}"
        >
          {#if confirmDelete}
            Are you sure?
          {/if}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-6 h-6 {confirmDelete ? 'ml-2 text-white' : 'text-red-500'}"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </Data>
    </div>
    <div class="px-4 py-5 sm:px-6 ">
      <dl class="grid grid-cols-1 gap-4 row-gap-4 col-gap-4 sm:grid-cols-2">
        <TextField
          class="sm:col-span-2"
          label="Title"
          bind:value={$episode.title}
        />
        <TextAreaField
          class="sm:col-span-2"
          label="Description"
          bind:value={$episode.description}
        />
        <SelectField
          class="sm:col-span-2"
          label="Broadcast in week starting..."
          bind:value={$episode.scheduling.week}
          options={[
            "18th January",
            "25th January",
            "1st February",
            "8th February",
            "15th February",
            "22nd February",
            "1st March",
            "8th March",
            "15th March",
            "22nd March",
            "29th March"
          ]}
        />
        <MediaField
          on:uploaded={({ detail }) => {
            $episode.audio = detail.access;
          }}
          value={$episode.audio}
          processedValue={$episode.meta.published !== false && $episode.meta}
          label="Episode audio"
          class=" sm:col-span-2"
          ct="audio/mpeg,audio/mp3"
        />
      </dl>
    </div>
  </div>
</div>
