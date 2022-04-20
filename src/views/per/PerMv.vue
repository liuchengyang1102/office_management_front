<template>
    <div>
        <el-table
                :data="employRemove"
                stripe
                border
                style="width: 70%">
            <el-table-column
                    prop="employee.name"
                    label="员工姓名"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="department.name"
                    label="调动后部门"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="position.name"
                    label="调动后职位"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="removeDate"
                    label="调动日期"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="reason"
                    label="调度原因"
                    width="180">
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
        name: "PerMv",
        data() {
            return {
                employRemove: []
            }
        },
        mounted() {
            this.initEmployRemove()
        },
        methods: {
            initEmployRemove() {
                this.getRequest('/personnel/remove/').then(resp => {
                    if (resp) {
                        this.employRemove = resp
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
