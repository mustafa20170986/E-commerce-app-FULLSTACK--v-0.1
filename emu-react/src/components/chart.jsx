import {Chart as CHARTJS,CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend} from 'chart.js'
import {Bar} from "react-chartjs-2"
function Chart(){
    CHARTJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    )
    
        const data={
            labels:["emu","tabassum","happy","fatema","arifa","Suborna"],
        
        datasets:[{
            label:"Affetions",
            data:[108,95,102,101,190,100],
            backgroundColor:'royalblue'
        }]
    }

    const option ={
        responsive:true,
        scales:{
            y:{
                beginingAtZero:true
            }
        }
    
    }
    return(
        <div className='h-50 w-1/2'>
            <Bar data={data} options={option}/>
        </div>
    )
}
export default Chart

