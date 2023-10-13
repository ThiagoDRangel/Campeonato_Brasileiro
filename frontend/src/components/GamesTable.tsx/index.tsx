import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestData, ApiResponse } from '../../services/request';
import Loading from '../Loading';
import { check, editIcon } from '../../assets/images';
interface IGamerTable{
    currentFilter: string;
    isAdm: boolean;
}

interface IGame {
  id: number;
  homeTeam: {
    teamName: string;
  };
  homeTeamGoals: number;
  awayTeam: {
    teamName: string;
  };
  awayTeamGoals: number;
  inProgress: boolean;
}
const GamesTable = ({ currentFilter, isAdm }: IGamerTable) => {
  const [games, setGames] = useState<IGame[]>([]);

  const navigate = useNavigate();

  const getGames = (endpoint: string) => requestData<ApiResponse<IGame[]>>(endpoint)
  .then((response) => {
    if (Array.isArray(response)) {
      setGames(response as IGame[]);
    }
  })
  .catch((error) => console.log(error));


  useEffect(() => {
    const endpoint = '/matches';

    switch (currentFilter) {
    case 'Em andamento':
      getGames(`${endpoint}?inProgress=true`);
      break;
    case 'Finalizado':
      getGames(`${endpoint}?inProgress=false`);
      break;
    default:
      getGames(endpoint);
      break;
    }
  }, [currentFilter]);

  useEffect(() => {
    const endpoint = '/matches';

    if (!games.length) {
      getGames(endpoint);
    }
  }, [games]);

  if (!games.length) {
    return (<Loading />);
  }

  return (
    <table className="games-table">
      <thead>
        <tr>
          <th className="games-table-thead-home-team">Time Mandante</th>
          <th className="games-table-thead-goals">Gols</th>
          <th className="games-table-thead-versus">{ ' ' }</th>
          <th className="games-table-thead-goals">Gols</th>
          <th className="games-table-thead-away-team">Time Visitante</th>
          <th className="games-table-thead-empty-space">{ ' ' }</th>
          <th className="games-table-thead-status">Status</th>
        </tr>
      </thead>
      <tbody>
        {
          games
            .sort((a, b) => Number(b.inProgress) - Number(a.inProgress))
            .map(({
              id,
              homeTeam,
              homeTeamGoals,
              awayTeam,
              awayTeamGoals,
              inProgress,
            }) => (
              <tr key={ id }>
                <td
                  className="games-table-tbody-home-team"
                  data-testid={ `matches__home_team_${id}` }
                >
                  { homeTeam.teamName }
                </td>
                <td
                  className="games-table-tbody-home-team-goals"
                  data-testid={ `matches__home_team_goals_${id}` }
                >
                  { homeTeamGoals }
                </td>
                <td className="games-table-tbody-versus">X</td>
                <td
                  className="games-table-tbody-away-team-goals"
                  data-testid={ `matches__away_team_goals_${id}` }
                >
                  { awayTeamGoals }
                </td>
                <td
                  className="games-table-tbody-away-team"
                  data-testid={ `matches__away_team_${id}` }
                >
                  { awayTeam.teamName }
                </td>
                <td className="games-table-tbody-empty-space">{ ' ' }</td>
                <td className="games-table-tbody-status">
                  <div>
                    {
                      (inProgress)
                        ? (
                          <p
                            className="game-status in-progress"
                            data-testid={ `matches__match_status_${id}` }
                          >
                            Em andamento
                          </p>
                        )
                        : (
                          <p
                            className="game-status finished-game"
                            data-testid={ `matches__match_status_${id}` }
                          >
                            Finalizado
                          </p>
                        )
                    }
                  </div>
                  {
                    (isAdm)
                      ? (
                        <button
                          type="button"
                          data-testid={ `matches__match_status_btn_${id}` }
                          disabled={ !inProgress }
                          onClick={ () => {
                            navigate(
                              '/matches/settings',
                              { state: {
                                id,
                                homeTeam,
                                homeTeamGoals,
                                awayTeam,
                                awayTeamGoals,
                                inProgress,
                              } },
                            );
                            localStorage.setItem('game', 'editar');
                          } }
                        >
                          {
                            (inProgress)
                              ? <img src={ editIcon } alt="Jogo em andamento" />
                              : <img src={ check } alt="Jogo finalizado" />
                          }
                        </button>
                      )
                      : null
                  }
                </td>
              </tr>
            ))
        }
      </tbody>
    </table>
  );
};

export default GamesTable;
