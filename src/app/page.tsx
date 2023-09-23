import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <canvas
        style={{
          width: "600px",
          height: "600px",
          border: "1px solid black",
        }}
      ></canvas>
    </main>
  );
}
