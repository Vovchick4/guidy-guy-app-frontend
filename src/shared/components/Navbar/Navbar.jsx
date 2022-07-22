import { useDispatch } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Input } from "../../ui";

import { setSearch, setPage } from "../../redux/features/placeFilter";

import urls from "../../config/urls";

import logo from "../../images/Logo.svg";
import searchTour from "../../images/Group.svg";

import styles from "./Navbar.module.css";

const links = [
  {
    id: 1,
    label: "Головна",
    to: urls.home,
  },
  {
    id: 2,
    label: "Мапа",
    to: urls.map,
  },
  {
    id: 3,
    label: "FAQ",
    to: urls.faq,
  },
  {
    id: 4,
    label: "Контакти",
    to: urls.contact,
  },
];

export default function Navbar() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const onSearchChange = (e) => {
    if (e.target.value && pathname !== urls.places) {
      navigate(urls.places);
    }

    dispatch(setPage(0));
    dispatch(setSearch(e.target.value));
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <NavLink to={urls.home}>
          <img src={logo} alt="TravelLogo" />
        </NavLink>
      </div>
      <nav>
        <ul className={styles.content_links}>
          {links.map(({ id, label, to }) => (
            <li key={id}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  !isActive ? styles.link : styles.active_link
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.content_search}>
        <Input
          fullwidth
          color="danger"
          variant="containe"
          placeholder="Шукати місця"
          leftAdorment={<img src={searchTour} alt="SearchTour" />}
          onChange={onSearchChange}
        />
      </div>
    </div>
  );
}
