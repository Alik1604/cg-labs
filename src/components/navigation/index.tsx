import React from "react";
import Image from "next/image";
import Link from "next/link";

function Navigation() {
  return (
    <div className="flex min-h-screen w-[20%] flex-col p-4 justify-between">
      <div className="flex flex-col space-y-4">
        <button className="bg-white p-2  text-[#108A00] rounded-xl border border-[#108A00]">
          Student for student
        </button>
        <Link href="/" className="flex">
          <button className="bg-white p-4 flex flex-grow flex-row gap-3 text-white rounded-xl border border-[#108A00] items-center">
            <Image src="/icons/fractal.svg" alt="" width={24} height={24} />
            <p className="text-black">Генератор фракталів</p>
          </button>
        </Link>
        <Link href="/platform/images" className="flex">
          <button className="bg-white p-4 flex flex-grow flex-row gap-3 text-white rounded-xl border border-[#108A00] items-center">
            <Image src="/icons/image.svg" alt="" width={24} height={24} />
            <p className="text-black">Редактор картинок</p>
          </button>
        </Link>
        <Link href="/platform/transformations" className="flex">
          <button className="bg-white p-4 flex flex-grow flex-row gap-3 text-white rounded-xl border border-[#108A00] items-center">
            <Image src="/icons/transform.svg" alt="" width={24} height={24} />
            <p className="text-black">Афінні перетворення</p>
          </button>
        </Link>
        <Link href="/platform/materials" className="flex">
          <button className="bg-white p-4 flex flex-grow flex-row gap-3 text-white rounded-xl border border-[#108A00] items-center">
            <Image src="/icons/materials.svg" alt="" width={24} height={24} />
            <p className="text-black">Навчальні матеріали</p>
          </button>
        </Link>
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
