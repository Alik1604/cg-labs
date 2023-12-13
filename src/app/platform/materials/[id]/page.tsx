import Materials from "@/components/materials";
import Navigation from "@/components/navigation";
import { promises as fs } from "fs";

export default async function Page({ params }: any) {
  const file = await fs.readFile(
    `${process.cwd()}/src/materials/${params.id}.json`,
    "utf8"
  );
  const data = JSON.parse(file);

  return (
    <main className="flex min-h-screen flex-row bg-white">
      <Navigation />

      <div className="flex min-h-screen w-[80%] bg-[#108A000D]  p-12 text-black">
        <Materials data={data} />
      </div>
    </main>
  );
}
