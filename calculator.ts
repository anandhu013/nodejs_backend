interface CalculatorInterface {
    add(a: number, b: number): number;
    subtract(a: number, b: number): number;
    multiply(a: number, b: number): number;
    divide(a: number, b: number): number;
    pow(a: number, b: number): number;
    mod(a: number, b: number): number;
}

class Calculator implements CalculatorInterface {

    add(a: number, b: number): number {
        return a + b;
    }

    subtract(a: number, b: number): number {
        return a - b;
    }

    multiply(a: number, b: number): number {
        return a * b;
    }

    divide(a: number, b: number): number {
        return a / b;
    }

    pow(a: number, b: number): number {
        return Math.pow(a, b);
    }

    mod(a: number, b: number): number {
        return a % b;
    }


}

let a=new Calculator();

console.log(a.add(2,3));
console.log(a.multiply(2,3));
console.log(a.subtract(2,3));
console.log(a.divide(2,3));
console.log(a.pow(2,3));
console.log(a.mod(2,3));