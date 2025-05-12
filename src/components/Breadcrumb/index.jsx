import React from "react";
import { Link } from "react-router-dom";
import "./Breadcrumbs.scss";
import { FaChevronRight } from "react-icons/fa"; // Ajratuvchi ikonka

const Breadcrumbs = ({ items }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav aria-label="breadcrumb" className="breadcrumbs">
      <ol className="breadcrumbs__list">
        {items.map((item, index) => (
          <li key={index} className="breadcrumbs__item">
            {index < items.length - 1 ? (
              <>
                <Link to={item.path} className="breadcrumbs__link">
                  {item.label}
                </Link>
                <FaChevronRight className="breadcrumbs__separator" />
              </>
            ) : (
              <span className="breadcrumbs__current" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
