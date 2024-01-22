<template>
  <div class="">
    <!-- 三级分类全局组件 -->
    <Category :scene="scene" />
    <el-card style="margin: 10px 0px">
      <div v-show="scene == 0">
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          :disabled="categoryStore.c3Id ? false : true"
          @click="addAttr"
        >
          添加平台属性
        </el-button>
        <el-table style="margin: 10px 0px" border :data="attrArr">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column
            label="属性名称"
            width="120px"
            prop="attrName"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row, $index }">
              <el-tag
                style="margin: 5px"
                v-for="item in row.attrValueList"
                :key="item.id"
              >
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <!-- 修改已有属性的按钮 -->
            <template #="{ row, $index }">
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                @click="updateAttr(row)"
              ></el-button>
              <el-popconfirm
                :title="`你确定删除吗${row.attrName}?`"
                width="200px"
                @confirm="deleteAttr(row.id)"
              >
                <template #reference>
                  <el-button
                    type="primary"
                    size="small"
                    icon="Delete"
                  ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene == 1">
        <!-- 展示添加属性与修改属性数据的结构 -->
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input
              placeholder="请输入属性名称"
              v-model="attrParams.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          :disabled="attrParams.attrName ? false : true"
          @click="addAttrValue"
        >
          添加属性值
        </el-button>
        <el-button type="primary" size="default" @click="cancel">
          取消
        </el-button>
        <el-table
          border
          style="margin: 10px 0px"
          :data="attrParams.attrValueList"
        >
          <el-table-column
            width="80px"
            type="index"
            align="center"
            label="序号"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <!-- row 即为当前的属性值对象 -->
            <template #="{ row, $index }">
              <el-input
                :ref="(vc: any) => (inputArr[$index] = vc)"
                v-if="row.flag"
                placeholder="请你输入属性值名称"
                v-model="row.valueName"
                @blur="toLook(row, $index)"
              ></el-input>
              <div @click="toEdit(row, $index)" v-else>{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作">
            <template #="{ row, $index }">
              <el-button
                type="primary"
                size="small"
                icon="Delete"
                @click="attrParams.attrValueList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          size="default"
          @click="save"
          :disabled="attrParams.attrValueList.length > 0 ? false : true"
        >
          保存
        </el-button>
        <el-button type="primary" size="default" @click="cancel">
          取消
        </el-button>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts" name="">
// 组合式api函数的watch
import { watch, ref, reactive, nextTick, onBeforeUnmount } from 'vue'
// 引入获取已有属性与属性值接口
import { reqAttr, reqAddOrUpdateAttr, reqRemoveAttr } from '@/api/product/attr'
// 获取分类的仓库
import useCategoryStore from '@/store/modules/category'
import type { AttrResponseData, Attr, AttrValue } from '@/api/product/attr/type'
import { ElMessage } from 'element-plus'
let categoryStore = useCategoryStore()
// 存储已有的属性与属性值
let attrArr = ref<Attr[]>([])
// 定义卡片组件内容切换变量
let scene = ref<number>(0) //scene=0 显示table；scene=1 显示添加与修改属性的结构
// 收集新增的属性的数据
let attrParams = reactive<Attr>({
  attrName: '', // 新增属性值名称
  attrValueList: [], // 新增属性值数组
  categoryId: '', // 三级分类id
  categoryLevel: 3, // 表示三级分类
})
//准备一个数组:将来存储对应的组件实例el-input
let inputArr = ref<any>([])
// 监听仓库三级分类id变化
watch(
  () => categoryStore.c3Id,
  () => {
    // 三级分类发生变化，清空上一次查询的属性与属性值
    attrArr.value = []
    // 要保证三级分类有才能发送请求
    if (!categoryStore.c3Id) {
      return
    }
    getAttr()
  },
)
//  获取已有的属性与属性值方法
const getAttr = async () => {
  // 获取分类的id
  const { c1Id, c2Id, c3Id } = categoryStore
  let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
  if (result.code == 200) {
    attrArr.value = result.data
  }
}

// 添加属性按钮回调
const addAttr = () => {
  // 每一次点击的时候，先清空一下数据在收集数据
  Object.assign(attrParams, {
    attrName: '',
    attrValueList: [],
    // 点击这个按钮的时候，收集新增的属性的三级分类的id
    categoryId: categoryStore.c3Id,
    categoryLevel: 3,
  })
  // 切换为添加与修改属性的结构
  scene.value = 1
}

// table表格修改已有属性按钮回调
const updateAttr = (row: Attr) => {
  scene.value = 1
  // 将已有的属性对象赋值给attrParams对象
  console.log(row)
  // es6方法Object.assign进行对象合并[浅拷贝-操作的是同一个对象]，此处应该使用深拷贝[]，json格式
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}

// 取消按钮回调
const cancel = () => {
  scene.value = 0
}

// 添加属性值
const addAttrValue = () => {
  // 点击添加属性值按钮的时候，向数组添加一个属性值对象
  attrParams.attrValueList.push({
    valueName: '',
    flag: true, // 控制每一个属性值编辑模式与查看模式的切换
  })
  // 获取最后的el-input组件聚焦
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })
}

// 保存按钮的回调
const save = async () => {
  let result: any = await reqAddOrUpdateAttr(attrParams)
  if (result.code == 200) {
    // 切换场景
    scene.value = 0
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功',
    })
    // 获取全部已有的属性值
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失败' : '添加失败',
    })
  }
}

// 属性值表单元素失去焦点
const toLook = (row: AttrValue, $index: number) => {
  // 非法情况的判断
  if (row.valueName.trim() == '') {
    // 删除掉对应属性值为空的元素
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
    return
  }
  // 非法情况判断，不能有相同的
  let repeat = attrParams.attrValueList.find((item) => {
    // 去除当前的数据
    if (item != row) {
      return item.valueName === row.valueName
    }
  })
  if (repeat) {
    // 将重复的属性值从数组去除
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能重复',
    })
    return
  }

  row.flag = false
}

const toEdit = (row: AttrValue, $index: number) => {
  row.flag = true
  // nextTick:响应式数据发生变化，获取更新的dom实例
  nextTick(() => {
    console.log(inputArr.value[$index])
  })
}

// 删除某一个已有属性方法回调
const deleteAttr = async (attrId: number) => {
  let result = await reqRemoveAttr(attrId)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    // 获取一次已有的属性值
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}

// 路由组件销毁的时候,把仓库分类相关数据清空
onBeforeUnmount(() => {
  // 清空分类仓库的数据
  categoryStore.$reset()
})
</script>
<style scoped></style>
