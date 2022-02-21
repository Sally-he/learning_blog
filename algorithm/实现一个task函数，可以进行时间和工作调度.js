/**
 * @author: zhiyu.he
 * @file: description
 * @Date: 2021-09-16 16:57:44
 * @LastEditors: zhiyu.he
 * @LastEditTime: 2021-09-16 16:57:44
 */

class Schedule {
    constructor(name) {
        this.list = [];
        this.isWait = false;

        const task = (name) => {
            console.log(`> ${name} is notified`);
        }
        this.list.push(task.bind(this, name))
        this.print();
    }

    wait(time) {
        const task = new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(`等待  ${time}  秒`);
                resolve();
            }, time * 1000);
        });
        this.list.push(task);
        this.print();
        return this;
    }
    waitFirst(time) {
        const task = new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(`等待  ${time}  秒`);
                resolve();
            }, time * 1000);
        });
        this.list.unshift(task);
        this.print();

        return this;
    }
    print() {
        if (this.isWait) {
            return;
        }
        this.isWait = true;

        const goNext = () => {
            if (!this.list.length) {
                this.isWait = false;
            } else {
                let task = this.list.shift();
                if (task.then) {
                    task.then(() => {
                        goNext();
                    })
                } else {
                    task();
                    goNext();
                }
            }
        }
        Promise.resolve().then(() => {
            goNext();
        });
    }
    do(event) {
        const task = (event) => {
            console.log(`> Start  to ${event}`);
        }
        this.list.push(task.bind(this, event));
        this.print();
        return this;
    }
}

function task(name) {
    const schedule = new Schedule(name);
    return schedule;
}