import { Loader } from "../../components";
import { useGetPlacesQuery } from "../../redux/services/places";

export default function Home() {
  const { data, isLoading, isError } = useGetPlacesQuery();

  if (isLoading) return <Loader />;

  return (
    <div>
      {!isError &&
        data.data &&
        data.data.map((i) => <p key={i.id}>{i.name}</p>)}
    </div>
  );
}
