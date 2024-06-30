import clsx from "clsx";
import { HiOutlineUser } from "react-icons/hi";
import { HiPhone } from "react-icons/hi";
import css from "./Contact.module.css";

export default function Contact({ userData: { id, name, number }, onDelete }) {
  return (
    <div className={clsx(css.itemWrapper)}>
      <ul className={clsx(css.contactWrapper)}>
        <li className={clsx(css.nameContact)}>
          <p className={clsx(css.text)}>
            <HiOutlineUser className={clsx(css.icon)} size="20" />
            {name}
          </p>
        </li>
        <li className={clsx(css.numberContact)}>
          <p className={clsx(css.text)}>
            <HiPhone className={clsx(css.icon)} size="20" />
            {number}
          </p>
        </li>
      </ul>
      <button
        className={clsx(css.button)}
        type="button"
        onClick={() => onDelete(id)}
      >
        Delete
      </button>
    </div>
  );
}
