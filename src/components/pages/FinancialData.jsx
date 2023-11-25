import UnemploymentMonitor from "../UnemploymentMonitor";
import FinancialMonitor from "../Monitor";
import InflationMonitor from "../InflationMonitor";
import DebtMonitor from "../DebtMonitor";
import FinancialChart from "../Dolar"
import StockHistoryChart from "../Acciones"

const FinancialData = () => {
    return ( 
        <div className="h-full w-full overflow-y-auto">
         <section className="grid grid-cols-1 bg-gray-200 h-full place-content-center p-10 gap-8">
          <div className="p-4 bg-white rounded-xl drop-shadow-2xl">
            <FinancialChart />
          </div>
        </section> 
        </div>
     );
}
 
export default FinancialData;