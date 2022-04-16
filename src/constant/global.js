const backendUrl = 'http://localhost:3001'
// const backendUrl = 'http://54.157.108.209:3001'

const themeDefault = 'dark'
const namesOfModes = ['dark', 'moonlight', 'eclipse', 'light'];
const storeId = 'thefashionhub'
const dateFormat = (date) =>{
    var d = new Date(date);

    var datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
    d.getHours() + ":" + d.getMinutes();
    return datestring
}

export { backendUrl, themeDefault, namesOfModes,dateFormat }