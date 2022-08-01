import { Link } from "react-router-dom";
import urls from "../../../../shared/config/urls";
import { imageURL } from "../../../../shared/constants";
import styles from "./QuestCard.module.css";
const displayImages = 4;
export default function QuestCard({ id, name, places, uuid, index }) {
  return (
    <div className={styles.card_content}>
      {places && (
        <div className={styles.image_content}>
          {places.map(
            ({ id, fileName, name }, i) =>
              fileName &&
              i < displayImages && (
                <img
                  key={id}
                  className={styles.image}
                  src={imageURL + fileName}
                  alt={name}
                />
              )
          )}
        </div>
      )}

      <Link to={`${urls.quest + "/" + uuid}`}>
        <div className={styles.image_dimmer}>
          <p className={styles.image_dimmer_title}>Check Quest</p>
          <p className={styles.image_dimmer_title}>{index + 1}</p>
        </div>
      </Link>

      <div className={styles.name_content}>
        <p>{name}</p>
      </div>
    </div>
  );
}
