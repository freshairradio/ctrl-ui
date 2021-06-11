<script lang="typescript">
  import { Router, Link, Route, navigate } from "svelte-routing";
  import DefaultLoading from "./DefaultLoading.svelte";
  import DefaultError from "./DefaultError.svelte";
  import { Fetch } from "./svelte-data-loading";
  import Redirect from "./routes/Redirect.svelte";
  import Auth from "./routes/Auth.svelte";
  import AuthCallback from "./routes/AuthCallback.svelte";
  import Dashboard from "./routes/Dashboard.svelte";
</script>

<Fetch
  base={import.meta.env.SNOWPACK_PUBLIC_API_HOST}
  headers={() => ({
    Authorization: `Bearer ${localStorage.getItem("freshair:auth")}`
  })}
  onError={(err) => {
    if (err.response.status == 401) {
      return navigate("/auth");
    }
  }}
  defaultError={DefaultError}
  defaultLoading={DefaultLoading}
>
  <Router>
    <Route path="/">
      <Redirect to="/dashboard" />
    </Route>
    <Route path="/auth/*" component={Auth} />
    <Route path="/auth-callback" component={AuthCallback} />
    <Route path="/dashboard/*" component={Dashboard} />
  </Router>
</Fetch>
