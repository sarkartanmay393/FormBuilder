import { Button } from "@/components/ui/button";
import { getNextFormDataId } from "@/lib/server-actions";
import Link from "next/link";

export default async function Home() {
  const possibleNextId = await getNextFormDataId();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h3 className="font-serif">hi peerlist 🙌🏼</h3>
      <div className="flex flex-col gap-2">
      <Button size='sm' className="bg-green-500 hover:bg-green-600 rounded-xl gap-1 text-white font-semibold border-green-500 px-[14px] pr-[16px] py-[6px] h-[32px]">
        <Link href={`/draft/${possibleNextId}`}>Create a form</Link>
      </Button>
      <Button size='sm' variant='link'>
        <Link href={`/records`}>Submissions Record</Link>
      </Button>
      </div>
    </div>
  );
}
