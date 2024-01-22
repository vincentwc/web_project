// 服务器全部接口返回的数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// SPU数据的ts类型
export interface SpuData {
  id?: number | string
  spuName: string
  description: string
  category3Id: number | string
  // 品牌id
  tmId: number
  // 销售属性
  spuSaleAttrList: null
  // 照片数据
  spuImageList: null
}

// 数组包含元素都是已有spu数据类型
export type Records = SpuData[]

// 定义获取已有的spu接口返回数据ts类型
export interface HasSpuResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}
