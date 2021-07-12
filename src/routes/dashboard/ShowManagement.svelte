<script>
  import { Router, Link, Route, navigate } from 'svelte-routing';
  import { Read, Create } from '../../svelte-data-loading';
  import Data from '../Data.svelte';
  import TextField from '../forms/TextField.svelte';
  let creatingShow = false;
  let newShowName;
</script>

<Data load="/v1/auth/me" let:data={user}>
  <div class="max-w-4xl px-4 mx-auto sm:px-6 md:px-8">
    <div class="px-4 py-5 bg-gray-600 rounded-lg shadow sm:p-6">
      <h3 class="text-xl font-medium leading-6 text-white">
        Hi {user?.details?.name ?? ''} 👋
      </h3>
    </div>
    {#if user.stations.length === 0}
      <div class="p-2 mt-4 rounded-md bg-yellow-50">
        <div class="flex h-full">
          <div class="self-center flex-shrink-0 pl-2">
            <!-- Heroicon name: solid/exclamation -->
            <svg
              class="w-8 h-8 text-yellow-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="flex w-full ml-3">
            <h3 class="p-2 text-yellow-700 text-md">
              We're not sure what station you're part of
            </h3>
            <Link
              to="/dashboard/add-station"
              class="flex items-center flex-grow-0 p-2 px-3 ml-auto text-yellow-100 bg-yellow-500 rounded-md cursor-pointer text-md hover:bg-yellow-600 justify-items-center whitespace-nowrap"
            >
              Link your Station
            </Link>
          </div>
        </div>
      </div>
    {/if}
  </div>
</Data>
<div class="py-6">
  <div class="flex items-center max-w-4xl px-4 mx-auto sm:px-6 md:px-8">
    <h1 class="text-2xl font-semibold text-gray-100">Your Shows</h1>
    <Read path="/v1/auth/me" let:data={user}>
      {#if user.roles.find((r) => r.name == 'admin')}
        <Create
          path="/v1/shows"
          onFinish={(e) => navigate(`/dashboard/shows/${e.slug}`)}
          let:trigger
        >
          <div class="flex ml-auto">
            {#if creatingShow}
              <TextField
                bind:value={newShowName}
                label=""
                placeholder="Show Name"
              />
              <button
                on:click={() =>
                  trigger({
                    body: {
                      title: newShowName,
                      slug: newShowName.toLowerCase().replace(/[^a-z]+/g, '-'),
                    },
                  })}
                class="flex items-center flex-grow-0 px-3 ml-2 text-gray-400 bg-gray-700 rounded-md cursor-pointer hover:bg-gray-600 justify-items-center whitespace-nowrap"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="w-6 h-6 text-white"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
            {:else}
              <button
                on:click={() => (creatingShow = true)}
                class="flex p-2 px-4 text-white bg-indigo-500 rounded-full hover:bg-indigo-600"
              >
                Create Show
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="w-6 h-6 ml-2 text-white"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
            {/if}
          </div>
        </Create>
      {/if}
    </Read>
  </div>
  <div class="max-w-4xl px-4 mx-auto mt-5 sm:px-6 md:px-8">
    <Read path="/v1/my/shows" let:data={shows}>
      {#each shows as show}
        <Link to="/dashboard/shows/{show.slug}">
          <div class="mb-4 bg-gray-600 shadow sm:rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div class="flex-shrink-0 block w-full">
                <div class="flex items-center">
                  <div>
                    <img
                      class="inline-block h-12 w-12 rounded-lg {!show.picture &&
                        'bg-white'}"
                      src={show.picture ??
                        'https://cdn.freshair.radio/logos/FreshairBlackLogo.png'}
                      alt=""
                    />
                  </div>
                  <div class="ml-3">
                    <p class="text-lg font-bold text-white">
                      {show.title}
                    </p>
                    <p class="font-medium text-gray-200 text-md ">
                      {show?.meta?.byline ?? ''}
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-2 text-gray-100 whitespace-pre-wrap text-md">
                {show.description}
              </div>
            </div>
          </div>
        </Link>
      {/each}
    </Read>
  </div>
</div>
