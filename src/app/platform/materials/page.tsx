"use client";

import React, { useState } from "react";
import Navigation from "@/components/navigation";
import Link from "next/link";
import ChatComponent from "@/components/chat";

export default function EducationalMaterials() {
  const [materials, setMaterials] = useState([
    {
      id: 1,
      title: "Чарівний світ фракталів",
      description:
        "Фрактали - це не просто малюнки, це цілі всесвіти, що складаються з однакових частин, які повторюються на різних масштабах. Як калейдоскоп, фрактали продовжують дивувати нас своєю безкінечною складністю. Чи знаєте ви, що сніжинка - це теж фрактал? Або берегова лінія, яка здається такою різною, коли ви дивитесь на неї зблизька чи здалека.",
    },
    {
      id: 2,
      title: "Фрактали у математиці",
      description:
        "У світі чисел фрактали мають особливе місце. Вони створюються за допомогою математичних формул і повторюваних розрахунків. Дивовижне в тому, що не важливо, як близько ви подивитесь на фрактал, ви завжди побачите однакові форми. Фрактали мають нескінченну кількість рівнів деталізації, вони ніколи не стають простішими чи менш цікавими!",
    },
    {
      id: 3,
      title: "Кольорова палітра",
      description:
        "Кольорова палітра - це як музика для очей. Вона допомагає художникам і дизайнерам вибирати ідеальні кольори для своїх творів. Є багато різних кольорових схем: деякі кольори заспокоюють, інші - надихають або навіть роблять нас щасливішими. Чи ви знали, що кожен колір викликає певні емоції та відчуття?",
    },
    {
      id: 4,
      title: "Веселка кольорів",
      description:
        "Веселка - це чарівний міст між дощем і сонцем. Вона показує нам всі кольори, які є у світлі. Червоний, помаранчевий, жовтий, зелений, блакитний, синій і фіолетовий - кожен колір веселки має свою довжину хвилі. Коли дощові краплі розсіюють сонячне світло, вони працюють як призма, що відкриває нам цю красу.",
    },
    {
      id: 5,
      title: "Афінні перетворення у графіці",
      description:
        "Афінні перетворення - це особливий вид чарівництва в світі математики та графіки, який дозволяє нам змінювати об'єкти. Ми можемо збільшувати чи зменшувати фігури, обертати їх на різні кути, переміщати у просторі, і навіть нахиляти. Ці перетворення є основою для створення анімацій та відеоігор!",
    },
    {
      id: 6,
      title: "Магія перетворень",
      description:
        "З афінними перетвореннями ми можемо робити дивовижні речі з картинками та фігурами. Хочете побачити, як ваш улюблений герой мультфільму танцює або складний механізм працює? За допомогою афінних перетворень ми можемо змусити будь-яку картинку рухатися, змінювати її розмір або перевернути зверху вниз!",
    },
  ]);

  return (
    <main className="flex min-h-screen flex-row bg-white">
      <Navigation />
      <ChatComponent />
      <div className="flex min-h-screen w-[80%] bg-[#108A000D]  p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {materials.map((material) => (
            <EducationalMaterial key={material.title} {...material} />
          ))}
        </div>
      </div>
    </main>
  );
}

const EducationalMaterial = ({ id, title, description }: any) => {
  return (
    <Link
      className="p-4 max-w-sm rounded-lg border-2 border-green-500 shadow-md bg-green-50"
      href={"/platform/materials/" + id}
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
        {title}
      </h5>
      <p className="mb-3 font-normal text-gray-700">{description}</p>
      <Link
        href={"/platform/materials/" + id}
        className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-green-700 bg-green-200 rounded-lg hover:bg-green-300 focus:ring-4 focus:ring-green-500"
      >
        Дізнатися більше
      </Link>
    </Link>
  );
};
