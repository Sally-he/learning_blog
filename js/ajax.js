
function ajax(options){
    let {methods, url} = options;
    return new Promise((resolve, reject)=>{
        let clinet = new XMLHttpRequest();
        clinet.open(methods, url);
        clinet.onreadystatechange = function(){
            if(this.readyState !== 4){
                return
            }
            if(this.status === 200){
                resolve(this.response)
            }else {
                reject(new Error(this.statusText))
            }
        }
        clinet.responseType = 'json';
        clinet.setRequestHeader('Accept', 'application/json');
        clinet.send();
    })
}
function jsonp(options){
    let {url, params,callback}  =  options;
    return new Promise((resolve, reject)=>{
        let script = document.createElement('script');
        window[callback] = function(data){
            resolve(data)
            document.body.removeChild(script)
        }
        params = {...params, callback};
        let arrs = [];
        for(let key in params){
            arrs.push(`${key}=${params[key]}`)
        }
        script.src = `${url}?${arrs.join('&')}`
        document.body.appendChild(script)
    })
}

export default{
    ajax,
    jsonp
}