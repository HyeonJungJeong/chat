import './App.css';
import Home from './home.jsx';

function App() {
  return (
      <div>
          <div id="history">
              <button name="refresh" type="button">다시 불러오기</button>
              <ul className="list">
              </ul>
          </div>
          <Home />
      </div>
  );
}

export default App;
