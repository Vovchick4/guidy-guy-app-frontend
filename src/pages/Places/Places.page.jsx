import { isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useState } from "react";
import { AddPlace, PlaceCard } from "./ui";
import { Button } from "../../shared/ui";
import { Container, Loader, Modal, Pagination } from "../../shared/components";

import { useGetPlacesQuery } from "../../shared/redux/services/places";

import styles from "./Places.module.css";
import {
  getPlaceFiltersSelector,
  setPage,
} from "../../shared/redux/features/placeFilter";
import { getUserSelector } from "../../shared/redux/features/authSlice";

const stateModals = {
  addPlace: "ADD_PLACE",
  editPlace: "EDIT_PLACE",
};
export default function PlacesPage() {
  const [modal, setModal] = useState(null);
  const user = useSelector(getUserSelector);
  const { page, total, search } = useSelector(getPlaceFiltersSelector);
  const dispatch = useDispatch();

  const { data: places, isLoading } = useGetPlacesQuery({
    take: total,
    name: search?.trim() && search,
    skip: page,
  });

  function onChangePage({ selected }) {
    dispatch(setPage(selected));
  }

  function openModal(modal) {
    setModal(modal);
  }

  function closeModal() {
    setModal(null);
  }

  return (
    <Container>
      <Modal
        headerText="Create Place"
        open={modal === stateModals.addPlace}
        onClose={closeModal}
      >
        <AddPlace />
      </Modal>

      <article className={styles.article_content}>
        <div className={styles.content}>
          <h2 className={styles.content_title}>PlacesPages</h2>

          {!isEmpty(user) && (
            <div>
              <Button
                color="danger"
                variant="containe"
                onClick={() => openModal(stateModals.addPlace)}
              >
                Create a new place
              </Button>
            </div>
          )}
        </div>

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
                pageCount={Math.ceil(places.total / total)}
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
