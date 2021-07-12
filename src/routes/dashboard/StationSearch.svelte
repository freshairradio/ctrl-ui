<script>
  import { Read, Create } from '../../svelte-data-loading';
  import Data from '../Data.svelte';
  import { Link, navigate } from 'svelte-routing';
  import TextField from '../forms/TextField.svelte';
  import EpisodeEdit from './EpisodeEdit.svelte';
  import Station from './Station.svelte';
  let searchTerm = '';
</script>

<div class="max-w-3xl mx-auto mt-14">
  <Read path="/v1/stations" let:data>
    <h1 class="mb-4 text-2xl font-semibold text-gray-100">Find your Station</h1>

    <TextField
      bind:value={searchTerm}
      label=""
      placeholder="FreshAir Radio"
      class="mb-4"
    />
    {#if data.filter((s) => s.name
        .toLowerCase()
        .startsWith(searchTerm.toLowerCase())).length === 0}
      <div class="flex ">
        <Create
          path="/v1/stations"
          onFinish={(e) => navigate(`/dashboard/stations/${e.id}`)}
          let:trigger
        >
          <button
            on:click={() => trigger({})}
            class="p-2 px-4 mx-auto mt-16 text-white bg-indigo-500 rounded-full hover:bg-indigo-600"
          >
            Create Station
          </button>
        </Create>
      </div>
    {/if}
    {#each data.filter((s) => s.name
        .toLowerCase()
        .startsWith(searchTerm.toLowerCase())) as station}
      <div class="mb-4 bg-gray-600 shadow sm:rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex-shrink-0 block w-full">
            <div class="flex items-center">
              <div>
                <img
                  class="inline-block h-12 w-12 rounded-lg {!station.logo &&
                    'bg-white'}"
                  src={station.logo ??
                    'https://cdn.freshair.radio/logos/FreshairBlackLogo.png'}
                  alt=""
                />
              </div>
              <div class="ml-3">
                <p class="text-lg font-bold text-white">
                  {station.name}
                </p>
                <p class="font-medium text-gray-200 text-md ">
                  {station?.meta?.byline ?? ''}
                </p>
              </div>
              <Create
                path="/v1/my/stations"
                onFinish={(e) => navigate(`/dashboard/stations/${station.id}`)}
                let:trigger
              >
                <button
                  on:click={() =>
                    trigger({
                      body: {
                        station: station.id,
                      },
                    })}
                  class="flex p-2 px-4 ml-auto text-white bg-indigo-500 rounded-full hover:bg-indigo-600"
                >
                  Link Station
                </button>
              </Create>
            </div>
          </div>
          <div class="mt-4 text-gray-100 whitespace-pre-wrap text-md">
            {station.description}
          </div>
        </div>
      </div>
    {/each}
  </Read>
</div>
