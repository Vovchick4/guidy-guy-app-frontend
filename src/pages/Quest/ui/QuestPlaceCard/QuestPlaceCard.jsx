import { imageURL } from "../../../../shared/constants";

import styles from "./QuestPlaceCard.module.css";

export default function QuestPlaceCard({ id, name, uuid, fileName }) {
  return (
    <div className={styles.content_card}>
      <div className={styles.card_content_image}>
        <img
          className={styles.card_image}
          src={imageURL + fileName}
          alt={name}
        />
      </div>

      <div className={styles.content_text}>
        <h3>{name}</h3>
        <h4>{uuid}</h4>
      </div>
    </div>
  );
}
