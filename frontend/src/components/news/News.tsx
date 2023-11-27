import React from 'react';
import {Box, Flex, Link as ChakraLink, Text, useColorMode} from '@chakra-ui/react';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {NewsProps} from "../../ts/interfaces";
import {Link as ReactRouterLink} from "react-router-dom";

const News: React.FC<NewsProps> = ({
                                       feed
                                   }) => {
    const {colorMode} = useColorMode();
    return (
        <Box>
            <Text fontSize="xl" fontWeight="bold" mb={4}>
                Latest News
            </Text>

            <Carousel showStatus={false} showThumbs={false}>
                {feed.map((news, index) => (
                    <Flex
                        key={index}
                        direction="column"
                        align="center"
                        justify="center"
                        h="200px"
                        bg={colorMode === 'dark' ? 'gray.800' : 'gray.100'}
                        borderRadius="md"
                        p={4}
                    >
                        <Text fontWeight="bold" mb={2}>
                            <ChakraLink as={ReactRouterLink} to={news.url} color={'blue.400'} target={"_blank"}>{news.title}</ChakraLink>
                        </Text>
                        <Text>{news.summary}</Text>
                    </Flex>
                ))}
            </Carousel>
        </Box>
    );
};

export default News;
