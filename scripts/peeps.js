var count=0;
var mytable="<table id='peeps'><tr>";
function peeps(u){
    count++;
    if(count%3==1){
        mytable+="<th id='suh'><img src='icon2.png' id='"+u+"' class='us'></th>";
    }else{
        mytable+="</tr><tr>"
        mytable+="<th id='suh'><img src='icon2.png' id='"+u+"' class='us'></th>";
    }
    mytable+="</tr>";
    document.getElementById("mytable").innerHTML =mytable;
    peepspic(u);
}
function clean(){
    mytable="<table></table>";
    document.getElementById("mytable").innerHTML =mytable;
}
