<script>
  export let slug;
  import Data from '../Data.svelte';
  import { sortBy } from 'lodash';
  import { navigate, Link } from 'svelte-routing';
  import Clock from '../../icons/Clock.svelte';
  import moment from 'moment';
  import ShowList from './ShowList.svelte';
  import TextField from '../forms/TextField.svelte';
  import TextAreaField from '../forms/TextAreaField.svelte';
  import SelectField from '../forms/SelectField.svelte';
  import ImageField from '../forms/ImageField.svelte';
  import ButtonSelectField from '../forms/ButtonSelectField.svelte';
  import PodcastField from '../forms/PodcastField.svelte';
  import Episode from './Episode.svelte';
  import UserManagement from './UserManagement.svelte';
  import { findAllByAltText } from '@testing-library/dom';

  export let show;
  export let dirty;

  $: if (!$show.when) $show.when = {};
</script>

{#if $show.picture}
  <img
    src={$show.picture}
    class="fixed top-0 left-0 object-cover w-screen h-screen pointer-events-none -z-10"
    style="filter: blur(15px) opacity(0.8)"
  />
{/if}

<div class="mt-16 mb-4 bg-gray-600 shadow sm:rounded-lg">
  <div class="p-4">
    <div class="flex flex-col w-full gap-4">
      <div class="flex items-start gap-4">
        <div>
          <ImageField
            on:uploaded={({ detail }) => {
              $show.picture = detail.access;
            }}
            value={$show.picture}
            class="inline-block object-cover rounded-lg w-72 h-72"
            ct="image/png,image/jpeg,image/jpg"
            process={false}
          />
          <!-- <img
            class="inline-block h-64 w-64 object-cover rounded-lg {!$show.picture &&
              'bg-white'}"
            src={$show.picture ??
              "https://cdn.freshair.radio/logos/FreshairBlackLogo.png"}
            alt=""
          /> -->
        </div>
        <div class="relative grid flex-grow grid-cols-2 gap-4">
          <div class="flex items-center col-span-2">
            <TextField
              class="flex-grow transition-all duration-200"
              label="Show Title"
              bind:value={$show.title}
            />
            {#if dirty}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="absolute flex-grow-0 w-6 h-6 text-white -top-2 -right-2 animate-spin"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            {/if}
          </div>
          <TextField
            class="col-span-1"
            label="Twitter"
            bind:value={$show.meta.twitter}
            prefix="@"
          />
          <TextField
            class="col-span-1"
            label="Instagram"
            bind:value={$show.meta.instagram}
            prefix="@"
          />
          <TextField
            class="col-span-1"
            label="Facebook"
            bind:value={$show.meta.facebook}
            prefix="fb.me/"
          />
          <SelectField
            class="col-span-1"
            label="Primary Category"
            bind:value={$show.meta.category}
            options={['News', 'Politics', 'Arts', 'Music']}
          />
        </div>
      </div>
      <TextField
        label="Byline"
        bind:value={$show.meta.byline}
        prefix="Hosted by"
      />
      <TextAreaField
        class=""
        label="Description"
        bind:value={$show.description}
      />
      <Data load="/v1/auth/me" let:data={user}>
        {#if user.roles.find((r) => r.name == 'admin')}
          <div class="grid grid-cols-4 gap-4">
            <SelectField
              label="Day"
              class="col-span-1"
              bind:value={$show.when.day}
              options={[
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday'
              ]}
            />
            <SelectField
              label="Hour"
              class="col-span-1"
              bind:value={$show.when.hour}
              options={[
                '09:00',
                '10:00',
                '11:00',
                '12:00',
                '13:00',
                '14:00',
                '15:00',
                '16:00',
                '17:00',
                '18:00',
                '19:00',
                '20:00',
                '21:00',
                '22:00',
                '23:00'
              ]}
            />
            <ButtonSelectField
              class="col-span-2"
              label="Show type"
              bind:value={$show.when.year}
              options={['2020/21', '2021/22']}
            />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <PodcastField
              label="Submit to Apple Podcasts"
              provider="View on Apple Podcasts"
              hex="#d46cfb"
              submission="https://podcastsconnect.apple.com/my-podcasts/new-feed?submitfeed=https://freshair.nyc3.digitaloceanspaces.com/rssfeed/{$show.slug}.xml"
              bind:value={$show.meta.applePodcasts}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-label="iTunes"
                role="img"
                class="w-9 h-9"
                viewBox="0 0 512 512"
                ><rect width="512" height="512" rx="15%" fill="#d46cfb" /><path
                  d="M293 294c-8-8-21-13-37-13s-29 5-37 13c-4 5-6 9-7 15-1 12 0 22 1 39a891 891 0 0 0 13 87c3 9 14 18 30 18 17 0 27-9 30-18a891 891 0 0 0 14-126c-1-6-3-10-7-15zm-79-72a42 42 0 1 0 84 0 42 42 0 0 0-84 0zm42-165a180 180 0 0 0-60 350c2 0 4-1 4-3l-3-18c0-3-2-4-4-5a157 157 0 1 1 126 0c-2 1-4 2-4 5l-3 18c0 2 2 3 4 3a180 180 0 0 0-60-350zm-4 82a98 98 0 0 1 71 169c-2 1-3 4-2 6l-1 20c0 2 2 4 4 2a121 121 0 1 0-136 1c2 1 4-1 4-3v-20c0-2-1-5-3-6a97 97 0 0 1 63-169z"
                  fill="#fff"
                /></svg
              >
            </PodcastField>
            <PodcastField
              label="Submit to Spotify"
              provider="View on Spotify"
              hex="#3bd75f"
              submission="https://podcasters.spotify.com/submit"
              bind:value={$show.meta.spotify}
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Spotify"
                role="img"
                class="w-9 h-9"
                viewBox="0 0 512 512"
                ><rect
                  width="512"
                  height="512"
                  rx="15%"
                  fill="#3bd75f"
                /><circle cx="256" cy="256" fill="#fff" r="192" /><g
                  fill="none"
                  stroke="#3bd75f"
                  stroke-linecap="round"
                  ><path
                    d="m141 195c75-20 164-15 238 24"
                    stroke-width="36"
                  /><path
                    d="m152 257c61-17 144-13 203 24"
                    stroke-width="31"
                  /><path
                    d="m156 315c54-12 116-17 178 20"
                    stroke-width="24"
                  /></g
                ></svg
              ></PodcastField
            >
          </div>
        {/if}
      </Data>
    </div>
  </div>
</div>

<div class="max-w-3xl px-4 mx-auto mt-16 mb-16">
  <div class="overflow-hidden bg-gray-700 shadow sm:rounded-lg mt-15 mb-15 ">
    <div class="flex items-center p-5 sm:px-6">
      <h3 class="text-lg font-medium leading-6 text-gray-100">Episode list</h3>
      <Data
        load="/v1/shows/{$show.id}/episodes"
        create
        onFinish={(e) =>
          navigate(`/dashboard/shows/${$show.slug}/episodes/${e.id}`)}
      >
        <button
          let:trigger
          on:click={trigger}
          slot="trigger"
          class="flex p-2 px-4 ml-auto text-white bg-indigo-500 rounded-full hover:bg-indigo-600"
        >
          Add Episode
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
      </Data>
    </div>
    {#each sortBy($show.episodes, 'created').reverse() as episode, i}
      <Link
        to="/dashboard/shows/{$show.slug}/episodes/{episode.id}"
        class="block gap-4 p-2 px-4 m-2 transition duration-150 ease-in-out rounded-md hover:bg-gray-600 focus:outline-none"
      >
        <div class="flex items-center gap-4">
          <img src={$show.picture} class="object-cover w-12 h-12 rounded-sm" />
          <div>
            <h3 class="text-lg text-white">
              {episode.title}
            </h3>
            <h4 class="text-sm text-gray-400">
              {episode?.scheduling?.week ?? '...'}
            </h4>
          </div>
          <div class="ml-auto">
            {#if episode?.meta?.audio}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="w-8 h-8 text-green-500"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
              </svg>
            {:else}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-8 h-8 text-yellow-500 animate-spin"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            {/if}
          </div>
        </div>
      </Link>
    {/each}
  </div>
</div>
