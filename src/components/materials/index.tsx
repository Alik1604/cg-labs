"use client";
import React, { useState } from "react";
import Confetti from "react-confetti";

export default function Materials({ data }: any) {
  const [showConfetti, setShowConfetti] = useState(false);

  const handleAnswerClick = (isCorrect: any) => {
    if (isCorrect) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000); // Вимкнути конфеті через 5 секунд
    }
  };

  return (
    <>
      {showConfetti && <Confetti />}

      <div className="flex gap-4 flex-col">
        <h1 className="text-2xl font-bold">{data.title}</h1>
        {data.content.map((item: any, index: React.Key | null | undefined) => (
          <p key={index}>{item.paragraph}</p>
        ))}
        <img
          style={{
            width: 600,
            alignSelf: "center",
          }}
          src={data.img}
        />
        <div className="flex gap-4 flex-col">
          {data.tests.map((test: any, index: React.Key | null | undefined) => (
            <div key={index}>
              <p>{test.question}</p>
              <ul>
                {Object.entries(test.options).map(([key, value]: any, i) => (
                  <li
                    className="cursor-pointer mt-2"
                    key={i}
                    onClick={() =>
                      handleAnswerClick(key === test.correctAnswer)
                    }
                  >
                    {key}: {value}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
