import React, { useRef, useEffect } from 'react';
import { useLocation, Switch } from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';
import ReactGA from 'react-ga';



// Layouts
import LayoutDefault from './layouts/LayoutDefault';
import LayoutAdmin from './layouts/LayoutAdmin';
// Views 
import Home from './views/Home';
import AdminPage from './admin/Admin';

// Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const trackPage = page => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};

const App = () => {

  const childRef = useRef();
  let location = useLocation();

  useEffect(() => {
    const page = location.pathname;
    document.body.classList.add('is-loaded')
    childRef.current.init();
    trackPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <ScrollReveal
      ref={childRef}
      children={() => (
        <Switch>
          <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
          <AppRoute exact path="/admin" component={AdminPage} layout={LayoutAdmin} />
          <AppRoute exact path="/ban-hoc-tap" component={BanHocTap} layout={LayoutDefault} /> 
          <AppRoute exact path="/ban-ho-tro" component={BanHoTro} layout={LayoutDefault} />
          <AppRoute exact path="/ban-truyen-thong" component={BanTruyenThong} layout={LayoutDefault} />
          <AppRoute exact path="/ban-ky-thuat" component={BanKyThuat} layout={LayoutDefault} />
          <AppRoute exact path="/ban-van-the" component={BanVanThe} layout={LayoutDefault} />
        </Switch>
      )} />
  );
}

export default App;