// import './App.css'
// import Demo from './components/login'

// function App() {
//   return (
//     <div >
//       <Demo />
//     </div>
//   )
// }

// export default App


// 14/11/2025
import { Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Home from './pages/home'; // CHANGÉ : ./components → ./pages
import { PrivateRoute } from './components/PrivateRoute';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

