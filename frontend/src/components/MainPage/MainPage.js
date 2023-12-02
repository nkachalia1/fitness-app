import { Link, useHistory } from 'react-router-dom';
import './MainPage.css'


function MainPage() {
  
  const history = useHistory();
  const handlePageClick = () => {
    // Use the history object to navigate to the next page
    history.push('/loginmenu'); // Replace '/next-page' with the desired route
  };

    return (
      <div onClick={handlePageClick}>
        <Link to="/NavBar">
          <header id="header">
            <h1>Track Your Run to Goal</h1>
            <div id="video-area">
              <video id="video"  webkit-playsinline playsInline muted autoPlay loop>
                <source src={require('./istockphoto-593348590-640_adpp_is.mp4')} type="video/mp4" />
                <p>動画を再生できる環境ではありません。</p>
              </video>
            </div>
          </header>

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
      </div>
    );
  }
  
  export default MainPage;