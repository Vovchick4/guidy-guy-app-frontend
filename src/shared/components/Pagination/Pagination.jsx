import Paginate from "react-paginate";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import styles from "./Pagination.module.css";

export default function Pagination({ currentPage, pageCount, onChange }) {
  return (
    <Paginate
      breakLabel="..."
      nextLabel={<GrFormNext fontSize={22} />}
      previousLabel={<GrFormPrevious fontSize={22} />}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      containerClassName={styles.containerClassName}
      pageLinkClassName={styles.pageLinkClassName}
      activeLinkClassName={styles.activeLinkClassName}
      disabledLinkClassName={styles.disabledLinkClassName}
      nextClassName={styles.nextLinkClassName}
      previousClassName={styles.previousLinkClassName}
      pageCount={pageCount}
      forcePage={currentPage}
      onPageChange={onChange}
    />
  );
}
