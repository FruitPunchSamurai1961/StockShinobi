import React from 'react';
import { Box, Text, Flex, useColorMode } from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import the styles

const News = () => {
    const { colorMode } = useColorMode(); // Access the current color mode

    const newsData = [
        { title: 'News Title 1', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { title: 'News Title 2', text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
        // Add more news items as needed
    ];

    return (
        <Box>
            <Text fontSize="xl" fontWeight="bold" mb={4}>
                Latest News
            </Text>

            <Carousel showStatus={false} showThumbs={false}>
                {newsData.map((news, index) => (
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
                            {news.title}
                        </Text>
                        <Text>{news.text}</Text>
                    </Flex>
                ))}
            </Carousel>
        </Box>
    );
};

export default News;
