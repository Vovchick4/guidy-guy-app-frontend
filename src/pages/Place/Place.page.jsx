import { useParams } from "react-router-dom";
import { useGetPlacesByIdQuery } from "../../shared/redux/services/places";

export default function PlacePage() {
  const { placeId } = useParams();
  const { data, isLoading } = useGetPlacesByIdQuery(placeId);

  if (isLoading) {
    return;
  }

  console.log(data);

  return <div>{!isLoading && data?.name}</div>;
}
