import "./App.css";
import { Route } from "wouter";
import Header from "./components/Header";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductEdit from "./pages/ProductEdit";
import CategoryEdit from "./pages/CategoryEdit";

const PORT = process.env.PORT || 3001;

function App() {
  return (
    <div className="App">
      <Header />
      <Route path="/" component={Home} />
      <Route path="/productlist" component={ProductList} />
      <Route path="/productedit/:id" component={ProductEdit} />
      <Route path="/productedit" component={ProductEdit} />
      <Route path="/categoryedit" component={CategoryEdit} />
    </div>
  );
}

export default App;
