export function getFetch (url,setResponseData) {
    fetch (url,{
        method: 'GET'
    }).then(data => {
        return data.json()          
    }).then(data => {
        //console.log(responseData)
        setResponseData(data) 
    })
}
