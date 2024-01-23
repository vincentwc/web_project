// 服务器全部接口返回的数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// SPU数据的ts类型
export interface SpuData {
  id?: number
  spuName: string
  description: string
  category3Id: number | string
  // 品牌id
  tmId: number | string
  // 销售属性
  spuSaleAttrList: null | SaleAttr[]
  // 商品的图片数据
  spuImageList: null | SpuImg[]
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

// 品牌数据的ts类型
export interface Trademark {
  id: number
  tmName: string
  logoUrl: string
}

// 品牌接口返回的数据类型
export interface AllTradeMark extends ResponseData {
  data: Trademark[]
}

// 商品图片ts类型
export interface SpuImg {
  id?: number
  createTime?: string
  updateTime?: string
  spuId?: number
  imgName?: string
  imgUrl?: string
  name?: string
  url?: string
}

// 已有的spu的照片墙数据的类型
export interface SpuHasImg extends ResponseData {
  data: SpuImg[]
}

// 已有的销售属性值对象ts类型
export interface SaleAttrValue {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number
  saleAttrValueName: string
  saleAttrName?: string
  isChecked?: number
}

// 存储已有的销售属性值数组类型
export type SpuSaleAttrValueList = SaleAttrValue[]

//  销售属性对象ts类型
export interface SaleAttr {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrName: string
  spuSaleAttrValueList: SpuSaleAttrValueList
}

// spu已有的销售属性接口返回的数据ts类型
export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[]
}

// 已有的全部spu的返回数据ts类型
export interface HasSaleAttr {
  id: number
  name: string
}

export interface HasSaleAttrResponseData extends ResponseData {
  data: HasSaleAttr[]
}
