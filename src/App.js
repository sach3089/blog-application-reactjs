import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/about';
import CustomNavBar from './components/CustomNavbar';
import Services from './pages/Services';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Userdashboard from './pages/user-routes/Userdashboard';
import Privateroute from './components/Privateroute';
import ProfileInfo from './pages/user-routes/ProfileInfo';
import PostPage from './pages/PostPage';
import Dashboard from './pages/Dashboard';
import SideNavMenu from './components/SideNavMenu';
import AllPosts from './pages/AllPosts';
import TrendingPost from './pages/TrendingPost';
import MostViewed from './pages/MostViewed';
import PostAnalytics from './pages/PostAnalytics';


function App() {
  return (
    
    <BrowserRouter>
    <ToastContainer position="top-center" />
    <Routes>


      <Route path = "/" element={<Home />}></Route>
      <Route path = "/login" element={<Login />}></Route>
      <Route path = "/signup" element={<Signup />}></Route>
      <Route path = "/about"  element ={<About />}></Route>
      <Route path = "/services"  element ={<Services />}></Route>
      <Route path ="/post/:id" element={<PostPage />}></Route>
      {/* <Route path ="/post-dashboard" element={<Dashboard  />}></Route>
      <Route path ="/posts-all" element={<AllPosts  />}></Route>
      <Route path ="/post-trending" element={<TrendingPost  />}></Route>
      <Route path ="/post-most-viewed" element={<MostViewed  />}></Route>
      <Route path ="/post-analytics" element={<PostAnalytics  />}></Route> */}
      <Route path='/user' element={<Privateroute />}>
         <Route path='dashboard'  element={<Userdashboard />}/>
         <Route path='profile-info' element={<ProfileInfo />} />
      </Route>
    </Routes>
    
    
    </BrowserRouter>

  );
}

export default App;
