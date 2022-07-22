import { useDispatch, useSelector } from "react-redux";
import { Fragment, useState } from "react";
import { PlaceCard } from "./ui";
import { Container, Loader, Pagination } from "../../shared/components";

import { useGetPlacesQuery } from "../../shared/redux/services/places";

import styles from "./Places.module.css";
import {
  getPlaceFiltersSelector,
  setPage,
} from "../../shared/redux/features/placeFilter";

export default function PlacesPage() {
  const { page, search } = useSelector(getPlaceFiltersSelector);
  const dispatch = useDispatch();

  const { data: places, isLoading } = useGetPlacesQuery({
    take: 8,
    name: search?.trim() && search,
    skip: page,
  });

  function onChangePage({ selected }) {
    dispatch(setPage(selected));
  }

  return (
    <Container>
      <article className={styles.article_content}>
        <h2>PlacesPages</h2>

        {isLoading && <Loader />}

        {!isLoading && places?.data.length !== 0 && (
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

        {!isLoading && places?.data.length === 0 && (
          <h1>Not Found Place with name - {search}</h1>
        )}
      </article>
    </Container>
  );
}
