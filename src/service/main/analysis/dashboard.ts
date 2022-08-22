import myRequest from "../.."

export function getCategoryGoodsCount() {
  return myRequest.get({
    url: "/goods/category/count"
  })
}

export function getCategoryGoodsSale() {
  return myRequest.get({
    url: "/goods/category/sale"
  })
}

export function getCategoryGoodsFavor() {
  return myRequest.get({
    url: "/goods/category/favor"
  })
}

export function getAddressGoodsSale() {
  return myRequest.get({
    url: "/goods/address/sale"
  })
}
