import {ResponsiveLine, Serie} from '@nivo/line'
import React, {useEffect} from "react";

interface basicChartProps {
    symbol: string;
    data: any[];
}
const BasicChart: React.FC<basicChartProps> = (props) => {
    useEffect(() => {
        const controller = new AbortController();
        return () => controller.abort();
    }, [])

    const customTheme = {
        axis: {
            ticks: {
                text: {
                    fill: 'white'
                },
                legend: {
                    fill: 'white'
                }
            },
            legend: {
                text: {
                    fill: 'white',
                }
            }
        },
        legends: {
            text: {
                fill: 'black'
            }
        }
    };

    return (
        <ResponsiveLine
            tooltip={({ point }) => {
                return (
                    <div
                        style={{
                            background: 'white',
                            color: 'black',
                            padding: '9px 12px',
                            border: '1px solid #ccc',
                            borderRadius: '15px'
                        }}
                    >
                        <div>{point.data.yFormatted} USD</div>
                        <div>@ {point.data.xFormatted}</div>
                    </div>
                )
            }}
            theme={customTheme}
            data={props.data}
            margin={{ top: 10, right: 15, bottom: 35, left: 35 }}
            xFormat="time:%H:%M %p"
            xScale={{
                format: '%H:%M %p',
                precision: 'minute',
                type: 'time',
                useUTC: false
            }}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: true,
                reverse: false
            }}
            yFormat=" >-.2f"
            curve="linear"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                format: '%I %p',
                tickSize: 0,
                tickPadding: 5,
                tickRotation: 0,
                tickValues: 'every hour',
                legendOffset: 25,
                legend: props.symbol,
                legendPosition: 'middle'
            }}
            axisLeft={{
                tickSize: 0,
                tickPadding: 5,
                tickRotation: 0,
                tickValues: 7
            }}
            colors={['#00FF59']}
            crosshairType="cross"
            enablePoints={false}
            useMesh={true}
            legends={[]}
            motionConfig="default"
            enableArea
        />
    );
}

export default BasicChart;