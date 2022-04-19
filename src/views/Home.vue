<template>
    <div>
        <el-container>
            <el-header class="homeHeader">
                <div class="title">
                    ABC在线办公管理系统
                </div>
                <div>
                    <el-button icon="el-icon-bell"
                               type="text"
                               size="large"
                               style="margin-right: 6px"
                               @click="goChat"/>
                    <el-dropdown class="userInfo" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{user.name}}
                        <i>
                            <img :src="user.userFace">
                        </i>
                    </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
                            <el-dropdown-item command="setting">设置</el-dropdown-item>
                            <el-dropdown-item command="logout">注销登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu router unique-opened>
                        <el-submenu
                                :index="index+''"
                                v-for="(item, index) in this.routes"
                                :key="index"
                                v-if="!item.hidden"
                        >
                            <template slot="title">
                                <i :class="item.iconCls" style="color: #1accff;margin-right: 5px"></i>
                                <span>{{ item.name }}</span>
                            </template>
                            <el-menu-item
                                    :index="children.path"
                                    v-for="(children, indexj) in item.children"
                            >
                                {{ children.name }}
                            </el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path!='/home'"
                                   style="margin-bottom: 10px">
                        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="homeWelcome" v-if="this.$router.currentRoute.path=='/home'">
                        欢迎使用ABC在线办公管理系统
                    </div>
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    // import导入组件工具等
    export default {
        data() {
            return {
                // user: JSON.parse(window.sessionStorage.getItem('user'))
            }
        },
        // 组件名称
        name: "Home",
        // 组件方法
        methods: {
            handleCommand(command) {
                if ('logout' == command) {
                    this.$confirm('是否确认注销登录?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        //注销登录
                        this.postRequest('/logout');
                        //在sessionStorage里清空用户信息
                        window.sessionStorage.removeItem('tokenStr');
                        window.sessionStorage.removeItem('user');
                        //清空菜单信息
                        this.$store.commit('initRoutes', []);
                        this.$router.replace('/');
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消注销'
                        });
                    });
                } else if ('userInfo' == command) {
                    this.$router.push('/userInfo')
                }
            },
            goChat() {
                this.$router.push('/chat')
            }
        },
        // 计算属性
        computed: {
            routes() {
                return this.$store.state.routes;
            },
            user() {
                return this.$store.state.currentAdmin
            }
        },
        // 侦听器
        watch: {},
        // import的组件需要声明
        components: {},
    };
</script>

<style>
    .homeHeader {
        background: darkcyan;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 15px;
        box-sizing: border-box;
    }

    .homeHeader .title {
        font-size: 30px;
        font-family: 华文行楷;
        color: yellowgreen;
    }

    .homeHeader .userInfo {
        cursor: pointer;
    }

    .el-dropdown-link {
        display: flex;
        align-items: center;
        font-size: 18px;
        color: goldenrod;
    }

    .el-dropdown-link img {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        margin-left: 8px;
    }

    .homeWelcome {
        text-align: center;
        font-size: 30px;
        font-family: 华文行楷;
        color: #409ef4;
        padding-top: 50px;
    }
</style>
