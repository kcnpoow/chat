const React = require('react');
const { Navigate } = require('react-router-dom');

const { UserContext } = require('../utils/UserContext');

function ProtectedRoute(props) {
  const [user, setUser] = React.useContext(UserContext);
  
  if (!user) {
    return <Navigate to='/signin' replace/>
  }

  return props.children;
}

module.exports = ProtectedRoute;