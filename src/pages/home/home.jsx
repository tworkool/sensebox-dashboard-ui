import { Link } from 'react-router-dom';
import "./home.scss";

const Home = (props) => {
  return (
    <>
      <h1>Home</h1>
      <ul>
          <li><Link to="/dashboard">dashboard</Link></li>
          <li><Link to="/impressum">impressum</Link></li>
          <li><Link to="/datenschutz">datenschutz</Link></li>
          <li><Link to="/info">info</Link></li>
      </ul>
    </>
  );
};

export default Home;
