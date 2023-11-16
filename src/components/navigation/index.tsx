import React from "react";
import Image from "next/image";

function Navigation() {
  return (
    <div className="flex min-h-screen w-[20%] flex-col p-4 justify-between">
      <div className="flex flex-col space-y-4">
        <button className="bg-white p-2  text-[#108A00] rounded-xl border border-[#108A00]">
          Student for student
        </button>
        <button className="bg-[#108A00] p-4 flex flex-row gap-3  rounded-xl border border-[#108A00] items-center">
          <Image src="/icons/fractal-1.svg" alt="" width={24} height={24} />
          <p className="text-white">Генератор фракталів</p>
        </button>
        <button className="bg-white p-4 flex flex-row gap-3 text-white rounded-xl border border-[#108A00] items-center">
          <Image src="/icons/image.svg" alt="" width={24} height={24} />
          <p className="text-black">Редактор картинок</p>
        </button>
        <button className="bg-white p-4 flex flex-row gap-3 text-white rounded-xl border border-[#108A00] items-center">
          <Image src="/icons/transform.svg" alt="" width={24} height={24} />
          <p className="text-black">Ручні зображення</p>
        </button>
        <button className="bg-white p-4 flex flex-row gap-3 text-white rounded-xl border border-[#108A00] items-center">
          <Image src="/icons/materials.svg" alt="" width={24} height={24} />
          <p className="text-black">Навчальні матеріали</p>
        </button>
      </div>

      <div className="mt-auto flex items-center">
        <Image
          src="/anna.png"
          alt=""
          width={48}
          height={32}
          className="rounded-[50%] h-[48px] w-[48px]"
        />
        <div className="ml-4">
          <p className="">Анна Гук</p>
          <p className="font-light">anna.guk@gmail.com</p>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
