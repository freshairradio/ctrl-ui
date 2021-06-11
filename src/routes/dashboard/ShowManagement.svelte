<script>
  import { Router, Link, Route, navigate } from "svelte-routing";
  import { Read, Create } from "../../svelte-data-loading";
  import Data from "../Data.svelte";
  import TextField from "../forms/TextField.svelte";
  let creatingShow = false;
  let newShowName;
</script>

<div class="py-6">
  <div class="flex items-center max-w-4xl px-4 mx-auto sm:px-6 md:px-8">
    <h1 class="text-2xl font-semibold text-gray-100">Your Shows</h1>
    <Read path="/v1/auth/me" let:data={user}>
      {#if user.roles.find((r) => r.name == "admin")}
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
                      slug: newShowName.toLowerCase().replace(/[^a-z]+/g, "-")
                    }
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
                        "https://cdn.freshair.radio/logos/FreshairBlackLogo.png"}
                      alt=""
                    />
                  </div>
                  <div class="ml-3">
                    <p class="text-lg font-bold text-white">
                      {show.title}
                    </p>
                    <p class="font-medium text-gray-200 text-md ">
                      {show?.meta?.byline ?? ""}
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
