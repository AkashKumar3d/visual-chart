import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import "../graph.css"


import axios from 'axios';
const Graph = () => {
    const [intensity, setintensity] = useState(true)
    const [Likelihood, setlikelihood] = useState(false)
    const [Year, setyear] = useState(false)
    const [Country, setCountry] = useState(false)
    const [Topics, setTopics] = useState(false)
    const [Region, setRegion] = useState(false)
    const [sector, setsector] = useState(false)
    const [pest , setpest]=useState(false)
    const [chartData, setChartData] = useState([]);
    const [xAxisCategories, setXAxisCategories] = useState([]);
    const [mytitle, setmytitle] = useState("Intensity")
    const [loader, setloader] = useState(false)
    
    const options = {
        title: {
            text: mytitle
        },
        xAxis: {
            categories: xAxisCategories,
        },
        series: [{
            data: chartData
        }]
    };

    const fetchdata = async () => {
        const config = {
            method: "get",
            url: "https://apml-api-b1.glitch.me/api/v1/get/chartdata"
        }

        await axios(config).then((res) => {
            const result = res.data.data
            let newData = []
            let xdata = []
            setloader(false)
            for (var i = 0; i < result.length; i++) {
                const element = result[i].end_year;
                newData.push(result[i].end_year)
                xdata.push(result[i].intensity)  
                if (intensity == true) {
                    xdata.push(result[i].intensity)
                } else if (Likelihood == true) {
                    xdata.push(result[i].likelihood)
                } else if (Year == true) {
                    xdata.push(result[i].start_year)
                } else if (Country == true) {
                    xdata.push(result[i].country)
                }
                else if (Topics == true) {
                    xdata.push(result[i].topic)
                } else if (Region == true) {
                    xdata.push(result[i].region)
                }else if (sector == true) {
                    xdata.push(result[i].sector)
                }else if (pest == true) {
                    xdata.push(result[i].pestle)
                }
            }

            setChartData(newData)
            setXAxisCategories(xdata)
            console.log(res.data.data, "response")
        }).catch((err) => {
            setloader(false)
            console.log(err, "error here")
        })
    }

    console.log(chartData, "chartdata")
    const handleintensity = () => {
        setintensity(true)
        setlikelihood(false)
        setyear(false)
        setCountry(false)
        setTopics(false)
        setRegion(false)
        setmytitle("Intensity")
    }

    const handlelikehood = () => {
        setintensity(false)
        setlikelihood(true)
        setyear(false)
        setTopics(false)
        setRegion(false)
        setmytitle("Likelihood")
    }

    const handleyears = () => {
        setintensity(false)
        setlikelihood(false)
        setyear(true)
        setTopics(false)
        setRegion(false)
        setmytitle("Years")
    }

    const handlecountry = () => {
        setintensity(false)
        setlikelihood(false)
        setCountry(true)
        setyear(false)
        setTopics(false)
        setRegion(false)
        setmytitle("Country")
    }

    const handletopic = () => {
        setintensity(false)
        setlikelihood(false)
        setCountry(false)
        setyear(false)
        setTopics(true)
        setRegion(false)
        setmytitle("Topics")
    }
    const handleregion = () => {
        setintensity(false)
        setlikelihood(false)
        setCountry(false)
        setyear(false)
        setTopics(false)
        setRegion(true)
        setmytitle("Region")
    }

    // const handlecity = () => {
    //     setintensity(false)
    //     setlikelihood(false)
    //     setCountry(false)
    //     setyear(false)
    //     setTopics(false)
    //     setRegion(false)
    //     setCity(true)
    //     setmytitle("City")
    // }

    const handlesector =()=>{
        setintensity(false)
        setlikelihood(false)
        setCountry(false)
        setyear(false)
        setTopics(false)
        setRegion(false)
        setsector(true)
        setmytitle("Sector")
    }

    const handlepest = ()=>{
        setintensity(false)
        setlikelihood(false)
        setCountry(false)
        setyear(false)
        setTopics(false)
        setRegion(false)
        setsector(false)
        setpest(true)
        setmytitle("Pest")
    }
    useEffect(() => {
        fetchdata()
    }, [handleregion, handletopic,handlesector,handlepest, handlecountry, handleyears, handlelikehood, handleintensity])

   
    

    return (

        <div className="container">
            {
                loader ? ("") : (<HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />)
            }
            
            <div className="btn">
                <button onClick={handleintensity}>Intensity</button>
                <button onClick={handlelikehood}>Likelihood</button>
                <button onClick={handleyears}>Year</button>
                <button onClick={handlecountry}>Country</button>
                <button onClick={handletopic}>Topics</button>
                <button onClick={handleregion}>Region</button>
                <button onClick={handlesector}>sector </button>
                <button onClick={handlepest}>pestle </button>
                
            </div>
        </div>

    )
}

export default Graph