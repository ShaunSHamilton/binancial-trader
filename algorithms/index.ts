export function initialiseAlgorithm(
  assetCountToUse: number,
  assetPriceToBuy: number,
  percentIncreaseToSell: number,
  percentIncreaseToBuy: number
) {
  const isAssetAvailable = checkAssetAvailability();
  const assetMarketPrice = getMarketPrice();
  makeOrderForAmount(assetPriceToBuy);
  const [sellingOrBuying, setSellingOrBuying] = algoState("selling");

  // TODO: Seperate function
  const isPreviousOrderComplete = checkOrderBook();
  const assetPriceToSell =
    assetPriceToBuy + assetPriceToBuy * percentIncreaseToBuy;
  if (assetMarketPrice >= assetPriceToSell && isPreviousOrderComplete) {
    executeSale();
  }
}

function makeOrderForAmount(amount) {}

function isCanSell() {}

function isCanBuy() {}

function checkOrderBook() {}

function checkAssetAvailability() {}

function getMarketPrice() {}

// TODO: Test state setter
function algoState<T>(initialValue?: T) {
  return [
    initialValue ?? undefined,
    (newValue: T) => (initialValue = newValue),
  ];
}
