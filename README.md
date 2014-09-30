lamassu-bitso
================

Lamassu Bitso ticker and trader


### Testing

1. Open [`mockConfig.template.json`](https://github.com/naconner/lamassu-bitso/blob/master/test/mockConfig.template.json) file, and input your Bitso credentials there,
2. Make sure to check there:
  - [x] Account balance,
  - [x] Buy limit order,
  - [x] Sell limit order.
2. Rename `mockConfig.template.json` to `mockConfig.json`,
3. Type this into your terminal:

```bash
npm update # in case you cloned via git
npm test
```
