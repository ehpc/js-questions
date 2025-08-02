function any(promises: any[]): Promise<any> {
    let rejectedReasons: any[] = [];
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            Promise.resolve(promises[i])
                .then(
                    resolve,
                    (reason) => {
                        rejectedReasons.push(reason);
                        if (rejectedReasons.length === promises.length) {
                            reject(rejectedReasons);
                        }
                    }
                );
        }
    });
}

any([Promise.reject(1), Promise.resolve(2), 3]).then((res) => {
  console.log(res); // 2
});

any([Promise.reject(1), Promise.reject(2)]).catch((errors) => {
  console.log(errors); // [1, 2]
});
