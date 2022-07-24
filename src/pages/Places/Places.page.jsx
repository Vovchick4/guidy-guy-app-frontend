import { toast } from "react-toastify";
import { isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useState } from "react";
import { AddPlace, EditPlace, PlaceCard } from "./ui";
import { Button } from "../../shared/ui";
import { Container, Loader, Modal, Pagination } from "../../shared/components";

import {
  useGetPlacesQuery,
  useRemovePlaceMutation,
} from "../../shared/redux/services/places";

import styles from "./Places.module.css";
import {
  getPlaceFiltersSelector,
  setPage,
} from "../../shared/redux/features/placeFilter";
import { getUserSelector } from "../../shared/redux/features/authSlice";
import { getErrorResponseMessage } from "../../shared/utils";

const stateModals = {
  addPlace: "ADD_PLACE",
  editPlace: "EDIT_PLACE",
};
export default function PlacesPage() {
  const [modal, setModal] = useState(null);
  const [placeUUID, setPlaceUUID] = useState(null);
  const user = useSelector(getUserSelector);

  const [deletePlace] = useRemovePlaceMutation();
  const { page, total, search } = useSelector(getPlaceFiltersSelector);
  const dispatch = useDispatch();

  const {
    data: places,
    isLoading,
    isFetching,
  } = useGetPlacesQuery({
    take: total,
    name: search?.trim() && search,
    skip: page,
  });

  function onChangePage({ selected }) {
    dispatch(setPage(selected));
  }

  function openModal(modal, id) {
    setModal(modal);
    if (id) setPlaceUUID(id);
  }

  function openUpdateModal(id) {
    setModal(stateModals.editPlace);
    setPlaceUUID(id);
  }

  function closeModal() {
    setModal(null);
  }

  function onDeletePlace(id) {
    toast.promise(deletePlace(id), {
      pending: `Deleting Place ...`,
      success: `Deleted Place with ID ${id}`,
      error: (err) => `${getErrorResponseMessage(err)}`,
    });
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

      <Modal
        headerText={`Update Place BY ${placeUUID}`}
        open={modal === stateModals.editPlace}
        onClose={closeModal}
      >
        <EditPlace placeId={placeUUID} />
      </Modal>

      <article className={styles.article_content}>
        <div className={styles.content}>
          <h2 className={styles.content_title}>PlacesPages</h2>
          {isFetching && <p>Fetching</p>}

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

        {isLoading ? <Loader /> : null}

        {!isLoading && places?.data.length !== 0 && (
          <Fragment>
            <div className={styles.content_palces}>
              {places.data.map((placeItem) => (
                <PlaceCard
                  key={placeItem.id}
                  {...placeItem}
                  openUpdateModal={openUpdateModal}
                  onDeleteItem={onDeletePlace}
                />
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

        {!isLoading && places?.data.length === 0 && !search && (
          <h1>Not Found Place</h1>
        )}
        {!isLoading && places?.data.length === 0 && search && (
          <h1>Not Found Place with name - {search}</h1>
        )}
      </article>
    </Container>
  );
}
