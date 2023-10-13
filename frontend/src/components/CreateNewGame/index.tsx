import { useState } from 'react';
import TeamOption from '../TeamOption';
import Scoreboard from '../Scoreboard';

interface ICreateNewGame {
    teams: Array<{ teamName: string }>;
    setTeams: React.Dispatch<React.SetStateAction<never[]>>;
    getTeam: (team: string, homeOrAway: string) => void;
    homeTeamScoreboard: number;
    setHomeTeamScoreboard: React.Dispatch<React.SetStateAction<number>>;
    awayTeamScoreboard: number;
    setAwayTeamScoreboard: React.Dispatch<React.SetStateAction<number>>;
    createMatch: () => Promise<unknown>;
    finishMatch: (id: number) => void;
}
const CreateNewGame = ({
  teams,
  setTeams,
  getTeam,
  homeTeamScoreboard,
  setHomeTeamScoreboard,
  awayTeamScoreboard,
  setAwayTeamScoreboard,
  createMatch,
  finishMatch,
}: ICreateNewGame) => {
  const notCreated = 'not-created';
  const [inProgress, setInProgress] = useState(notCreated);
  const [createdMatch, setCreatedMatch] = useState<{ id: number } | string>(notCreated);

  return (
    <section className="match-settings-section">
      <form className="match-settings-form">
        <div className="match-settings-form-options">
          <TeamOption
            testId="insertion_matches__select_home_team"
            teams={ teams }
            setTeams={ setTeams }
            homeTeam
            getTeam={ getTeam }
          />
          <Scoreboard
            testId="insertion_matches__select_quantity_goals_home_team"
            homeTeam
            score={ homeTeamScoreboard }
            setScore={ setHomeTeamScoreboard }
          />
          <div className="match-settings-form-versus">
            <span />
            <span>X</span>
          </div>
          <Scoreboard
            testId="insertion_matches__select_quantity_goals_away_team"
            homeTeam={ false }
            score={ awayTeamScoreboard }
            setScore={ setAwayTeamScoreboard }
          />
          <TeamOption
            testId="insertion_matches__select_away_team"
            teams={ teams }
            setTeams={ setTeams }
            homeTeam={ false }
            getTeam={ getTeam }
          />
        </div>
        <div className="match-settings-form-buttons">
          <button
            data-testid="insertion_matches__save_match_btn"
            onClick={ async () => {
              const body = await createMatch();
              const stringBody = body as string;
              setCreatedMatch(stringBody);
              setInProgress('In-Progress');
            } }
            type="button"
            disabled={ (inProgress !== notCreated) }
          >
            Salvar Partida

          </button>
          <button
            data-testid="insertion_matches__finish_match_btn"
            onClick={() => {
                if (typeof createdMatch === 'object' && createdMatch.id) {
                  finishMatch(createdMatch.id);
                }
              }}
            type="button"
            disabled={ (inProgress === notCreated) }
          >
            Finalizar Partida

          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateNewGame;
