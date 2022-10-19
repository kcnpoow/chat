const React = require('react');

const UserContext = React.createContext(null);

function UserProvider(props) {
  const [user, setUser] = React.useState(sessionStorage.getItem('user'));

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
}

module.exports = { UserContext, UserProvider };