/**
 * Created by guang on 2016/7/14.
 */
//创建的js分页对象
function page(){
    this.data="";//数据；注：数据格式为[{},{},{}];外层为数组，每个数组内的元素为对象的格式；
    this.cut_page_id="";//整体容器的最外层id
    this.pageContentLength=10;//每页展示数据的长度或个数；

    //this.pageContentElement="table";//用哪种 标签进行数据的展示，可以用table与tr+td;或者是ul+li+span;只需要填入table或者ul既可；
    //this.orderKey="";//表格展示的属性名的顺序
    //this.orderKeyName="";//表格头部的属性名一次的名称与orderKey对应起来；
}
//增加dom，调用主方法；
page.prototype.addDom=function(){
    var $pageIndexElement = document.getElementById(this.cut_page_id);
    var $pageLength=Math.ceil(this.data.length/this.pageContentLength)
    $pageIndexElement.innerHTML="<b class='upAndDownPage'>上一页</b><span class='pageIndex nowPage'>1</span><em class='pagesl'>...</em>"
    for(var i=2;i<=$pageLength-1;i++){
        $pageIndexElement.innerHTML+="<span class='pageIndex'>"+i+"</span>"
    }
    $pageIndexElement.innerHTML+="<em class='pagesl'>...</em><span class='pageIndex'>"+$pageLength+"</span><b class='upAndDownPage'>下一页</b>"

    var $pageSpan=$pageIndexElement.getElementsByTagName("span");
    var $pageEm = $pageIndexElement.getElementsByTagName("em");
    var $pageB = $pageIndexElement.getElementsByTagName("b");

    //首次加载显示的页码；
    $pageEm[0].style.display="none";
    $pageEm[1].style.display = "inline-block";
    if ($pageLength <= 5) {
        $pageEm[1].style.display = "none";
        for (var s = 0; s < $pageLength; s++) {
            $pageSpan[s].style.display = "inline-block"
        }
        //给页码进行居中；
        var w = ($pageSpan[0].offsetWidth + 2) * $pageLength + ($pageB[0].offsetWidth + 2) * 2 + ($pageEm[0].offsetWidth + 2);

        $pageIndexElement.style.marginLeft = ($pageIndexElement.clientWidth - w) / 2 + "px"

    } else {
        var arr=[0,1,2,3,4,$pageLength-1];
        for (var i in arr) {
            $pageSpan[arr[i]].style.display = "inline-block"
        }
        //给页码进行居中；
        var w = ($pageSpan[0].offsetWidth + 2) * 7 + ($pageB[0].offsetWidth + 2) * 2 + ($pageEm[0].offsetWidth + 2);

        $pageIndexElement.style.marginLeft = ($pageIndexElement.clientWidth - w) / 2 + "px"
    }

    this.cutData()
}

//对当前页以及其前后页的展示；
page.prototype.cutPage=function(index,$pageLength){
    var $pageIndexP=document.getElementById(this.cut_page_id);
    var $pageEm=$pageIndexP.getElementsByTagName("em");
    var $pageSpan = $pageIndexP.getElementsByTagName("span");
    var $pageB = $pageIndexP.getElementsByTagName("b");
    for(var i=0;i<$pageSpan.length;i++){
        $pageSpan[i].style.display="none"
        $pageSpan[i].setAttribute("class","pageIndex")
    }
    //主要分成三种形式
    //（1）当前页的下标为大于3小于最后页减3
    if(index>=3&&index<($pageLength-3)){
        $pageEm[0].style.display="inline-block";
        $pageEm[1].style.display="inline-block";
        var classVal =$pageSpan[index] .getAttribute("class");
        classVal = classVal.concat(" nowPage");
        $pageSpan[index].setAttribute("class",classVal)
        var arr=[0,index-1,index-2,index,index+1,index+2,$pageLength-1];
        for(var i in arr) {
            $pageSpan[arr[i]].style.display = "inline-block"
        }

        //当前页的下标小于3
    } else if (index < 3) {
        $pageEm[0].style.display = "none";
        $pageEm[1].style.display = "inline-block";
        var classVal =$pageSpan[index] .getAttribute("class");
        classVal = classVal.concat(" nowPage");
        $pageSpan[index].setAttribute("class", classVal)
        if ($pageLength <= 5) {
            $pageEm[1].style.display = "none";
            for (var s = 0; s < $pageLength; s++) {
                $pageSpan[s].style.display = "inline-block"
            }


        } else {
            var arr = [0, 1, 2, 3, 4, $pageLength - 1];
            for (var i in arr) {
                $pageSpan[arr[i]].style.display = "inline-block"
            }

        }

        //当前页的下标为大于最后页减3
    }else{
        $pageEm[0].style.display="inline-block";
        $pageEm[1].style.display="none";
        var classVal =$pageSpan[index] .getAttribute("class");
        classVal = classVal.concat(" nowPage");
        $pageSpan[index].setAttribute("class",classVal)
        var arr=[0,$pageLength-1,$pageLength-2,$pageLength-3,$pageLength-4,$pageLength-5];
        for(var i in arr) {
            $pageSpan[arr[i]].style.display = "inline-block"
        }
    }

}
//上下也点击主方法；
page.prototype.upordown=function(index,lengh,cutData){
    var $cut_page_id=document.getElementById(this.cut_page_id);
    var $pageupdown=$cut_page_id.getElementsByClassName("upAndDownPage");
    var that=this;
    //上一页
    $pageupdown[0].onclick=function(){
        index--;
        if(index<=0){
            index=0;
        }
        that.calback(cutData[index])
        that.cutPage(index, lengh)
        //分页后数据分批进行其他展示的方法；
    }
    //下一页
    $pageupdown[1].onclick=function(){
        index++;
        if(index>=lengh-1){
            index=lengh-1;
        }
        that.calback(cutData[index])
        that.cutPage(index, lengh)
        //分页后数据分批进行其他展示的方法；
    }

}

//对整体数据的切割；
page.prototype.cutData = function () {
    var cutData=[];
    var $pageLength=Math.ceil(this.data.length/this.pageContentLength)
    for(var i=0; i<$pageLength;i++){
        cutData.push(this.data.slice(i*this.pageContentLength,(i+1)*this.pageContentLength))
    }
    this.connectEvent(cutData)
}
//每页点击事件的调连；
page.prototype.connectEvent = function (cutData) {
    var $pageIndexP=document.getElementById(this.cut_page_id);
    var $pageSpan=$pageIndexP.getElementsByTagName("span");
    var $pageLength=Math.ceil(this.data.length/this.pageContentLength)
    this.calback(cutData[0])

    //分页后数据分批进行其他展示的方法；
    this.upordown(0, $pageLength, cutData)
    for(var i=0; i<$pageSpan.length;i++){
        $pageSpan[i].index=i;
        var that=this;
        $pageSpan[i].onclick=function(){
            that.calback(cutData[this.index])
            that.cutPage(this.index,$pageLength)
            that.upordown(this.index, $pageLength, cutData)


            //分页后数据分批进行其他展示的方法；

        }
    }
}

