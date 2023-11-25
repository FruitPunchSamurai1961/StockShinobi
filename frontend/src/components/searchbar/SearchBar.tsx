import React from 'react';
import {Container, FormControl, FormLabel, Text, useColorMode} from '@chakra-ui/react';
import {Select} from "chakra-react-select";

const SearchBar = () => {
    const {colorMode} = useColorMode();
    
    const stateOptions = [
        {value: "AL", label: "Alabama"},
        {value: "AK", label: "Alaska"},
        {value: "AS", label: "American Samoa"},
        {value: "AZ", label: "Arizona"},
        {value: "AR", label: "Arkansas"},
        {value: "CA", label: "California"},
        {value: "CO", label: "Colorado"},
        {value: "CT", label: "Connecticut"},
        {value: "DE", label: "Delaware"},
        {value: "DC", label: "District Of Columbia"},
        {value: "FM", label: "Federated States Of Micronesia"},
        {value: "FL", label: "Florida"},
        {value: "GA", label: "Georgia"},
        {value: "GU", label: "Guam"},
        {value: "HI", label: "Hawaii"},
        {value: "ID", label: "Idaho"},
        {value: "IL", label: "Illinois"},
        {value: "IN", label: "Indiana"},
        {value: "IA", label: "Iowa"},
        {value: "KS", label: "Kansas"},
        {value: "KY", label: "Kentucky"},
        {value: "LA", label: "Louisiana"},
        {value: "ME", label: "Maine"},
        {value: "MH", label: "Marshall Islands"},
        {value: "MD", label: "Maryland"},
        {value: "MA", label: "Massachusetts"},
        {value: "MI", label: "Michigan"},
        {value: "MN", label: "Minnesota"},
        {value: "MS", label: "Mississippi"},
        {value: "MO", label: "Missouri"},
        {value: "MT", label: "Montana"},
        {value: "NE", label: "Nebraska"},
        {value: "NV", label: "Nevada"},
        {value: "NH", label: "New Hampshire"},
        {value: "NJ", label: "New Jersey"},
        {value: "NM", label: "New Mexico"},
        {value: "NY", label: "New York"},
        {value: "NC", label: "North Carolina"},
        {value: "ND", label: "North Dakota"},
        {value: "MP", label: "Northern Mariana Islands"},
        {value: "OH", label: "Ohio"},
        {value: "OK", label: "Oklahoma"},
        {value: "OR", label: "Oregon"},
        {value: "PW", label: "Palau"},
        {value: "PA", label: "Pennsylvania"},
        {value: "PR", label: "Puerto Rico"},
        {value: "RI", label: "Rhode Island"},
        {value: "SC", label: "South Carolina"},
        {value: "SD", label: "South Dakota"},
        {value: "TN", label: "Tennessee"},
        {value: "TX", label: "Texas"},
        {value: "UT", label: "Utah"},
        {value: "VT", label: "Vermont"},
        {value: "VI", label: "Virgin Islands"},
        {value: "VA", label: "Virginia"},
        {value: "WA", label: "Washington"},
        {value: "WV", label: "West Virginia"},
        {value: "WI", label: "Wisconsin"},
        {value: "WY", label: "Wyoming"}
    ];

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
                    options={stateOptions}
                    placeholder="Select a color"
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
