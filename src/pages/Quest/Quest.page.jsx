import { BsDot } from "react-icons/bs";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { QuestPlaceCard } from "./ui";
import { Container } from "../../shared/components";
import { getUserSelector } from "../../shared/redux/features/authSlice";
import { useGetQuestByIdQuery } from "../../shared/redux/services/quests";

import styles from "./Quest.module.css";
import urls from "../../shared/config/urls";

export default function QuestPage() {
  const navigate = useNavigate();
  const { id: userId } = useSelector(getUserSelector);
  const { questId } = useParams();
  const { data: quest, isLoading } = useGetQuestByIdQuery({ userId, questId });

  return (
    <Container>
      <div className={styles.content}>
        <p className={styles.title}>
          <MdOutlineKeyboardBackspace onClick={() => navigate(urls.quests)} />
          <span className={styles.breadcrumbs}>
            Quest <BsDot fontSize={34} /> {!isLoading && quest.uuid}
          </span>
        </p>

        <div className={styles.status_bar}>
          <span>0/{!isLoading && quest.places.length}</span>
          <input
            disabled
            className={styles.range}
            type="range"
            name="range"
            id="range"
            step={1}
            value={0}
            min={0}
            max={!isLoading ? quest.places.length : 34}
          />
        </div>
      </div>

      <div className={styles.card_content}>
        {!isLoading &&
          quest.places.map((place) => (
            <QuestPlaceCard key={place.id} {...place} />
          ))}
      </div>
    </Container>
  );
}
