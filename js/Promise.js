class Promise{
    SATUS_ENUM = {
        PENDING: 'pending',
        FULFILLED: 'fulfilled',
        REJECT: 'rejected'
    }
    value = null;
    cachedThen = {};
    cahcedCatch = null;
    constructor(fun){
        if(typeof fun !== 'function'){
            return new Error('need function')
        }
        fun((res)=> this.resolve(res), (err) => this.reject(err));
        return this;
    }
    resolve(res){
        this.value = res;
        this.status = Promise.SATUS_ENUM.FULFILLED;
        console.log('pormisr resolve')
        this.cachedThen[Promise.SATUS_ENUM.FULFILLED](this.value);
    }
    reject(err){
        this.value = err;
        this.status = Promise.SATUS_ENUM.REJECT;
        console.log('promise reject')
        if(this.cachedThen[Promise.SATUS_ENUM.FULFILLED]){
            this.cachedThen[Promise.SATUS_ENUM.REJECT](this.value);
        }else if(this.cahcedCatch){
            this.cahcedCatch(this.value);
        }
    }
    then(onResolve, onReject){
        this.cachedThen = {
            [Promise.SATUS_ENUM.FULFILLED]: onResolve,
            [Promise.SATUS_ENUM.REJECT]: onReject
        }
    }
    catch(onRject){
        this.cahcedCatch = onReject;
    }
}

Promise.all = function(promiseList){
    if(!Array.isArray(promiseList)){
        throw new Error('must be array')
    }
    let resList = [];
    let finishedCount = 0;
    return new Promise((resolve, reject)=>[
        promiseList.forEach((promise,index)=>{
            promise.then(res => {
                resList[index] = res;
                finishedCount ++;
                if(finishedCount === promiseList.length){
                    resolve(resList);
                }
            }).catch(err =>{
                reject(err)
            })
        })  
    ])
}