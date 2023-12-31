import IGamerFilter from '../../interfaces/IGamerFilter';

const GamerFilter = ({ currentFilter, setCurrentFilter }: IGamerFilter) => {
const handleCurrentFilter = () => {
    const selectedFilter = (document.getElementById('game-filter') as HTMLSelectElement)?.value;
    setCurrentFilter(selectedFilter);
};

  return (
    <form>
      <label htmlFor="game-filter">
        Partidas:
        <select
          id="game-filter"
          defaultValue={ currentFilter }
          data-testid="matches__option_show_finish_matches"
        >
          <option>Todos os Jogos</option>
          <option>Em andamento</option>
          <option>Finalizado</option>
        </select>
      </label>
      <button
        data-testid="matches__search_match_btn"
        type="button"
        onClick={ () => handleCurrentFilter() }
      >
        Buscar
      </button>
    </form>
  );
};

export default GamerFilter;
