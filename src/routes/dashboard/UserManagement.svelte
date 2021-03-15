<script lang="typescript">
  import { Router, Link, Route } from "svelte-routing";
  import { onMount } from "svelte";
  let loadingUsers = true;
  let errorUsers: string;
  let users: any[];
  const loadUsers = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.SNOWPACK_PUBLIC_API_HOST}/v1/users`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("freshair:auth")}`
          }
        }
      );
      if (res.ok) {
        const data = await res.json();
        users = data;
        loadingUsers = false;
      } else {
        try {
          const errData = await res.json();
          errorUsers = errData.message ?? "default";
        } catch (e) {
          errorUsers = "default";
          console.error(e);
        }
        loadingUsers = false;
      }
    } catch (e) {
      console.error(e);
      errorUsers = "default";
      loadingUsers = false;
    }
  };
  const setRoles = (userId: string, roles: string[]) => async (e: Event) => {
    try {
      const res = await fetch(
        `${import.meta.env.SNOWPACK_PUBLIC_API_HOST}/v1/users/${userId}/roles`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("freshair:auth")}`
          },
          body: JSON.stringify(roles)
        }
      );
      if (res.ok) {
        const data = await res.json();
        loadUsers();
      } else {
        try {
          const errData = await res.json();
          errorUsers = errData.message ?? "default";
        } catch (e) {
          errorUsers = "default";
          console.error(e);
        }
      }
    } catch (e) {
      console.error(e);
      errorUsers = "default";
    }
  };

  onMount(loadUsers);
</script>

<div class="py-6">
  <div class="max-w-4xl px-4 mx-auto sm:px-6 md:px-8">
    <h1 class="text-2xl font-semibold text-gray-100">User Management</h1>
  </div>
  <div class="max-w-4xl px-4 mx-auto mt-5 sm:px-6 md:px-8">
    {#if loadingUsers}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="mx-auto mt-16 text-white w-7 h-7 animate-spin"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    {:else}
      {#each users as user}
        <div class="mb-4 bg-gray-600 shadow sm:rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <div class="flex-shrink-0 block w-full">
              <div class="flex items-center">
                <div>
                  <img
                    class="inline-block h-10 w-10 rounded-full {!user.details
                      .avatar && 'bg-white'}"
                    src={user.details.avatar ??
                      "https://cdn.freshair.radio/logos/FreshairBlackLogo.png"}
                    alt=""
                  />
                </div>
                <div class="ml-3">
                  <p class="font-medium text-white text-md">
                    {user.details.name ??
                      user.details.username ??
                      user.details.email}
                  </p>
                  <p class="text-sm font-medium text-gray-200 ">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            <div class="mt-5">
              <!-- This example requires Tailwind CSS v2.0+ -->
              <span class="relative z-0 inline-flex rounded-md shadow-sm">
                <button
                  type="button"
                  on:click={setRoles(user.id, [
                    "ddb97665-4886-4571-a2c7-dfeb0f68d718"
                  ])}
                  class="{user.roles.find((r) => r.name == 'admin')
                    ? 'bg-indigo-500 text-gray-100 hover:bg-indigo-700'
                    : 'bg-white text-gray-700 hover:bg-gray-50'} relative inline-flex items-center px-4 py-2 rounded-l-md border border-transparent  text-sm font-medium   focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  Admin
                </button>
                <button
                  type="button"
                  on:click={setRoles(user.id, [
                    "e20e4d30-c00e-4eb9-bdc4-e047d302a55b"
                  ])}
                  class="{user.roles.find((r) => r.name == 'committee')
                    ? 'bg-indigo-500 text-gray-100 hover:bg-indigo-700'
                    : 'bg-white text-gray-700 hover:bg-gray-50'} -ml-px relative inline-flex items-center px-4 py-2 border border-transparent  text-sm font-medium   focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  Committee
                </button>
                <button
                  type="button"
                  on:click={setRoles(user.id, [])}
                  class="{user.roles.length == 0
                    ? 'bg-indigo-500 text-gray-100 hover:bg-indigo-700'
                    : 'bg-white text-gray-700 hover:bg-gray-50'} -ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-transparent text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  Member
                </button>
              </span>
              <button
                type="button"
                class="inline-flex items-center justify-center px-4 py-2 font-medium text-red-700 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
              >
                Delete user
              </button>
            </div>
          </div>
          <ul
            class="grid grid-cols-1 gap-5 p-6 pt-2 sm:gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {#each user.shows as show}
              <Link to={`/shows/${show.slug}`}>
                <li class="flex col-span-1 rounded-md shadow-sm">
                  <img
                    src={show.picture}
                    class="flex items-center justify-center flex-shrink-0 w-16 text-sm font-medium text-white bg-pink-600 rounded-l-md"
                  />
                  <div
                    class="flex items-center justify-between flex-1 truncate bg-white border-t border-b border-r border-gray-200 rounded-r-md"
                  >
                    <div class="flex-1 px-4 py-2 text-sm truncate">
                      <a
                        href="#"
                        class="font-medium text-gray-900 hover:text-gray-600"
                        >{show.title}</a
                      >
                      <p class="text-gray-500">{show.slug}</p>
                    </div>
                  </div>
                </li>
              </Link>
            {/each}
          </ul>
        </div>
      {/each}
    {/if}
  </div>
</div>
