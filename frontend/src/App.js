// local pages
import MainHome from "./Components/home/MainHome";
import Footer from "./Footer";
import Error from "./Error";
import Form from "./Components/home/Form";
import Logout from "./Components/Logout";
import MessMenu from "./Components/MessMenu/MessMenu";
import MenuTable from "./Components/Admin/MenuTable";
import UserTable from "./Components/Admin/UserTable";
import PerdayFood from "./Components/Admin/MenuShow/PerdayFood";
import review2 from "./Components/From/Review2";
import UpdateMenu from "./Components/MessMenu/UpdateMenu";
import FormTable from "./Components/Admin/FormTable";
import RatingPerFood from "./Components/MessMenu/RatingPerFood";
import Static from "./Components/Statistic/Static";
import Blog from "./Components/blogs/bloghome";
import NewBlog from "./Components/blogs/newblog";
import BlogPer from "./Components/blogs/blogperuser";
import Updateblog from "./Components/blogs/updateblog";
import Announcement  from "./Components/Admin/announcement/announcementhome";
import NewAnnouncement from "./Components/Admin/announcement/newannouncement";
import UpdateAnnouncement from "./Components/Admin/announcement/updateannouncement";
import NewMenu from "./Components/Admin/MenuShow/NewMenu";

//css pages
import './assets/css/bootstrap.min.css';
import './assets/css/LineIcons.2.0.css';
import './assets/css/tiny-slider.css';
import './assets/css/glightbox.min.css';
import './assets/css_table/main.css';
import './assets/css/main.css';

// 3rd party imports
import {Switch , Route , BrowserRouter} from "react-router-dom";
// import { TinyButton as ScrollUpButton } from "react-scroll-up-button";
import {VerticleButton as ScrollUpButton} from "react-scroll-up-button";
function App() {
  
  
  return (
    <div>

              {/* <Route exact path="/review" component={} />
              <Route exact path="/contact" component={} /> */}
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={MainHome} />
              <Route exact path="/mess" component={MessMenu} />
              <Route exact path="/review" component={Form} />
              <Route exact path="/review2" component={review2} />
              <Route exact path="/usertable" component={UserTable} />
              <Route exact path="/static" component={Static} />
              <Route exact path="/menutable" component={MenuTable} />
              <Route exact path="/menutable/newmenu" component={NewMenu} />
              <Route exact path="/menutable/:id" component={PerdayFood} />
              <Route exact path="/mess/:id" component={PerdayFood} />
              <Route exact path="/menutable/update/:id" component={UpdateMenu} />
              <Route exact path="/menutable/checkrating/:fooditem" component={RatingPerFood} />
              <Route exact path="/formtable" component={FormTable} />
              <Route exact path="/blogs" component={Blog} />
              <Route exact path="/newblogs" component={NewBlog} />
              <Route exact path="/myblogs" component={BlogPer} />
              <Route exact path="/updateblog/:id" component={Updateblog} />
              <Route exact path="/newAnnouncement" component={NewAnnouncement} />
              <Route exact path="/Announcement" component={Announcement} />
              <Route exact path="/UpdateAnnouncement/:id" component={UpdateAnnouncement} />
              <Route exact path="/logout" component={Logout} />
              <Route component={Error} />
            </Switch>

          </BrowserRouter>
          {/* <Navbar />
          <MainHome /> */}
          <ScrollUpButton
           />
          <Footer />
          
    </div>
    
  );
}

export default App;
