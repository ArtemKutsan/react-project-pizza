import CuisineListItem from '../CuisineListItem';

const CuisineList = ({ cuisines, mealType, onSelect }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {cuisines.map((cuisine) => (
        <CuisineListItem
          key={cuisine.name}
          cuisine={cuisine}
          mealType={mealType}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default CuisineList;
