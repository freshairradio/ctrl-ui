<script>
  export let shows;
  import { Link } from "svelte-routing";
</script>

{#each shows as show}
  <Link to="/dashboard/shows/{show.slug}">
    <div class="bg-gray-600 shadow sm:rounded-lg mb-4">
      <div class="px-4 py-5 sm:p-6">
        <div class="flex-shrink-0 w-full block">
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
                {show.title} — {$shows[0].title}
              </p>
              <p class="text-md font-medium text-gray-200 ">
                {show.meta.byline ?? ""}
              </p>
            </div>
          </div>
        </div>
        <div class="mt-2 text-md text-gray-100 whitespace-pre-wrap">
          {show.description}
        </div>
      </div>
    </div>
  </Link>
{/each}
