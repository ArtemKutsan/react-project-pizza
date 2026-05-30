import { useParams } from 'react-router-dom';

const RecipePageDetail = () => {
  const { id } = useParams();
  console.log(id);

  return <div></div>;
};

export default RecipePageDetail;
