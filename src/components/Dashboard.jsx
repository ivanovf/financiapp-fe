import DonutChart from 'react-svg-donut-chart'
import PlatformsSlide from './PlatformsSlide'
import Transactions from './Transactions'
import AddTransactionLink from './UI/atoms/AddTransactionLink'
import Header from './Header'
import Footer from './Footer'

const dataPie = [
  {value: 100, stroke: "#22594e"},


  {value: 80, stroke: "#a1d9ce"},
]

function Dashboard() {

  return (
    <>
      <Header />
      <section className="p-2 bg-slate-50">
        <DonutChart data={dataPie} width="200" heigth="200" className="m-auto" />
        <PlatformsSlide />
        <Transactions />
        <AddTransactionLink />
        <div className='h-12 w-full'></div>
      </section>
      <Footer />
    </>
  )
}

export default Dashboard;
