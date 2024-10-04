
import { Routes,Route } from 'react-router-dom'
import LoginContainer from './pages/Login/LoginContainer'
import Signup from './pages/SignUp/Signup'
import Home from './pages/Home/Home'
import ProtectedRoute from './pages/ProtectedRoutes/ProtectedRoutes'
import AuthenticatedRoute from './pages/ProtectedRoutes/Authenticatedroutes'

function App() {


  return (
    <div>
      <Routes>
      <Route
          path="/login"
          element={
            <ProtectedRoute redirectPath="/home">
              <LoginContainer />
            </ProtectedRoute>
          }/>
      <Route
          path="/register"
          element={
            <ProtectedRoute redirectPath="/home">
              <Signup />
            </ProtectedRoute>
          }
        />
      <Route
          path="/home"
          element={
            <AuthenticatedRoute>
              <Home />
            </AuthenticatedRoute>
          }
        />
      </Routes>
        
    </div>
    

  )
}

export default App
