let array1 = [1,2,3,4,5]

let array2 = array1.map(function(value, index) {
    return value + 1
})

console.log(array1)
console.log(array2)

//[ 1, 2, 3, 4, 5 ]
//[ 2, 3, 4, 5, 6 ]

