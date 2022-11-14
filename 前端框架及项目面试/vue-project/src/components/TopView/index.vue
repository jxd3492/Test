<template>
    <el-row :gutter="20">
        <el-col :span="6" shadow="hover">
            <el-card  class="box-card">
                <common-card></common-card>
            </el-card>
        </el-col>
        <el-col :span="6" shadow="hover">
            <el-card class="box-card">
                <common-card></common-card>
            </el-card>
        </el-col>
        <el-col :span="6" shadow="hover">
            <el-card class="box-card">
                <common-card></common-card>
            </el-card>
        </el-col>
        <el-col :span="6" shadow="hover">
            <el-card class="box-card">
                <common-card></common-card>
            </el-card>
        </el-col>
    </el-row>
</template>
  
<script>
import { ElCard } from 'element-plus'
import CommonCard from '../CommonCard/index.vue'

export default ({
    components: {
        ElCard,
        CommonCard
    },
    setup() {
        return {
            o: [1, 2, 3, 4]
        }
    },
})
</script>
  
<style scoped>
.text {
    font-size: 14px;
}

.item {
    padding: 18px 0;
}

.clear:after {
    content: '';
    display: table;
    clear: both;
}

.box-card {
    float: left;
    width: 400px;
    box-sizing: border-box;
}
</style>