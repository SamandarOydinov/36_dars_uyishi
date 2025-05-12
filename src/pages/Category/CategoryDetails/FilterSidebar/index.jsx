import React, { useEffect, useState } from "react";
import ReactRangeSliderInput from "react-range-slider-input";
import { ArrowRightIcon, FilterIcon } from "../../../../assets/icons"; // Ikonka yo'llarini tekshiring
import "react-range-slider-input/dist/style.css";
import "./FilterSide.scss";
import ColorPicker from "./ColorPicker";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const FilterSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // URL parametrlarini o'qish uchun
  const { categoryId } = useParams(); // Asosiy kategoriya IDsi (agar pathda bo'lsa)

  // Filter holatlari (state)
  const [priceRange, setPriceRange] = useState([0, 500]); // Default narx diapazoni
  const [selectedColors, setSelectedColors] = useState([]);
  // const [selectedSizes, setSelectedSizes] = useState([]); // Kelajakda o'lchamlar uchun
  // const [selectedDressStyles, setSelectedDressStyles] = useState([]); // Kelajakda kiyim uslublari uchun

  // Akkordion ochish/yopish holatlari
  const [togglers, setTogglers] = useState({
    priceToggler: true, // Boshida narx ochiq bo'lsin
    colorToggler: true, // Boshida ranglar ochiq bo'lsin
    sizeToggler: false,
    dressStyleToggler: false,
  });

  const handleToggle = (key) => {
    setTogglers((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Sahifa yuklanganda yoki URLdagi "?..." qismi o'zgarganda filterlarni URLdan o'qib olish
  useEffect(() => {
    const currentParams = new URLSearchParams(location.search);
    const urlPriceGte = currentParams.get("price_gte");
    const urlPriceLte = currentParams.get("price_lte");
    const urlColors = currentParams.get("colors");
    // Boshqa filterlarni ham olish (masalan, 'size')

    if (urlPriceGte !== null && urlPriceLte !== null) {
      setPriceRange([parseFloat(urlPriceGte), parseFloat(urlPriceLte)]);
    } else {
      // Agar URLda narx filteri bo'lmasa, defaultga qaytarish (ixtiyoriy)
      // setPriceRange([0, 500]);
    }

    if (urlColors) {
      setSelectedColors(urlColors.split(","));
    } else {
      // Agar URLda rang filteri bo'lmasa, bo'sh qoldirish (ixtiyoriy)
      // setSelectedColors([]);
    }
    // Boshqa filterlar uchun ham shunday
  }, [location.search]); // Bu useEffect location.search o'zgarganda ishlaydi

  // Narx diapazoni o'zgarganda `span` ichidagi qiymatni yangilash
  useEffect(() => {
    const el = document.querySelectorAll(".range-slider__thumb");
    if (el.length === 2 && el[0] && el[1]) {
      el[0].innerHTML = `<span class="range-slider-value">$${priceRange[0]}</span>`;
      el[1].innerHTML = `<span class="range-slider-value">$${priceRange[1]}</span>`;
    }
  }, [priceRange]);

  // Filterlanadigan kategoriyalar ro'yxati (API dagi qiymatlarga mos kelishi kerak)
  const filterByCloths = [
    { filterKey: "T-shirt", title: "T-shirts" },
    { filterKey: "Pants", title: "Pants" },
    { filterKey: "Socks", title: "Socks" },
    { filterKey: "Men's-shoes", title: "Men's Shoes" },
    { filterKey: "Women's-shoes", title: "Women's Shoes" },
    // Agar API da boshqa kategoriyalar bo'lsa, ularni ham qo'shing
  ];

  // Kategoriya bosilganda URLni yangilash (faqat "category" parametrini o'zgartiradi)
  const handleCategoryClick = (categoryObj) => {
    const currentParams = new URLSearchParams(location.search);
    currentParams.set("category", categoryObj.filterKey);
    // Boshqa filterlar saqlanib qoladi. Agar yangi kategoriya tanlansa,
    // boshqa filterlarni (narx, rang) reset qilish logikasini qo'shish mumkin.
    // Masalan:
    // currentParams.delete('price_gte');
    // currentParams.delete('price_lte');
    // currentParams.delete('colors');
    // setPriceRange([0, 500]); // State ni ham reset qilish
    // setSelectedColors([]);   // State ni ham reset qilish

    const basePath = categoryId ? `/category/${categoryId}` : "/category";
    navigate(`${basePath}?${currentParams.toString()}`);
  };

  // Barcha filterlarni URLga yozish uchun yordamchi funksiya
  const updateUrlWithFilters = (newFilters) => {
    const currentParams = new URLSearchParams(location.search);
    const currentCategory = currentParams.get("category"); // Joriy kategoriyani saqlab qolamiz

    // newFilters obyektidagi har bir qiymatni URL parametrlariga o'rnatamiz
    for (const key in newFilters) {
      const value = newFilters[key];
      if (value !== undefined && value !== null && String(value).length > 0) {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            currentParams.set(key, value.join(","));
          } else {
            currentParams.delete(key); // Bo'sh massiv uchun parametrni o'chiramiz
          }
        } else {
          currentParams.set(key, String(value));
        }
      } else {
        currentParams.delete(key); // Bo'sh yoki null qiymat uchun parametrni o'chiramiz
      }
    }

    // Asosiy `category` parametri o'chib ketmasligi uchun (agar `newFilters`da bo'lmasa)
    if (currentCategory && !newFilters.hasOwnProperty("category")) {
      currentParams.set("category", currentCategory);
    } else if (newFilters.hasOwnProperty("category") && newFilters.category) {
      currentParams.set("category", newFilters.category);
    }

    const basePath = categoryId ? `/category/${categoryId}` : "/category";
    navigate(`${basePath}?${currentParams.toString()}`);
  };

  // Narx diapazoni o'zgarganda state ni yangilash
  const handlePriceChange = (range) => {
    setPriceRange(range);
  };

  // Ranglar tanlanganda state ni yangilash
  const handleColorFilterChange = (colors) => {
    setSelectedColors(colors);
  };

  // "Apply Filter" tugmasi bosilganda URLni barcha joriy filterlar bilan yangilash
  const handleApplyFiltersClick = () => {
    const filtersToApply = {};

    // Narx filteri
    // Agar narx default (0-500) dan farq qilsa, URLga qo'shamiz
    if (priceRange[0] > 0 || priceRange[1] < 500) {
      filtersToApply.price_gte = priceRange[0];
      filtersToApply.price_lte = priceRange[1];
    } else {
      // Agar defaultga teng bo'lsa, URLdan olib tashlash uchun undefined beramiz
      filtersToApply.price_gte = undefined;
      filtersToApply.price_lte = undefined;
    }

    // Rang filteri
    if (selectedColors.length > 0) {
      filtersToApply.colors = selectedColors;
    } else {
      filtersToApply.colors = undefined;
    }

    // Bu yerga boshqa filterlarni ham qo'shing (masalan, size, dressStyle)
    // if (selectedSizes.length > 0) {
    //   filtersToApply.size = selectedSizes;
    // } else {
    //   filtersToApply.size = undefined;
    // }

    updateUrlWithFilters(filtersToApply);
  };

  return (
    <div className="filter-side-wrapper">
      <div className="filter-header">
        <h3>Filters</h3>
        <FilterIcon />
      </div>
      <div className="hr-line" />

      {/* Kategoriyalar bo'yicha filter */}
      <div>
        {filterByCloths.map((item) => (
          <div
            key={item.filterKey}
            onClick={() => handleCategoryClick(item)}
            className={`filter-item ${
              new URLSearchParams(location.search).get("category") ===
              item.filterKey
                ? "active"
                : ""
            }`}
          >
            <span>{item.title}</span>
            <ArrowRightIcon />
          </div>
        ))}
      </div>
      <div className="hr-line" />

      {/* Narx bo'yicha filter */}
      <div className="accordion">
        <div
          className="accordion-header"
          onClick={() => handleToggle("priceToggler")}
        >
          <p>Price</p>
          <div
            className={`arrow ${
              togglers.priceToggler ? "arrow-top" : "arrow-bottom"
            }`}
          >
            <ArrowRightIcon />
          </div>
        </div>
        <div
          className={`accordion-body price-accordion ${
            togglers.priceToggler ? "open" : "hide"
          }`}
        >
          <ReactRangeSliderInput
            className="price-range-slider"
            min={0}
            max={500} // Bu qiymatni dinamik qilish mumkin (masalan, barcha mahsulotlardagi max narxdan)
            step={10}
            value={priceRange} // `priceRange` state'ini bog'lash
            onInput={handlePriceChange} // State'ni yangilash uchun
          />
        </div>
      </div>
      <div className="hr-line" />

      {/* Ranglar bo'yicha filter */}
      <div className="accordion">
        <div
          className="accordion-header"
          onClick={() => handleToggle("colorToggler")}
        >
          <p>Colors</p>
          <div
            className={`arrow ${
              togglers.colorToggler ? "arrow-top" : "arrow-bottom"
            }`}
          >
            <ArrowRightIcon />
          </div>
        </div>
        <div
          className={`accordion-body color-accordion ${
            togglers.colorToggler ? "open" : "hide"
          }`}
        >
          <ColorPicker
            initialSelectedColors={selectedColors} // URLdan olingan tanlangan ranglarni berish
            handleResult={handleColorFilterChange} // `selectedColors` state'ini yangilash uchun
          />
        </div>
      </div>
      {/* Bu yerga "Size" va "Dress Style" uchun akkordionlar qo'shiladi */}
      {/* 
      <div className="hr-line" />
      <div className="accordion">
        <div className="accordion-header" onClick={() => handleToggle("sizeToggler")}>
          <p>Size</p>
          <div className={`arrow ${togglers.sizeToggler ? "arrow-top" : "arrow-bottom"}`}>
            <ArrowRightIcon />
          </div>
        </div>
        <div className={`accordion-body size-accordion ${togglers.sizeToggler ? "open" : "hide"}`}>
          {/* SizePicker komponenti yoki oddiy tugmalar 
          </div>
      </div> 
      */}
      <div className="hr-line" />
      <button className="apply-filter-btn" onClick={handleApplyFiltersClick}>
        Apply Filter
      </button>
    </div>
  );
};

export default FilterSidebar;
