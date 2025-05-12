import React, { useState, useEffect } from "react"; // useEffect ni import qilamiz
import { colorsList } from "./constants"; // Konstantalar yo'lini tekshiring
import { TickIcon } from "../../../../../assets/icons"; // TickIcon yo'lini tekshiring

import "./ColorPicker.scss";

const ColorPicker = ({ handleResult, initialSelectedColors = [] }) => {
  // `initialSelectedColors` propidan boshlang'ich qiymatni olamiz
  const [selectedColors, setSelectedColors] = useState(initialSelectedColors);

  // Agar `initialSelectedColors` propi tashqaridan (URL o'qilganda FilterSidebar'dan)
  // o'zgarsa, `selectedColors` state'ini yangilaymiz.
  useEffect(() => {
    setSelectedColors(initialSelectedColors);
  }, [initialSelectedColors]);

  const handleColorClick = (colorObj) => {
    let newSelectedColors;
    if (selectedColors.includes(colorObj.code)) {
      // Agar rang allaqachon tanlangan bo'lsa, uni olib tashlaymiz
      newSelectedColors = selectedColors.filter((c) => c !== colorObj.code);
    } else {
      // Aks holda, uni tanlanganlar ro'yxatiga qo'shamiz
      newSelectedColors = [...selectedColors, colorObj.code];
    }
    setSelectedColors(newSelectedColors); // Lokal state'ni yangilaymiz
    handleResult(newSelectedColors); // Natijani yuqoriga (FilterSidebar'ga) uzatamiz
  };

  return (
    <div className="color-picker-container">
      {" "}
      {/* O'rab turuvchi divga class qo'shish yaxshi */}
      <div className="colors-wrapper">
        {colorsList.map((color) => {
          // `color` o'zgaruvchisi shadow qilmasligi uchun `(colorItem)`
          return (
            <div
              key={color.code} // UNIKAL KEY: har bir rang uchun `color.code` ni ishlatamiz
              onClick={() => handleColorClick(color)}
              className={`color-item ${
                selectedColors.includes(color.code) ? "selected" : ""
              }`}
              style={{
                backgroundColor: color.code,
                // Tanlangan rang uchun qo'shimcha stil (masalan, qalinroq border)
                // Bu SCSS da ham qilinishi mumkin .color-item.selected orqali
                // border: selectedColors.includes(color.code) ? '2px solid #333' : '2px solid rgba(0, 0, 0, 0.2)',
              }}
              title={color.name} // Foydalanuvchiga rang nomini ko'rsatish uchun
            >
              {selectedColors.includes(color.code) && ( // Faqat tanlangan bo'lsa TickIcon ni ko'rsatamiz
                <TickIcon
                  color={
                    color.name === "White" ||
                    color.code.toUpperCase() === "#FFFFFF"
                      ? "#000000" // Oq fonda qora "galochka"
                      : "#FFFFFF" // Boshqa ranglarda oq "galochka"
                  }
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ColorPicker;
