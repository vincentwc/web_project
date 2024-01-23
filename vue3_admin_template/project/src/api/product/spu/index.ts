// SPU管理模块接口
import request from '@/utils/request'
import type {
  AllTradeMark,
  HasSaleAttrResponseData,
  HasSpuResponseData,
  SaleAttrResponseData,
  SpuHasImg,
} from './type'

enum API {
  // 获取已有的SPU的数据
  HASSPU_URL = '/admin/product/',
  // 获取全部品牌参数
  ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  // 获取某一个spu下的全部的售卖商品照片数据
  IMAGE_URL = '/admin/product/spuImageList/',
  // 后去某一个spu下全部已有的销售属性接口地址
  SPUHASSALEATTR_URL = '/admin/product/spuSaleAttrList/',
  // 获取整个项目全部的销售属性【颜色、版本、尺码】
  ALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
  //追加一个新的SPU
  ADDSPU_URL = '/admin/product/saveSpuInfo',
  //更新已有的SPU
  UPDATESPU_URL = '/admin/product/updateSpuInfo',
}

// 获取某一个三级分类下已有的spu数据
export const reqHasSpu = (
  page: number,
  limit: number,
  category3Id: number | string,
) => {
  return request.get<any, HasSpuResponseData>(
    API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`,
  )
}

// 获取全部的spu的品牌数据
export const reqAllTrademark = () => {
  return request.get<any, AllTradeMark>(API.ALLTRADEMARK_URL)
}

// 获取某一个已有的spu全部商品的图片地址
export const reqSpuImageList = (spuId: number) => {
  return request.get<any, SpuHasImg>(API.IMAGE_URL + spuId)
}

// 获取某一个已有的spu拥有多少个销售属性
export const reqSpuHasSaleAttr = (spuId: number) => {
  return request.get<any, SaleAttrResponseData>(API.SPUHASSALEATTR_URL + spuId)
}

// 获取全部的销售属性
export const reqAllSaleAttr = () => {
  return request.get<any, HasSaleAttrResponseData>(API.ALLSALEATTR_URL)
}

// 添加一个新的spu
export const reqAddOrUpdateSpu = (data: any) => {
  if (data.id) {
    // 更新已有的spu
    return request.post<any, any>(API.UPDATESPU_URL, data)
  } else {
    // 新增
    return request.post<any, any>(API.ADDSPU_URL, data)
  }
}
