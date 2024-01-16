// 分类相关的数据的ts类型

export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 分类ts类型
export interface CategoryObj {
  id: number | string
  name: string
  category1Id?: number
  category2Id?: number
}

// 分类接口返回的数据类型
export interface CategoryResponseData extends ResponseData {
  data: CategoryObj[]
}

// 属性接口返回的数据ts类型
export interface AttrResponseData extends ResponseData {
  data: Attr[]
}

// 属性值对象ts类型
export interface AttrValue {
  id: number
  valueName: string
  attrId: number
}

// 存储每个属性值的数组类型AttrValue
export type AttrValueList = []

// 属性对象
export interface Attr {
  id: number
  attrName: string
  categoryId: number
  categoryLevel: number
  attrValueList: AttrValueList
}

// 存储每一个属性对象的数组ts类型
export type AttrList = Attr[]
