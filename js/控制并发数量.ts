declare function ajax(url: string, params?: any): Promise<any>;

class PoolManager {
    private pool: Map<string, Pool> = new Map;
    has(domain: string) {
        return this.pool.has(domain);
    }
    get(domain: string) {
        return this.pool.get(domain);
    }
    add(domain: string, limit: number) {
        const pool = new Pool(limit);
        this.pool.set(domain, pool);
        return pool;
    }
}

class Pool {
    private pool: Array<MyRequest> = [];
    private count = 0;
    private limit: number;
    constructor(limit: number) {
        this.limit = limit;
    }
    push(request: MyRequest) {
        this.pool.push(request);
        this.doNext();
    }
    doNext() {
        if (this.count < this.limit && this.pool.length) {
            const request = this.pool.shift();
            this.count++;
            request.doRequest().then(() => {
                this.count--;
                this.doNext();
            }).catch(() => {
                this.count--;
                this.doNext();
            });
        }
    }
}

class MyRequest {
    private url: string;
    private params?: any;
    private resolve: (value: any) => void;
    private reject: (err: any) => void;
    constructor({
        url,
        params,
        resolve,
        reject
    }: {
        url: string;
        params?: any;
        resolve: (value: any) => void;
        reject: (err: any) => void;
    }) {
        this.url = url;
        this.params = params;
        this.resolve = resolve;
        this.reject = reject;
    }
    doRequest() {
        return ajax(this.url, this.params).then(this.resolve, this.reject);
    }
}

function getDomain(url: string) {
    if (url.startsWith('//') || url.startsWith('http')) {
        const matchs = url.match(/^(https?:)?\/\/(\w+\.?)+/);
        return matchs && matchs[2] || '';
    }
    return location.hostname;
}

function createRequest({ pool }: { pool: number }) {
    const poolManager = new PoolManager();
    return (url: string, params?: any) => {
        const domain = getDomain(url);
        const currentPool = poolManager.has(domain)
            ? poolManager.get(domain)
            : poolManager.add(domain, pool);
        return new Promise((resolve, reject) => {
            currentPool.push(new MyRequest({
                url,
                params,
                resolve,
                reject
            }));
        });
    }
}