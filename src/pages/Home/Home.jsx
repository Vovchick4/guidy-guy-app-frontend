import { Loader } from "../../shared/components";
import { useGetPlacesQuery } from "../../shared/redux/services/places";
import { Button } from "../../shared/ui";

export default function Home() {
  const { data, isLoading } = useGetPlacesQuery({
    name: "",
    take: 8,
    skip: 0,
  });

  if (isLoading) return <Loader />;

  return (
    <div>
      <Button variant="text" color="success">
        text success
      </Button>
      <Button variant="outline" color="success">
        outline success
      </Button>
      <Button variant="containe" color="success">
        containe success
      </Button>

      <Button variant="text" color="danger">
        text danger
      </Button>
      <Button variant="outline" color="danger">
        outline danger
      </Button>
      <Button variant="containe" color="danger">
        containe danger
      </Button>

      {data && data.map((i) => <p key={i.id}>{i.name}</p>)}
    </div>
  );
}
