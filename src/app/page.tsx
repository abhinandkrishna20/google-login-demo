
import { Suspense } from "react";
import Image from "next/image";
import { auth, signIn, signOut } from "../auth";

export default function Home() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center">
          <p>Loading Google Login Demo...</p>
        </main>
      }
    >
      <HomeContent />
    </Suspense>
  );
}

async function HomeContent() {
  const session = await auth();
  const user = session?.user;

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        <div className="mb-6 text-4xl">🔐</div>

        <h1 className="text-3xl font-bold text-slate-900">
          Google Login Demo
        </h1>

        <p className="mt-3 text-slate-500">
          A simple Next.js authentication app
        </p>

        {user ? (
          <div className="mt-8 space-y-3">
            {user.image && (
              <Image
                src={user.image}
                alt="Profile picture"
                width={80}
                height={80}
                className="mx-auto rounded-full"
                unoptimized
              />
            )}

            <h2 className="mt-4 text-xl font-semibold text-slate-900">
              Welcome, {user.name ?? "User"}!
            </h2>

            <p className="mt-2 break-words text-slate-500">
              {user.email}
            </p>

            <form
              className="mt-6"
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button className="w-full rounded-lg bg-red-600 px-4 py-3 font-medium text-white hover:bg-red-700">
                Sign out
              </button>
            </form>

             <form
    action={async () => {
      "use server";
      await signIn("facebook");
    }}
  >
    <button className="w-full rounded-lg bg-blue-600 p-3 text-white">
      Continue with Facebook
    </button>
  </form>

             <form
    action={async () => {
      "use server";
      await signIn("twitter");
    }}
  >
    <button className="w-full rounded-lg bg-blue-400 p-3 text-white">
      Continue with Twitter
    </button>
  </form>
          </div>
        ) : (
          <form
            className="mt-8"
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-300 px-4 py-3 font-medium text-slate-800 hover:bg-slate-50">
              <span className="text-xl font-bold text-blue-600">G</span>
              Sign in with Google
            </button>
          </form>
        )}

        <p className="mt-8 text-xs text-slate-400">
          Demo application · Powered by Auth.js
        </p>
      </section>
    </main>
  );
}
