/* 
* @Author: pengshuang
* @Date:   2017-02-22 10:18:56
* @Last Modified by:   pengshuang
*
* 仅适用于body为最大高度时的页面，使用时在所需显示进度条的页面引入此包即可,
* 进度条固定显示于页面顶部
*/

window.onload = function(){
    var windowHeight = window.innerHeight,//窗口高度
        pageHeight = document.body.offsetHeight,//整个页面高度
        totalHeight = pageHeight - windowHeight,//参与计算的总高度
        barWidth = 0,//进度条宽度
        windowWidth = document.body.clientWidth;//窗口宽度

    var leftColor = '#f22eff',//渐变背景颜色的起始颜色
        rightColor = '#f22e00';//终点颜色

    var progressBar = document.createElement('div');//创建页面进度条
    //进度条的样式设置
    progressBar.style.cssText += ';position:fixed;top:0;left:0;height:3px;background:linear-gradient(to right, '+leftColor+', '+rightColor+');z-index:10002;';

    document.body.appendChild(progressBar);

    /**
     * 滚动时实时显示进度
     */
    window.onscroll = function(e){
        reCalcBarW();
    }

    /**
     * 窗口改变宽高时，重新计算
     */
    window.onresize = function(e){
        windowHeight = window.innerHeight;
        totalHeight = pageHeight - windowHeight;
        windowWidth = window.innerWidth;
        
        reCalcBarW();
    }

    /**
     * 重新计算进度条的宽度
     */
    function reCalcBarW(){
        barWidth = windowWidth * window.scrollY / totalHeight;
        progressBar.style.width = barWidth + 'px';
    }
    reCalcBarW();

    /**
     * 检查页面高度是否改变（懒加载等情况），改变后更新进度条宽度
     */
    setInterval(function(){
        if(pageHeight != document.body.clientHeight){
            pageHeight = document.body.clientHeight;
            totalHeight = pageHeight - windowHeight;
            reCalcBarW();
        }
    }, 500);
}