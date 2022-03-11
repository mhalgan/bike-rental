import { useFetchAllBikesQuery } from "../../services/bikesService";

const BikesList = () => {
  const { data } = useFetchAllBikesQuery();
  console.log(data);
  return <h1>BikesList</h1>;
};

export default BikesList;
