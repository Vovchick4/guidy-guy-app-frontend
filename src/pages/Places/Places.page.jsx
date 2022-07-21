import { Fragment, useState } from "react";
import { PlaceCard } from "./ui";
import { Container, Pagination } from "../../shared/components";

import { useGetPlacesQuery } from "../../shared/redux/services/places";

import styles from "./Places.module.css";

export default function PlacesPage() {
  const [page, setPage] = useState(0);
  const { data: places, isLoading } = useGetPlacesQuery({
    take: 8,
    skip: page,
  });

  function onChangePage({ selected }) {
    setPage(selected);
  }

  return (
    <Container>
      <article className={styles.article_content}>
        <h2>PlacesPages</h2>
        {!isLoading && (
          <Fragment>
            <div className={styles.content_palces}>
              {places.data.map((placeItem) => (
                <PlaceCard key={placeItem.id} {...placeItem} />
              ))}
            </div>

            <div className={styles.content_react_paginate_module}>
              <Pagination
                currentPage={page}
                pageCount={places.total}
                onChange={onChangePage}
              />
            </div>
          </Fragment>
        )}
      </article>
    </Container>
  );
}
