import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import GamesTable from '../../components/GamesTable.tsx';
import AddNewMatchBtn from '../../components/AddNewMatchBtn.tsx';
import LeaderboardBtn from '../../components/LeaderBoardBtn';
import LoginBtn from '../../components/LoginBtn';
import GamerFilter from '../../components/GamerFilter';
import './styles.css';

const Games = () => {
  const [currentFilter, setCurrentFilter] = useState('Status do Jogo');
  const [isAdm, setIsAdm] = useState(false);
  const [logged, setLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token') || false;
    const role = localStorage.getItem('role') || false;
    if (token) setLogin(true);
    
    setIsAdm(role === 'admin');
  }, []);

  return (
    <>
      <Header
        page="PARTIDAS"
        FirstNavigationLink={ LeaderboardBtn }
        SecondNavegationLink={ LoginBtn }
        logged={ logged }
        setLogin={ setLogin }
      />
      <section className="games-section">
        <div className="games-handlers">
          <GamerFilter
            currentFilter={ currentFilter }
            setCurrentFilter={ setCurrentFilter }
          />
          {
            (isAdm)
              ? <AddNewMatchBtn />
              : null
          }
        </div>
        <GamesTable currentFilter={ currentFilter } isAdm={ isAdm } />
      </section>
    </>
  );
};

export default Games;
