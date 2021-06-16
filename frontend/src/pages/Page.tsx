import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "./HomePage";
import Article from "./Article";
import Articles from "./Articles";
import Partners from "./Partners";
import Contact from "./Contact";
import Office from "./club/Office";
import Ranking from "./sportif/Ranking";
import Teams from "./sportif/Teams";
import Training from "./sportif/Training";
import NotFound from "./NotFound";

const Page = (): JSX.Element => {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/club/bureau" exact component={Office} />
      <Route path="/sportif/classement" exact component={Ranking} />
      <Route path="/sportif/equipes" exact component={Teams} />
      <Route path="/sportif/entrainements" exact component={Training} />
      <Route path="/partenaires" exact component={Partners} />
      <Route path="/contact" exact component={Contact} />
      <Route path="/articles/:category?" exact component={Articles} />
      <Route path="/article/:id" exact component={Article} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Page;
