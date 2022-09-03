import ReactApexChart from 'react-apexcharts'


const AppChart = ({ series, options }) => {

    return (
        <div>
            
            <ReactApexChart options={options} series={series} type="candlestick" height={850} />
        </div>
    )
}

export default AppChart
