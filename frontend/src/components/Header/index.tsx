import { useNavigate } from 'react-router-dom';
import { negativeLogo, exitToAppImg } from '../../assets/images';
import IHeader from '../../interfaces/IHeader';
import './styles.css';

const Header = ({
  page,
  FirstNavigationLink,
  SecondNavegationLink,
  logged,
  setLogin,
}: IHeader) => {
  const navigate = useNavigate();

  const logoff = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setLogin(false);
    navigate('/leaderboard');
  };

  return (
    <header className="common-header">
      <div className="image-content">
        <img src={ negativeLogo } alt="Brasileirão Negative Logo" />
      </div>
      <h1 data-testid="header__title">{ page }</h1>
      <div className="buttons-content">
        <FirstNavigationLink />
        {
          (logged)
            ? (
              <button type="button" onClick={ () => logoff() }>
                Sair
                <img src={ exitToAppImg } alt="Sair do aplicativo" />
              </button>
            )
            : <SecondNavegationLink />
        }
      </div>
    </header>
  );
};

export default Header;
