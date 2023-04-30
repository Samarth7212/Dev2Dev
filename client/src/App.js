// import logo from "./logo.svg";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import TopQuestions from "./components/TopQuestions";
// import { authCheck, logOut } from "./AuthChecker";
import { ToastContainer } from "react-toastify";
import bgimage2 from "../src/assets/bgop2.jpeg";
import DisplayQuestionAndAnswers from "./components/DisplayQuestionAndAnswers";
import LoginForm from "./components/LoginForm";
import MyQuestions from "./components/MyQuestions";
import SearchPage from "./components/SearchPage";
import SignupForm from "./components/SignupForm";
import Tags from "./components/TagsComponent";

function App() {
  //   const [isLogin, setType] = useState(authCheck());
  // localStorage.removeItem("jwt_authorization");
  //   logOut();

  return (
    <Router>
      <div
        className="App"
        style={{
          backgroundImage: `url(${bgimage2})`,
          height: `100vh`,
          backgroundRepeat: `no-repeat`,
          width: `100wh`,
          backgroundSize: `cover`,
        }}
      >
        <ToastContainer />
        <Switch>
          <Route exact path="/auth/signup">
            <SignupForm />
          </Route>
          <Route exact path="/auth/login">
            <LoginForm />
          </Route>
          <Route exact path="/">
            <Header />
            <TopQuestions />
          </Route>
          <Route exact path="/search/results/:query">
            <SearchPage />
          </Route>
          <Route path="/question/:id">
            <Header />
            <DisplayQuestionAndAnswers />
          </Route>
          <Route path="/questions/my_questions/:id">
            <Header />
            <MyQuestions />
          </Route>
          <Route path="/tag/:tag">
            <Header />
            <Tags />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
