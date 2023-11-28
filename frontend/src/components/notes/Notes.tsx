import React, {useState} from 'react';
import {Box, Input, Text} from '@chakra-ui/react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {NotesProps} from "../../ts/interfaces";

const Notes: React.FC<NotesProps> = ({ name, placeholder}) => {

    const [notes, setNotes] = useState('');

    const handleNotesChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setNotes(event.target.value);
    }

    return (
        <Box>
            <Text fontSize="xl" fontWeight="bold" mb={4}>
                Notes for this stock
            </Text>
            <Input as="textarea"
                   placeholder={placeholder}
                   value={notes} bg={"white"}
                   color={"gray.900"}
                   _placeholder={{ color: "gray.500" }}
                   onChange={handleNotesChange}
                   pt={1}
            />
        </Box>
    );
};

export default Notes;
