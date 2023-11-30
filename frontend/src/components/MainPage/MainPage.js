
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './MainPage.css'


function MainPage() {
  
  // const history = useHistory();
  // const handlePageClick = () => {
  //   // Use the history object to navigate to the next page
  //   history.push('/navbar'); // Replace '/next-page' with the desired route
  // };

    return (
      // <div onClick={handlePageClick}>
      <Link to="/NavBar">
        <header id="header">
          <h1>Fitness App</h1>
          <div id="video-area">
            <video id="video"  webkit-playsinline playsInline muted autoPlay loop>
              <source src={require('./istockphoto-593348590-640_adpp_is.mp4')} type="video/mp4" />
              <p>動画を再生できる環境ではありません。</p>
            </video>
          </div>
        </header>
        <div id="container">
          <p>ここにコンテンツが入ります</p>  
        </div> 


        <p>Fitness App</p>

        <ul className="bg-bubbles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>


        <footer>
          Copyright &copy; 2023 
        </footer>
      </Link>
    );
  }
  
  export default MainPage;