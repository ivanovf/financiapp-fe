import { PropTypes } from 'prop-types';
import DonutChart from 'react-svg-donut-chart'

export default function DonutBox({transactions, trm}) {

  const { riskTotal, safetyTotal } = transactions.reduce(
    (totals, { currency, value, box }) => {
      const toCop = currency === 'USD' ? value * trm : value;
      return {
        riskTotal: box === 'RISK' ? totals.riskTotal + toCop : totals.riskTotal,
        safetyTotal: box !== 'RISK' ? totals.safetyTotal + toCop : totals.safetyTotal,
      };
    },
    { riskTotal: 0, safetyTotal: 0 }
  );

  const total = riskTotal + safetyTotal

  const riskGrades = Math.round(riskTotal * 100 / total)
  const safetyGrades = 180 - riskGrades

  const riskPorcentage = Math.round(riskGrades * 100 / 180)
  const safetyPorcentage =  Math.round(safetyGrades * 100 / 180)

  const dataPie = [
    {value: riskGrades, stroke: "#22594e"},
    {value: safetyGrades, stroke: "#a1d9ce"},
  ]
  return (
    <>
      <DonutChart data={dataPie} width="200" heigth="200" className="m-auto" />
      <div className='h-14 w-full text-center'>
        <span className={`px-4 py-2 m-2 bg-[${dataPie[0].stroke}] text-white`}>Risk {riskPorcentage}%</span>
        <span className={`px-4 py-2 m-2 bg-[${dataPie[1].stroke}]`}>Safety {safetyPorcentage}%</span>
      </div>
    </>
  )
}

DonutBox.propTypes = {
  transactions: PropTypes.array.isRequired,
  trm: PropTypes.number.isRequired,
}
