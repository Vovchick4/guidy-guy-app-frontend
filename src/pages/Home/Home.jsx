import { Fragment } from "react";
import { Button } from "../../shared/ui";

import styles from "./Home.module.css";

import headerImage from "../../shared/images/home_header_image.png";

export default function Home() {
  return (
    <Fragment>
      <header className={styles.header}>
        <div className={styles.header_content_image}>
          <img
            className={styles.header_image_content}
            src={headerImage}
            alt="HeaderImagePlaceHodoler"
          />
        </div>

        <div className={styles.header_content_text}>
          <h1>Time to Travel</h1>
          <p>
            Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam
            no suscipit quaerendum. At nam minimum ponderum. Est audiam animal
            molestiae te.
          </p>

          <div className={styles.header_content_text_content_button}>
            <Button variant="containe" color="danger">
              Підібрати тур
            </Button>
            <Button variant="outline" color="danger">
              Читати більше
            </Button>
          </div>
        </div>
      </header>

      <section></section>
    </Fragment>
  );
}
