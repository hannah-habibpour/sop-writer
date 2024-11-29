import Link from "next/link";

export default function AppPage() {
  return (
    <div className="h-svh text-center py-[66px] md:py-[88px] md:px-[66px]">
      <div className="text-[22px] font-bold mb-[22px]">SOP Writer</div>
      <div className="flex flex-col gap-[10px]">
        <div>
          Welcome to the SOP (Statement of Purpose) generator, designed
          specifically for international students applying for a Canadian study
          permit.
        </div>
        <div>Simply answer the questions briefly yet thoroughly.</div>
        <div>
          The more detailed and precise your answers, the more tailored and
          relevant your generated SOP will be.
        </div>
      </div>
      <div className="mt-[42px] md:mt-[52px]">
        <Link
          href="/form"
          className="bg-[#008000] text-[20px] text-white px-[32px] py-[12px] rounded-md"
        >
          Start
        </Link>
      </div>
    </div>
  );
}
