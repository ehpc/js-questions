type PromiseState = {
    status: 'fullfilled',
    value: any,
} | {
    status: 'rejected',
    reason: any,
}

function allSettled(promises: any[]): Promise<any> {
    return new Promise((resolve) => {
        let count = 0;
        const results: PromiseState[] = [];
        for (let i = 0; i < promises.length; i++) {
            if (promises[i]?.then) {
                promises[i].then((value) => {
                    count += 1;
                    results[i] = {status: 'fullfilled', value};
                    if (count === promises.length) {
                        resolve(results);
                    }
                }).catch((reason) => {
                    count += 1;
                    results[i] = {status: 'rejected', reason};
                    if (count === promises.length) {
                        resolve(results);
                    }
                });
            } else {
                count += 1;
                results[i] = {status: 'fullfilled', value: promises[i]};
                if (count === promises.length) {
                    resolve(results);
                }
            }
        }
    });
}

allSettled([1, Promise.resolve(2), Promise.reject(3)]).then(([v1, v2, v3]) => {
  console.log(v1); // {status: 'fulfilled', value: 1}
  console.log(v2); // {status: 'fulfilled', value: 2}
  console.log(v3); // {status: 'rejected', reason: 3}
});
