const names ={
    "maleNames": ["Vasya", "Josef", "Abraham", "Yakob", "Asaf", "Mosez","Itschak"
    ,"David" ],
    "femaleNames": ["Asya", "Sara", "Rivka", "Olya", "Klara", "Galya"]
};
export function getRandomInt(min, max) {
    if(min == max) {
        max++;
    } else if (min > max) {
        [min, max] = [max, min]
    }
    return Math.trunc(min + Math.random() * (max - min))

}
export function getRandomElement(array) {
    return array[getRandomInt(0, array.length)]
}
export function getRandomEmployee(minSalary, maxSalary, minYear, maxYear, departments) {
   const gender = getRandomElement(['male', 'female']);
   const name = getRandomElement(gender == 'female' ? names.femaleNames :
    names.maleNames);
    const birthDate = getRandomDate(minYear, maxYear + 1);
    const salary = Math.round(getRandomInt(minSalary, maxSalary) / 1000) * 1000;
    const department = getRandomElement(departments);
    return {
         name, birthDate, gender,
        salary, department};
}
export function getRandomMatrix(rows, columns, min, max) {
    return Array.from({length:rows}).map(() => getRandomArrayIntNumbers(columns, min, max))
}
export function getRandomArrayIntNumbers(nNumbers, min, max) {
    return Array.from({length: nNumbers}).map(() => getRandomInt(min, max))
}
export function getRandomDate(minYear, maxYear) {
    const year = getRandomInt(minYear, maxYear + 1);
    const month = getRandomInt(0, 12);
    const day = getRandomInt(1, 32);
    return new Date(year, month, day);
}
export function getRandomAdvert() {
    const categories = [
        {category: "category1",properties: 3},
        {category: "category2",properties: 2},
        {category: "category3",properties: 4},
        {category: "category4",properties: 5}
    ]
    const index = getRandomInt(0, categories.length);
    const category = categories[index].category;
    const name = "name" + getRandomInt(1, 10000000);
    const price = getRandomInt(100, 1000000);
    return {name, category, price, ...getRandomProps(categories[index].properties)}
}
function getRandomProps(nProperties) {
    return Array.from({length: nProperties}).map(getPropValue)
    .reduce((res, cur, index) => ({...res,["prop" + index]: cur}),{})
}
function getPropValue() {
    return getRandomInt(0, 2) === 0 ? "x" + getRandomInt(1,100000) : getRandomInt(1, 10);
}