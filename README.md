# Binancial Trader

## Author: Shaun Hamilton

---

# How To Use

## Notes

- API keys are passed through the `X-MBX-KEY` header
- _SIGNED_ endpoints require an additional parameter, signature, to be sent in the query string or request body
- Endpoints use _HMAC SHA256_ signatures. The _HMAC SHA256_ signature is a keyed _HMAC SHA256_ operation. Use your `SECRET_KEY` as the key and `totalParams` as the value for the HMAC operation
- `totalParams` = query string concatenated with the request body
- A _SIGNED_ endpoint also requires a parameter, `timestamp`, to be sent which should be the millisecond timestamp of when the request was created and sent
- An additional parameter, `recvWindow`, may be sent to specify the number of milliseconds after `timestamp` the request is valid for. If `recvWindow` is not sent, it defaults to `5000`
- All classes extend `Binance`, and all methods are superimposed

# Examples

## Using the Binance Class

```ts
const Bin = new Binance();
// Ping servers
Bin.testConnection();
// Get server time [ms]
Bin.getServerTime();
```

## Using the Account Class

## Using the ExchangeInfo Class

## Using the Order Class
