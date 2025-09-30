import { useNavigate } from 'react-router-dom';
import '../styles/HomeScreen.css'

function HomeScreen () {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location.reload();
    }

    return (
        <main id='home'>
            <button className="fa-solid fa-arrow-right-from-bracket" id='logout-btn' onClick={handleLogout}></button>

            <h1>{ user?.name }</h1>
            <h3>{ user?.role }</h3>
        </main>
    )
}

export default HomeScreen;