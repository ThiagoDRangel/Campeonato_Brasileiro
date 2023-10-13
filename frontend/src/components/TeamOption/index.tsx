import ITeamOption from "../../interfaces/ITeamOption";

const TeamOption = ({ teams, homeTeam, getTeam, testId }: ITeamOption) => (
  <label htmlFor={ (homeTeam) ? 'home-team-scoreboard' : 'away-team-scoreboard' }>
    { (homeTeam) ? <p>Time Mandante</p> : <p>Time Visitante</p> }
    <select
      data-testid={ testId }
      onChange={ ({ target: { value } }) => {
        const homeOrAway = (homeTeam) ? 'homeTeam' : 'awayTeam';
        getTeam(value, homeOrAway);
      } }
    >
      {
        teams.map(({ teamName }, index) => (
          <option key={ index } value={ teamName }>{ teamName }</option>
        ))
      }
    </select>
  </label>
);

export default TeamOption;
