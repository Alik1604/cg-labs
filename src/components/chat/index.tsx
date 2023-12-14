import React, { useState } from "react";
import "./ChatComponent.css"; // Переконайтеся, що ви створили цей файл CSS
import { MdCancel } from "react-icons/md";
import { BsChatLeftText } from "react-icons/bs";
import Link from "next/link";
import { FaHandsHelping } from "react-icons/fa";

const ChatComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chat-container">
      {isOpen && (
        <div className="chat-box">
          <div className="p-4 max-w-sm rounded-lg border-2 border-green-200 shadow-md bg-green-50 mt-4">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
              Як користуватись генератором фракталів?
            </h5>
            <p className="mb-3 font-normal text-gray-700">
              1. Оберіть тип фракталу і палітру <br /> 2. Пограйте з слайдерами
              нижче, щоб роздивитись фрактал
            </p>
          </div>
          <div className="p-4 max-w-sm rounded-lg border-2 border-green-200 shadow-md bg-green-50 mt-4">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
              Як зберегти зображення?
            </h5>
            <p className="mb-3 font-normal text-gray-700">
              1. Натисніть на кнопку "Зберегти фрактал"
            </p>
          </div>
          <div className="p-4 max-w-sm rounded-lg border-2 border-green-200 shadow-md bg-green-50 mt-4">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
              Як користуватись редактором картинок?
            </h5>
            <p className="mb-3 font-normal text-gray-700">
              1. Оберіть картинку яка є у вас на пристрої <br /> 2. Наведіть на
              картинку і клацніть і протяніть в бік. Тепер ви працюєте з
              частиною зображення.
              <br /> 3. Пограйте з слайдерами щоб переглянути що відбувається з
              зображенням
            </p>
          </div>
          <div className="p-4 max-w-sm rounded-lg border-2 border-green-200 shadow-md bg-green-50 mt-4">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
              Як користуватись aфінними перетвореннями?
            </h5>
            <p className="mb-3 font-normal text-gray-700">
              1. Ведіть значення у поля "Зміщення" <br /> 2. Натисніть на кнопку
              "Почати рух"
              <br /> 3. Спробуйте змінити інші поля і поспостерігайте за змінами
            </p>
          </div>
        </div>
      )}
      <button className="chat-toggle-button" onClick={toggleChat}>
        {isOpen ? <MdCancel /> : <FaHandsHelping />}
      </button>
    </div>
  );
};

export default ChatComponent;
