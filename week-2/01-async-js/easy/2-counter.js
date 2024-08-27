
let a = 0;
function counter(){
    if(a==5){
        return 0;
    }
    a++;
    console.log(a);
    setTimeout(counter,1000);
}
counter();