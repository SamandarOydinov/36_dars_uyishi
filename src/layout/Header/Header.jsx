import React, { useState } from 'react';
import './Header.scss';
import { MdClear } from 'react-icons/md';
import { BiCart, BiSearch } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router';



function Header() {
  const [isFragmentVisible, setIsFragmentVisible] = useState(true);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const navigate = useNavigate()
  const handleClearClick = () => {
    setIsFragmentVisible(false);
  };

  const toggleBurger = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  return (
    <header>
      {isFragmentVisible && (
        <div className="header-top">
          <p>
            Sign up and get 20% off to your first order.{' '}
            <a href="#">Sign Up Now</a>
          </p>
          <MdClear className="clear-btn" onClick={handleClearClick} />
        </div>
      )}
      <div className="container">
        <div className="navbar-wrapper">
          <div className="burger-icon" onClick={toggleBurger}>
            <FiMenu />
          </div>

          <h3>SHOP.CO</h3>

          <div className={`content-ul ${isBurgerOpen ? 'open' : ''}`}>
            <ul>
              <li>On Sale</li>
              <li>New Arrivals</li>
              <li>Brands</li>
            </ul>
          </div>

          <div className="search-input desktop-search">
            <BiSearch />
            <input type="text" placeholder="Search for products..." />
          </div>

          <div className="card-and-profile-icons">
            <BiSearch className="mobile-search-icon" />
            <BiCart onClick={() => navigate("cart")}/>
            <CgProfile onClick={() => navigate("profile")}/>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;