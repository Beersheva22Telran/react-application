import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigatorDispatcher from "./components/navigators/NavigatorDispatcher";
import './App.css'
import {  useSelectorCode } from "./redux/store";
import { useMemo } from "react";
import routesConfig from './config/routes-config.json';
import NotFound from "./components/pages/NotFound";
import { RouteType } from "./components/navigators/Navigator";
import Adverts from "./components/pages/Adverts";
import AddEmployee from "./components/pages/NewAd";
import { StatusType } from "./model/StatusType";
import CodeType from "./model/CodeType";
import { useDispatch } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import { codeActions } from "./redux/slices/codeSlice";
import Generation from "./components/pages/Generation";
import process from "process";
const { always } = routesConfig;
type RouteTypeOrder = RouteType & { order?: number }
function getRoutes(): RouteType[] {
  const res: RouteTypeOrder[] = [];
  res.push(...always);
  
      if (routesConfig.developmentAdmin &&
        process.env.NODE_ENV != "production") {
        res.push(...routesConfig.developmentAdmin);
      }
   
  res.sort((r1, r2) => {
    let res = 0;
    if (r1.order && r2.order) {
      res = r1.order - r2.order;
    }
    return res
  });
  
  return res
}
const App: React.FC = () => {
  const code = useSelectorCode();
  const dispatch = useDispatch();

  const [alertMessage, severity] = useMemo(() => codeProcessing(), [code]);
  const routes = useMemo(() => getRoutes(), []);
  function codeProcessing(): [string, StatusType] {
    const res: [string, StatusType] = [code.message, 'success'];
    switch (code.code) {
      case CodeType.OK: res[1] = 'success'; break;
      case CodeType.SERVER_ERROR: res[1] = 'error'; break;
      case CodeType.UNKNOWN: res[1] = 'error'; break;
     
    }

    return res;
  }
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<NavigatorDispatcher routes={routes} />}>
        <Route index element={<Adverts />} />
       
        <Route path="generation" element={<Generation />} />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
    <Snackbar open={!!alertMessage} autoHideDuration={20000}
      onClose={() => dispatch(codeActions.reset())}>
      <Alert onClose={() => dispatch(codeActions.reset())} severity={severity} sx={{ width: '100%' }}>
        {alertMessage}
      </Alert>
    </Snackbar>
  </BrowserRouter>
}
export default App;