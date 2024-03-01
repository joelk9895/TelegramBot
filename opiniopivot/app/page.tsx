import { ThemeLogo } from "./Components/Logo";

export default function Home() {
  return (
    <main className="flex flex-col h-screen w-100 justify-start items-center relative">
      <ThemeLogo />

      <h2 className="font-black text-6xl">
        Make your product customer centric
      </h2>
      <p className="text-xl text-gray-600 m-1">
        We help you to understand your customers and build better products
      </p>
      <div className="cta relative w-full flex justify-center items-center">
        <button className="p-10 text-lg">Login</button>
        <button className="p-2 rounded-lg px-5 py-2 bg-black text-white text-lg">
          Start Free Trial
        </button>
      </div>
    </main>
  );
}
