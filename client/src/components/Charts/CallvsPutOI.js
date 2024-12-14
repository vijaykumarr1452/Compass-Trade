import React from "react";
import { useStateContext } from "../../Contexts/ContextProvider";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);


const  CallvsPutOI=({indexData,name})=> {

  const { isMatch } = useStateContext();
  
    let timearr = [];

    for (let i = 0; i < indexData?.length; i++) {
      let chopptime = indexData[i]?.timestamp.slice(12, 17);
      timearr.push(chopptime);
    }


   
const data = {
    labels: timearr,
    datasets: [
      {
        label: "CE OI",
        data:indexData?.map((x)=>x?.totPEchg-x?.totCEchg),
        fill: false,
        borderColor: ["#e76d67"],
        backgroundColor:  ["#e76d67"],
        pointRadius:1,
        pointHoverRadius:6,

        
      },
      {
        label: "PE OI",
        data:indexData?.map((x)=>x?.totPEchg-x?.totCEchg),
        fill: false,
        borderColor: ["#40b0b2"],
        backgroundColor:   ["#40b0b2"],
        pointRadius:1,
        pointHoverRadius:6,
      
      }
    ]
  };

  const options = {
    //switch chart axis on basis of media screen size
    indexAxis: "x",
    interaction: {
      mode: "index",
      intersect: false,
    },
    responsive: true,

    maintainAspectRation: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },

      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },

    legend: {
      labels: {
        fontSize: 26,
      },
    },
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false
     },
     hover: {
        mode: 'index',
        intersect: false
     },
    }
  };

  return (
    <div >
        <span>{name} Call vs Put OI</span>
      <Line data={data} 
      width={isMatch? 380:800}
      height={isMatch? 200:300}
      options={options}
      plugins={ [{
        afterDraw: chart => {
            if (chart.tooltip?._active?.length) {
                let x = chart.tooltip._active[0].element.x;
                let yAxis = chart.scales.y;
                let ctx = chart.ctx;
                ctx.save();
                ctx.beginPath();
                ctx.setLineDash([5,7]);
                ctx.moveTo(x, yAxis.top);
                ctx.lineTo(x, yAxis.bottom);
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'grey';
                ctx.stroke();
                ctx.restore();
            }
        }
    }]}/>
    </div>
  );
}

export default  CallvsPutOI
