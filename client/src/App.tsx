import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Authenticate from "./Pages/Authenticate";
import SideBar from "./Components/SideBar";
import PrivateRoute from "./routes/PrivateRoute";
import Bookings from "./Pages/Bookings";
import History from "./Pages/History";
import Profile from "./Pages/Profile";
import Notifications from "./Pages/Notifications";
import Track from "./Pages/Track";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/authenticate" element={<Authenticate />} />
        <Route element={<PrivateRoute />}>
          <Route element={<SideBar />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/track" element={<Track />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App;