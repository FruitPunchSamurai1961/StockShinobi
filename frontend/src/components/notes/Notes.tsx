import React from 'react';
import {Box, Input, Text} from '@chakra-ui/react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {NotesProps} from "../../ts/interfaces";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {setContent} from "../../redux/notes/notesSlice";

const Notes: React.FC<NotesProps> = ({name, placeholder}) => {

    const notesState = useAppSelector((state) => state.notes);
    const dispatch = useAppDispatch();

    return (
        <Box>
            <Text fontSize="xl" fontWeight="bold" mb={4}>
                Notes for {name} stock
            </Text>
            <Input as="textarea"
                   placeholder={placeholder}
                   value={notesState.content} bg={"white"}
                   color={"gray.900"}
                   _placeholder={{color: "gray.500"}}
                   onChange={(e) => dispatch(setContent({newContentValue: e.target.value}))}
                   pt={1}
            />
        </Box>
    );
};

export default Notes;
