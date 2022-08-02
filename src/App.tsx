import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { AuthContextProvider } from './contexts/AuthContext'
import { AdminRoom } from './pages/AdminRoom'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Room } from "./pages/Room";

function App() {

  return (
    <div>
      <BrowserRouter>


        <AuthContextProvider >
          <Routes>

            <Route path="/"
              element={<Home />}
            />

            <Route path="/rooms/new"
              element={<NewRoom />}
            />

            <Route path="/rooms/:id"
              element={<Room />}
            />

            <Route path="/admin/rooms/:id"
              element={<AdminRoom />}
            />

          </Routes>
        </AuthContextProvider >

      </BrowserRouter>
    </div>

  );
}

export default App;
