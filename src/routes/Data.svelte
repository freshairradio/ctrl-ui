<script>
  import { onMount, onDestroy } from "svelte";
  import { navigate } from "svelte-routing";
  import { writable } from "svelte/store";
  import { throttle, isFunction } from "lodash";
  export let load: string;
  export let live: boolean = false;
  export let create = false;
  export let del;
  export let options = {};

  export let onFinish;

  let trigger;
  let loading: boolean = true;
  let error: string;
  let loadedData: any;

  let dirty;
  let unsubscribe;

  const update = throttle(async (data) => {
    try {
      const res = await fetch(
        `${import.meta.env.SNOWPACK_PUBLIC_API_HOST}${load}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("freshair:auth")}`
          },
          body: JSON.stringify(data)
        }
      );
      if (!res.ok) {
        if (res.status == 401) {
          return navigate("/auth");
        }
        try {
          const errData = await res.json();
          error = errData.message ?? "default";
        } catch (e) {
          error = "default";
          console.error(e);
        }
      } else {
        dirty = false;
      }
    } catch (e) {
      console.error(e);
      error = "default";
    }
  }, 3000);
  const doCreate = async () => {
    loading = true;
    try {
      const res = await fetch(
        `${import.meta.env.SNOWPACK_PUBLIC_API_HOST}${load}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("freshair:auth")}`
          },
          body: JSON.stringify(options)
        }
      );
      if (res.ok) {
        loadedData = await res.json();
        isFunction(onFinish) && onFinish(loadedData);
      } else {
        if (res.status == 401) {
          return navigate("/auth");
        }
        try {
          const errData = await res.json();
          error = errData.message ?? "default";
        } catch (e) {
          error = "default";
          console.error(e);
        }
      }
      loading = false;
    } catch (e) {
      console.error(e);
      error = "default";
      loading = false;
    }
  };
  const doDelete = async () => {
    loading = true;
    try {
      const res = await fetch(
        `${import.meta.env.SNOWPACK_PUBLIC_API_HOST}${load}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("freshair:auth")}`
          },
          body: JSON.stringify(options)
        }
      );
      if (res.ok) {
        loadedData = await res.json();
        isFunction(onFinish) && onFinish(loadedData);
      } else {
        if (res.status == 401) {
          return navigate("/auth");
        }
        try {
          const errData = await res.json();
          error = errData.message ?? "default";
        } catch (e) {
          error = "default";
          console.error(e);
        }
      }
      loading = false;
    } catch (e) {
      console.error(e);
      error = "default";
      loading = false;
    }
  };
  onDestroy(async () => {
    update.flush();
    isFunction(unsubscribe) && unsubscribe();
  });
  $: load && runSetup();
  const runSetup = async () => {
    if (create) {
      loading = false;
      trigger = doCreate;
      return;
    } else if (del) {
      loading = false;
      trigger = doDelete;
      return;
      import.meta.env.SNOWPACK_PUBLIC_API_HOST;
    }
    try {
      const res = await fetch(
        `${import.meta.env.SNOWPACK_PUBLIC_API_HOST}${load}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("freshair:auth")}`
          }
        }
      );
      if (res.ok) {
        const data = await res.json();
        if (live) {
          loadedData = writable(data);
          let skipInitial = true; // Skip the initial subscription as data will not have changed
          unsubscribe = loadedData.subscribe((changed) => {
            if (!skipInitial) {
              dirty = true;
              update(changed);
            }
            skipInitial = false;
          });
        } else {
          loadedData = data;
        }
        loading = false;
      } else {
        if (res.status == 401) {
          return navigate("/auth");
        }
        try {
          const errData = await res.json();
          error = errData.message ?? "default";
        } catch (e) {
          error = "default";
          console.error(e);
        }
        loading = false;
      }
    } catch (e) {
      console.error(e);
      error = "default";
      loading = false;
    }
  };
</script>

{#if loading}
  <slot name="loading">
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
  </slot>
{:else if !loading && !error && !loadedData}
  <slot name="trigger" {trigger} />
{:else if !loading && !error && loadedData}
  <slot name="loaded" data={loadedData} {dirty} />
  <slot data={loadedData} {dirty} />
{:else if error}
  <slot name="error" message={error}>
    <div class="p-4 mt-4 rounded-md bg-red-50">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-red-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">
            {#if error == "default"}
              <slot name="defaultError">
                Something went wrong — please email <a
                  class="text-red-600 underline"
                  href="mailto:manager@freshair.radio">manager@freshair.radio</a
                ></slot
              >
            {:else}
              {error}{/if}
          </h3>
        </div>
      </div>
    </div>
  </slot>
{/if}
