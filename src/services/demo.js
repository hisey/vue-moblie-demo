import request from "@/request";

/* 登录 */
const login = param => request.post("/login", param);
const thirdJoin = param => request.post("/third/join", param);
export { login, thirdJoin };
