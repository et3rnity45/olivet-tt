import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "@Pages/HomePage";
import Article from "@Pages/Article";
import Articles from "@Pages/Articles";
import Partners from "@Pages/Partners";
import Contact from "@Pages/Contact";
import Ranking from "@Pages/sportif/Ranking";
import Teams from "@Pages/sportif/Teams";
import Training from "@Pages/sportif/Training";
import Login from "@Pages/Login";
import ArticleCreate from "@Pages/admin/ArticleCreate";
import ArticleUpdate from "@Pages/admin/ArticleUpdate";
import ArticleTable from "@Pages/admin/ArticleTable";
import NotFound from "@Pages/NotFound";
import ProtectedRoute from "@Components/ProtectedRoute";

const Page = (): JSX.Element => {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/sportif/classement" exact component={Ranking} />
      <Route path="/sportif/equipes" exact component={Teams} />
      <Route path="/sportif/entrainements" exact component={Training} />
      <Route path="/partenaires" exact component={Partners} />
      <Route path="/contact" exact component={Contact} />
      <Route path="/articles/:category?" exact component={Articles} />
      <Route path="/article/:id" exact component={Article} />
      <Route path="/login" exact component={Login} />
      <ProtectedRoute path="/admin" exact />
      <ProtectedRoute path="/admin/articles" exact component={ArticleTable} />
      <ProtectedRoute
        path="/admin/articles/create"
        exact
        component={ArticleCreate}
      />
      <ProtectedRoute
        path="/admin/articles/edit/:id"
        exact
        component={ArticleUpdate}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Page;
