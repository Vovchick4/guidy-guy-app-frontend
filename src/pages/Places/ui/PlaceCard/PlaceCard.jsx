import { isEmpty } from "lodash";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";

import { AiFillEdit } from "react-icons/ai";
import { IoMdCloseCircle } from "react-icons/io";

import urls from "../../../../shared/config/urls";
import { imageURL } from "../../../../shared/constants";
import image from "../../../../shared/images/home_header_image.png";
import styles from "./PlaceCard.module.css";
import { getUserSelector } from "../../../../shared/redux/features/authSlice";

export default function PlaceCard({
  id,
  name,
  uuid,
  fileName,
  openUpdateModal,
  onDeleteItem,
}) {
  const user = useSelector(getUserSelector);

  return (
    <div className={styles.content_card}>
      <Link to={`${urls.place}/${uuid}`}>
        <div className={styles.content_card_wrapper_image}>
          <img
            className={styles.content_card_image}
            src={fileName ? imageURL + fileName : image}
            alt={name}
            height={340}
            width={340}
          />
        </div>
      </Link>

      {!isEmpty(user) && (
        <div className={styles.admin_content}>
          <AiFillEdit
            onClick={() => openUpdateModal(uuid)}
            className={styles.icon}
            fontSize={25}
            color={"white"}
          />
          <IoMdCloseCircle
            onClick={() => onDeleteItem(uuid)}
            className={styles.icon}
            fontSize={25}
            color={"white"}
          />
        </div>
      )}

      <div className={styles.content_card_text}>
        <p>
          {name} {id}
        </p>
        <p>{uuid}</p>
      </div>
    </div>
  );
}
