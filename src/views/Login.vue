<template>
    <div>
        <el-form
                v-loading="loading"
                element-loading-text="正在登录......"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                ref="loginForm"
                :model="loginForm"
                :rules="rules"
                class="loginContainer"
        >
            <h3 style="margin: 0 auto 30px; text-align: center">系统登录</h3>
            <el-form-item prop="username">
                <el-input
                        type="text"
                        auto-complete="false"
                        v-model="loginForm.username"
                        placeholder="请输入用户名"
                        @keyup.enter.native="submitLogin()"
                ></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input
                        type="password"
                        auto-complete="false"
                        v-model="loginForm.password"
                        placeholder="请输入密码"
                        @keyup.enter.native="submitLogin()"
                ></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-row>
                    <el-col :span="18">
                        <el-input
                                type="text"
                                auto-complete="false"
                                v-model="loginForm.code"
                                placeholder="请输入验证码"
                                style="width: 220px; margin-right: 5px"
                                @keyup.enter.native="submitLogin()"
                        ></el-input>
                    </el-col>
                    <el-col :span="6">
                        <img
                                :src="captchaUrl"
                                style="margin-left: -20px"
                                @click="updateCaptcha"
                        />
                    </el-col>
                </el-row>
            </el-form-item>
            <el-button type="primary" style="width: 100%" @click="submitLogin"
            >登录
            </el-button
            >
        </el-form>
    </div>
</template>

<script>
    // import导入组件工具等
    export default {
        data() {
            return {
                captchaUrl: "/captcha?time=" + new Date(),
                loginForm: {
                    username: "admin",
                    password: "123",
                    code: "",
                },
                loading: false,
                rules: {
                    username: [
                        {required: true, message: "用户名不能为空", trigger: "blur"},
                        {
                            min: 5,
                            max: 12,
                            message: "长度在 5 到 12 个字符",
                            trigger: "blur",
                        },
                    ],
                    password: [
                        {required: true, message: "密码不能为空", trigger: "blur"},
                        {
                            min: 3,
                            max: 16,
                            message: "长度在 3 到 16 个字符",
                            trigger: "blur",
                        },
                    ],
                    code: [{required: true, message: "验证码不能为空", trigger: "blur"}],
                },
            };
        },
        // 组件名称
        name: "Login",
        // 组件方法
        methods: {
            updateCaptcha() {
                this.captchaUrl = "/captcha?time=" + new Date();
            },
            submitLogin() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        this.postRequest("/login", this.loginForm).then((resp) => {
                            this.loading = false;
                            if (resp) {
                                //存储用户token
                                const tokenStr = resp.object.tokenHead + resp.object.token;
                                window.sessionStorage.setItem("tokenStr", tokenStr);
                                //页面跳转
                                let path = this.$route.query.redirect;
                                this.$router.replace((path == '/' || path == undefined) ? '/home' : path);
                            }
                        });
                    } else {
                        this.$message.error("登录信息不全，无法登录！");
                        return false;
                    }
                });
            },
        },
        // 计算属性
        computed: {},
        // 侦听器
        watch: {},
        // import的组件需要声明
        components: {},
    };
</script>

<style scoped>
    .loginContainer {
        border-radius: 15px;
        background-clip: border-box;
        margin: 180px auto;
        width: 350px;
        padding: 15px 35px;
        background-color: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cacaca;
    }
</style>