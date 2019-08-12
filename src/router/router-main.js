import * as routerList from './index';

class Router{
    //监听路由变化
    init(){
        console.log(9999);
        window.addEventListener("hashchange", this.toPage.bind(this));
    }
    //获取路由参数
    toPage(){
        let path = location.hash.substring(1)
        if (path === 'index') {

        }
    }
}
let router = new Router();
router.init();
export default router;


