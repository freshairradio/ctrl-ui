<script lang="typescript">
  import { Router, Link, Route } from "svelte-routing";
  import Redirect from "./routes/Redirect.svelte";
  import Auth from "./routes/Auth.svelte";
  import AuthCallback from "./routes/AuthCallback.svelte";
  import Dashboard from "./routes/Dashboard.svelte";
</script>

<Router>
  <Route path="/">
    <Redirect to="/dashboard" />
  </Route>
  <Route path="/auth/*" component={Auth} />
  <Route path="/auth-callback" component={AuthCallback} />
  <Route path="/dashboard/*" component={Dashboard} />
</Router>
