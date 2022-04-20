import { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Layout from 'shared/layout';
import Admin from 'page/admin';
import TimeTable from 'page/timetable';
import Notice from "page/notice";
import Account from "page/account";
import Settings from "page/settings";
import setTheme from "util/theme";
import Auth from "page/auth";
import { PrivateRoute } from "util/auth/privateRoute";

function App() {
  useEffect(() => {
    setTheme();
  });
  return (
    <>
      <Switch>
        <Route path="/auth" children={<Auth />} />
        <Route path="/" children={<>
          <Layout>
            <Switch>
              <Route exact path="/" children={<TimeTable />} />
              <PrivateRoute path="/dashboard" children={<Admin />} />
              <Route path="/timetable" children={<TimeTable />} />
              <Route path="/notice" children={<Notice />} />
              <PrivateRoute path="/account" children={<Account />} />
              <Route path="/settings" children={<Settings />} />
            </Switch>
          </Layout >
        </>} />
      </Switch>
    </>
  );
}

export default App;
