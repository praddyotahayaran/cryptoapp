import { Box, Container } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { server } from '..';
import { useParams } from 'react-router-dom';
import ErrorComponent from './ErrorComponent';

const CoinDeatils = () => {
  const Coins = () => {

    const params = useParams()
    const [coin, setCoin] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    // const [currency, setCurrency] = useState("inr");

    useEffect(() => {
      const fetchCoins = async () => {
        try {
          const { data } = await axios.get(`${server}/coins/bitcoin?tickers=true&market_data=true&developer_data=true&sparkline=false`)
          console.log(data)
          setCoin(data)
          setLoading(false)
        } catch (error) {
          setError(true)
          setLoading(false)
        }
      };
      fetchCoins()
    }, []);

    if (error) return <ErrorComponent message={"Error While Fetching Coin"} />;


    return (
      <Container maxW={"container.xl"}>
        {
          loading ? (
            <Loader />
          ) : (
            <>
              <Box width={"full"} borderWidth={1}>
                Hello this is coin detail page
              </Box>
            </>
          )
        }
      </Container>
    )
  }
}


export default CoinDeatils