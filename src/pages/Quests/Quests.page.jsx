import { useState } from "react";
import { useSelector } from "react-redux";

import { Container, Modal } from "../../shared/components";
import { Button } from "../../shared/ui";
import { AddQuestForm, QuestCard } from "./ui";

import { getUserSelector } from "../../shared/redux/features/authSlice";
import { useGetAllQuestsByUserIdQuery } from "../../shared/redux/services/quests";
import styles from "./Quests.module.css";
const stateModals = {
  createQuest: "CREATE_QUEST",
};
export default function QuestsPage() {
  const [modal, setModal] = useState(null);
  const { id } = useSelector(getUserSelector);
  const { data, isLoading, isFetching } = useGetAllQuestsByUserIdQuery(id);

  function openCreateQuestModal(modal) {
    setModal(modal);
  }

  function onCloseModals() {
    setModal(null);
  }

  return (
    <Container>
      <Modal
        headerText="Create a new quest"
        open={stateModals.createQuest === modal}
        onClose={onCloseModals}
      >
        <AddQuestForm />
      </Modal>

      <Button
        variant="outline"
        color="danger"
        onClick={() => openCreateQuestModal(stateModals.createQuest)}
      >
        Create QUEST
      </Button>

      {!isLoading && data && (
        <div className={styles.grid_content}>
          {data.map((q, i) => (
            <QuestCard key={q.id} index={i} {...q} />
          ))}
        </div>
      )}
      {!isLoading && !data && <p>You not have any QUEST</p>}
    </Container>
  );
}
