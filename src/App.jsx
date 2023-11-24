import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
// Icons
import { RiLineChartLine, RiHashtag } from "react-icons/ri";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function App() {
  const options = {
    title: {
      text: "Grafica de ejemplo",
    },
    series: [
      {
        data: [1, 2, 3],
      },
    ],
  };


  

  return (
    <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen">
      <Sidebar />
      <main className="lg:col-span-3 xl:col-span-5 bg-gray-100 p-8 h-[100vh] overflow-y-scroll">
        <Header />
        {/* Section 1 */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 mt-10 gap-8">
          {/* Card 1 */}
          <div className="bg-primary-100 p-8 rounded-xl text-gray-300 flex flex-col gap-6">
            <RiLineChartLine className="text-5xl" />
            <h4 className="text-2xl">Earnings</h4>
            <span className="text-5xl text-white">&euro; 8,350</span>
            <span className="py-1 px-3 bg-primary-300/80 rounded-full">
              + 10% since last month
            </span>
          </div>
          {/* Card 2 */}
          <div className="p-4 bg-white rounded-xl flex flex-col justify-between gap-4 drop-shadow-2xl">
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
          {/* Card 3 */}
          
        </section>
        {/* Section 2 */}
        <section className="grid grid-cols-1 md:grid-cols-1 mt-10 gap-8">
          <div>
            <h1 className="text-2xl font-bold mb-8">Movimientos recientes</h1>
            <div className="bg-white p-8 rounded-xl shadow-2xl mb-8 flex flex-col gap-8">
              {/* Card 1 */}
              <div className="grid grid-cols-1 xl:grid-cols-4 items-center gap-4 mb-4">
                <div className="col-span-2 flex items-center gap-4">
                  <img
                    src="https://m.media-amazon.com/images/I/71C5EkWVarL._AC_UF894,1000_QL80_.jpg"
                    className="w-14 h-14 object-cover rounded-xl"
                  />
                  <div>
                    <h3 className="font-bold">Elon sucks</h3>
                    <p className="text-gray-500">eX-Perience</p>
                  </div>
                </div>
                <div>
                  <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full font-medium">
                    Subida
                  </span>
                </div>
                <div>
                  <span className="font-bold">&euro; 1,200.87</span>
                </div>
              </div>
              {/* Card 2 */}
              <div className="grid grid-cols-1 xl:grid-cols-4 items-center gap-4 mb-4">
                <div className="col-span-2 flex items-center gap-4">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Presidente_Gustavo_Petro_Urrego.jpg"
                    className="w-14 h-14 object-cover rounded-xl"
                  />
                  <div>
                    <h3 className="font-bold">Gustavo pretiño</h3>
                    <p className="text-gray-500">Petro dolar inc.</p>
                  </div>
                </div>
                <div>
                  <span className="bg-red-100 text-red-800 py-1 px-3 rounded-full font-medium">
                    Bajada
                  </span>
                </div>
                <div>
                  <span className="font-bold">&euro; 12,998.88</span>
                </div>
              </div>
            </div>
            <div className="bg-primary-900 text-gray-300 p-8 rounded-xl shadow-2xl flex items-center justify-between flex-wrap xl:flex-nowrap gap-8">
              <div>
                <RiHashtag className="text-4xl -rotate-12" />
              </div>
              <div>
                <h5 className="font-bold text-white">Generar modelo predictivo</h5>
                <h5 className="text-center">O eso deberia</h5>
              </div>
              <div className="w-full xl:w-auto">
                <button className="bg-primary-100 py-2 px-6 rounded-xl text-white w-full">
                  Iniciar
                </button>
              </div>
            </div>
          </div>
          
        </section>
      </main>
    </div>
  );
}

export default App;
