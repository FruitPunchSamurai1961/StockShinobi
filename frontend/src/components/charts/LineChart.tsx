import React from "react";
import ReactApexChart from "react-apexcharts";
import {ApexOptions} from "apexcharts";
import {Box, Button, Stack, Text, useColorMode} from "@chakra-ui/react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {selectionOptions} from "../../ts/enums";
import {setData, setSelection} from "../../redux/charts/lineChartSlice";
import {LineChartProps} from "../../ts/interfaces";


const LineChart: React.FC<LineChartProps> = ({
                                                 oneYearData,
                                                 ytdData,
                                                 allData,
                                                 sixMonthData,
                                                 oneMonthData,
                                                 name
                                             }) => {
    const {colorMode} = useColorMode();
    const lineChartState = useAppSelector((state) => state.lineChart);
    const dispatch = useAppDispatch();


    const lineChartData: ApexAxisChartSeries = [{
        name: name,
        data: lineChartState.data.length === 0 ? oneYearData : lineChartState.data,
    }];

    const updateData = (newSelectionValue: selectionOptions) => {
        dispatch(setSelection({newSelectionValue: newSelectionValue}));

        switch (newSelectionValue) {
            case selectionOptions.ONE_YEAR:
                dispatch(setData({newDataValue: oneYearData}));
                break
            case selectionOptions.ONE_MONTH:
                dispatch(setData({newDataValue: oneMonthData}));
                break
            case selectionOptions.SIX_MONTHS:
                dispatch(setData({newDataValue: sixMonthData}));
                break
            case selectionOptions.YTD:
                dispatch(setData({newDataValue: ytdData}));
                break
            case selectionOptions.ALL:
                dispatch(setData({newDataValue: allData}));
                break
            default:
        }
    }

    const lineChartOptions: ApexOptions = {
        chart: {
            id: 'area-datetime',
            type: 'area',
            toolbar: {
                show: false,
                tools: {
                    download: false
                }
            },
            zoom: {
                autoScaleYaxis: true,
            }
        },
        tooltip: {
            theme: "dark",
            x: {
                format: 'dd MMM yyyy'
            }
        },
        dataLabels: {
            enabled: false,
        },
        markers: {
            size: 0,
            shape: "rect"
        },
        xaxis: {
            type: 'datetime',
            min: lineChartState.selection,
            max: new Date().getTime(),
            labels: {
                show: true,
                style: {
                    colors: colorMode === "dark" ? "#fff" : "#333",
                    fontSize: "12px",
                },
            },
        },
        yaxis: {
            labels: {
                show: true,
                style: {
                    colors: colorMode === "dark" ? "#fff" : "#333",
                    fontSize: "12px",
                },
            },
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 100]
            },
            colors: ["#3182CE", "#fff"]
        },
        colors: ["#3182CE", "#fff"],
    };


    return (
        <Box>

            <Text fontSize="xl" fontWeight="bold" mb={4}>
                Showing Stock Price for: {name}
            </Text>
            <Stack spacing={4} direction='row' align='center'>
                <Button colorScheme='teal' size='xs'
                        variant={lineChartState.selection === selectionOptions.ONE_MONTH ? 'solid' : 'outline'}
                        onClick={() => updateData(selectionOptions.ONE_MONTH)}>
                    1M
                </Button>
                <Button colorScheme='teal' size='xs'
                        variant={lineChartState.selection === selectionOptions.SIX_MONTHS ? 'solid' : 'outline'}
                        onClick={() => updateData(selectionOptions.SIX_MONTHS)}
                >
                    6M
                </Button>
                <Button colorScheme='teal' size='xs'
                        variant={lineChartState.selection === selectionOptions.ONE_YEAR ? 'solid' : 'outline'}
                        onClick={() => updateData(selectionOptions.ONE_YEAR)}
                >
                    1Y
                </Button>
                <Button colorScheme='teal' size='xs'
                        variant={lineChartState.selection === selectionOptions.YTD ? 'solid' : 'outline'}
                        onClick={() => updateData(selectionOptions.YTD)}
                >
                    YTD
                </Button>
                <Button colorScheme='teal' size='xs'
                        variant={lineChartState.selection === selectionOptions.ALL ? 'solid' : 'outline'}
                        onClick={() => updateData(selectionOptions.ALL)}
                >
                    ALL
                </Button>
            </Stack>
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
