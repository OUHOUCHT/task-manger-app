


const fahrenheitToCelsius = (temp) => {
    return (temp - 32) / 1.8
  }
  
  const celsiusToFahrenheit = (temp) => {
    return (temp * 1.8) + 32
  }



  
const Sum = (a,b) => {
    return new Promise((resolve,reject) => {
        setTimeout( ()  => {

            if( a<0 || b<0) {
                    reject('Numbers must be non-negative')
            }
            // resolve([1,5,10]);
            resolve(a+b)
         },2000)
    });
}



module.exports = {fahrenheitToCelsius,celsiusToFahrenheit,Sum}