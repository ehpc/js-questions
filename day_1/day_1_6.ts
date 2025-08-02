function race(promises: any[]): Promise<any> {
    let settled = false;
    return new Promise((resolve, reject) => {
        for (const promise of promises) {
            Promise.resolve(promise).then(
                (value) => {
                    if (settled) return;
                    settled = true;
                    resolve(value);
                },
                (reason) =>{
                    if (settled) return;
                    settled = true;
                    reject(reason);
                }
            );
        }
    });
}

race([Promise.resolve(2), 3]).then((res) => {
  console.log(res); // 2
});
race([Promise.reject(1), Promise.resolve(2), 3]).then(console.log).catch((reason) => {
  console.log(reason); // 1
});