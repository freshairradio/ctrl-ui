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
  import SimpleColourField from '../forms/SimpleColourField.svelte';

  export let station;
  export let dirty;
  
</script>

{#if $station.picture}
  <img
    src={$station.picture}
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
              $station.picture = detail.access;
            }}
            value={$station.picture}
            class="inline-block object-cover rounded-lg w-72 h-72"
            ct="image/png,image/jpeg,image/jpg"
            process={false}
          />
          <!-- <img
            class="inline-block h-64 w-64 object-cover rounded-lg {!$station.picture &&
              'bg-white'}"
            src={$station.picture ??
              "https://cdn.freshair.radio/logos/FreshairBlackLogo.png"}
            alt=""
          /> -->
        </div>
        <div class="relative grid flex-grow grid-cols-2 gap-4">
          <div class="flex items-center col-span-2">
            <TextField
              class="flex-grow transition-all duration-200"
              label="Station name"
              bind:value={$station.name}
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
            bind:value={$station.meta.twitter}
            prefix="@"
          />
          <TextField
            class="col-span-1"
            label="Instagram"
            bind:value={$station.meta.instagram}
            prefix="@"
          />
          <TextField
            class="col-span-1"
            label="Facebook"
            bind:value={$station.meta.facebook}
            prefix="fb.me/"
          />
          <SimpleColourField
            class="col-span-1"
            label="Brand Colour"
            bind:value={$station.colour}
            prefix="#"
            description="As a hex code (i.e. #2196f3)"
          />
        </div>
      </div>
      <TextField
        label="Stream URL"
        bind:value={$station.stream}
        placeholder="https://stream.example.com/listen"
        description="This is usually an Icecast URL"
      />
      <TextAreaField
        class=""
        label="Description"
        bind:value={$station.meta.description}
        description="Tell your listeners a bit about {$station.name}"
      />
    </div>
  </div>
</div>
