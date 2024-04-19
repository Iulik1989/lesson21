const arr = [1,2,8,3,4,5,6];

// 5

const findBest = (list) => list.reduce((acc, curr) => acc > curr ? acc : curr)

const findSecondBest = (list) => {
    let best = 0;
    let secondBest = 0;

    list.forEach((item) => {
        if(item > best) {
            secondBest = best
            best = item
            return
        }
        if(item > secondBest) {
            secondBest = item
        }
    })

    return secondBest;
}

console.log(findSecondBest(arr))