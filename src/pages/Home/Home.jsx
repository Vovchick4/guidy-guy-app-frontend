import { Loader } from "../../components";
import { useGetPlacesQuery } from "../../redux/services/places";

export default function Home() {
  const { data, isLoading } = useGetPlacesQuery({
    name: "",
    take: 4,
    skip: 0,
  });

  if (isLoading) return <Loader />;

  return <div>{data && data.map((i) => <p key={i.id}>{i.name}</p>)}</div>;
}
