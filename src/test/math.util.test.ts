import { when } from "jest-when";
import MathUtil from "../utils/math.util";
describe('Test average function',()=>{
    describe('Test average succes cases',()=>{
    test('Test average success case',()=>{
        MathUtil.sum=jest.fn().mockReturnValueOnce(8);
        expect(MathUtil.average(4,4)).toBe(4);
    })
    
    test('Test average 4+4',() =>{
        const mockedFunction=jest.fn();
        MathUtil.sum=mockedFunction;
        when(mockedFunction).calledWith(4,4).mockReturnValueOnce(8);
        expect(MathUtil.average(4,4)).toBe(4);
    })
})
    
    test('Test average failure case',()=>{
        expect(MathUtil.average(4,4)).not.toBe(3);
    })
})