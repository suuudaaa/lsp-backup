let toThousands = num => {
  let result = '', counter = 0;
  let dot = String(num).indexOf(".");
  if(dot != -1){
      // 有小数点
      let dotCnt = String(num).substring(dot+1,num.length);
      num = String(num).split('.')[0]
      num = (num || 0).toString();
      for (let i = num.length - 1; i >= 0; i--) {
          counter++;
          result = num.charAt(i) + result;
          if (!(counter % 3) && i != 0) { result = ',' + result; }
      }
      result = result + '.' + dotCnt;
      return result;
  }else{
      return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  }
};


export { toThousands };