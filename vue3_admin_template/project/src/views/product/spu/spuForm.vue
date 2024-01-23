<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input placeholder="请你输入SPU名称"></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select>
        <el-option label="苹果"></el-option>
        <el-option label="小米"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        type="textarea"
        placeholder="请你输入描述"
        v-model="SpuParams.description"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU图片">
      <!-- 
        v-model:file-list 用于展示默认图片
        list-type:文件列表类型
        on-preview：点击文件列表中已上传的文件时的钩子  
        on-remove：文件列表移除文件时的钩子
       -->
      <el-upload
        v-model:file-list="imageList"
        action="/api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="handleUpload"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img
          w-full
          :src="dialogImageUrl"
          alt="Preview Image"
          style="width: 100%; height: 100%"
        />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <!-- 展示销售属性的下拉菜单 -->
      <el-select>
        <el-option label="苹果"></el-option>
        <el-option label="小米"></el-option>
      </el-select>
      <el-button type="primary" icon="Plus" style="margin-left: 10px">
        添加销售属性值
      </el-button>
      <!-- table 展示销售属性与属性值的地方 -->
      <el-table border style="margin: 10px 0px">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column label="销售属性名字" width="120px"></el-table-column>
        <el-table-column label="销售属性值"></el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button type="primary" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts" name="">
import { SpuData } from '@/api/product/spu/type'
import {
  reqAllSaleAttr,
  reqAllTrademark,
  reqSpuImageList,
  reqSpuHasSaleAttr,
} from '@/api/product/spu'
import type {
  HasSaleAttr,
  AllTradeMark,
  HasSaleAttrResponseData,
  SpuImg,
  SaleAttr,
  SaleAttrResponseData,
  SpuHasImg,
  Trademark,
} from '@/api/product/spu/type'
import { ref } from 'vue'
let $emit = defineEmits(['changeScene'])
// 子组件点击取消按钮，通知父组件切换场景为1，展示已有的spu数据
const cancel = () => {
  $emit('changeScene', 0)
}
// 存储已有的spu数据
let AllTrademark = ref<Trademark[]>([])
// 商品图片
let imageList = ref<SpuImg[]>([])
// 已有的spu销售属性
let saleAttr = ref<SaleAttr[]>([])
// 全部的销售属性
let allSaleAttr = ref<HasSaleAttr[]>([])
// 控制对话框的显示与隐藏
let dialogVisible = ref<boolean>(false)
// 存储预览图片地址
let dialogImageUrl = ref<string>()
// 存储已有的spu对象
let SpuParams = ref<SpuData>({
  spuName: '', // spu名称
  description: '', // spu描述
  category3Id: '', // 三级分类的id
  tmId: '',
  spuSaleAttrList: null,
  spuImageList: null,
})
// 子组件写一个方法
const initHasSpuData = async (spu: SpuData) => {
  // 存储已有的spu对象，将来在模板中展示
  SpuParams.value = spu
  //spu:计委父组件传递过来的已有的spu对象【不完整】
  // 获取全部品牌的数据
  let result: AllTradeMark = await reqAllTrademark()
  // 获取某一个品牌旗下的全部售卖商品的图片
  let result1: SpuHasImg = await reqSpuImageList(spu.id as number)
  // 获取已有的spu销售属性的数据
  let result2: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id as number)
  // 获取整个项目全部spu的销售属性
  let result3: HasSaleAttrResponseData = await reqAllSaleAttr()

  // 存储全部品牌数据
  AllTrademark.value = result.data
  // spu全部照片数据
  imageList.value = result1.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    }
  })
  // 存储已有的品牌数据
  saleAttr.value = result2.data
  // 所有销售属性
  allSaleAttr.value = result3.data
}

// 照片墙点击预览按钮时触发的钩子
const handlePictureCardPreview = (file: any) => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}

// 照片墙上传成功之前的钩子，约束文件的大小与类型
const handleUpload = (file: any) => {
  if (
    file.type == 'image/png' ||
    file.type == 'image/jpeg' ||
    file.type == 'image/gif'
  ) {
    if(file.size/1024/1024 < 3) {

      return true
    } else {

      return false
    }
  } else {
    return false
  }
}

// 照片墙删除图片的钩子
const handleRemove = (file: any) => {
  console.log(file)
}
// 对外暴露
defineExpose({ initHasSpuData })
</script>
<style scoped></style>
