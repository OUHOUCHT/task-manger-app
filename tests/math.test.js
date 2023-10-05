



const { fahrenheitToCelsius, celsiusToFahrenheit, Sum } = require("../math");

test("Should convert 32 F to 0 C" , () => {

  const temp = fahrenheitToCelsius(32);

  expect(temp).toBe(0)
})


test('Should convert 0 C to 32 F',() => {
  const temp = celsiusToFahrenheit(0);

  expect(temp).toBe(32)
})

/*

test("test sum two numbers" , async () => {

 await Sum(2,3).then( data => {
    expect(data).toBe(5)
  })
  
})
*/




