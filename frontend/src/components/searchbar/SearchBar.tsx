import React from 'react';
import {Container, FormControl, FormLabel, Text, useColorMode} from '@chakra-ui/react';
import {SearchBarProps} from "../../ts/interfaces";
import WindowedSelect, {createFilter} from "react-windowed-select";
import {SearchBarOption} from "../../ts/types";

const SearchBar: React.FC<SearchBarProps> = ({
                                                 options,
                                                 isMulti,
                                                 name,
                                                 placeholder,
                                                 windowThreshold,
                                                 handleSingleSelectOptionChange,
                                                 handleMultiSelectOptionsChange
                                             }) => {
    const {colorMode} = useColorMode();
    const customFilter = createFilter({ignoreAccents: false});
    const customStyles = {
        option: (provided: any) => ({
            ...provided,
            backgroundColor: colorMode === 'dark' ? 'gray.300' : 'gray.600',
            color: colorMode === 'dark' ? 'red' : 'black',
        }),
    };

    const handleChange = (e: any) => {
        if (isMulti && handleMultiSelectOptionsChange) {
            handleMultiSelectOptionsChange(e != null ? e as SearchBarOption[] : null);
        } else if (!isMulti && handleSingleSelectOptionChange) {
            handleSingleSelectOptionChange(e != null ? e as SearchBarOption : null);
        }
    }

    return (
        <Container mb={16}>
            <FormControl p={4}>
                <FormLabel>
                    <Text fontSize="lg" fontWeight="bold" mb={2} color={colorMode === 'dark' ? 'gray.300' : 'gray.600'}>
                        Search for a Stock:
                    </Text>
                </FormLabel>

                <WindowedSelect
                    name={name}
                    placeholder={placeholder}
                    windowThreshold={windowThreshold}
                    isClearable={true}
                    options={options}
                    styles={customStyles}
                    filterOption={customFilter}
                    isMulti={isMulti}
                    onChange={(e: any) => handleChange(e)}
                />
            </FormControl>
        </Container>
    );
};

export default SearchBar;
