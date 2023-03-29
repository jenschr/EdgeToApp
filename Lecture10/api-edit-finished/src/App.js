import "./App.css";
import Navigation from "./components/Navigation";
import ProductList from "./pages/ProductList";
import { Route } from "wouter";
import Home from "./pages/Home";
import ProductEdit from "./pages/ProductEdit";
import CategoryList from "./pages/CategoryList";

function App() {
  return (
    <div>
      <Navigation />
      <Route path="/" component={Home} />
      <Route path="/productlist" component={ProductList} />
      <Route path="/productedit/:id" component={ProductEdit} />
      <Route path="/productedit" component={ProductEdit} />
      <Route path="/categorylist" component={CategoryList} />
    </div>
  );
}

export default App;
