import image from "../../../../shared/images/home_header_image.png";

import styles from "./PlaceCard.module.css";

export default function PlaceCard({ id, name, uuid }) {
  return (
    <div className={styles.content_card}>
      <div className={styles.content_card_wrapper_image}>
        <img
          className={styles.content_card_image}
          src={image}
          alt={name}
          height={340}
          width={340}
        />
      </div>

      <div className={styles.content_card_text}>
        <p>{name}</p>
        <p>{uuid}</p>
      </div>
    </div>
  );
}
