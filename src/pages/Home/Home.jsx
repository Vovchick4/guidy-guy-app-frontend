import { Loader } from "../../shared/components";
import { useGetPlacesQuery } from "../../shared/redux/services/places";

export default function Home() {
  const { data, isLoading } = useGetPlacesQuery({
    name: "",
    take: 8,
    skip: 0,
  });

  if (isLoading) return <Loader />;

  return <div>{data && data.map((i) => <p key={i.id}>{i.name}</p>)}</div>;
}
