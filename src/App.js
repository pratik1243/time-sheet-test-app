
import './assets/styles/fonts.css';
import './assets/styles/time-sheet.css';
import HomePage from "./components/HomePage";
import Layout from "./components/layoutComponents/Layout";

function App() {
  return (
    <div className="App">
      <Layout>
        <HomePage />
      </Layout>
    </div>
  );
}

export default App;
