import HomeIcon from '../assets/icons/home.svg'
import TransactionsIcon from '../assets/icons/transactions.svg'
import PlatformsIcon from '../assets/icons/platforms.svg'
import ReportsIcon from '../assets/icons/reports.svg'

export default function Footer() {
  const IconWidth = 50;
  return (
    <footer className='fixed bottom-0 left-0 right-0 flex justify-around items-center p-4 bg-white rounded-2xl drop-shadow-2xl'>
      <div className='link-home'>
        <img src={HomeIcon} alt='home' width={IconWidth}/>
      </div>
      <div className='link-transactions'>
        <img src={TransactionsIcon} alt='transactions' width={IconWidth}/>
      </div>
      <div className='link-platforms'>
        <img src={PlatformsIcon} alt='platforms' width={IconWidth}/>
      </div>
      <div className='link-reports'>
        <img src={ReportsIcon} alt='reports' width={IconWidth}/>
      </div>
    </footer>
  )
}