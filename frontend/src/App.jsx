const React = require('react');
const { Routes, Route } = require('react-router-dom');

const HomePage = require('./pages/Home');
const ChatPage = require('./pages/Chat/index');
const SigninPage = require('./pages/Signin');

const { UserProvider } = require('./utils/UserContext');
const ProtectedRoute = require('./utils/ProtectedRoute');

require('bootstrap/dist/css/bootstrap.min.css');
require('./style.css');

function App() {
  return (
    <UserProvider>
      <main>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signin' element={<SigninPage />} />
          <Route
            path='/chat'
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </UserProvider>
  );
}

module.exports = App;