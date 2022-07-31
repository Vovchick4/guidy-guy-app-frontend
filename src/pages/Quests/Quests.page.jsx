import { useState } from "react";
import { useSelector } from "react-redux";

import { Modal } from "../../shared/components";
import { Button } from "../../shared/ui";
import { getUserSelector } from "../../shared/redux/features/authSlice";
import { useGetAllQuestsByUserIdQuery } from "../../shared/redux/services/quests";

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
    <div>
      <Modal
        headerText="Create a new quest"
        open={stateModals.createQuest === modal}
        onClose={onCloseModals}
      ></Modal>

      <Button
        variant="outline"
        color="danger"
        onClick={() => openCreateQuestModal(stateModals.createQuest)}
      >
        Create QUEST
      </Button>

      {!isLoading &&
        !isFetching &&
        data.length !== 0 &&
        data.map((q) => <p key={q.id}>{q.name}</p>)}
      <div>
        {!isLoading && data.length === 0 && (
          <h4>
            <h3>You not have any QUEST</h3>
          </h4>
        )}
      </div>
    </div>
  );
}
