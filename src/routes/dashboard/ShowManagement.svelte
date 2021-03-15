<script>
  import { Router, Link, Route } from "svelte-routing";
  import Data from "../Data.svelte";
  import { onMount } from "svelte";
  import ShowList from "./ShowList.svelte";
  let loadingUsers = true;
  let errorUsers: string;
  let users: any[];
  const loadUsers = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.SNOWPACK_PUBLIC_API_HOST}/v1/users/shows`,
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
</script>

<div class="py-6">
  <div class="max-w-4xl px-4 mx-auto sm:px-6 md:px-8">
    <h1 class="text-2xl font-semibold text-gray-100">Your Shows</h1>
  </div>
  <div class="max-w-4xl px-4 mx-auto mt-5 sm:px-6 md:px-8">
    <Data load="/v1/my/shows">
      <div let:data={shows} slot="loaded">
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
                        {show.meta.byline ?? ""}
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
      </div>
    </Data>
  </div>
</div>
