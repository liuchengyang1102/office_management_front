<template>
    <div>
        <el-table
                :data="employEc"
                stripe
                border
                style="width: 70%">
            <el-table-column
                    prop="employee.name"
                    label="员工姓名"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="ecDate"
                    label="奖罚日期"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="ecReason"
                    label="奖罚原因"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="ecPoint"
                    label="奖罚分"
                    width="60">
            </el-table-column>
            <el-table-column
                    prop="ecType"
                    label="奖罚类别"
                    width="80">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.ecType==0">奖励</el-tag>
                    <el-tag type="danger" v-else>惩罚</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    prop="remark"
                    label="备注">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default {
        name: "PerEc",
        data() {
            return {
                employEc: []
            }
        },
        mounted() {
            this.initEmployEc()
        },
        methods: {
            initEmployEc() {
                this.getRequest('/personnel/ec/').then(resp => {
                    if (resp) {
                        this.employEc = resp
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
