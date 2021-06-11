<script lang="typescript">
  import { doFetch } from "../svelte-data-loading/common";
  import { navigate } from "svelte-routing";
  import TextField from "./forms/TextField.svelte";

  type InterfaceVersion = "login" | "register";
  let interfaceType: InterfaceVersion = "login";
  const toggleInterface = () => {
    interfaceType = interfaceType == "login" ? "register" : "login";
  };
  let email: string;
  let name: string;
  let password: string;
  let loading: boolean = false;
  let error: string;
  const fedLogin = (service: string) => (e: Event) => {
    e.preventDefault();
    window.location.href = `${
      import.meta.env.SNOWPACK_PUBLIC_API_HOST
    }/v1/auth/redirect/${service}`;
  };
  const signIn = async (e: Event) => {
    e.preventDefault();
    loading = true;
    try {
      if (interfaceType == "login") {
        const res = await fetch(
          `${import.meta.env.SNOWPACK_PUBLIC_API_HOST}/v1/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email,
              password
            })
          }
        );
        if (res.ok) {
          const data = await res.json();
          localStorage.setItem("freshair:auth", data.token);
          loading = false;
          navigate("/dashboard");
        } else {
          try {
            const errData = await res.json();
            error = errData.message ?? "default";
          } catch (e) {
            error = "default";
            console.error(e);
          }
          loading = false;
        }
      } else {
        const res = await fetch(
          `${import.meta.env.SNOWPACK_PUBLIC_API_HOST}/v1/auth/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email,
              password,
              details: { name }
            })
          }
        );
        if (res.ok) {
          const data = await res.json();
          localStorage.setItem("freshair:auth", data.token);
          loading = false;
          navigate("/dashboard");
        } else {
          try {
            const errData = await res.json();
            error = errData.message ?? "default";
          } catch (e) {
            error = "default";
            console.error(e);
          }
          loading = false;
        }
      }
    } catch (e) {
      console.error(e);
      error = "default";
      loading = false;
    }
  };
</script>

<div class="flex min-h-screen bg-gray-800">
  <div
    class="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
  >
    <div class="w-full max-w-sm mx-auto lg:w-96">
      <div>
        <img
          class="object-contain w-full h-24"
          src="https://cdn.freshair.radio/logos/FreshairFullWhiteLogo.png"
          alt="Freshair Logo"
        />
        <h2 class="mt-6 text-3xl font-extrabold text-white">
          {#if interfaceType == "login"}
            Sign in to your account
          {:else}
            Register for an account
          {/if}
        </h2>
        <p class="mt-2 text-sm text-gray-200 max-w">
          Or
          <button
            class="font-medium text-indigo-300 hover:text-indigo-500"
            on:click={toggleInterface}
          >
            {#if interfaceType == "login"}
              register for an account
            {:else}
              sign in to your account
            {/if}
          </button>
        </p>
      </div>
      {#if error}
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
                  Something went wrong — please email <a
                    class="text-red-600 underline"
                    href="mailto:manager@freshair.radio"
                    >manager@freshair.radio</a
                  >
                {:else}
                  {error}{/if}
              </h3>
            </div>
          </div>
        </div>
      {/if}
      <div class={error ? "mt-4" : "mt-8"}>
        <div>
          <div>
            <div class="grid grid-cols-1 gap-3 mt-1">
              <div>
                <a
                  style="background:#7289da"
                  on:click={fedLogin("discord")}
                  class="inline-flex justify-center w-full text-sm font-medium text-gray-500 bg-white rounded-md shadow-sm cursor-pointer hover:bg-gray-50"
                >
                  <span class="sr-only">Sign in with Discord</span>
                  <svg
                    class="w-12 h-12"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="Discord"
                    role="img"
                    viewBox="0 0 512 512"
                    fill="#7289da"
                    ><rect width="512" height="512" rx="15%" /><path
                      d="m346 392-21-25c41-11 57-39 57-39-52 49-194 51-249 0 0 0 14 26 56 39l-23 25c-70-1-97-48-97-48 0-104 46-187 46-187 47-33 90-33 90-33l3 4c-58 16-83 42-83 42 68-46 208-42 263 0 1-1-33-28-86-42l5-4s43 0 90 33c0 0 46 83 46 187 0 0-27 47-97 48z"
                      fill="#fff"
                    /><ellipse cx="196" cy="279" rx="33" ry="35" /><ellipse
                      cx="312"
                      cy="279"
                      rx="33"
                      ry="35"
                    /></svg
                  >
                </a>
              </div>
              <!-- <div>
                <a
                  style="background:#1b1817"
                  href="#"
                  class="inline-flex justify-center w-full text-sm font-medium text-gray-500 bg-white rounded-md shadow-sm cursor-pointer hover:bg-gray-50"
                >
                  <span class="sr-only">Sign in with GitHub</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-12 h-12"
                    aria-label="GitHub"
                    role="img"
                    viewBox="0 0 512 512"
                    ><rect
                      width="512"
                      height="512"
                      rx="15%"
                      fill="#1B1817"
                    /><path
                      fill="#fff"
                      d="M335 499c14 0 12 17 12 17H165s-2-17 12-17c13 0 16-6 16-12l-1-50c-71 16-86-28-86-28-12-30-28-37-28-37-24-16 1-16 1-16 26 2 40 26 40 26 22 39 59 28 74 22 2-17 9-28 16-35-57-6-116-28-116-126 0-28 10-51 26-69-3-6-11-32 3-67 0 0 21-7 70 26 42-12 86-12 128 0 49-33 70-26 70-26 14 35 6 61 3 67 16 18 26 41 26 69 0 98-60 120-117 126 10 8 18 24 18 48l-1 70c0 6 3 12 16 12z"
                    /></svg
                  >
                </a>
              </div>
              <div>
                <a
                  style="background:#555555"
                  href="#"
                  class="inline-flex justify-center w-full text-sm font-medium text-gray-500 bg-white rounded-md shadow-sm cursor-pointer hover:bg-gray-50"
                >
                  <span class="sr-only">Sign in with Apple</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-12 h-12"
                    aria-label="Apple"
                    role="img"
                    viewBox="0 0 512 512"
                    ><rect width="512" height="512" rx="15%" fill="#555" /><path
                      fill="#f2f2f2"
                      d="M410 334s-10 29-30 59c-5 9-29 43-58 43-21 0-35-15-62-15-33 0-46 15-67 15-11 1-22-5-34-16-77-73-81-181-52-225 18-29 48-47 81-48 26 0 54 17 65 17 8 0 50-20 74-18 33 3 56 15 73 38-49 24-66 117 10 150zM329 56c8 32-27 93-79 90-3-43 34-87 79-90z"
                    /></svg
                  >
                </a>
              </div> -->
            </div>
          </div>
        </div>

        <div class="mt-6">
          <form on:submit={signIn} class="space-y-6">
            {#if interfaceType == "register"}
              <TextField
                label="Name"
                bind:value={name}
                type="text"
                placeholder="Jane Doe"
              />
            {/if}
            <TextField
              label="Email Address"
              bind:value={email}
              type="email"
              placeholder="jane@doe.com"
            />
            <TextField
              label="Password"
              bind:value={password}
              type="password"
              placeholder="**********"
            />

            <!-- <div class="flex items-center justify-between">
              <div class="text-sm">
                <a
                  href="mailto:manager@freshair.radio"
                  class="font-medium text-gray-100 hover:text-indigo-300"
                >
                  Forgot your password?
                </a>
              </div>
            </div> -->

            <div>
              <button
                type="submit"
                class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-500 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {#if loading}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="w-5 h-5 animate-spin"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                {:else if interfaceType == "login"}
                  Sign in
                {:else}
                  Create Account
                {/if}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div class="relative flex-1 hidden w-0 lg:block">
    <img
      class="absolute inset-0 object-cover w-full h-full"
      src="/faders.jpg"
      alt=""
    />
  </div>
</div>
