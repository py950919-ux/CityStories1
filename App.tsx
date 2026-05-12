import { Switch, Route, Router as WouterRouter } from "wouter";

// Pages
import Home from "./home";
import Cities from "./cities";
import City from "./city";
import Pricing from "./pricing";
import Login from "./login";
import Contributor from "./contributor";
import ContributorApply from "./contributor-apply";
import SavedPlaces from "./saved";
import Trips from "./trips";
import Admin from "./admin";
import NotFound from "./not-found";

function App() {
  return (
    <WouterRouter>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/cities" component={Cities} />
        <Route path="/city/:id" component={City} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/login" component={Login} />
        <Route path="/contributor" component={Contributor} />
        <Route path="/contributor/apply" component={ContributorApply} />
        <Route path="/saved" component={SavedPlaces} />
        <Route path="/trips" component={Trips} />
        <Route path="/admin" component={Admin} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

export default App;
