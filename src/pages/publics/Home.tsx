import { Header } from "../../components/navigation/Header";

export const Home = () => {
  return (
    <>
      <Header />
      <main className="bg-gray-100 py-10 min-h-screen bg-no-repeat bg-right-top lg:bg-hero lg:bg-home">
        <div className="max-w-5xl mx-auto mt-10">
          <div className="lg:w-1/2 lg:p-0 px-0 space-y-6">
            <h1 className="text-6xl font-black">
              Todas tus <span className="text-cyan-400">Redes Sociales </span>en
              un enlace
            </h1>

            <p className="text-xl text-slate-800">
              Unete a mas de 100 mil developers compartiendo sus redes Sociales,
              proyectos, portafolios, Github, Linkedin y mas en un solo enlace.
            </p>
          </div>
        </div>
      </main>
    </>
  );
};
