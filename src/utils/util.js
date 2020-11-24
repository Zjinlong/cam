const getCookie = name => {
    var r = document.cookie.match('\\b' + name + '=([^;]*)\\b');
    return r ? r[1] : undefined;
};
const getDays = (year, month) => {
    let days = [31, 28, 31, 30, 31, 30, 31, 30, 30, 31, 30, 31]
    if ((year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0)) {
        days[1] = 29
    }
    return days[month - 1]
}


const  repeatCount=(c,ismonth)=>{
    const arr = []
    let num = 0
    if(ismonth){
  c.forEach(item => {
     const parent = arr.find(cur => cur.date === item.date)
     if (parent) {
         if(item.statusName == "未处理"){
            parent.childs.push(item)
         }
        
         parent.num.push(item)
     } else {
         const obj = {
             clazzTypeText: item.id,
             date: item.date,
             childs: [item],
             num:[item]
         }
       arr.push(obj)
     }
 })
    }else{
      c.forEach(item => {
     const parent = arr.find(cur => cur.month === item.month)
     if (parent) {
         parent.childs.push(item.month)
         parent.num.push(item)
     } else {
         const obj = {
             clazzTypeText: item.id ,
             month: item.month,
             childs: [item],
             num:[item]
         }
       arr.push(obj)
     }
 }) 
    }
   
 return arr
 }

 
 function formatTime(number,format) {  
  
    var formateArr  = ['Y','M','D','h','m','s'];  
    var returnArr   = [];  
    
    var date = new Date(number);
 
    returnArr.push(date.getFullYear());  
    returnArr.push(formatNumber(date.getMonth() + 1));  
    returnArr.push(formatNumber(date.getDate()));  
    
    returnArr.push(formatNumber(date.getHours()));  
    returnArr.push(formatNumber(date.getMinutes()));  
    returnArr.push(formatNumber(date.getSeconds()));  
  
    for (var i in returnArr)  
    {  
      format = format.replace(formateArr[i], returnArr[i]);  
    }  
    return format;  
  } 
  
  //数据转化  
  function formatNumber(n) {  
    n = n.toString()  
    return n[1] ? n : '0' + n  
  }  
// const calculateTime = list => {
//     let _res = [];
//     for (let i = 0; i < list.length;) {
//         let count = 0;
//         for (let j = i; j < list.length; j++) {
//             if (list[i].serialNumber == list[j].serialNumber) {
//                 count++;
//             }
//         }
//         let obj = {
//             title: list[i].name,
//             num: count
//         }
//         _res.push(obj)
//         i += count;
//     }
//     return _res
// }

export default { getCookie, getDays ,repeatCount,formatTime}
//工具