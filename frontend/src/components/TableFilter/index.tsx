import './styles.css';
import IGamerFilter from '../../interfaces/IGamerFilter';

const GamerFilter: React.FC<IGamerFilter> = ({ currentFilter, setCurrentFilter }) => {
  const handleCurrentFilter = () => {
    const selectElement = document.getElementById('classification-filter') as HTMLSelectElement || null;
    
    if (selectElement) {
        const selectedFilter = selectElement.value;
        setCurrentFilter(selectedFilter);
      }
  };

  return (
    <form>
      <label htmlFor="classification-filter">
        Partidas:
        <select
          id="classification-filter"
          defaultValue={ currentFilter }
          data-testid="score_boarding__classification_filter"
        >
          <option>Classificação Geral</option>
          <option>Classificação Mandantes</option>
          <option>Classificação Visitantes</option>
        </select>
      </label>
      <button
        data-testid="score_boarding__classification_filter_button"
        type="button"
        onClick={ () => handleCurrentFilter() }
      >
        Buscar
      </button>
    </form>
  );
};

export default GamerFilter;
