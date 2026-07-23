import { createContext, useContext, useState,useRef} from "react";


//create context
export const UserContext = createContext();



function App() {
  const [user, setUser] = useState("Alice");
  return(<UserContext value={{ user, setUser }}>
    <Layout />
  </UserContext>
  )
}

export default App;

function Layout() {
  return<Sidebar />;
}

function Sidebar() {
  return <Profile />;
}

function Profile() {
  const { user, setUser } = useContext(UserContext);
  const usrRef = useRef(null);
  const handleRef = () => {
    setUser(usrRef.current.value);
  }
  return (
    <div>
      <h1>Profile</h1>
      <p>User: {user}</p>
      <input
        name="user"
        id="usr"
        placeholder="Enter your name"
        defaultValue={user}
        ref={usrRef}
      />
      <button onClick={handleRef} type="button">Update</button>
      {user.length < 6 && <p>Name must be at least 6 characters long</p>}
    </div>
  );
}