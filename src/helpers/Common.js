
import React, { useEffect, useState } from 'react';
import axios from 'axios';


export default function useAuth(code) {


  const [accessToken, setAccessToken] = useState()
  const [refreshToken, setRefreshToken] = useState()
  const [expiresIn, setExpiresIn] = useState()

  useEffect(() => {
    axios.post('http://localhost:3001/login', {
      code
    })
      .then(res => {
        let { accessToken, refreshToken, expiresIn } = res.data;
        // console.log(res.data)
        setAccessToken(accessToken)
        setRefreshToken(refreshToken)
        setExpiresIn(expiresIn)
        window.history.pushState({}, null, '/')
      })
      .catch(() => window.location = '/')
  }, [code])

  useEffect(() => {
    if (!expiresIn || !refreshToken) return;
    const interval = setInterval(() => {
      axios.post('http://localhost:3001/refresh', { refreshToken })
        .then(res => {

          let { accessToken, expiresIn } = res.data;
          setAccessToken(accessToken)
          setExpiresIn(expiresIn)

        })
        .catch(() => window.location = '/')
    }, (expiresIn - 60) * 1000)

    return () => clearInterval(interval)
  }, [refreshToken, expiresIn])
  return accessToken
}