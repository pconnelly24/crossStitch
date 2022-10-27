function distribute(inNum, o){
    let outNum = Math.pow(inNum / o, 2)
    outNum *= -0.5
    outNum = Math.pow(Math.E, outNum)
    outNum *= (1/(o * Math.pow(2 * Math.PI, 0.5)))
    return outNum
}

function dist(num1, num2){
    let outNum = Math.pow(num1[0]-num2[0], 2) + Math.pow(num1[1]-num2[1], 2)
    outNum = Math.pow(outNum, 0.5)
    return outNum
}