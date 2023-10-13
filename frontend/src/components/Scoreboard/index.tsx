import IScoreboard from "../../interfaces/IScoreboard";

const Scoreboard = ({ homeTeam, score, setScore, qtyGoal, testId }: IScoreboard) => (
  <label htmlFor={ (homeTeam) ? 'home-team-scoreboard' : 'away-team-scoreboard' }>
    <p>Gols</p>
    <input
      data-testid={ testId }
      type="number"
      min="0"
      value={ score }
      onChange={ ({ target: { value } }) => {
        if (qtyGoal) {
          if (Number(value) < qtyGoal) {
            setScore(qtyGoal);
          } 
        } else {
          setScore(Number(value));
        }
      } }
    />
  </label>
);

export default Scoreboard;
