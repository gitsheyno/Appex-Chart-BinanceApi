import AppChart from './AppChart';
import { useState, useEffect } from 'react';
import './App.css';


const options = {
  chart: {
    type: 'candlestick',
    height: 500
  },
  title: {
    text: 'CandleStick Chart',
    align: 'left'
  },
  xaxis: {
    type: 'datetime'
  },
  yaxis: {
    tooltip: {
      enabled: true
    }
  }
}

function App() {
  const [dataa, setDataa] = useState([{ data: [] }])
  const [timeFrame, setTimeFrame] = useState('1h')
  const handleMap = (input) => {
    return (
      input.map(el => (
        {
          x: new Date(el[0]),
          y: [el[1], el[2], el[3], el[4]]
        }
      )
      ))
  }
  useEffect(() => {
    const fetchData = async (time) => {
      const res = await fetch(`https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=${time}`)
      const jsonData = await res.json()
      const d = handleMap(jsonData)
      const x = [{ data: d }]
      setDataa(x)
    }
    fetchData(timeFrame)
  }, [timeFrame])
  const handleTimeFrame = (e) => {

    setTimeFrame(e.target.innerText)
  }

  return (
    <div className="App">
      <div className='btns'>
        <button onClick={handleTimeFrame}>15m</button>
        <button onClick={handleTimeFrame}>30m</button>
        <button onClick={handleTimeFrame}>1h</button>
        <button onClick={handleTimeFrame}>2h</button>
        <button onClick={handleTimeFrame}>3h</button>
        <button onClick={handleTimeFrame}>4h</button>
      </div>
      <AppChart
        series={dataa}
        options={options}
      />
    </div>
  );
}

export default App;
