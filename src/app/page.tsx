import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50/50 flex items-center justify-center">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:6rem_4rem]" />
      <section>
        <header>
          <h1 className="text-4xl text-center font-bold">Ai Agent Assistant</h1>
          <p className="text-xl max-w-2xl mt-2 text-center">
            Meet your new AI chat companion that goes beyond conversation - it can actually get things done!
          </p>
          <p className="text-neutral-500 mt-2 text-center">{`Powered by IBM's WxTools& your favorite LLMs`}</p>
        </header>
        <div className="flex justify-center mt-4">
          <SignedIn>
            <Link href={"/dashboard"}>
              <Button>
                Dashboard
                <ArrowRight />
              </Button>
            </Link>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal" fallbackRedirectUrl={"/dashboard"} forceRedirectUrl={"/dashboard"}>
              <Button color="green">
                Sign In
                <ArrowRight />
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </section>
    </main>
  );
}
