import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CreateNewGame from '../../components/CreateNewGame';
import EditGame from '../../components/EditGame';
import Header from '../../components/Header';
import MatchesBtn from '../../components/MatchesBtn';
import Loading from '../../components/Loading';
import api, { requestData, setToken } from '../../services/request';
import './styles.css';

const MatchSettings = () => {
    const [teams, setTeams] = useState<{
        id: { teamName: string; } | undefined; teamName: string 
    }[]>([]);
    const [homeTeamScoreboard, setHomeTeamScoreboard] = useState<number>(0);
    const [awayTeamScoreboard, setAwayTeamScoreboard] = useState<number>(0);
    const [homeTeamId, setHomeTeamId] = useState(0);
    const [awayTeamId, setAwayTeamId] = useState(0);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token') || '';

      if (!token) return navigate('/');

      setToken(token);

      requestData('/login/role')
        .then(() => setIsAuthenticated(true))
        .catch(() => navigate('/'));
    })();
  }, [navigate]);

  useEffect(() => {
    const endpoint = '/teams';
  
    const fetchTeams = async () => {
      try {
        const token = localStorage.getItem('token') || '';
        if (!token) {
          return;
        }
        setToken(token);
  
        const response = await requestData<{
            id: { teamName: string; } | undefined;
            teamName: string;
          }[]>(endpoint);
        setTeams(response);
      } catch (error) {
        console.error('Erro ao buscar equipes:', error);
      }
    };
  
    if (teams.length === 0) {
      fetchTeams();
    }
  }, [teams]);

  const getTeam = (team: string, homeOrAway: string) => {
    const teamObject = teams.find(({ teamName }) => teamName === team);
  
    if (teamObject && teamObject.id) {
      const id = teamObject.id.teamName;
  
      if (homeOrAway === 'homeTeam') {
        setHomeTeamId(Number(id));
      } else {
        setAwayTeamId(Number(id));
      }
    } else {
        throw new Error('Time não encontrado');
    }
  };
  

  const createMatch = async () => {
    const body = {
      homeTeamId,
      awayTeamId,
      homeTeamGoals: +homeTeamScoreboard,
      awayTeamGoals: +awayTeamScoreboard,
    };

    const { data } = await api.post('/matches', body);
    return data;
  };

  const updateMatch = async (id: number, body: { homeTeamGoals: number, awayTeamGoals: number }) => {
    await api.patch(`/matches/${id}`, body);
  };
  
  
const finishMatch = async (id: number) => {
    await api.patch(`/matches/${id}/finish`);
};

  if (!isAuthenticated) return <Loading />;

  if (location.state) {
    const { id,
      homeTeam: homeTeamState,
      homeTeamGoals,
      awayTeam: awayTeamState,
      awayTeamGoals,
    } = location.state;
    return (
      <>
        <Header
          page="EDITAR PARTIDA"
          FirstNavigationLink={ MatchesBtn }
          logged={ isAuthenticated }
          setLogin={ setIsAuthenticated }
        />
        <EditGame
          homeTeam={ [homeTeamState] }
          awayTeam={ [awayTeamState] }
          homeTeamGoals={ homeTeamGoals }
          awayTeamGoals={ awayTeamGoals }
          idMatch={ id }
          updateMatch={ updateMatch }
          finishMatch={ finishMatch }
          getTeam={ getTeam }
        />
      </>
    );
  }

  return (
    <>
      <Header
        page="ADICIONAR PARTIDA"
        FirstNavigationLink={ MatchesBtn }
        logged={ isAuthenticated }
        setLogin={ setIsAuthenticated }
      />
      <CreateNewGame
        setHomeTeamScoreboard={ setHomeTeamScoreboard }
        setAwayTeamScoreboard={ setAwayTeamScoreboard }
        teams={ teams }
        getTeam={ getTeam }
        createMatch={ createMatch }
        finishMatch={ finishMatch }
      />
    </>
  );
};

export default MatchSettings;
