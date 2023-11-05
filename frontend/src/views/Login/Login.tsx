import React, {useEffect, useRef, useState} from 'react';
import {Stars} from "../../assets/animation/starsAnimation";
import './Login.css';
import {useNavigate} from "react-router";
import {API_BASE_URL, ACCESS_TOKEN, AV_API_KEY} from "../../utils/authConstants";
import BasicChart from "../../components/charts/BasicChart";
import {cookies} from "../../App";
const Login = () => {

    const initVelocity = useRef(1);
    const transitVelocity = useRef(1.05);

    useEffect(() => {
        const stars = new Stars({ initVelocity, transitVelocity });
    }, [initVelocity, transitVelocity]);

    const stopAnimation = () => {
        setTimeout(() => {
            initVelocity.current = 0;
            transitVelocity.current = 0.99;
        }, 800);
    };

    const [loggedIn, setLoggedIn] = useState(false);
    const [loginStatus, setLoginStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        stopAnimation();
        setIsLoading(true);
        try {
            const response = await fetch(API_BASE_URL + '/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.status === 200) {
                setLoginStatus('Login successful');
                const responseJson = await response.json();
                const token = responseJson.accessToken;
                cookies.set(ACCESS_TOKEN, token, {
                    secure: true,
                    maxAge: 2592000
                });
                navigate("/query");
            } else {
                setLoginStatus('Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
            setLoginStatus('An error occurred during login');
        } finally {
            setIsLoading(false);
        }
    };

    const [chart, setChart] = useState({
        dataA: [] as any[],
        symbolA: '',
        dataB: [] as any[],
        symbolB: ''
    });
    const topCompanies = ['AAPL', 'GOOG', 'MSFT', 'TSLA', 'AMZN', 'NVDA', 'KO', 'JPM', 'META', 'PEP', 'COST', 'NFLX'];

    useEffect(() => {
        const getChart = async (ticker: string) => {
            try {
                const response = await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + ticker + '&interval=5min&apikey=' + AV_API_KEY, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.status === 200) {
                    const result = await response.json();
                    let nivoData = []
                    for (let key in result['Time Series (5min)']) {
                        nivoData.unshift({
                            x: new Date(key).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                            y: result['Time Series (5min)'][key]['4. close']
                        });
                    }
                    const newData: any[] = [];
                    newData.push({
                        "id": "stock",
                        "color": "hsl(195, 70%, 50%)",
                        "data": nivoData
                    });
                    return newData;
                } else {
                    console.log('Failed to retrieve stock info');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        const tickers: string[] = [];
        const clone = topCompanies.slice();
        for (let i = 0; i < 2; i++) {
            const randomIndex = Math.floor(Math.random() * clone.length);
            const randomElement = clone.splice(randomIndex, 1)[0];
            tickers.push(randomElement);
        }
        getChart(tickers[0]).then(chartData => {
            if (chartData) {
                console.log(chartData);
                setChart(prevChart => ({
                    ...prevChart,
                    dataA: chartData,
                    symbolA: tickers[0]
                }));
            }
        });

        getChart(tickers[1]).then(chartData => {
            if (chartData) {
                setChart(prevChart => ({
                    ...prevChart,
                    dataB: chartData,
                    symbolB: tickers[1]
                }));
            }
        });

    }, []);

    return (
        <div className='container'>
            <div className="sidebar">
                <div className="sidebar-body">
                    <h4> Finance, reimagined. </h4>
                    <p> A free, lightweight, and easy-to-use platform for all of your stock management needs.</p>
                    <p>Take advantage of our curated global economics newsfeed, trend-following algorithms, and performance analysis tools to simplify your investment strategy.</p>
                </div>
                <h5> Random symbols of the universe </h5>
                <div className="sidebar-charts">
                    <BasicChart data={chart.dataA} symbol={chart.symbolA}></BasicChart>
                </div>
                <div className="sidebar-charts">
                    <BasicChart data={chart.dataB} symbol={chart.symbolB}></BasicChart>
                </div>
            </div>
            <div className="main">
                <div className="title">
                    <h1>Supernova.</h1>
                    <h3>A new way to track your portfolio's catastrophic implosion.</h3>
                </div>
                <div className="login">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="login-left">
                                <label>Email:</label>
                                <input
                                    type="email1"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <label>Password:</label>
                                <input
                                    type="password1"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="login-right">
                                <button type="submit" className='login-button'>Login</button>
                                <button type="reset" className='login-button'>Sign Up</button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Login