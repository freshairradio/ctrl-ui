<script lang="typescript">
  import { Router, Link, Route } from "svelte-routing";
  import Data from "./Data.svelte";
  import { onMount } from "svelte";
  import UserManagement from "./dashboard/UserManagement.svelte";
  import ShowManagement from "./dashboard/ShowManagement.svelte";
  import Show from "./dashboard/Show.svelte";
  import Episode from "./dashboard/Episode.svelte";
  let showMenu = false;
  let loadingUser = true;
  let errorUser: string;
  let user: any;
  let menuOpen = false;
  import { fade } from "svelte/transition";
  const navigation = [{ label: "Dashboard", url: "/dashboard" }];
  onMount(async () => {
    try {
      const res = await fetch(
        `${import.meta.env.SNOWPACK_PUBLIC_API_HOST}/v1/auth/me`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("freshair:auth")}`
          }
        }
      );
      if (res.ok) {
        const data = await res.json();
        user = data;
        loadingUser = false;
      } else {
        try {
          const errData = await res.json();
          errorUser = errData.message ?? "default";
        } catch (e) {
          errorUser = "default";
          console.error(e);
        }
        loadingUser = false;
      }
    } catch (e) {
      console.error(e);
      errorUser = "default";
      loadingUser = false;
    }
  });
  export let location: Location;
</script>

<div class="z-10 flex h-screen overflow-hidden bg-gray-800">
  <div class="flex flex-col flex-1 w-0 overflow-hidden">
    <main
      class="relative z-0 flex-1 overflow-y-auto focus:outline-none"
      tabindex="0"
    >
      <div class="py-6">
        <Router>
          <Route path="/" component={ShowManagement} />

          <Route path="/users" component={UserManagement} />
          <!-- <Route path="/dashboard" component={Dashboard} /> -->
          <Route path="/shows/:slug" component={Show} />
          <Route path="/shows/:slug/episodes/:episodeId" component={Episode} />
        </Router>
      </div>
    </main>
  </div>
</div>

{#if menuOpen}
  <div
    transition:fade
    class="fixed top-0 left-0 z-50 w-screen h-screen pt-20 bg-black bg-opacity-85"
    on:click={() => (menuOpen = false)}
  >
    {#each navigation as link}
      <a
        rel="prefetch"
        class="block py-2 text-3xl font-thin text-center text-white"
        href={link.url}
      >
        {link.label}
      </a>
    {/each}
  </div>
{/if}

<div
  class="fixed bottom-0 left-0 z-50 flex flex-shrink-0 p-2 pr-6 m-2 bg-indigo-600 rounded-full"
>
  <Data load="/v1/auth/me">
    <div class="flex-shrink-0 block w-full group" slot="loading">
      <div class="flex items-center">
        <div>
          <div class="inline-block bg-indigo-600 rounded-full h-9 w-9">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="m-1 text-white w-7 h-7 animate-spin"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </div>
        </div>
        <div class="ml-3 w-28">
          <p
            class="animate-pulse text-sm font-medium text-white h-4 my-0.5 bg-indigo-600 rounded w-20"
          />
          <p
            class="animate-pulse  text-xs font-medium text-indigo-200 h-4 my-0.5 bg-indigo-600 rounded w-28"
          />
        </div>
      </div>
    </div>
    <div class="flex-shrink-0 block w-full" slot="loaded" let:data={user}>
      <div class="flex items-center">
        <div>
          <img
            class="inline-block bg-white rounded-full h-9 w-9"
            src={"https://cdn.freshair.radio/logos/FreshairBlackLogo.png" ??
              user.details.avatar}
            alt=""
          />
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-white">
            {user.details.name ?? user.details.username ?? user.details.email}
          </p>
          <p class="text-xs font-medium text-indigo-200 ">
            {user.email}
          </p>
        </div>
      </div>
    </div>
  </Data>
</div>
<div
  class="fixed z-50 w-10 h-10 text-white transform rotate-180 cursor-pointer lg:w-16 lg:h-16 bottom-2 right-4"
  on:click={() => (menuOpen = !menuOpen)}
>
  <svg viewBox="0 0 20 20" fill="currentColor" className="menu-alt1 w-6 h-6">
    <path
      fillRule="evenodd"
      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1
        1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0
        01-1-1z"
      clipRule="evenodd"
    />
  </svg>
</div>
