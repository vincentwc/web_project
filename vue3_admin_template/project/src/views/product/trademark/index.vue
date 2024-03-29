<template>
  <div class="">
    <el-card class="box-card">
      <!-- 卡片顶部添加品牌按钮 -->
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        @click="addTradeMark"
      >
        添加品牌
      </el-button>
      <!-- 表格组件，用于展示品牌已有的数据 -->
      <!-- 
        table
        --- border:设置表格纵向是否有边框
        table-column
        ---label:某一个咧列的标题
        ---width:设置这列宽度
        ---align:设置这一列的对齐方式
       -->
      <el-table style="margin: 10px 0px" border :data="tradenarkArr">
        <el-table-column
          label="序号"
          width="80px"
          type="index"
          align="center"
        ></el-table-column>
        <!-- tabele-column:默认展示数据用div -->
        <el-table-column label="品牌名称" prop="tmName"></el-table-column>
        <el-table-column label="品牌LOGO" prop="logoUrl">
          <template #="{ row }">
            <img :src="row.logoUrl" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #="{ row }">
            <el-button
              type="warning"
              icon="Edit"
              size="small"
              @click="updateTradeMark(row)"
            />
            <el-popconfirm
              :title="`您确定要删除${row.tmName}吗？`"
              width="250px"
              icon="Delete"
              @confirm="removeTrademark(row.id)"
            >
              <template #reference>
                <el-button type="danger" icon="Delete" size="small" @click="" />
                <!-- <el-button>Delete</el-button> -->
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器组件 -->
      <!-- 
        pagination
          v-model:current-page 设置分页器当前页码
          v-model:page-size 设置每页展示数据的条数
          page-sizes 用于设置下拉菜单的数据
          background 设置分页器按钮的背景颜色
          layout 可以设置分页器6个子组件布局调整
       -->
      <el-pagination
        @current-change="getHasTrademark"
        @size-change="getHasTrademark"
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout=" prev, pager, next, jumper, ->,sizes,total"
        :total="total"
      />
    </el-card>
    <!-- 对话框组件：在添加品牌与修改已有品牌的业务时候使用结构 -->
    <!--  
      v-model：属性用于控制对话框的显示与隐藏 true-显示 false-隐藏
      title：设置对话框左上角标题
    -->
    <el-dialog
      v-model="dialogFormVisible"
      :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
    >
      <el-form
        style="width: 80%"
        :model="trademarkParams"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input
            placeholder="请输入品牌名称"
            v-model="trademarkParams.tmName"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!-- 
            upload组件相应属性
              action：上传图片请求地址 需要增加/api，代理服务器不发送post请求
              show-file-list: 展示上传图片的名称
              before-upload：文件上传之前的钩子
              on-success：文件上传成功的钩子
          -->
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
          >
            <img
              v-if="trademarkParams.logoUrl"
              :src="trademarkParams.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 具名插槽：footer -->
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts" name="">
import { ref, onMounted, reactive, nextTick } from 'vue'
import {
  reqHasTrademark,
  reqDeleteTrademark,
  reqAddOrUpdateTrademark,
} from '@/api/product/trademark'
import { ElMessage, type UploadProps } from 'element-plus'
import type {
  Records,
  TradeMark,
  TradeMarkResponseData,
} from '@/api/product/trademark/type'
// 当前页码
let pageNo = ref<number>(1)
// 每一页显示多少条数据
let limit = ref<number>(3)
// 存储已有品牌的数据的总数
let total = ref<number>(0)
// 存储已有品牌的数组
let tradenarkArr = ref<Records>([])
// 控制对话框显示｜隐藏
let dialogFormVisible = ref(false)
// 定义收集新增品牌数据
let trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})
// 获取el-form组件实例
let formRef = ref()
// 获取已有品牌的接口封装成一个函数：在任何情况下调用次函数即可
const getHasTrademark = async (pager = 1) => {
  pageNo.value = pager
  let result: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value,
  )
  if (result.code == 200) {
    // 存储已有品牌总个数
    total.value = result.data.total
    tradenarkArr.value = result.data.records
  }
}
// 组件挂在完毕钩子--发送一次请求，获取第一页，一页三个已有的品牌数据
onMounted(() => {
  getHasTrademark()
})

// 添加品牌按钮回调
const addTradeMark = () => {
  // 对话框显示
  dialogFormVisible.value = true
  // 相应收集数据清空
  trademarkParams.id = 0
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
  // 第一种写法：ts的问号语法
  // formRef.value?.clearValidate('tmName')
  // formRef.value?.clearValidate('logoUrl')
  // 第二种写法
  nextTick(() => {
    formRef.value?.clearValidate('tmName')
    formRef.value?.clearValidate('logoUrl')
  })
}

const updateTradeMark = (row: TradeMark) => {
  // 情况校验规则错误提示信息
  nextTick(() => {
    formRef.value?.clearValidate('tmName')
    formRef.value?.clearValidate('logoUrl')
  })
  dialogFormVisible.value = true
  // ES6语法合并对象,跟下面三行代码等效
  Object.assign(trademarkParams, row)
  // trademarkParams.tmName = row.tmName
  // trademarkParams.logoUrl = row.logoUrl
  // trademarkParams.id = row.id
}

// 对话框底部取消按钮
const cancel = () => {
  // 对话框隐藏
  dialogFormVisible.value = false
  // 相应收集数据清空
}
// 对话框底部确定按钮
const confirm = async () => {
  // 在发请求之前，对整个表单进行校验
  // 调用这个方法进行全部的表单校验，如果校验全部通过，在执行后面的语法
  await formRef.value.validate()
  let result: any = await reqAddOrUpdateTrademark(trademarkParams)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功',
    })
    // 再次发请求获取全部已有品牌数据,添加跳转到第一页，修改留在当前页
    getHasTrademark(trademarkParams.id ? pageNo.value : 1)
  } else {
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败',
    })
  }
  dialogFormVisible.value = false
}

// 图片上传组件->上传图片之前触发的钩子函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // 钩子是在图片上传成功之前触发，上传文件之前可以约束文件的类型和大小
  // 要求：上传文件格式png|jpg|gif 4M
  if (
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传的文件大小应小于4M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件格式必须是PGN|JPG|GIF',
    })
    return false
  }
}

// 图片上传组件->上传图片成功触发的钩子函数
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  _uploadFile,
) => {
  // response 即为当前这次上次上传图片post请求服务器返回的数据
  trademarkParams.logoUrl = response.data
  // 文件上传成功之后，清理掉logoUrl的错误提示信息
  formRef.value.clearValidate('logoUrl')
}

// 品牌校验自定义校验规则方法
const validatorTmName = (_rule: any, value: any, callback: any) => {
  /**
   * _rule: 规则对象
   * value：文本内容
   * callback：校验放行函数
   */
  // 自定义校验规则
  if (value.trim().length >= 2) {
    callback()
  } else {
    // 校验未通过，返回的错误提示信息
    callback(new Error('品牌名称位数大于等于两位'))
  }
}

// 品牌LOGO图片自定义校验规则
const validatorLogoUrl = (_rule: any, value: any, callback: any) => {
  // 如果图片上传
  if (value) {
    callback()
  } else {
    callback(new Error('LOGO图片务必上传'))
  }
}
// 表单校验规则对象
const rules = {
  tmName: [
    // required：这个字段需要校验，表单项前面加一个五角星
    // trigger ：触发规则的时机 blur失去焦点 change改变
    { required: true, trigger: 'blur', validator: validatorTmName },
  ],
  logoUrl: [{ required: true, trigger: 'blur', validator: validatorLogoUrl }],
}

// 气泡确认框确认按钮的回调
const removeTrademark = async (id: number) => {
  //
  let result = await reqDeleteTrademark(id)
  console.log(result)
  if (result.code == 200) {
    // 删除成功
    ElMessage({
      type: 'success',
      message: '删除品牌成功',
    })
    // 再次获取已有品牌的数据
    getHasTrademark(
      // 当前页数据大于1，删除就留在当前页，否则删除就回到上一页
      tradenarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1,
    )
  } else {
    ElMessage({
      type: 'error',
      message: '删除品牌失败',
    })
  }
}
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
