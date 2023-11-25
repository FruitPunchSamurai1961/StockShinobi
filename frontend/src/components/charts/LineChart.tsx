import React, {useState} from "react";
import ReactApexChart from "react-apexcharts";
import {ApexOptions} from "apexcharts";
import {Box, Text, useColorMode} from "@chakra-ui/react";


const LineChart = () => {
    const {colorMode} = useColorMode();

    //TEMP - > NEED TO CHANGE TO REDUX
    const [toolbarStatus, setToolBarStatus] = useState(false);

    const lineChartData: ApexAxisChartSeries = [
        {
            name: "Mobile apps",
            data: [50, 40, 300, 220, 500, 250, 400, 230, 500, 0, 0],
        },
        {
            name: "Websites",
            data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
        },
    ];

    const lineChartOptions: ApexOptions = {
        chart: {
            toolbar: {
                show: toolbarStatus,
                tools: {
                    download: false
                }
            },
            events: {
                mouseMove: () => setToolBarStatus(true),
                mouseLeave: () => setToolBarStatus(false),
            },
        },
        tooltip: {
            theme: "dark",
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
        },
        xaxis: {
            categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ],
            axisTicks: {
                show: false
            },
            axisBorder: {
                show: false,
            },
            labels: {
                style: {
                    colors: colorMode === "dark" ? "#fff" : "#333",
                    fontSize: "12px",
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: colorMode === "dark" ? "#fff" : "#333",
                    fontSize: "12px",
                },
            },
        },
        legend: {
            show: false,
        },
        grid: {
            strokeDashArray: 5,
        },
        fill: {
            type: "gradient",
            gradient: {
                shade: "light",
                type: "vertical",
                shadeIntensity: 0.5,
                inverseColors: true,
                opacityFrom: 0.8,
                opacityTo: 0,
                stops: [],
            },
            colors: ["#fff", "#3182CE"],
        },
        colors: ["#fff", "#3182CE"],
    };


    return (
        <Box>
            <Text fontSize="xl" fontWeight="bold" mb={4}>
                Showing Stock Price for:
            </Text>
            <ReactApexChart
                options={lineChartOptions}
                series={lineChartData}
                type="area"
                width="100%"
                height="100%"
            />
        </Box>

    );
}

export default LineChart;
