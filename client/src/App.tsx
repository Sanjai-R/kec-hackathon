import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Authenticate from "./Pages/Authenticate";
import SideBar from "./Pages/SideBar";
import PrivateRoute from "./routes/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/authenticate" element={<Authenticate />} />
        <Route element={<PrivateRoute />}>
          <Route element={<SideBar />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App;