class MPromise {
  constructor(fn) {
    fn(this._resolve.bind(this), this._reject.bind(this));
    this._thenChain = [];
  }

  _resolve(result) {
    this._callThen(result);
  }

  _reject(error) {
    this._callCatch(error);
  }

  _callThen(payload) {
    if (payload instanceof MPromise) {
      payload.then((res) => this._callThen(res));
    } else {
      const res = this._thenChain[0] && this._thenChain[0](payload);
      this._thenChain.shift();
      if (this._thenChain.length) {
        this._callThen(res);
      }
    }
  }

  _callCatch(err) {
    this.catchCb(err);
  }

  then(cb) {
    this._thenChain.push(cb);
    return this;
  }

  catch(catchCb) {
    this.catchCb = catchCb;
  }
}
ƒ