import "./css/App.css";
import "./css/reset.css";
import Container from "./components/Container";
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route path="/" component={Container} />
    </div>
  );
}

export default App;
