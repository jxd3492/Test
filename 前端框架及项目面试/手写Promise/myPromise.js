class myPromise {
    static PENDING = 'pending';
    static FULFILLED = 'fulfilled';
    static REJECTED = 'rejected'
    constructor(func) {
        this.PromiseStatic = myPromise.PENDING;
        this.PromiseResult = null;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];
        try {
            func(this.resolve.bind(this), this.reject.bind(this));
        } catch (err) {
            this.reject(err);
        }
        func(this.resolve.bind(this), this.reject.bind(this));
    }
    resolve(result) {
        if (this.PromiseStatic === myPromise.PENDING) {
            this.PromiseStatic = myPromise.FULFILLED;
            this.PromiseResult = result;
            this.onFulfilledCallbacks.forEach(callback => {
                callback(result)
            })
        }
    }
    reject(reason) {
        if (this.PromiseStatic === myPromise.PENDING) {
            this.PromiseStatic = myPromise.REJECTED;
            this.PromiseResult = reason;
            this.onRejectedCallbacks.forEach(callback => {
                callback(reason)
            })
        }
    }
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {
            throw reason;
        };
        if (this.PromiseStatic === myPromise.PENDING) {
            this.onFulfilledCallbacks.push(() => {
                setTimeout(() => {
                    onFulfilled(this.PromiseResult);
                });
            });
            this.onRejectedCallbacks.push(() => {
                setTimeout(() => {
                    onRejected(this.PromiseResult);
                });
            });
        }
        if (this.PromiseStatic === myPromise.FULFILLED) {
            setTimeout(() => {
                onFulfilled(this.PromiseResult);
            });
        }
        if (this.PromiseStatic === myPromise.REJECTED) {
            setTimeout(() => {
                onRejected(this.PromiseResult);
            });
        }
    }
}