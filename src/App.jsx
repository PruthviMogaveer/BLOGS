import { Footer } from "./components";

function App() {

  console.log(import.meta.env.VITE_APPWRITE_URL);
  return (
    <div className=" flex-col">
      <div className="flex flex-wrap relative z-0">
        <div className="absolute top-[-9rem] left-[-9rem] w-[55rem] h-[30rem] rounded-[80px] rotate-[10deg] bg-yellow z-0 max-lg:left-[-30px] max-lg:w-[75rem]"></div>
        <div className="absolute top-[-9rem] right-[-10rem] w-[38rem] h-[40rem] rounded-[80px] rotate-[10deg] bg-yellow z-0 max-lg:hidden"></div>
      </div>
      <div className="min-h-screen">hhhh</div>

      <div className="relative mt-auto z-10 min-w-full">
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App
