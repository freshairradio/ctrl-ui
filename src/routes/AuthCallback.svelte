<script>
  import { navigate } from "svelte-routing";
  import { onMount } from "svelte";
  onMount(() => {
    const [_, token] = window.location.search.slice(1).split("=");
    localStorage.setItem("freshair:auth", token);
    navigate("/dashboard");
  });
</script>
