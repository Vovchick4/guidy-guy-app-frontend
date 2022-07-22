import { useRef } from "react";
import { VscDesktopDownload } from "react-icons/vsc";

import styles from "./InputIcon.module.css";

export default function InputIcon({ ...restInputProps }) {
  const inputRef = useRef(null);

  return (
    <div className={styles.content_input_file}>
      <div className={styles.file}>
        <input
          ref={inputRef}
          className={styles.inp_icon}
          type="file"
          accept="image/*"
          {...restInputProps}
        />
        <VscDesktopDownload
          className={styles.icon}
          onClick={() => inputRef.current.click()}
        />
      </div>
    </div>
  );
}
