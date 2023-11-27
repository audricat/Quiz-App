export const setLocal = (storageName,data)=>{
    localStorage.setItem(storageName,JSON.stringify(data));
  }
  
  export const getLocal = (storageName)=>{
    JSON.parse(localStorage.getItem(storageName))
   
  }
  export const removeLocal = (storageName)=>{
    localStorage.removeItem(storageName)
  }