// openids = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]


// await Promise.all(openids.map(async (openid) =>(
//     new Promise((resolve, reject) =>{

//       // 耗时操作
//       // return (async ()=>{
//         // console.log("openid",openid.openid)  
//         templates.touser = openid.openid
//         console.log("templates1",templates)
//         var result = await axios.post(url,templates)
//         index = index + 1
//         console.log("templates2",templates)
//         console.log("result",result.data,"openid",openid.openid,"templates",templates,"index",index)
//         // return result.data
//       // })
//     }
// )));

// class PromisePool {
//   constructor(max, fn) {
//     this.max = max; // 最大并发数
//     this.fn = fn;   // 自定义的请求函数
//     this.pool = []; // 并发池
//     this.urls = []; // 剩余的请求地址
//   }

//   start(urls) {
//     this.urls = urls;
//     // 先循环把并发池塞满
//     while (this.pool.length < this.max) {
//       let url = this.urls.shift();
//       this.setTask(url);
//     }
//     // 利用Promise.race 方法来获得并发池中某任务完成的信号
//     let race = Promise.race(this.pool);
//     return this.run(race);
//   }

//   run(race) {
//     race.then(res => {
//         // 每当并发池跑完一个任务，就再塞入一个任务
//         let url = this.urls.shift();
//         this.setTask(url);
//         return this.run(Promise.race(this.pool));
//       });
//   }
//   setTask(url) {
//     if (!url) return;
//     let task = this.fn(url);
//     this.pool.push(task); // 将该任务推入pool并发池中
//     console.log(`\x1B[43m ${url} 开始，当前并发数：${this.pool.length}`);
//     task.then(res => {
//       // 请求结束后将该Promise任务从并发池中移除
//       this.pool.splice(this.pool.indexOf(task), 1);
//       console.log(`\x1B[43m ${url} 结束，当前并发数：${this.pool.length}`);
//     });
//   }
// }

// // test
// const URLs = [
//   'bytedance.com',
//   'tencent.com',
//   'alibaba.com',
//   'microsoft.com',
//   'apple.com',
//   'hulu.com',
//   'amazon.com',
//   '1bytedance.com',
//   '1tencent.com',
//   '1alibaba.com',
//   '1microsoft.com',
//   '1apple.com',
//   '1hulu.com',
//   '1amazon.com'
// ];
// // 自定义请求函数
// var requestFn = url => {
//   return new Promise(resolve => {
//     setTimeout(_ => {
//       resolve(`任务 ${url} 完成`);
//     }, 100)
//   }).then(res => {
//     console.log('外部逻辑 ', res);
//   })
// }

// const pool = new PromisePool(5, requestFn); // 并发数为3
// pool.start(URLs);


/* promise-limit.js */
/* jshint esversion: 6 */
/*jslint node: true */
Promise.allLimit = function(arr, wrap, limit, callback) {
  return new Promise((resolve, reject) => {
    var total = arr.length;
    var result = new Array(total);
    var rejected = false;
    var dones = 0;
    function run(n) {
      
      setTimeout(() => {
        // shift将数组第一个袁术删除并返回第一个元素的值
        wrap(n, arr.shift()).then(res => {
            console.log(typeof callback)
            return typeof callback === 'function' ? callback(n, res) : Promise.resolve(res);
        }).then(res => {
          dones++;
          result[n] = res;
          if (!rejected) {
            if (arr.length) {
              run(total - arr.length);
            } else if (dones === total) {
              resolve(result);
            }
          }
        }).catch(err => {
          rejected = true;
          reject(err);
        });
      }, 0);
    }
    arr.slice(0, limit).forEach((v, n) => {
        run(n);
    });
  });
};

Promise.allLimit([20000, 15000, 25000, 30000, 15000], function(n, time) {
  return new Promise((resolve, reject) => {
    console.log("Start Job: ", n, time);
    // setTimeout(2500 === time ? reject : resolve, time, "Time: " + time); // 测试reject
    console.log("resolve: ", resolve);
    setTimeout(resolve, time, "Time: " + time);
  });
}, 2, (n, res) => {
  // log Job n done
  console.log("Done Job: ", res);
  return Promise.resolve(n);
// log Job n done
}).then(result => {
  console.log("All Done: ", result);
}).catch(err => {
  console.log("Error: ", err);
});




















