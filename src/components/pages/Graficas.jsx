import UnemploymentMonitor from "../UnemploymentMonitor";
import FinancialMonitor from "../Monitor";
import InflationMonitor from "../InflationMonitor";
import DebtMonitor from "../DebtMonitor";
import FinancialChart from "../Dolar"
import StockHistoryChart from "../Acciones"

const Graficas = () => {
    return ( 
        <div className="h-full w-full bg-base overflow-y-auto">
         <section className="grid grid-cols-2  grid-rows-2 p-10 gap-8">
          
          <div className="p-4 bg-white border rounded-xl drop-shadow-2xl">
            <InflationMonitor />
          </div>
          <div className="p-4 bg-white rounded-xl drop-shadow-2xl">
            <UnemploymentMonitor />
          </div>
          <div className="p-4 bg-white rounded-xl drop-shadow-2xl">
            <FinancialMonitor />
          </div>
          <div className="p-4 bg-white rounded-xl drop-shadow-2xl">
            <DebtMonitor />
          </div>
         

        </section>


        
        </div>
     );
}
 
export default Graficas;