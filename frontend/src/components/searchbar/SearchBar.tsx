import React, {useEffect, useState} from 'react';
import {Container, FormControl, FormLabel, Text, useColorMode} from '@chakra-ui/react';
import {Select} from "chakra-react-select";
import {useSearchMutation, useSignupMutation} from "../../redux/api/authApi";

const SearchBar = () => {
    const {colorMode} = useColorMode();

    const [search, setSearch] = useState('AAPL');
    const [ticker, setTicker] = useState('');
    const [tickerResults, setTickerResults] = useState<any[]>([]);

    useEffect(() => {
        const getSymbol = async (search: string) => {
            try {
                const response = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=` + search + '&apikey=' + '2H26FC7FC12UM05I', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.status === 200) {
                    const result = await response.json();
                    setTickerResults(result["bestMatches"].map((item: { [x: string]: any; }) => ({
                        value: item['1. symbol'],
                        label: item['1. symbol'] + ': ' + item['2. name']
                    })));
                } else {
                    console.log('Failed to retrieve ticker info');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        getSymbol(search);
    }, [search]);

    function handleSearch(newValue: string) {
        setSearch(newValue);
    }

    function handleSelect(symbol) {
        setTicker(symbol.value);
        console.log(ticker);
    }

    return (
        <Container mb={16}>
            <FormControl p={4}>
                <FormLabel>
                    <Text fontSize="lg" fontWeight="bold" mb={2} color={colorMode === 'dark' ? 'gray.300' : 'gray.600'}>
                        Search for a Stock:
                    </Text>
                </FormLabel>

                <Select
                    name="colors"
                    className="chakra-react-select"
                    classNamePrefix="chakra-react-select"
                    options={tickerResults}
                    onInputChange={handleSearch}
                    onChange={handleSelect}
                    placeholder="Select a ticker"
                    selectedOptionStyle="check"
                    chakraStyles={{
                        dropdownIndicator: () => ({
                            bg: "transparent",
                            p: 0,
                            w: 6,
                            mx: 2,
                            cursor: "inherit"
                        }),
                        indicatorSeparator: () => ({
                            display: "none"
                        })
                    }}
                />
            </FormControl>
        </Container>
    );
};

export default SearchBar;
